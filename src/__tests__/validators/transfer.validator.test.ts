import { describe, expect, it } from "vitest";
import { z } from "zod";

// Copy validator schema inline for testing
const transferSchema = z.object({
  amount: z.number()
    .positive("Amount must be positive")
    .max(1000000, "Amount exceeds maximum limit"),
  recipient: z.string()
    .min(5, "Recipient identifier too short")
    .regex(/^[^<>"&]+$/, "Invalid characters detected"),
});

describe("Transfer Validator", () => {
  describe("transferSchema", () => {
    it("should validate correct transfer", () => {
      const result = transferSchema.safeParse({
        amount: 100,
        recipient: "user@example.com",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.amount).toBe(100);
        expect(result.data.recipient).toBe("user@example.com");
      }
    });

    it("should reject zero amount", () => {
      const result = transferSchema.safeParse({
        amount: 0,
        recipient: "user@example.com",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes("amount"))).toBe(true);
      }
    });

    it("should reject negative amount", () => {
      const result = transferSchema.safeParse({
        amount: -100,
        recipient: "user@example.com",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes("amount"))).toBe(true);
      }
    });

    it("should reject amount exceeding maximum limit", () => {
      const result = transferSchema.safeParse({
        amount: 2000000,
        recipient: "user@example.com",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain("maximum limit");
      }
    });

    it("should accept maximum allowed amount", () => {
      const result = transferSchema.safeParse({
        amount: 1000000,
        recipient: "user@example.com",
      });

      expect(result.success).toBe(true);
    });

    it("should reject recipient string too short", () => {
      const result = transferSchema.safeParse({
        amount: 100,
        recipient: "abcd",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes("recipient"))).toBe(true);
      }
    });

    it("should accept minimum length recipient", () => {
      const result = transferSchema.safeParse({
        amount: 100,
        recipient: "abcde",
      });

      expect(result.success).toBe(true);
    });

    it("should reject recipient with invalid characters", () => {
      const invalidChars = [
        { value: '<script>', name: "HTML tags" },
        { value: '&', name: "ampersand" },
      ];

      for (const { value } of invalidChars) {
        const result = transferSchema.safeParse({
          amount: 100,
          recipient: value,
        });

        expect(result.success).toBe(false);
      }
    });

    it("should accept valid recipient with allowed special chars", () => {
      const result = transferSchema.safeParse({
        amount: 100,
        recipient: "user.name+123@example.com",
      });

      expect(result.success).toBe(true);
    });

    it("should reject string amount instead of number", () => {
      const result = transferSchema.safeParse({
        amount: "100",
        recipient: "user@example.com",
      });

      expect(result.success).toBe(false);
    });
  });
});

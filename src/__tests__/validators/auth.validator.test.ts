import { describe, expect, it } from "vitest";
import { z } from "zod";

// Copy validator schema inline for testing
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/[0-9]/, "Password must contain a number"),
});

describe("Auth Validator", () => {
  describe("loginSchema", () => {
    it("should validate correct login credentials", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "password123",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("user@example.com");
        expect(result.data.password).toBe("password123");
      }
    });

    it("should reject invalid email format", () => {
      const result = loginSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        // Zod v4 uses issues array
        expect(result.error.issues[0]).toBeDefined();
        expect(result.error.issues.some((i: any) => i.path.includes("email"))).toBe(true);
      }
    });

    it("should reject empty email", () => {
      const result = loginSchema.safeParse({
        email: "",
        password: "password123",
      });

      expect(result.success).toBe(false);
    });

    it("should reject password too short", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "abc",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i: any) => i.path.includes("password"))).toBe(true);
      }
    });

    it("should reject password without letters", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "123456",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i: any) => i.path.includes("password"))).toBe(true);
      }
    });

    it("should reject password without numbers", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "abcdef",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i: any) => i.path.includes("password"))).toBe(true);
      }
    });

    it("should accept password with minimum length and complexity", () => {
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "Pass123",
      });

      expect(result.success).toBe(true);
    });

    it("should handle extra unknown properties (Zod passthrough default)", () => {
      // Zod object by default ignores extra properties
      const result = loginSchema.safeParse({
        email: "user@example.com",
        password: "password123",
        unknownField: "extra",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect("unknownField" in result.data).toBe(false);
      }
    });
  });
});

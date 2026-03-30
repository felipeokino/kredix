import { describe, expect, it } from "vitest";
import { currencyMask } from "../../utils/masks";

describe("Masks Utils", () => {
  describe("currencyMask", () => {
    it("should format number as Brazilian currency", () => {
      const result = currencyMask("1000");
      expect(result).toContain("10,00");
    });

    it("should format large amounts correctly", () => {
      const result = currencyMask("5000000");
      expect(result).toContain("50.000,00");
    });

    it("should format small amounts correctly", () => {
      const result = currencyMask("50");
      expect(result).toContain("0,50");
    });

    it("should format cents correctly", () => {
      const result = currencyMask("99");
      expect(result).toContain("0,99");
    });

    it("should ignore non-numeric characters", () => {
      const result = currencyMask("abc1000xyz");
      expect(result).toContain("10,00");
    });

    it("should handle empty string", () => {
      const result = currencyMask("");
      expect(result.includes("0,00")).toBe(true);
    });

    it("should handle only non-numeric characters", () => {
      const result = currencyMask("abc");
      expect(result.includes("0,00")).toBe(true);
    });

    it("should format with thousands separator", () => {
      const result = currencyMask("1234567");
      expect(result).toContain("12.345");
    });

    it("should format precise decimal amounts", () => {
      const result = currencyMask("123456789");
      expect(result).toContain("1.234.567,89");
    });
  });
});

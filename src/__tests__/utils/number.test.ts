import { describe, expect, it } from "vitest";
import { formatCurrency, parseCurrency } from "../../utils/number";

describe("Number Utils", () => {
  describe("formatCurrency", () => {
    it("should format positive numbers as BR currency", () => {
      const result = formatCurrency(1000);
      expect(result).toMatch(/10,00/);
    });

    it("should format large numbers correctly", () => {
      const result = formatCurrency(5000000);
      expect(result).toMatch(/50\.000,00/);
    });

    it("should format decimal numbers correctly", () => {
      const result = formatCurrency(1235);
      expect(result).toMatch(/12,35/);
    });

    it("should format zero correctly", () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/0,00/);
    });

    it("should format negative numbers", () => {
      const result = formatCurrency(-100);
      expect(result).toMatch(/-.*1,00/);
    });

    it("should format small values correctly", () => {
      const result = formatCurrency(50);
      expect(result).toMatch(/0,50/);
    });

    it("should accept sign option", () => {
      const result = formatCurrency(-100, "always");
      expect(result).toMatch(/-.*1,00/);
    });
  });

  describe("parseCurrency", () => {
    it("should parse valid currency string", () => {
      const result = parseCurrency("1000");
      expect(result).toBe(1000);
    });

    it("should parse currency with decimal separator", () => {
      const result = parseCurrency("1234.56");
      expect(result).toBe(1234.56);
    });

    it("should ignore non-numeric characters", () => {
      const result = parseCurrency("R$ 1234,56");
      expect(result).toBe(123456);
    });

    it("should return 0 for empty string", () => {
      const result = parseCurrency("");
      expect(result).toBe(0);
    });

    it("should return 0 for invalid string", () => {
      const result = parseCurrency("abc");
      expect(result).toBe(0);
    });

    it("should handle negative numbers", () => {
      const result = parseCurrency("-1000");
      expect(result).toBe(-1000);
    });

    it("should handle multiple non-numeric characters", () => {
      const result = parseCurrency("R$-1.234,56");
      expect(result).toBe(-1.23456);
    });

    it("should handle leading zeros", () => {
      const result = parseCurrency("0001000");
      expect(result).toBe(1000);
    });
  });
});

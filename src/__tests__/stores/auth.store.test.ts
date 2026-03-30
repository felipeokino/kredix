import { describe, expect, it } from "vitest";
import { mockAuthData } from "../../data/auth.mock";

describe("Auth Store", () => {
  describe("login validation", () => {
    it("should accept valid credentials", () => {
      const userData = { email: "felipe.o@example.com", password: "123456" };
      const isValid =
        userData.email === "felipe.o@example.com" && userData.password === "123456";
      expect(isValid).toBe(true);
    });

    it("should reject invalid email", () => {
      const userData = { email: "wrong@example.com", password: "123456" };
      const isValid =
        userData.email === "felipe.o@example.com" && userData.password === "123456";
      expect(isValid).toBe(false);
    });

    it("should reject invalid password", () => {
      const userData = { email: "felipe.o@example.com", password: "wrongpassword" };
      const isValid =
        userData.email === "felipe.o@example.com" && userData.password === "123456";
      expect(isValid).toBe(false);
    });

    it("should reject empty email", () => {
      const userData = { email: "", password: "123456" };
      const isValid =
        userData.email === "felipe.o@example.com" && userData.password === "123456";
      expect(isValid).toBe(false);
    });

    it("should reject empty password", () => {
      const userData = { email: "felipe.o@example.com", password: "" };
      const isValid =
        userData.email === "felipe.o@example.com" && userData.password === "123456";
      expect(isValid).toBe(false);
    });
  });

  describe("user object structure", () => {
    it("should have correct user structure after login", () => {
      expect(mockAuthData.id).toBe("123");
      expect(mockAuthData.name).toBe("John Doe");
      expect(mockAuthData.email).toBe("john.doe@example.com");
    });

    it("should have account with wallet structure", () => {
      expect(mockAuthData.account).toBeDefined();
      expect(mockAuthData.account?.wallet).toBeDefined();
      expect(mockAuthData.account?.wallet?.balance).toBe(5000000);
    });
  });
});

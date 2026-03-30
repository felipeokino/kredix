import { describe, expect, it } from "vitest";
import { sortTransactionsByDate } from "../../utils/utils";
import type { Transaction } from "../../types/user";

describe("Utils", () => {
  describe("sortTransactionsByDate", () => {
    it("should sort transactions by date in descending order (default)", () => {
      const transactions: Transaction[] = [
        { id: "1", date: "2025-01-01", type: "income", amount: 100, origin: "A", description: "" },
        { id: "2", date: "2025-03-01", type: "expense", amount: 200, origin: "B", description: "" },
        { id: "3", date: "2025-02-01", type: "income", amount: 150, origin: "C", description: "" },
      ];

      const sorted = sortTransactionsByDate(transactions);

      expect(sorted[0]?.id).toBe("2"); // Most recent (March)
      expect(sorted[1]?.id).toBe("3"); // Middle (February)
      expect(sorted[2]?.id).toBe("1"); // Oldest (January)
    });

    it("should sort transactions in ascending order when specified", () => {
      const transactions: Transaction[] = [
        { id: "1", date: "2025-01-01", type: "income", amount: 100, origin: "A", description: "" },
        { id: "2", date: "2025-03-01", type: "expense", amount: 200, origin: "B", description: "" },
        { id: "3", date: "2025-02-01", type: "income", amount: 150, origin: "C", description: "" },
      ];

      const sorted = sortTransactionsByDate(transactions, true);

      expect(sorted[0]?.id).toBe("1"); // Oldest (January)
      expect(sorted[1]?.id).toBe("3"); // Middle (February)
      expect(sorted[2]?.id).toBe("2"); // Most recent (March)
    });

    it("should return empty array for empty input", () => {
      const sorted = sortTransactionsByDate([]);
      expect(sorted).toEqual([]);
    });

    it("should handle single transaction", () => {
      const transactions: Transaction[] = [
        { id: "1", date: "2025-01-01", type: "income", amount: 100, origin: "A", description: "" },
      ];

      const sorted = sortTransactionsByDate(transactions);
      expect(sorted).toEqual(transactions);
    });

    it("should sort by time component as well", () => {
      const transactions: Transaction[] = [
        { id: "1", date: "2025-03-15T10:00:00", type: "income", amount: 100, origin: "A", description: "" },
        { id: "2", date: "2025-03-15T08:00:00", type: "expense", amount: 200, origin: "B", description: "" },
        { id: "3", date: "2025-03-15T12:00:00", type: "income", amount: 150, origin: "C", description: "" },
      ];

      const sorted = sortTransactionsByDate(transactions);

      expect(sorted[0]?.id).toBe("3"); // 12:00 is most recent
      expect(sorted[1]?.id).toBe("1"); // 10:00
      expect(sorted[2]?.id).toBe("2"); // 08:00
    });

    it("should maintain stable order for equal dates", () => {
      const transactions: Transaction[] = [
        { id: "1", date: "2025-01-01", type: "income", amount: 100, origin: "A", description: "" },
        { id: "2", date: "2025-01-01", type: "expense", amount: 200, origin: "B", description: "" },
        { id: "3", date: "2025-01-01", type: "income", amount: 150, origin: "C", description: "" },
      ];

      const sorted = sortTransactionsByDate(transactions);

      expect(sorted.map(t => t.id)).toEqual(["1", "2", "3"]);
    });
  });
});

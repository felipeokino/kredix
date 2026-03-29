import type { AuthUser } from "../types/user";

export const mockAuthData: AuthUser = {
  id: "123",
  name: "John Doe",
  email: "john.doe@example.com",
  account: {
    wallet: {
      balance: 1000,
    },
    history: {
      transactions: [
        {
          id: "txn1",
          amount: 100,
          date: "2024-01-01",
          type: "credit",
          origin: "Salary",
          description: "Monthly salary",
        },
        {
          id: "txn2",
          amount: 50,
          date: "2024-01-15",
          type: "debit",
          origin: "Groceries",
          description: "Grocery shopping at Supermarket",
        },
      ],
    },
  },
};

import type { AuthUser, Transaction } from "../types/user";

export const mockAuthData: AuthUser = {
  id: "123",
  name: "John Doe",
  email: "john.doe@example.com",
  account: {
    wallet: {
      balance: 5000000,
    },
    history: {
      transactions: []
    },
  },
};

export const transactionsMock: Transaction[] = [
  // ===== NOVEMBER 2025 =====
  {
    id: "txn0",
    amount: 50000, // R$ 5.000
    date: "2025-10-05",
    type: "income",
    origin: "Salary",
    description: "Monthly salary",
  },
  {
    id: "txn1",
    amount: 50000, // R$ 5.000
    date: "2025-11-05",
    type: "income",
    origin: "Salary",
    description: "Monthly salary",
  },
  {
    id: "txn2",
    amount: 7500, // R$ 75
    date: "2025-11-10",
    type: "expense",
    origin: "Groceries",
    description: "Supermarket",
  },
  {
    id: "txn3",
    amount: 12000, // R$ 120
    date: "2025-11-18",
    type: "expense",
    origin: "Restaurant",
    description: "Dinner out",
  },
  {
    id: "txn4",
    amount: 6000, // R$ 60
    date: "2025-11-22",
    type: "expense",
    origin: "Transport",
    description: "Fuel",
  },

  // ===== DECEMBER 2025 =====
  {
    id: "txn5",
    amount: 50000,
    date: "2025-12-05",
    type: "income",
    origin: "Salary",
    description: "Monthly salary",
  },
  {
    id: "txn6",
    amount: 25000, // R$ 250
    date: "2025-12-12",
    type: "expense",
    origin: "Shopping",
    description: "Christmas gifts",
  },
  {
    id: "txn7",
    amount: 9000,
    date: "2025-12-18",
    type: "expense",
    origin: "Groceries",
    description: "Supermarket",
  },
  {
    id: "txn8",
    amount: 10000, // R$ 100
    date: "2025-12-28",
    type: "income",
    origin: "Transfer",
    description: "Received from friend",
  },

  // ===== JANUARY 2026 =====
  {
    id: "txn9",
    amount: 50000,
    date: "2026-01-05",
    type: "income",
    origin: "Salary",
    description: "Monthly salary",
  },
  {
    id: "txn10",
    amount: 8000,
    date: "2026-01-14",
    type: "expense",
    origin: "Groceries",
    description: "Supermarket",
  },
  {
    id: "txn11",
    amount: 15000,
    date: "2026-01-20",
    type: "expense",
    origin: "Utilities",
    description: "Electricity bill",
  },
  {
    id: "txn12",
    amount: 15000, // R$ 1.500
    date: "2026-01-25",
    type: "income",
    origin: "Freelance",
    description: "Project payment",
  },

  // ===== FEBRUARY 2026 =====
  {
    id: "txn13",
    amount: 50000,
    date: "2026-02-05",
    type: "income",
    origin: "Salary",
    description: "Monthly salary",
  },
  {
    id: "txn14",
    amount: 8500,
    date: "2026-02-11",
    type: "expense",
    origin: "Groceries",
    description: "Supermarket",
  },
  {
    id: "txn15",
    amount: 12000,
    date: "2026-02-18",
    type: "expense",
    origin: "Restaurant",
    description: "Dinner",
  },
  {
    id: "txn16",
    amount: 5000,
    date: "2026-02-22",
    type: "expense",
    origin: "Subscription",
    description: "Streaming service",
  },

  // ===== MARCH 2026 =====
  {
    id: "txn17",
    amount: 50000,
    date: "2026-03-05",
    type: "income",
    origin: "Salary",
    description: "Monthly salary",
  },
  {
    id: "txn18",
    amount: 9000,
    date: "2026-03-10",
    type: "expense",
    origin: "Groceries",
    description: "Supermarket",
  },
  {
    id: "txn19",
    amount: 20000,
    date: "2026-03-18",
    type: "expense",
    origin: "Health",
    description: "Pharmacy",
  },
  {
    id: "txn20",
    amount: 10000,
    date: "2026-03-25",
    type: "income",
    origin: "Transfer",
    description: "Received from friend",
  },
];
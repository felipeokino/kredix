export type User = {
  id: string;
  name: string;
  email: string;
};

export type Transaction = {
  id: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  origin: string;
  description?: string;
};

export type Account = {
  wallet: {
    balance: number;
  };
  history: {
    transactions: Transaction[];
  };
};

export type AuthUser = User & {
  account: Account;
};

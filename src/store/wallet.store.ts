import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Account } from "../types/user";
import { mockAuthData, transactionsMock } from '../data/auth.mock';
import { sortTransactionsByDate } from '../utils/utils';

// 1. Tipagem atualizada para permitir o estado inicial null
type WalletDetail = {
  account: Account | null;
  refresh: () => void;
  transfer: (amount: number, recipient: string) => void;
  getBalance: () => number;
  reset: () => void;
};

const useWalletStore = create<WalletDetail>()(
  persist(
    (set, get) => ({
      account: null,

      refresh: () => {
        set((state) => ({
          account: state.account,
        }));
      },
      reset: () => {
        const totalBalance = transactionsMock.reduce((acc, txn) => {
          return txn.type === "income" ? acc + txn.amount : acc - txn.amount;
        }, 0);
        set(() => ({
          account: {
            ...mockAuthData.account,
            wallet: {
              ...mockAuthData.account.wallet,
              balance: totalBalance,
            },
            history: {
              transactions: sortTransactionsByDate(transactionsMock),
            },
          },
        }));
        
      },

      transfer: async (amount, recipient) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            try {
              // Lógica de transferência simulada
              set((state) => {
                if (!state.account) {
                  throw new Error("No account found");
                }

                const newBalance = state.account.wallet.balance - amount;

                if (newBalance < 0) {
                  throw new Error("Insufficient funds");
                }

                return {
                  account: {
                    ...state.account,
                    wallet: {
                      ...state.account.wallet,
                      balance: newBalance,
                    },
                    history: {
                      ...state.account.history,
                      transactions: [
                        ...state.account.history.transactions,
                        {
                          id: `txn${Date.now()}`,
                          amount,
                          date: new Date().toISOString(),
                          type: "debit",
                          origin: recipient,
                          description: `Transfer to ${recipient}`,
                        },
                      ],
                    },
                  },
                };
              });
              get().refresh();
              resolve();
            } catch (error) {
              reject(error);
            }
          }, 1000);
        });
      },
      getBalance: () => {
        const account = get().account;
        return account ? account.wallet.balance : 0;
      },
    }),
    { name: "kredix-wallet" },
  ),
);

export default useWalletStore;

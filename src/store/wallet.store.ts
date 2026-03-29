import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Account } from "../types/user";

// 1. Tipagem atualizada para permitir o estado inicial null
type WalletDetail = {
  account: Account | null;
  refresh: () => void;
  transfer: (amount: number, recipient: string) => void;
  getBalance: () => number;
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

      transfer: (amount, recipient) => {
        set((state) => {
          // Early return garante que o TypeScript saiba que state.account não é null daqui para baixo
          if (!state.account) return state;

          const newBalance = state.account.wallet.balance - amount;

          if (newBalance < 0) {
            // Dica arquitetural: Lançar um erro aqui pode quebrar a renderização se não for tratado na UI.
            // Pode ser interessante retornar o state intacto e lidar com o erro no componente,
            // ou ter um estado de erro global/toast.
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

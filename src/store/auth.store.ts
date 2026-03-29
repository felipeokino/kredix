import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockAuthData } from "../data/auth.mock";

type AuthState = {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    account: {
      wallet: {
        balance: number;
      };
      history: {
        transactions: Array<{
          id: string;
          amount: number;
          date: string;
          type: "credit" | "debit";
          origin: string;
          description?: string;
        }>;
      };
    };
  } | null;
  login: (userData: { email: string; password: string }) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (userData) => {
        // Fake API call - in a real app, you'd make an API request here
        if (
          userData.email === "felipe.o@example.com" &&
          userData.password === "123456"
        ) {
          set({ isAuthenticated: true, user: mockAuthData });
          return;
        }
        throw new Error("Invalid email or password");
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    { name: "kredix-auth" },
  ),
);
export default useAuthStore;

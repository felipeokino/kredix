import { redirect } from "react-router";
import { mockAuthData } from "../data/auth.mock";
import useAuthStore from "../store/auth.store";
import useWalletStore from "../store/wallet.store";

export const walletLoader = async () => {
  const { account } = useWalletStore.getState();
  const { logout } = useAuthStore.getState();

  if (account) {
    return account;
  }

  try {
    const data = mockAuthData.account;

    useWalletStore.getState().reset();
    return data;
  } catch (error) {
    console.error("Failed to load wallet data:", error);
    logout();
    return redirect("/login");
  }
};

import { Outlet, useNavigate } from "react-router";
import useAuthStore from "../../store/auth.store";
import { Sidebar } from "../custom/sidebar";
import { Button } from "../ui/button";

export const RootLayout = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <p className="text-kredix-text text-lg">Please log in to access the dashboard.</p>
        <Button onClick={() => navigate('login', { replace: true })}>Log In</Button>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );

}
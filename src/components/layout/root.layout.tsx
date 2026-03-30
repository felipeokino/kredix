import { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router";
import useAuthStore from "../../store/auth.store";
import { Loading } from '../custom/loading';
import { Sidebar } from "../custom/sidebar";
import { Toaster } from '../ui/sonner';
import { TooltipProvider } from '../ui/tooltip';

export const RootLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Loading  />
  }



  return (
    <div className="flex max-lg:flex-col h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );

}
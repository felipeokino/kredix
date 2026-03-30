import logoMini from '@/assets/logo-mini.png';
import vault from '@/assets/vault.jpg';
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuthStore from "../../store/auth.store";
export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="grid grid-cols-3 max-md:grid-cols-1 h-screen">
      <div className="col-span-2 bg-neutral-600 max-md:hidden flex items-center justify-center max-h-screen relative">
        <div className='absolute bottom-0 left-0 w-full h-full backdrop-blur-sm backdrop-brightness-50'></div>
        <img src={vault} alt="Vault" className='object-cover w-full h-full' />
        <div className="absolute top-0 left-0 w-full flex items-center justify-start">
          <img src={logoMini} alt="Kredix Logo" className="w-32" />
          <span className="text-white text-4xl font-bold">KREDIX</span>
        </div>
      </div>
      <div className="col-span-1">
        <Outlet />
      </div>
    </div>
  )
}
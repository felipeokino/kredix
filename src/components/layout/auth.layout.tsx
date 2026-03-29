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
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 bg-neutral-600">

      </div>
      <div className="col-span-1">
        <Outlet />
      </div>
    </div>
  )
}
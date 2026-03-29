import { Outlet } from "react-router";

export default function AuthLayout() {
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
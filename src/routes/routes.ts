import { lazy } from 'react';
import { createBrowserRouter } from "react-router";
import AuthLayout from "../components/layout/auth.layout";
import { RootLayout } from "../components/layout/root.layout";
import { walletLoader } from "../loaders/wallet.loader";
const Login = lazy(() => import('@/pages/Auth/login.page'));
const Home = lazy(() => import('@/pages/Home/home.page'))
const Admin = lazy(() => import('@/pages/Admin/admin.page'))
export const router = createBrowserRouter([
  {
    path: "login",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
    ],
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home, loader: walletLoader },
      { path: "admin", Component: Admin, loader: walletLoader },
    ],
  },
]);

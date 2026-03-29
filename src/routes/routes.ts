import { createBrowserRouter } from "react-router";
import AuthLayout from "../components/layout/auth.layout";
import { RootLayout } from "../components/layout/Root.layout";
import Login from "../pages/Auth/login.page";
import Home from "../pages/Home/home.page";

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
    children: [{ index: true, Component: Home }],
  },
]);

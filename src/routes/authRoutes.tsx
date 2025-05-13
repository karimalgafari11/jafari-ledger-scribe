
import React from "react";
import { RouteObject } from "react-router-dom";
import { PublicRoute } from "@/components/auth/PublicRoute";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";

export const authRoutes: RouteObject[] = [
  {
    path: "auth/login",
    element: <PublicRoute><LoginPage /></PublicRoute>,
  },
  {
    path: "auth/register",
    element: <PublicRoute><RegisterPage /></PublicRoute>,
  },
  {
    path: "auth/forgot-password",
    element: <PublicRoute><ForgotPasswordPage /></PublicRoute>,
  },
  {
    path: "auth/update-password",
    element: <PublicRoute><UpdatePasswordPage /></PublicRoute>,
  },
];

export default authRoutes;

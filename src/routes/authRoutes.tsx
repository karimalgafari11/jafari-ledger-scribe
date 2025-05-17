
import React from "react";
import { RouteObject } from "react-router-dom";
import { PublicRoute } from "@/components/auth/PublicRoute";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import { AppWithErrorHandling } from "@/AppWithErrorHandling";

export const authRoutes: RouteObject[] = [
  {
    path: "auth/login",
    element: <AppWithErrorHandling><PublicRoute><LoginPage /></PublicRoute></AppWithErrorHandling>,
  },
  {
    path: "auth/register",
    element: <AppWithErrorHandling><PublicRoute><RegisterPage /></PublicRoute></AppWithErrorHandling>,
  },
  {
    path: "auth/forgot-password",
    element: <AppWithErrorHandling><PublicRoute><ForgotPasswordPage /></PublicRoute></AppWithErrorHandling>,
  },
  {
    path: "auth/reset-password",
    element: <AppWithErrorHandling><PublicRoute><ResetPasswordPage /></PublicRoute></AppWithErrorHandling>,
  },
  {
    path: "auth/update-password",
    element: <AppWithErrorHandling><PublicRoute><UpdatePasswordPage /></PublicRoute></AppWithErrorHandling>,
  },
];

export default authRoutes;


import React from "react";
import { RouteObject } from "react-router-dom";
import { PublicRoute } from "@/components/auth/PublicRoute";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import { AppWithErrorHandling } from "@/AppWithErrorHandling";
import StabilityWrapper from "@/components/StabilityWrapper";

export const authRoutes: RouteObject[] = [
  {
    path: "auth/login",
    element: (
      <AppWithErrorHandling>
        <PublicRoute>
          <StabilityWrapper componentName="صفحة تسجيل الدخول" maxRetries={2}>
            <LoginPage />
          </StabilityWrapper>
        </PublicRoute>
      </AppWithErrorHandling>
    ),
  },
  {
    path: "auth/register",
    element: (
      <AppWithErrorHandling>
        <PublicRoute>
          <StabilityWrapper componentName="صفحة التسجيل" maxRetries={2}>
            <RegisterPage />
          </StabilityWrapper>
        </PublicRoute>
      </AppWithErrorHandling>
    ),
  },
  {
    path: "auth/forgot-password",
    element: (
      <AppWithErrorHandling>
        <PublicRoute>
          <StabilityWrapper componentName="صفحة نسيت كلمة المرور" maxRetries={2}>
            <ForgotPasswordPage />
          </StabilityWrapper>
        </PublicRoute>
      </AppWithErrorHandling>
    ),
  },
  {
    path: "auth/reset-password",
    element: (
      <AppWithErrorHandling>
        <PublicRoute>
          <StabilityWrapper componentName="صفحة إعادة تعيين كلمة المرور" maxRetries={2}>
            <ResetPasswordPage />
          </StabilityWrapper>
        </PublicRoute>
      </AppWithErrorHandling>
    ),
  },
  {
    path: "auth/update-password",
    element: (
      <AppWithErrorHandling>
        <PublicRoute>
          <StabilityWrapper componentName="صفحة تحديث كلمة المرور" maxRetries={2}>
            <UpdatePasswordPage />
          </StabilityWrapper>
        </PublicRoute>
      </AppWithErrorHandling>
    ),
  },
];

export default authRoutes;

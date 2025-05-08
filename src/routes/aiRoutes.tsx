
import { RouteObject } from "react-router-dom";
import AiAssistantPage from "@/pages/ai/AiAssistantPage";
import AiDashboardPage from "@/pages/ai/AiDashboardPage";
import AiSettingsPage from "@/pages/ai/AiSettingsPage";
import FinancialDecisionsPage from "@/pages/ai/FinancialDecisionsPage";
import AiAssistantModulePage from "@/pages/ai/AiAssistantModulePage";
import FinancialForecastPage from "@/pages/ai/FinancialForecastPage";

export const aiRoutes: RouteObject[] = [
  {
    path: "ai/assistant",
    element: <AiAssistantPage />,
  },
  {
    path: "ai/dashboard",
    element: <AiDashboardPage />,
  },
  {
    path: "ai/settings",
    element: <AiSettingsPage />,
  },
  {
    path: "ai/financial-decisions",
    element: <FinancialDecisionsPage />,
  },
  {
    path: "ai/assistant-module",
    element: <AiAssistantModulePage />,
  },
  {
    path: "ai/financial-forecast",
    element: <FinancialForecastPage />,
  }
];


import { RouteObject } from "react-router-dom";
import AiAssistantPage from "@/pages/ai/AiAssistantPage";
import FinancialDecisionsPage from "@/pages/ai/FinancialDecisionsPage";
import AiSettingsPage from "@/pages/ai/AiSettingsPage";
import AiDashboardPage from "@/pages/ai/AiDashboardPage";

export const aiRoutes: RouteObject[] = [
  { path: "ai", element: <AiDashboardPage /> },
  { path: "ai/assistant", element: <AiAssistantPage /> },
  { path: "ai/financial-decisions", element: <FinancialDecisionsPage /> },
  { path: "ai/settings", element: <AiSettingsPage /> }
];

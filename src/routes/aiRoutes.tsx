
import { RouteObject } from "react-router-dom";
import AiAssistantPage from "@/pages/ai/AiAssistantPage";
import FinancialDecisionsPage from "@/pages/ai/FinancialDecisionsPage";

export const aiRoutes: RouteObject[] = [
  { path: "ai/assistant", element: <AiAssistantPage /> },
  { path: "ai/financial-decisions", element: <FinancialDecisionsPage /> }
];

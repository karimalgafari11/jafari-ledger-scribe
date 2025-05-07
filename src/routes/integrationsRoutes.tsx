
import { RouteObject } from "react-router-dom";
import ExternalSystemsPage from "@/pages/integrations/ExternalSystemsPage";
import ApiDocsPage from "@/pages/integrations/ApiDocsPage";

export const integrationsRoutes: RouteObject[] = [
  { path: "integrations/external", element: <ExternalSystemsPage /> },
  { path: "settings/integrations", element: <ExternalSystemsPage /> },
  { path: "integrations/api-docs", element: <ApiDocsPage /> }
];

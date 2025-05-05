
import { RouteObject } from "react-router-dom";
import ExternalSystemsPage from "@/pages/integrations/ExternalSystemsPage";

export const integrationsRoutes: RouteObject[] = [
  { path: "integrations/external", element: <ExternalSystemsPage /> }
];

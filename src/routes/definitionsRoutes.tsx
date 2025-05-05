
import { RouteObject } from "react-router-dom";
import BasicDefinitionsPage from "@/pages/definitions/BasicDefinitionsPage";
import CurrenciesPage from "@/pages/definitions/CurrenciesPage";
import DiscountsPage from "@/pages/definitions/DiscountsPage";

export const definitionsRoutes: RouteObject[] = [
  { path: "definitions/basic", element: <BasicDefinitionsPage /> },
  { path: "definitions/currencies", element: <CurrenciesPage /> },
  { path: "definitions/discounts", element: <DiscountsPage /> }
];

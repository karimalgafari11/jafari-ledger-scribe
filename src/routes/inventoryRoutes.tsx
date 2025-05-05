
import { RouteObject } from "react-router-dom";
import ProductsPage from "@/pages/inventory/ProductsPage";
import ReorderPage from "@/pages/inventory/ReorderPage";
import CountingPage from "@/pages/inventory/CountingPage";
import StockMovementsPage from "@/pages/inventory/StockMovementsPage";

export const inventoryRoutes: RouteObject[] = [
  { path: "inventory/products", element: <ProductsPage /> },
  { path: "inventory/reorder", element: <ReorderPage /> },
  { path: "inventory/counting", element: <CountingPage /> },
  { path: "inventory/movements", element: <StockMovementsPage /> }
];

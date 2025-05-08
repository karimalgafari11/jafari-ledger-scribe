
import { RouteObject } from "react-router-dom";
import ProductsPage from "@/pages/inventory/ProductsPage";
import StockMovementsPage from "@/pages/inventory/StockMovementsPage";
import CountingPage from "@/pages/inventory/CountingPage";
import ReorderPage from "@/pages/inventory/ReorderPage";
import ReorderModulePage from "@/pages/inventory/ReorderModulePage";
import InventoryCostingPage from "@/pages/inventory/InventoryCostingPage";

export const inventoryRoutes: RouteObject[] = [
  {
    path: "inventory/products",
    element: <ProductsPage />,
  },
  {
    path: "inventory/movements",
    element: <StockMovementsPage />,
  },
  {
    path: "inventory/counting",
    element: <CountingPage />,
  },
  {
    path: "inventory/reorder",
    element: <ReorderPage />,
  },
  {
    path: "inventory/reorder-module",
    element: <ReorderModulePage />,
  },
  {
    path: "inventory/costing",
    element: <InventoryCostingPage />,
  }
];

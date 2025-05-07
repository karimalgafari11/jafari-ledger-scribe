
import { RouteObject } from "react-router-dom";
import LocationsPage from "@/pages/inventory-control/LocationsPage";
import DamagedItemsPage from "@/pages/inventory-control/DamagedItemsPage";
import TransferPage from "@/pages/inventory-control/TransferPage";
import TransferModulePage from "@/pages/inventory-control/TransferModulePage";

export const inventoryControlRoutes: RouteObject[] = [
  {
    path: "inventory-control/locations",
    element: <LocationsPage />,
  },
  {
    path: "inventory-control/damaged",
    element: <DamagedItemsPage />,
  },
  {
    path: "inventory-control/transfer",
    element: <TransferPage />,
  },
  {
    path: "inventory-control/transfer-module",
    element: <TransferModulePage />,
  }
];


import { RouteObject } from "react-router-dom";
import DamagedItemsPage from "@/pages/inventory-control/DamagedItemsPage";
import LocationsPage from "@/pages/inventory-control/LocationsPage";
import TransferPage from "@/pages/inventory-control/TransferPage";

export const inventoryControlRoutes: RouteObject[] = [
  { path: "inventory-control/damaged", element: <DamagedItemsPage /> },
  { path: "inventory-control/locations", element: <LocationsPage /> },
  { path: "inventory-control/transfer", element: <TransferPage /> }
];


import { Report } from "@/types/custom-reports";
import { financialReports } from "./financial";
import { salesReports } from "./sales";
import { inventoryReports } from "./inventory";
import { inventoryControlReports } from "./inventory-control";

// Export individual report categories
export { financialReports, salesReports, inventoryReports, inventoryControlReports };

// Export combined reports as allReports
export const allReports: Report[] = [
  ...financialReports,
  ...salesReports,
  ...inventoryReports,
  ...inventoryControlReports
];

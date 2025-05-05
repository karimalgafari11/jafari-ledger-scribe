
import { MenuItem } from "./types";
import { dashboardItems } from "./dashboardItems";
import { reportItems } from "./reportItems";
import { expenseItems } from "./expenseItems";
import { invoiceItems } from "./invoiceItems";
import { accountingItems } from "./accountingItems";
import { customerItems } from "./customerItems";
import { vendorItems } from "./vendorItems";
import { purchaseItems } from "./purchaseItems";
import { paymentItems } from "./paymentItems";
import { inventoryItems } from "./inventoryItems";
import { aiItems } from "./aiItems";
import { definitionItems } from "./definitionItems";
import { settingsItems } from "./settingsItems";
import { aboutItems } from "./aboutItems";

export const menuItems: MenuItem[] = [
  ...dashboardItems,
  ...reportItems,
  ...expenseItems,
  ...invoiceItems,
  ...accountingItems,
  ...customerItems,
  ...vendorItems,
  ...purchaseItems,
  ...paymentItems,
  ...inventoryItems,
  ...aiItems,
  ...definitionItems,
  ...settingsItems,
  ...aboutItems
];

export * from "./types";

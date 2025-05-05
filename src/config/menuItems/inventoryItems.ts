
import { 
  Package, 
  CalendarClock, 
  CheckCircle2, 
  CaseSensitive, 
  FolderKanban, 
  Zap, 
  Store, 
  AlertTriangle 
} from "lucide-react";
import { MenuItem } from "./types";

export const inventoryItems: MenuItem[] = [
  {
    section: "المخزون",
    icon: Package,
    children: [
      {
        label: "المنتجات",
        path: "/inventory/products",
        icon: Package,
      },
      {
        label: "حركة المخزون",
        path: "/inventory/movements",
        icon: CalendarClock,
      },
      {
        label: "الجرد",
        path: "/inventory/counting",
        icon: CheckCircle2,
      },
      {
        label: "إعادة الطلب",
        path: "/inventory/reorder",
        icon: CaseSensitive,
      },
    ],
  },
  {
    section: "التحكم بالمخزون",
    icon: FolderKanban,
    children: [
      {
        label: "التحويل",
        path: "/inventory-control/transfer",
        icon: Zap,
      },
      {
        label: "المواقع",
        path: "/inventory-control/locations",
        icon: Store,
      },
      {
        label: "الأصناف التالفة",
        path: "/inventory-control/damaged",
        icon: AlertTriangle,
      },
    ],
  },
];


import { Settings, CaseSensitive, Coins, Percent } from "lucide-react";
import { MenuItem } from "./types";

export const definitionItems: MenuItem[] = [
  {
    section: "التعاريف",
    icon: Settings,
    children: [
      {
        label: "التعاريف الأساسية",
        path: "/definitions",
        icon: CaseSensitive,
      },
      {
        label: "العملات",
        path: "/definitions/currencies",
        icon: Coins,
      },
      {
        label: "الخصومات",
        path: "/definitions/discounts",
        icon: Percent,
      },
    ],
  },
];


import { Network, User } from "lucide-react";
import { MenuItem } from "./types";

export const vendorItems: MenuItem[] = [
  {
    section: "الموردين",
    icon: Network,
    children: [
      {
        label: "إدارة الموردين",
        path: "/vendors/manage",
        icon: User,
      },
    ],
  },
];

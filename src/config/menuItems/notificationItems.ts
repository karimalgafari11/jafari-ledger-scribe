
import { Bell } from "lucide-react";
import { MenuItem } from "./types";

export const notificationItems: MenuItem[] = [
  {
    section: "الإشعارات",
    icon: Bell,
    children: [
      {
        label: "عرض الإشعارات",
        path: "/notifications",
        icon: Bell,
        description: "عرض وإدارة جميع الإشعارات"
      }
    ],
  },
];


import { Zap } from "lucide-react";
import { MenuItem } from "./types";

export const aiItems: MenuItem[] = [
  {
    section: "الذكاء الاصطناعي",
    icon: Zap,
    children: [
      {
        label: "مساعد الذكاء الاصطناعي",
        path: "/ai-assistant",
        icon: Zap,
      },
      {
        label: "قرارات مالية",
        path: "/ai-financial-decisions",
        icon: Zap,
      },
    ],
  },
];


import { Zap, Bot, Brain, LineChart } from "lucide-react";
import { MenuItem } from "./types";

export const aiItems: MenuItem[] = [
  {
    section: "الذكاء الاصطناعي",
    icon: Brain,
    children: [
      {
        label: "لوحة تحكم الذكاء الاصطناعي",
        path: "/ai",
        icon: Zap,
      },
      {
        label: "مساعد الذكاء الاصطناعي",
        path: "/ai/assistant",
        icon: Bot,
      },
      {
        label: "قرارات مالية",
        path: "/ai/financial-decisions",
        icon: LineChart,
      },
      {
        label: "إعدادات الذكاء الاصطناعي",
        path: "/ai/settings",
        icon: Brain,
      },
    ],
  },
];

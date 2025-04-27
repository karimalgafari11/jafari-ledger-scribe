
import { Account } from "@/types/accounts";

export const revenueAccounts: Account[] = [
  {
    id: "acc-8",
    name: "الإيرادات",
    number: "4000",
    type: "revenue",
    balance: 0,
    parentId: null,
    level: 1,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-17",
    name: "إيرادات النشاط الرئيسي",
    number: "4100",
    type: "revenue",
    balance: 450000,
    parentId: "acc-8",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-18",
    name: "إيرادات الاستثمار",
    number: "4200",
    type: "revenue",
    balance: 75000,
    parentId: "acc-8",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-19",
    name: "إيرادات أخرى",
    number: "4300",
    type: "revenue",
    balance: 25000,
    parentId: "acc-8",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  }
];

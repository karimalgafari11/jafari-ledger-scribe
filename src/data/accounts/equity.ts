
import { Account } from "@/types/accounts";

export const equityAccounts: Account[] = [
  {
    id: "acc-7",
    name: "حقوق الملكية",
    number: "3000",
    type: "equity",
    balance: 0,
    parentId: null,
    level: 1,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-14",
    name: "رأس المال",
    number: "3100",
    type: "equity",
    balance: 500000,
    parentId: "acc-7",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-15",
    name: "الاحتياطيات",
    number: "3200",
    type: "equity",
    balance: 100000,
    parentId: "acc-7",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-16",
    name: "الأرباح المحتجزة",
    number: "3300",
    type: "equity",
    balance: 250000,
    parentId: "acc-7",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  }
];

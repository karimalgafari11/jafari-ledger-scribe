
import { Account } from "@/types/accounts";

export const expenseAccounts: Account[] = [
  {
    id: "acc-9",
    name: "المصروفات",
    number: "5000",
    type: "expense",
    balance: 0,
    parentId: null,
    level: 1,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-10",
    name: "مصروفات إدارية",
    number: "5100",
    type: "expense",
    balance: 15000,
    parentId: "acc-9",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  }
];

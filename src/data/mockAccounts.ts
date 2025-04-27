
import { Account } from "@/types/accounts";

export const mockAccounts: Account[] = [
  {
    id: "acc-1",
    name: "الأصول",
    number: "1000",
    type: "asset",
    balance: 0,
    parentId: null,
    level: 1,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-2",
    name: "النقدية",
    number: "1100",
    type: "asset",
    balance: 25000,
    parentId: "acc-1",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-3",
    name: "حسابات البنوك",
    number: "1200",
    type: "asset",
    balance: 150000,
    parentId: "acc-1",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-4",
    name: "بنك الراجحي",
    number: "1201",
    type: "asset",
    balance: 100000,
    parentId: "acc-3",
    level: 3,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-5",
    name: "بنك الأهلي",
    number: "1202",
    type: "asset",
    balance: 50000,
    parentId: "acc-3",
    level: 3,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-6",
    name: "الالتزامات",
    number: "2000",
    type: "liability",
    balance: 0,
    parentId: null,
    level: 1,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
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

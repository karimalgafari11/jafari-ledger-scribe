
import { Account } from "@/types/accounts";

export const liabilityAccounts: Account[] = [
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
    id: "acc-11",
    name: "حسابات الدائنين",
    number: "2100",
    type: "liability",
    balance: 75000,
    parentId: "acc-6",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-12",
    name: "القروض",
    number: "2200",
    type: "liability",
    balance: 150000,
    parentId: "acc-6",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "acc-13",
    name: "الالتزامات المستحقة",
    number: "2300",
    type: "liability",
    balance: 25000,
    parentId: "acc-6",
    level: 2,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  }
];

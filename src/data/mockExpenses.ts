
import { Expense, ExpenseCategory } from "@/types/expenses";

export const mockExpenseCategories: ExpenseCategory[] = [
  {
    id: "1",
    name: "مشتريات قطع غيار",
    description: "مشتريات قطع غيار السيارات من الموردين",
    budgetLimit: 50000,
    isActive: true
  },
  {
    id: "2",
    name: "رواتب",
    description: "رواتب الموظفين الشهرية",
    budgetLimit: 30000,
    isActive: true
  },
  {
    id: "3",
    name: "إيجارات",
    description: "إيجارات المحلات والمستودعات",
    budgetLimit: 15000,
    isActive: true
  },
  {
    id: "4",
    name: "مرافق",
    description: "فواتير الكهرباء والماء والإنترنت",
    budgetLimit: 5000,
    isActive: true
  },
  {
    id: "5",
    name: "صيانة",
    description: "صيانة المعدات والمباني",
    budgetLimit: 10000,
    isActive: true
  }
];

export const mockExpenses: Expense[] = [
  {
    id: "1",
    date: new Date(2025, 3, 15),
    category: "مشتريات قطع غيار",
    amount: 12500,
    description: "شراء دفعة قطع غيار من المورد الرئيسي",
    paymentMethod: "bank",
    status: "approved",
    notes: "تم استلام البضاعة بالكامل"
  },
  {
    id: "2",
    date: new Date(2025, 3, 1),
    category: "رواتب",
    amount: 28000,
    description: "رواتب شهر أبريل",
    paymentMethod: "bank",
    status: "approved",
    notes: "تم تحويل جميع الرواتب"
  },
  {
    id: "3",
    date: new Date(2025, 3, 5),
    category: "إيجارات",
    amount: 15000,
    description: "إيجار المستودع الرئيسي",
    paymentMethod: "bank",
    status: "pending",
    notes: "في انتظار موافقة المدير"
  }
];

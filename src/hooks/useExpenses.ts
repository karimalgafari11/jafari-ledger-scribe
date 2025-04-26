
import { useState } from "react";
import { Expense, ExpenseCategory } from "@/types/expenses";
import { mockExpenses, mockExpenseCategories } from "@/data/mockExpenses";
import { toast } from "sonner";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [categories, setCategories] = useState<ExpenseCategory[]>(mockExpenseCategories);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // إضافة مصروف جديد
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: `exp-${Date.now()}`,
    };
    
    setExpenses([newExpense, ...expenses]);
    toast.success("تم إضافة المصروف بنجاح");
    return newExpense;
  };

  // تعديل مصروف
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setSelectedExpense(null);
    setIsEditing(false);
    toast.success("تم تعديل المصروف بنجاح");
  };

  // حذف مصروف
  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    toast.success("تم حذف المصروف بنجاح");
  };

  // إضافة تصنيف مصروفات جديد
  const addCategory = (category: Omit<ExpenseCategory, "id">) => {
    const newCategory: ExpenseCategory = {
      ...category,
      id: `cat-${Date.now()}`,
    };
    
    setCategories([...categories, newCategory]);
    toast.success("تم إضافة التصنيف بنجاح");
    return newCategory;
  };

  // تعديل تصنيف مصروفات
  const updateCategory = (updatedCategory: ExpenseCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    toast.success("تم تعديل التصنيف بنجاح");
  };

  // حذف تصنيف مصروفات
  const deleteCategory = (id: string) => {
    // التحقق من عدم وجود مصروفات تستخدم هذا التصنيف
    const hasExpenses = expenses.some(expense => expense.category === 
      categories.find(cat => cat.id === id)?.name);
    
    if (hasExpenses) {
      toast.error("لا يمكن حذف التصنيف لأنه مستخدم في بعض المصروفات");
      return false;
    }
    
    setCategories(categories.filter((category) => category.id !== id));
    toast.success("تم حذف التصنيف بنجاح");
    return true;
  };

  // التصفية حسب الفترة
  const filterExpensesByPeriod = (startDate: Date, endDate: Date) => {
    return expenses.filter(
      (expense) => expense.date >= startDate && expense.date <= endDate
    );
  };

  // التصفية حسب التصنيف
  const filterExpensesByCategory = (categoryName: string) => {
    return expenses.filter((expense) => expense.category === categoryName);
  };

  // حساب إجمالي المصروفات
  const calculateTotalExpenses = (filteredExpenses: Expense[] = expenses) => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // حساب إجمالي المصروفات حسب التصنيف
  const calculateExpensesByCategory = () => {
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    
    return categoryTotals;
  };

  return {
    expenses,
    categories,
    selectedExpense,
    setSelectedExpense,
    isEditing,
    setIsEditing,
    addExpense,
    updateExpense,
    deleteExpense,
    addCategory,
    updateCategory,
    deleteCategory,
    filterExpensesByPeriod,
    filterExpensesByCategory,
    calculateTotalExpenses,
    calculateExpensesByCategory,
  };
};

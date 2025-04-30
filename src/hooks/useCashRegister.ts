
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { CashRegister, Currency } from "@/types/definitions";
import { toast } from "sonner";

// بيانات تجريبية لصناديق النقدية
const initialCashRegisters: CashRegister[] = [
  {
    id: uuid(),
    code: "CR001",
    name: "الصندوق الرئيسي - الرياض",
    branchId: "1",
    branchName: "الفرع الرئيسي",
    currencyId: "1",
    currencyCode: "SAR",
    balance: 10000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuid(),
    code: "CR002",
    name: "صندوق المبيعات - الرياض",
    branchId: "1",
    branchName: "الفرع الرئيسي",
    currencyId: "1",
    currencyCode: "SAR",
    balance: 5000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const useCashRegister = () => {
  const [cashRegisters, setCashRegisters] = useState<CashRegister[]>(initialCashRegisters);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRegister, setSelectedRegister] = useState<CashRegister | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // البحث في الصناديق
  const filteredRegisters = cashRegisters.filter(
    (register) =>
      register.name.includes(searchTerm) ||
      register.code.includes(searchTerm) ||
      register.branchName.includes(searchTerm)
  );

  // إضافة صندوق جديد
  const createRegister = (register: Omit<CashRegister, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true);
    setTimeout(() => {
      const newRegister: CashRegister = {
        ...register,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCashRegisters([...cashRegisters, newRegister]);
      toast.success("تم إضافة الصندوق بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  // تعديل صندوق
  const updateRegister = (id: string, updates: Partial<CashRegister>) => {
    setIsLoading(true);
    setTimeout(() => {
      setCashRegisters(
        cashRegisters.map((register) =>
          register.id === id
            ? { ...register, ...updates, updatedAt: new Date() }
            : register
        )
      );
      toast.success("تم تحديث بيانات الصندوق بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  // حذف صندوق
  const deleteRegister = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCashRegisters(cashRegisters.filter((register) => register.id !== id));
      toast.success("تم حذف الصندوق بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  // إيداع أو سحب من الصندوق
  const registerTransaction = (id: string, amount: number, isDeposit: boolean) => {
    setIsLoading(true);
    setTimeout(() => {
      setCashRegisters(
        cashRegisters.map((register) => {
          if (register.id === id) {
            const newBalance = isDeposit
              ? register.balance + amount
              : register.balance - amount;
            
            if (!isDeposit && newBalance < 0) {
              toast.error("لا يوجد رصيد كافٍ في الصندوق");
              return register;
            }
            
            toast.success(`تم ${isDeposit ? "إيداع" : "سحب"} المبلغ بنجاح`);
            return {
              ...register,
              balance: newBalance,
              updatedAt: new Date(),
            };
          }
          return register;
        })
      );
      setIsLoading(false);
    }, 500);
    return true;
  };

  return {
    cashRegisters,
    filteredRegisters,
    isLoading,
    selectedRegister,
    setSelectedRegister,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    searchTerm,
    setSearchTerm,
    createRegister,
    updateRegister,
    deleteRegister,
    registerTransaction,
  };
};

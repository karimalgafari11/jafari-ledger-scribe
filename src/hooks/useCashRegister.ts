
import { useState, useEffect } from "react";
import { CashRegister } from "@/types/definitions";
import { v4 as uuidv4 } from "uuid";

// Sample data for development purposes
const initialCashRegisters: CashRegister[] = [
  {
    id: "1",
    code: "CR001",
    name: "صندوق المبيعات الرئيسي",
    branchId: "1",
    branchName: "الفرع الرئيسي",
    currency: "ريال",
    currencyId: "1",
    currencyCode: "ريال",
    balance: 5000,
    isActive: true,
    userId: "1"
  },
  {
    id: "2",
    code: "CR002",
    name: "صندوق المشتريات",
    branchId: "1",
    branchName: "الفرع الرئيسي",
    currency: "ريال",
    currencyId: "1",
    currencyCode: "ريال",
    balance: 2500,
    isActive: true,
    userId: "2"
  },
  {
    id: "3",
    code: "CR003",
    name: "صندوق فرع الشمال",
    branchId: "2",
    branchName: "فرع الشمال",
    currency: "ريال",
    currencyId: "1",
    currencyCode: "ريال",
    balance: 3000,
    isActive: false,
    userId: "1"
  },
];

export const useCashRegister = () => {
  const [cashRegisters, setCashRegisters] = useState<CashRegister[]>(initialCashRegisters);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRegister, setSelectedRegister] = useState<CashRegister | null>(null);

  // Filter cash registers based on search term
  const filteredRegisters = cashRegisters.filter(
    (register) =>
      register.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      register.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      register.branchName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate a new cash register code
  const generateCashRegisterCode = () => {
    const lastCode = cashRegisters.reduce((max, register) => {
      const codeNum = parseInt(register.code.replace(/\D/g, ""), 10);
      return codeNum > max ? codeNum : max;
    }, 0);
    return `CR${(lastCode + 1).toString().padStart(3, "0")}`;
  };

  // CRUD operations
  const createCashRegister = (data: Omit<CashRegister, "id">) => {
    const newRegister: CashRegister = {
      id: uuidv4(),
      ...data
    };
    setCashRegisters((prev) => [...prev, newRegister]);
  };

  const updateCashRegister = (id: string, data: Partial<CashRegister>) => {
    setCashRegisters((prev) =>
      prev.map((register) =>
        register.id === id
          ? { ...register, ...data }
          : register
      )
    );
  };

  const deleteCashRegister = (id: string) => {
    setCashRegisters((prev) => prev.filter((register) => register.id !== id));
  };

  const toggleCashRegisterStatus = (id: string) => {
    setCashRegisters((prev) =>
      prev.map((register) =>
        register.id === id
          ? { ...register, isActive: !register.isActive }
          : register
      )
    );
  };

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return {
    cashRegisters,
    filteredRegisters,
    isLoading,
    searchTerm,
    setSearchTerm,
    createCashRegister,
    updateCashRegister,
    deleteCashRegister,
    toggleCashRegisterStatus,
    selectedRegister,
    setSelectedRegister,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    generateCashRegisterCode,
  };
};

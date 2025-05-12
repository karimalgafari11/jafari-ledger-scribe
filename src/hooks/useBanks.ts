
import { useState } from "react";
import { Bank } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية للبنوك
const initialBanks: Bank[] = [
  {
    id: uuid(),
    name: "البنك الأهلي التجاري",
    code: "NCB",
    branch: "الفرع الرئيسي",
    accountNumber: "1234567890",
    accountId: "110101",
    swiftCode: "NCBKSAJE",
    iban: "SA4410000001234567890123",
    currency: "SAR",
    isActive: true,
  },
  {
    id: uuid(),
    name: "مصرف الراجحي",
    code: "RAJ",
    branch: "فرع العليا",
    accountNumber: "9876543210",
    accountId: "110102",
    swiftCode: "RJHISARI",
    iban: "SA5380000000987654321012",
    currency: "SAR",
    isActive: true,
  },
  {
    id: uuid(),
    name: "بنك الإمارات دبي الوطني",
    code: "EMB",
    branch: "فرع دبي",
    accountNumber: "5555666677",
    accountId: "110103",
    swiftCode: "EBILAEAD",
    iban: "AE123456789012345678901",
    currency: "AED",
    isActive: false,
  },
];

export const useBanks = () => {
  const [banks, setBanks] = useState<Bank[]>(initialBanks);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // البحث في البنوك
  const filteredBanks = banks.filter(
    (bank) =>
      bank.name.includes(searchTerm) ||
      (bank.branch && bank.branch.includes(searchTerm)) ||
      (bank.accountNumber && bank.accountNumber.includes(searchTerm)) ||
      (bank.currency && bank.currency.includes(searchTerm))
  );

  // إضافة بنك جديد
  const createBank = (bank: Omit<Bank, "id">) => {
    setIsLoading(true);
    setTimeout(() => {
      const newBank: Bank = {
        ...bank,
        id: uuid(),
      };
      setBanks([...banks, newBank]);
      setIsLoading(false);
      toast.success("تم إضافة البنك بنجاح");
    }, 500);
  };

  // تعديل بنك موجود
  const updateBank = (id: string, updates: Partial<Bank>) => {
    setIsLoading(true);
    setTimeout(() => {
      setBanks(
        banks.map((bank) =>
          bank.id === id
            ? { ...bank, ...updates }
            : bank
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث بيانات البنك بنجاح");
    }, 500);
  };

  // حذف بنك
  const deleteBank = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setBanks(banks.filter((bank) => bank.id !== id));
      setIsLoading(false);
      toast.success("تم حذف البنك بنجاح");
    }, 500);
  };

  // تفعيل/تعطيل بنك
  const toggleBankStatus = (id: string) => {
    setBanks(
      banks.map((bank) =>
        bank.id === id
          ? { ...bank, isActive: !bank.isActive }
          : bank
      )
    );
    toast.success("تم تغيير حالة البنك بنجاح");
  };

  return {
    banks,
    filteredBanks,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedBank,
    setSelectedBank,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createBank,
    updateBank,
    deleteBank,
    toggleBankStatus,
  };
};

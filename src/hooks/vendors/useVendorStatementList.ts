
import { useState, useMemo } from "react";
import { mockVendors } from "@/data/mockVendors";

// تحديد نوع البيانات لمورد
export interface Vendor {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  balance: number;
  currency: string;
  status: string;
  taxNumber?: string;
  createdAt: string;
  category?: string;
  creditLimit?: number;
  dueDate?: string | null;
  lastTransaction?: string;
  accountNumber?: string;  // Added property
}

export const useVendorStatementList = () => {
  // حالة البحث والفلترة
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [balanceFilter, setBalanceFilter] = useState<[number, number]>([0, 50000]);

  // الحصول على بيانات الموردين
  const vendors: Vendor[] = useMemo(() => {
    return mockVendors.map(vendor => ({
      ...vendor,
      balance: vendor.balance || 0,  // Ensure balance exists
      currency: vendor.currency || "SAR",  // Ensure currency exists
      createdAt: vendor.createdAt || new Date().toISOString(),  // Ensure createdAt exists
      lastTransaction: getRandomDate(),
      status: vendor.dueDate && new Date(vendor.dueDate) < new Date() ? "overdue" : "active"
    }));
  }, []);

  // تصفية الموردين بناءً على معايير البحث
  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor => {
      // فلترة بناءً على البحث
      const matchesSearch = searchTerm === "" || 
                           vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (vendor.phone && vendor.phone.includes(searchTerm));

      // فلترة بناءً على الحالة
      let matchesStatus = true;
      if (statusFilter === "active") {
        matchesStatus = vendor.status === "active";
      } else if (statusFilter === "overdue") {
        matchesStatus = vendor.status === "overdue";
      } else if (statusFilter === "zero") {
        matchesStatus = vendor.balance === 0;
      }

      // فلترة بناءً على الرصيد
      const matchesBalance = vendor.balance >= balanceFilter[0] && 
                            vendor.balance <= balanceFilter[1];

      return matchesSearch && matchesStatus && matchesBalance;
    });
  }, [vendors, searchTerm, statusFilter, balanceFilter]);

  // حساب الإحصائيات
  const totalVendors = filteredVendors.length;
  const totalBalance = filteredVendors.reduce((acc, vendor) => acc + vendor.balance, 0);
  const overDueVendors = filteredVendors.filter(v => v.status === "overdue").length;

  // وظيفة مساعدة لإنشاء تاريخ عشوائي للعرض فقط
  function getRandomDate(): string {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 30) + 1;
    const date = new Date(today);
    date.setDate(today.getDate() - daysAgo);
    return date.toLocaleDateString('ar-SA');
  }

  return {
    vendors,
    filteredVendors,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    balanceFilter,
    setBalanceFilter,
    totalVendors,
    totalBalance,
    overDueVendors
  };
};

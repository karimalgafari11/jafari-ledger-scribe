
import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";

// محاكاة بيانات الموردين الدائنين
const mockVendorsAccounts = [
  {
    id: "v-001",
    name: "شركة التوريدات العامة",
    accountNumber: "V10001",
    phone: "966512345678",
    balance: 25000,
    creditLimit: 50000,
    dueDate: "2023-11-15",
    status: "normal"
  },
  {
    id: "v-002",
    name: "مؤسسة المستلزمات الصناعية",
    accountNumber: "V10002",
    phone: "966556789012",
    balance: 35000,
    creditLimit: 40000,
    dueDate: "2023-10-30",
    status: "overdue"
  },
  {
    id: "v-003",
    name: "شركة الخليج للتجارة",
    accountNumber: "V10003",
    phone: "966501122334",
    balance: 15000,
    creditLimit: 30000,
    dueDate: "2023-11-20",
    status: "normal"
  },
  {
    id: "v-004",
    name: "مصنع المنتجات الكيميائية",
    accountNumber: "V10004",
    phone: "966543210987",
    balance: 42000,
    creditLimit: 45000,
    dueDate: "2023-10-25",
    status: "overdue"
  },
  {
    id: "v-005",
    name: "مؤسسة الخدمات اللوجستية",
    accountNumber: "V10005",
    phone: "966566778899",
    balance: 8000,
    creditLimit: 20000,
    dueDate: "2023-12-05",
    status: "normal"
  }
];

export const usePayablesAccounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, overdue, upcoming
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 100000]);

  // الحصول على قائمة الموردين الدائنين
  const allVendors = mockVendorsAccounts;

  // فلترة الموردين حسب معايير البحث
  const filteredVendors = allVendors.filter(vendor => {
    // فلترة حسب البحث
    const matchesSearch = !searchTerm ||
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm);

    // فلترة حسب الحالة
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "overdue" && vendor.status === "overdue") || 
      (statusFilter === "upcoming" && vendor.status === "normal");

    // فلترة حسب المبلغ
    const matchesAmount = vendor.balance >= amountRange[0] && 
      vendor.balance <= amountRange[1];

    return matchesSearch && matchesStatus && matchesAmount;
  });

  // إحصائيات عامة
  const totalPayables = filteredVendors.reduce((sum, vendor) => sum + vendor.balance, 0);
  const averagePayable = filteredVendors.length > 0 
    ? totalPayables / filteredVendors.length 
    : 0;
  const overDueCount = filteredVendors.filter(v => v.status === "overdue").length;

  return {
    vendors: filteredVendors,
    totalCount: filteredVendors.length,
    totalPayables,
    averagePayable,
    overDueCount,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    amountRange,
    setAmountRange
  };
};

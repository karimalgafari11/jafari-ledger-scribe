
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// استخدام بيانات الموردين المزيفة من useVendors
import { mockVendors } from "@/data/mockVendors";

export const usePayables = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, overdue, upcoming
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 100000]);
  
  // استخدام البيانات المزيفة للموردين للعرض
  const allVendors = mockVendors || [];

  // فلترة الموردين الذين لدينا عليهم ذمم
  const vendorsWithPayables = allVendors.filter(vendor => vendor.balance > 0);

  // فلترة الموردين حسب معايير البحث
  const filteredVendors = vendorsWithPayables.filter(vendor => {
    // فلترة حسب البحث
    const matchesSearch = !searchTerm ||
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vendor.email && vendor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vendor.phone && vendor.phone.includes(searchTerm));

    // فلترة حسب الحالة (حسب مبلغ المستحقات)
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "overdue" && vendor.balance > 5000) || 
      (statusFilter === "upcoming" && vendor.balance <= 5000);

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
  const overDueCount = filteredVendors.filter(v => v.balance > 5000).length;
  
  // الحد الأقصى للمبالغ المستحقة (للفلترة)
  const maxAmount = Math.max(...vendorsWithPayables.map(v => v.balance), 100000);

  // وظائف معالجة الأحداث
  const handleViewDetails = (vendor: any) => {
    toast.info(`عرض تفاصيل المورد: ${vendor.name}`);
  };

  const handleMakePayment = (vendor: any) => {
    navigate(`/payables/payment?vendorId=${vendor.id}`);
  };

  const handleViewStatement = (vendor: any) => {
    toast.info(`عرض كشف حساب المورد: ${vendor.name}`);
  };

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
    setAmountRange,
    maxAmount,
    handleViewDetails,
    handleMakePayment,
    handleViewStatement
  };
};

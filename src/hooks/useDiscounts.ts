
import { useState, useEffect } from "react";
import { Discount } from "@/types/definitions";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية للخصومات
const initialDiscounts: Discount[] = [
  {
    id: "1",
    code: "DIS-001",
    name: "خصم شهر رمضان",
    type: "percentage",
    value: 15,
    startDate: new Date(2025, 2, 1),
    endDate: new Date(2025, 3, 30),
    minimumAmount: 200,
    maximumAmount: 500,
    isActive: true,
  },
  {
    id: "2",
    code: "DIS-002",
    name: "خصم اليوم الوطني",
    type: "percentage",
    value: 10,
    startDate: new Date(2025, 8, 20),
    endDate: new Date(2025, 8, 25),
    minimumAmount: 100,
    isActive: true,
  },
  {
    id: "3",
    code: "DIS-003",
    name: "خصم ثابت للعملاء الجدد",
    type: "fixed",
    value: 50,
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 31),
    isActive: true,
  },
  {
    id: "4",
    code: "DIS-004",
    name: "خصم جميع المنتجات الإلكترونية",
    type: "percentage",
    value: 5,
    startDate: new Date(2025, 5, 1),
    endDate: new Date(2025, 5, 30),
    isActive: false,
    applicableCategories: ["electronics"],
  },
];

export const useDiscounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // فلترة الخصومات بناءً على مصطلح البحث وفلاتر الحالة والنوع
  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearchTerm =
      discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatusFilter =
      statusFilter === "all" ||
      (statusFilter === "active" && discount.isActive) ||
      (statusFilter === "inactive" && !discount.isActive);

    const matchesTypeFilter =
      typeFilter === "all" || discount.type === typeFilter;

    return matchesSearchTerm && matchesStatusFilter && matchesTypeFilter;
  });

  // مسح جميع الفلاتر
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
  };

  // إضافة خصم جديد
  const createDiscount = (discount: Omit<Discount, "id">) => {
    setIsLoading(true);
    setTimeout(() => {
      const newDiscount: Discount = {
        ...discount,
        id: uuidv4(),
      };

      setDiscounts([...discounts, newDiscount]);
      setIsLoading(false);
      toast.success("تم إضافة الخصم بنجاح");
    }, 500);
  };

  // تعديل خصم موجود
  const updateDiscount = (id: string, updates: Partial<Discount>) => {
    setIsLoading(true);
    setTimeout(() => {
      setDiscounts(
        discounts.map((discount) =>
          discount.id === id
            ? { ...discount, ...updates }
            : discount
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث بيانات الخصم بنجاح");
    }, 500);
  };

  // حذف خصم
  const deleteDiscount = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setDiscounts(discounts.filter((discount) => discount.id !== id));
      setIsLoading(false);
      toast.success("تم حذف الخصم بنجاح");
    }, 500);
  };

  // تفعيل/تعطيل خصم
  const toggleDiscountStatus = (id: string) => {
    setDiscounts(
      discounts.map((discount) =>
        discount.id === id
          ? { ...discount, isActive: !discount.isActive }
          : discount
      )
    );
    toast.success("تم تغيير حالة الخصم بنجاح");
  };

  // محاكاة وقت التحميل عند تهيئة الصفحة
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return {
    discounts,
    filteredDiscounts,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    clearFilters,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    toggleDiscountStatus,
    selectedDiscount,
    setSelectedDiscount,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  };
};


import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Discount } from "@/types/definitions";
import { toast } from "sonner";

// بيانات تجريبية للخصومات
const initialDiscounts: Discount[] = [
  {
    id: uuid(),
    code: "SUMMER25",
    name: "خصم الصيف",
    type: "percentage",
    value: 25,
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-08-31"),
    isActive: true,
    minimumAmount: 200,
  },
  {
    id: uuid(),
    code: "WELCOME50",
    name: "خصم الترحيب",
    type: "fixed",
    value: 50,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    isActive: true,
  }
];

export const useDiscounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // البحث في الخصومات
  const filteredDiscounts = discounts.filter(
    (discount) =>
      discount.name.includes(searchTerm) ||
      discount.code.includes(searchTerm)
  );

  // التحقق من صلاحية الخصم
  const isValidDiscount = (code: string, amount: number): { valid: boolean; discount?: Discount } => {
    const discount = discounts.find((d) => d.code === code && d.isActive);
    
    if (!discount) {
      return { valid: false };
    }
    
    const now = new Date();
    if (now < discount.startDate || (discount.endDate && now > discount.endDate)) {
      return { valid: false };
    }
    
    if (discount.minimumAmount && amount < discount.minimumAmount) {
      return { valid: false };
    }
    
    return { valid: true, discount };
  };

  // حساب قيمة الخصم
  const calculateDiscount = (code: string, amount: number): { discountAmount: number; finalAmount: number } => {
    const { valid, discount } = isValidDiscount(code, amount);
    
    if (!valid || !discount) {
      return { discountAmount: 0, finalAmount: amount };
    }
    
    let discountAmount = 0;
    
    if (discount.type === "percentage") {
      discountAmount = (amount * discount.value) / 100;
      
      // التحقق من الحد الأقصى للخصم إذا كان موجودًا
      if (discount.maximumAmount && discountAmount > discount.maximumAmount) {
        discountAmount = discount.maximumAmount;
      }
    } else {
      discountAmount = discount.value;
    }
    
    return {
      discountAmount,
      finalAmount: amount - discountAmount,
    };
  };

  // إضافة خصم جديد
  const createDiscount = (discount: Omit<Discount, "id">) => {
    setIsLoading(true);
    setTimeout(() => {
      const newDiscount: Discount = {
        ...discount,
        id: uuid(),
      };
      setDiscounts([...discounts, newDiscount]);
      toast.success("تم إضافة الخصم بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  // تعديل خصم
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
      toast.success("تم تحديث بيانات الخصم بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  // حذف خصم
  const deleteDiscount = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setDiscounts(discounts.filter((discount) => discount.id !== id));
      toast.success("تم حذف الخصم بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  return {
    discounts,
    filteredDiscounts,
    isLoading,
    selectedDiscount,
    setSelectedDiscount,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    searchTerm,
    setSearchTerm,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    isValidDiscount,
    calculateDiscount,
  };
};

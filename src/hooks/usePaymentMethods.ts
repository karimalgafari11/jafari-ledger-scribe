
import { useState } from "react";
import { PaymentMethod } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية لطرق الدفع
const initialPaymentMethods: PaymentMethod[] = [
  {
    id: uuid(),
    code: "CASH",
    name: "نقد",
    description: "الدفع نقداً",
    isActive: true,
    requiresDetails: false,
  },
  {
    id: uuid(),
    code: "VISA",
    name: "فيزا",
    description: "بطاقة ائتمان فيزا",
    isActive: true,
    requiresDetails: true,
  },
  {
    id: uuid(),
    code: "MADA",
    name: "مدى",
    description: "بطاقة مدى",
    isActive: true,
    requiresDetails: true,
  },
  {
    id: uuid(),
    code: "BANK",
    name: "تحويل بنكي",
    description: "تحويل بنكي مباشر",
    isActive: true,
    requiresDetails: true,
  },
  {
    id: uuid(),
    code: "CHEQUE",
    name: "شيك",
    description: "دفع بشيك",
    isActive: true,
    requiresDetails: true,
  },
];

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // البحث في طرق الدفع
  const filteredPaymentMethods = paymentMethods.filter(
    (paymentMethod) =>
      paymentMethod.name.includes(searchTerm) ||
      paymentMethod.code.includes(searchTerm) ||
      (paymentMethod.description && paymentMethod.description.includes(searchTerm))
  );

  // إضافة طريقة دفع جديدة
  const createPaymentMethod = (paymentMethod: Omit<PaymentMethod, "id">) => {
    // التحقق من تكرار الكود
    if (paymentMethods.some(pm => pm.code === paymentMethod.code)) {
      toast.error("كود طريقة الدفع موجود مسبقاً");
      return false;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const newPaymentMethod: PaymentMethod = {
        ...paymentMethod,
        id: uuid(),
      };
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      setIsLoading(false);
      toast.success("تم إضافة طريقة الدفع بنجاح");
    }, 500);
    
    return true;
  };

  // تعديل طريقة دفع موجودة
  const updatePaymentMethod = (id: string, updates: Partial<PaymentMethod>) => {
    // التحقق من تكرار الكود
    if (updates.code && paymentMethods.some(pm => pm.code === updates.code && pm.id !== id)) {
      toast.error("كود طريقة الدفع موجود مسبقاً");
      return false;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setPaymentMethods(
        paymentMethods.map((pm) =>
          pm.id === id
            ? { ...pm, ...updates }
            : pm
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث بيانات طريقة الدفع بنجاح");
    }, 500);
    
    return true;
  };

  // حذف طريقة دفع
  const deletePaymentMethod = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
      setIsLoading(false);
      toast.success("تم حذف طريقة الدفع بنجاح");
    }, 500);
    
    return true;
  };

  // تفعيل/تعطيل طريقة دفع
  const togglePaymentMethodStatus = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) =>
        pm.id === id
          ? { ...pm, isActive: !pm.isActive }
          : pm
      )
    );
    toast.success("تم تغيير حالة طريقة الدفع بنجاح");
  };

  return {
    paymentMethods,
    filteredPaymentMethods,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    togglePaymentMethodStatus,
  };
};

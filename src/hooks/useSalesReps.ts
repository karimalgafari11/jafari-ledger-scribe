
import { useState } from "react";
import { SalesRepresentative } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية لمندوبي المبيعات
const initialSalesReps: SalesRepresentative[] = [
  {
    id: uuid(),
    code: "SR001",
    name: "أحمد محمد",
    phone: "+966 55 1234567",
    email: "ahmed@example.com",
    commissionRate: 2.5,
    isActive: true,
    branchIds: ["1", "2"], // رقم 1 للفرع الرئيسي، 2 لفرع جدة
  },
  {
    id: uuid(),
    code: "SR002",
    name: "عبدالله العمر",
    phone: "+966 50 7654321",
    email: "abdullah@example.com",
    commissionRate: 3.0,
    isActive: true,
    branchIds: ["1"], // رقم 1 للفرع الرئيسي
  },
  {
    id: uuid(),
    code: "SR003",
    name: "سارة السالم",
    phone: "+966 54 1112222",
    email: "sara@example.com",
    commissionRate: 2.0,
    isActive: false,
    branchIds: ["2", "3"], // رقم 2 لفرع جدة، 3 لفرع الدمام
  },
];

export const useSalesReps = () => {
  const [salesReps, setSalesReps] = useState<SalesRepresentative[]>(initialSalesReps);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("");
  const [selectedSalesRep, setSelectedSalesRep] = useState<SalesRepresentative | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // البحث وتصفية مندوبي المبيعات
  const filteredSalesReps = salesReps.filter(
    (salesRep) => {
      const matchesSearch = 
        salesRep.name.includes(searchTerm) ||
        salesRep.code.includes(searchTerm) ||
        salesRep.phone.includes(searchTerm) ||
        salesRep.email.includes(searchTerm);
      
      const matchesBranch = branchFilter 
        ? salesRep.branchIds.includes(branchFilter)
        : true;
      
      return matchesSearch && matchesBranch;
    }
  );

  // إنشاء كود مندوب جديد
  const generateSalesRepCode = () => {
    const codes = salesReps.map((rep) => {
      const match = rep.code.match(/\d+$/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const maxCode = Math.max(...codes, 0);
    return `SR${String(maxCode + 1).padStart(3, "0")}`;
  };

  // إضافة مندوب مبيعات جديد
  const createSalesRep = (salesRep: Omit<SalesRepresentative, "id">) => {
    // التحقق من تكرار الكود
    if (salesReps.some(sr => sr.code === salesRep.code)) {
      toast.error("كود المندوب موجود مسبقاً");
      return false;
    }
    
    // التحقق من تكرار البريد الإلكتروني
    if (salesReps.some(sr => sr.email === salesRep.email)) {
      toast.error("البريد الإلكتروني مستخدم مسبقاً");
      return false;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const newSalesRep: SalesRepresentative = {
        ...salesRep,
        id: uuid(),
      };
      setSalesReps([...salesReps, newSalesRep]);
      setIsLoading(false);
      toast.success("تم إضافة مندوب المبيعات بنجاح");
    }, 500);
    
    return true;
  };

  // تعديل مندوب مبيعات موجود
  const updateSalesRep = (id: string, updates: Partial<SalesRepresentative>) => {
    // التحقق من تكرار الكود
    if (updates.code && salesReps.some(sr => sr.code === updates.code && sr.id !== id)) {
      toast.error("كود المندوب موجود مسبقاً");
      return false;
    }
    
    // التحقق من تكرار البريد الإلكتروني
    if (updates.email && salesReps.some(sr => sr.email === updates.email && sr.id !== id)) {
      toast.error("البريد الإلكتروني مستخدم مسبقاً");
      return false;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setSalesReps(
        salesReps.map((salesRep) =>
          salesRep.id === id
            ? { ...salesRep, ...updates }
            : salesRep
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث بيانات مندوب المبيعات بنجاح");
    }, 500);
    
    return true;
  };

  // حذف مندوب مبيعات
  const deleteSalesRep = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSalesReps(salesReps.filter((salesRep) => salesRep.id !== id));
      setIsLoading(false);
      toast.success("تم حذف مندوب المبيعات بنجاح");
    }, 500);
    
    return true;
  };

  // تفعيل/تعطيل مندوب مبيعات
  const toggleSalesRepStatus = (id: string) => {
    setSalesReps(
      salesReps.map((salesRep) =>
        salesRep.id === id
          ? { ...salesRep, isActive: !salesRep.isActive }
          : salesRep
      )
    );
    toast.success("تم تغيير حالة مندوب المبيعات بنجاح");
  };

  return {
    salesReps,
    filteredSalesReps,
    isLoading,
    searchTerm,
    setSearchTerm,
    branchFilter,
    setBranchFilter,
    selectedSalesRep,
    setSelectedSalesRep,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createSalesRep,
    updateSalesRep,
    deleteSalesRep,
    toggleSalesRepStatus,
    generateSalesRepCode,
  };
};

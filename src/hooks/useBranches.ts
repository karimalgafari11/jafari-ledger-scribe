import { useState } from "react";
import { Branch } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية للفروع
const initialBranches: Branch[] = [
  {
    id: uuid(),
    code: "HQ-01",
    name: "المقر الرئيسي",
    address: "الرياض - طريق الملك فهد",
    manager: "محمد العبدالله",
    phone: "+966 55 123 4567",
    email: "hq@example.com",
    isActive: true,
    isMain: true,
    isMainBranch: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: uuid(),
    code: "JED-01",
    name: "فرع جدة",
    address: "جدة - طريق الكورنيش",
    manager: "أحمد السالم",
    phone: "+966 55 765 4321",
    email: "jeddah@example.com",
    isActive: true,
    isMain: false,
    isMainBranch: false,
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
  {
    id: uuid(),
    code: "DMM-01",
    name: "فرع الدمام",
    address: "الدمام - شارع الخليج",
    manager: "عبدالرحمن الخالد",
    phone: "+966 55 222 3333",
    email: "dammam@example.com",
    isActive: true,
    isMain: false,
    isMainBranch: false,
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10"),
  }
];

export const useBranches = () => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // البحث في الفروع
  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.includes(searchTerm) ||
      branch.code.includes(searchTerm) ||
      branch.manager?.includes(searchTerm)
  );

  // إضافة فرع جديد
  const createBranch = (branch: Omit<Branch, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true);
    setTimeout(() => {
      const newBranch: Branch = {
        ...branch,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBranches([...branches, newBranch]);
      setIsLoading(false);
      toast.success("تم إضافة الفرع بنجاح");
    }, 500);
  };

  // تعديل فرع موجود
  const updateBranch = (id: string, updates: Partial<Branch>) => {
    setIsLoading(true);
    setTimeout(() => {
      setBranches(
        branches.map((branch) =>
          branch.id === id
            ? { ...branch, ...updates, updatedAt: new Date() }
            : branch
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث بيانات الفرع بنجاح");
    }, 500);
  };

  // حذف فرع
  const deleteBranch = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setBranches(branches.filter((branch) => branch.id !== id));
      setIsLoading(false);
      toast.success("تم حذف الفرع بنجاح");
    }, 500);
  };

  // تفعيل/تعطيل فرع
  const toggleBranchStatus = (id: string) => {
    setBranches(
      branches.map((branch) =>
        branch.id === id
          ? { ...branch, isActive: !branch.isActive, updatedAt: new Date() }
          : branch
      )
    );
    toast.success("تم تغيير حالة الفرع بنجاح");
  };

  // إنشاء كود فرع جديد
  const generateBranchCode = () => {
    // استخراج أعلى رقم تسلسلي
    const codes = branches.map((branch) => {
      const match = branch.code.match(/\d+$/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const maxCode = Math.max(...codes, 0);
    return `BR-${String(maxCode + 1).padStart(3, "0")}`;
  };

  return {
    branches,
    filteredBranches: branches, // Simplified for now
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedBranch,
    setSelectedBranch,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createBranch: () => {}, // Simplified for now
    updateBranch: () => {}, // Simplified for now
    deleteBranch: () => {}, // Simplified for now
    toggleBranchStatus: () => {}, // Simplified for now
    generateBranchCode,
  };
};

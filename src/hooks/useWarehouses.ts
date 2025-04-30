
import { useState } from "react";
import { Warehouse } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية للمستودعات
const initialWarehouses: Warehouse[] = [
  {
    id: uuid(),
    code: "WH-MAIN-01",
    name: "المستودع الرئيسي",
    branchId: "1", // سيتم ربطه بالفرع الرئيسي
    branchName: "المقر الرئيسي",
    type: "main",
    address: "الرياض - طريق الملك فهد",
    inventoryControl: "automatic",
    isActive: true,
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: uuid(),
    code: "WH-JED-01",
    name: "مستودع جدة",
    branchId: "2",
    branchName: "فرع جدة",
    type: "sub",
    address: "جدة - طريق الكورنيش",
    inventoryControl: "automatic",
    isActive: true,
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-02-20"),
  },
  {
    id: uuid(),
    code: "WH-EXT-01",
    name: "مستودع خارجي",
    branchId: "1",
    branchName: "المقر الرئيسي",
    type: "external",
    address: "الرياض - المنطقة الصناعية الثانية",
    inventoryControl: "manual",
    isActive: true,
    createdAt: new Date("2023-04-10"),
    updatedAt: new Date("2023-04-10"),
  },
];

export const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // البحث وتصفية المستودعات
  const filteredWarehouses = warehouses.filter(
    (warehouse) => {
      const matchesSearch = 
        warehouse.name.includes(searchTerm) ||
        warehouse.code.includes(searchTerm) ||
        warehouse.branchName.includes(searchTerm);
      
      const matchesBranch = branchFilter 
        ? warehouse.branchId === branchFilter
        : true;
      
      return matchesSearch && matchesBranch;
    }
  );

  // إضافة مستودع جديد
  const createWarehouse = (warehouse: Omit<Warehouse, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true);
    setTimeout(() => {
      const newWarehouse: Warehouse = {
        ...warehouse,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setWarehouses([...warehouses, newWarehouse]);
      setIsLoading(false);
      toast.success("تم إضافة المستودع بنجاح");
    }, 500);
  };

  // تعديل مستودع موجود
  const updateWarehouse = (id: string, updates: Partial<Warehouse>) => {
    setIsLoading(true);
    setTimeout(() => {
      setWarehouses(
        warehouses.map((warehouse) =>
          warehouse.id === id
            ? { ...warehouse, ...updates, updatedAt: new Date() }
            : warehouse
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث بيانات المستودع بنجاح");
    }, 500);
  };

  // حذف مستودع
  const deleteWarehouse = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
      setIsLoading(false);
      toast.success("تم حذف المستودع بنجاح");
    }, 500);
  };

  // تفعيل/تعطيل مستودع
  const toggleWarehouseStatus = (id: string) => {
    setWarehouses(
      warehouses.map((warehouse) =>
        warehouse.id === id
          ? { ...warehouse, isActive: !warehouse.isActive, updatedAt: new Date() }
          : warehouse
      )
    );
    toast.success("تم تغيير حالة المستودع بنجاح");
  };

  // إنشاء كود مستودع جديد
  const generateWarehouseCode = (branchCode: string) => {
    const warehouseCount = warehouses.filter(w => w.branchId === branchCode).length;
    return `WH-${branchCode}-${String(warehouseCount + 1).padStart(2, "0")}`;
  };

  return {
    warehouses,
    filteredWarehouses,
    isLoading,
    searchTerm,
    setSearchTerm,
    branchFilter,
    setBranchFilter,
    selectedWarehouse,
    setSelectedWarehouse,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    toggleWarehouseStatus,
    generateWarehouseCode,
  };
};

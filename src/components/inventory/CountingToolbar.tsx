
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CountingToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  warehouseFilter: string;
  setWarehouseFilter: (warehouse: string) => void;
  statusFilter: "draft" | "completed" | "";
  setStatusFilter: (status: "draft" | "completed" | "") => void;
  onNewCount: () => void;
}

export function CountingToolbar({
  searchQuery,
  setSearchQuery,
  warehouseFilter,
  setWarehouseFilter,
  statusFilter,
  setStatusFilter,
  onNewCount
}: CountingToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between rtl">
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          placeholder="البحث..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <select 
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">جميع المستودعات</option>
          <option value="المستودع الرئيسي">المستودع الرئيسي</option>
          <option value="فرع الرياض">فرع الرياض</option>
          <option value="فرع جدة">فرع جدة</option>
        </select>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "draft" | "completed" | "")}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">جميع الحالات</option>
          <option value="draft">مسودة</option>
          <option value="completed">مكتمل</option>
        </select>
      </div>
      
      <Button className="bg-teal hover:bg-teal-dark text-white gap-2" onClick={onNewCount}>
        <Plus size={18} />
        إنشاء جرد جديد
      </Button>
    </div>
  );
}

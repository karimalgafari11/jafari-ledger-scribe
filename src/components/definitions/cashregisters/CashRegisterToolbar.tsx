
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

interface CashRegisterToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddCashRegister: () => void;
}

export const CashRegisterToolbar: React.FC<CashRegisterToolbarProps> = ({
  searchTerm,
  onSearchChange,
  onAddCashRegister,
}) => {
  return (
    <div className="flex justify-between items-center space-x-2 mb-4 flex-col sm:flex-row gap-2">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="بحث عن صندوق..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 w-full sm:w-[300px] rtl"
        />
      </div>
      <Button onClick={onAddCashRegister} className="flex items-center gap-1 w-full sm:w-auto">
        <Plus className="h-4 w-4" />
        <span>إضافة صندوق جديد</span>
      </Button>
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

interface TableActionButtonsProps {
  onAddNewItem: () => void;
  onToggleSearch: () => void;
}

export const TableActionButtons: React.FC<TableActionButtonsProps> = ({
  onAddNewItem,
  onToggleSearch
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onToggleSearch}
        className="flex items-center gap-1"
      >
        <Search className="h-4 w-4" />
        بحث
      </Button>
      <Button 
        onClick={onAddNewItem} 
        size="sm"
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        إضافة صنف
      </Button>
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DiscountFilters } from "./DiscountFilters";

interface DiscountsToolbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  clearFilters: () => void;
  onAddDiscount: () => void;
}

export const DiscountsToolbar: React.FC<DiscountsToolbarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  clearFilters,
  onAddDiscount
}) => {
  return (
    <div className="flex flex-col mb-4 gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <DiscountFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          clearFilters={clearFilters}
        />
      </div>
      <Button onClick={onAddDiscount} className="shrink-0">
        <Plus className="h-4 w-4 ml-2" />
        إضافة خصم جديد
      </Button>
    </div>
  );
};

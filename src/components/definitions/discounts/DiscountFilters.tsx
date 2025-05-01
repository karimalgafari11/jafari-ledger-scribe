
import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DiscountFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  clearFilters: () => void;
}

export const DiscountFilters: React.FC<DiscountFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  clearFilters,
}) => {
  const hasActiveFilters = searchTerm || statusFilter !== "all" || typeFilter !== "all";

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-2 md:space-x-reverse">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="بحث عن خصم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="حالة الخصم" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">كل الحالات</SelectItem>
          <SelectItem value="active">فعال</SelectItem>
          <SelectItem value="inactive">غير فعال</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="نوع الخصم" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">كل الأنواع</SelectItem>
          <SelectItem value="percentage">نسبة مئوية</SelectItem>
          <SelectItem value="fixed">قيمة ثابتة</SelectItem>
        </SelectContent>
      </Select>
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-9 px-2 lg:px-3"
        >
          <X className="h-4 w-4 ml-1" />
          مسح التصفية
        </Button>
      )}
    </div>
  );
};

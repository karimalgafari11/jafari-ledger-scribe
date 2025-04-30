
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { CustomerFilters } from "@/types/customers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomersToolbarProps {
  onCreateCustomer: () => void;
  filters: CustomerFilters;
  onFilterChange: (filters: CustomerFilters) => void;
}

export const CustomersToolbar = ({
  onCreateCustomer,
  filters,
  onFilterChange,
}: CustomersToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rtl mb-6">
      <div className="flex-1 sm:max-w-sm">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن عميل..."
            className="pr-8"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter size={16} />
              فلترة
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 rtl">
            <div className="space-y-4">
              <h4 className="font-medium">فلترة العملاء</h4>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm">الحالة</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) =>
                    onFilterChange({ ...filters, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="جميع الحالات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الحالات</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm">نوع العميل</label>
                <Select
                  value={filters.type}
                  onValueChange={(value) =>
                    onFilterChange({ ...filters, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="جميع الأنواع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الأنواع</SelectItem>
                    <SelectItem value="individual">فرد</SelectItem>
                    <SelectItem value="company">شركة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={onCreateCustomer} className="bg-teal hover:bg-teal-dark text-white">
          <Plus className="h-4 w-4 ml-2" />
          إضافة عميل جديد
        </Button>
      </div>
    </div>
  );
};

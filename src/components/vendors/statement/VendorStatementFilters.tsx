
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface VendorStatementFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  balanceFilter: [number, number];
  setBalanceFilter: (range: [number, number]) => void;
}

export const VendorStatementFilters: React.FC<VendorStatementFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  balanceFilter,
  setBalanceFilter,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="search">البحث</Label>
        <Input
          id="search"
          placeholder="البحث باسم المورد أو رقم الهاتف..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">حالة الحساب</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="جميع الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="overdue">متأخر</SelectItem>
              <SelectItem value="zero">رصيد صفري</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>قيمة الرصيد</Label>
          <div className="pt-6">
            <Slider
              value={balanceFilter}
              min={0}
              max={50000}
              step={1000}
              onValueChange={(values) => setBalanceFilter(values as [number, number])}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{balanceFilter[0].toLocaleString()} ريال</span>
              <span>{balanceFilter[1].toLocaleString()} ريال</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

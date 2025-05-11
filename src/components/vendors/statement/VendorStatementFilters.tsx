
import React from "react";
import { Search } from "lucide-react";
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
  setBalanceFilter: (balance: [number, number]) => void;
}

export const VendorStatementFilters: React.FC<VendorStatementFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  balanceFilter,
  setBalanceFilter
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="بحث عن اسم المورد أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="حالة الحساب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحسابات</SelectItem>
              <SelectItem value="active">الحسابات النشطة</SelectItem>
              <SelectItem value="overdue">حسابات متأخرة</SelectItem>
              <SelectItem value="zero">حسابات بلا رصيد</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <Label>قيمة الرصيد</Label>
          <div className="text-sm text-gray-500">
            {balanceFilter[0].toLocaleString()} ريال - {balanceFilter[1].toLocaleString()} ريال
          </div>
        </div>
        <Slider
          defaultValue={balanceFilter}
          min={0}
          max={50000}
          step={1000}
          value={balanceFilter}
          onValueChange={(value) => setBalanceFilter(value as [number, number])}
          className="mt-2"
        />
      </div>
    </div>
  );
};

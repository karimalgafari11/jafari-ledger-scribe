
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface ReceivablesFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  amountRange: [number, number];
  onAmountRangeChange: (value: [number, number]) => void;
  maxAmount: number;
}

export const ReceivablesFilter: React.FC<ReceivablesFilterProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  amountRange,
  onAmountRangeChange,
  maxAmount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 rtl">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="بحث بالاسم، البريد، أو رقم الهاتف..."
          className="pr-10 bg-white"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      <Select
        value={statusFilter}
        onValueChange={onStatusFilterChange}
      >
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="فلترة حسب الحالة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">جميع الذمم المدينة</SelectItem>
          <SelectItem value="overdue">مستحقة متأخرة</SelectItem>
          <SelectItem value="upcoming">مستحقة قريبة</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>نطاق المبلغ:</span>
          <span>
            {formatCurrency(amountRange[0])} - {formatCurrency(amountRange[1])}
          </span>
        </div>
        <Slider
          defaultValue={[0, maxAmount]}
          min={0}
          max={maxAmount}
          step={100}
          value={amountRange}
          onValueChange={value => onAmountRangeChange(value as [number, number])}
          className="pt-2"
        />
      </div>
    </div>
  );
};

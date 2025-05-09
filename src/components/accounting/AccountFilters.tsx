
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Filter, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AccountFiltersProps {
  filterType: string;
  minBalance: string;
  maxBalance: string;
  onFilterChange: (type: string, min: string, max: string) => void;
  onReset: () => void;
  isFiltered?: boolean;
}

export function AccountFilters({
  filterType,
  minBalance,
  maxBalance,
  onFilterChange,
  onReset,
  isFiltered = false
}: AccountFiltersProps) {
  const [tempType, setTempType] = React.useState(filterType);
  const [tempMin, setTempMin] = React.useState(minBalance);
  const [tempMax, setTempMax] = React.useState(maxBalance);

  const handleApplyFilter = () => {
    onFilterChange(tempType, tempMin, tempMax);
  };

  const handleReset = () => {
    setTempType('');
    setTempMin('');
    setTempMax('');
    onReset();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant={isFiltered ? "default" : "outline"} 
          size="icon"
          className={isFiltered ? "bg-primary hover:bg-primary/90" : ""}
        >
          <Filter className="h-4 w-4" />
          <span className="sr-only">تصفية</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rtl">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">نوع الحساب</label>
            <Select value={tempType} onValueChange={setTempType}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الحساب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">الكل</SelectItem>
                <SelectItem value="asset">أصول</SelectItem>
                <SelectItem value="liability">التزامات</SelectItem>
                <SelectItem value="equity">حقوق ملكية</SelectItem>
                <SelectItem value="revenue">إيرادات</SelectItem>
                <SelectItem value="expense">مصروفات</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">الرصيد</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="الحد الأدنى"
                value={tempMin}
                onChange={(e) => setTempMin(e.target.value)}
              />
              <Input
                type="number"
                placeholder="الحد الأقصى"
                value={tempMax}
                onChange={(e) => setTempMax(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4 ml-2" />
              إعادة تعيين
            </Button>
            <Button size="sm" onClick={handleApplyFilter}>
              تطبيق التصفية
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

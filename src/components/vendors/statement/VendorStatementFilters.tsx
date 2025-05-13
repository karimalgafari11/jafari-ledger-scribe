
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

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
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في الموردين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-9"
          />
        </div>
        
        <div className="w-full md:w-1/4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الموردين</SelectItem>
              <SelectItem value="active">الموردين النشطين</SelectItem>
              <SelectItem value="overdue">حسابات متأخرة</SelectItem>
              <SelectItem value="zero">رصيد صفري</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <Label>نطاق الرصيد</Label>
          <div className="text-sm text-muted-foreground">
            {balanceFilter[0].toLocaleString('ar-SA')} - {balanceFilter[1].toLocaleString('ar-SA')} ريال
          </div>
        </div>
        <Slider
          defaultValue={[0, 50000]}
          max={50000}
          step={1000}
          value={balanceFilter}
          onValueChange={(value) => setBalanceFilter(value as [number, number])}
        />
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => {
          setSearchTerm('');
          setStatusFilter('all');
          setBalanceFilter([0, 50000]);
        }}>
          <Filter className="ml-1 h-4 w-4" />
          إعادة ضبط الفلاتر
        </Button>
      </div>
    </div>
  );
};

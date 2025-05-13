
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface VendorFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalVendors: number;
  activeVendors: number;
  inactiveVendors: number;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const VendorFilters: React.FC<VendorFiltersProps> = ({
  activeTab,
  setActiveTab,
  totalVendors,
  activeVendors,
  inactiveVendors,
  showFilters,
  setShowFilters,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              جميع الموردين <span className="mr-1 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">{totalVendors}</span>
            </TabsTrigger>
            <TabsTrigger value="active">
              موردين نشطين <span className="mr-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{activeVendors}</span>
            </TabsTrigger>
            <TabsTrigger value="inactive">
              غير نشطين <span className="mr-1 text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">{inactiveVendors}</span>
            </TabsTrigger>
          </TabsList>
          
          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="ml-2">
            <Filter className="ml-1 h-4 w-4" />
            {showFilters ? 'إخفاء الفلتر' : 'فلترة متقدمة'}
          </Button>
        </Tabs>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في الموردين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-9"
          />
        </div>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-t pt-4 mt-4">
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="التصنيف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                <SelectItem value="supplies">موردي مستلزمات</SelectItem>
                <SelectItem value="tech">تقنية</SelectItem>
                <SelectItem value="materials">مواد خام</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الطرق</SelectItem>
                <SelectItem value="cash">نقدي</SelectItem>
                <SelectItem value="transfer">تحويل بنكي</SelectItem>
                <SelectItem value="credit">آجل</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">الاسم (تصاعدي)</SelectItem>
                <SelectItem value="name-desc">الاسم (تنازلي)</SelectItem>
                <SelectItem value="balance-asc">الرصيد (تصاعدي)</SelectItem>
                <SelectItem value="balance-desc">الرصيد (تنازلي)</SelectItem>
                <SelectItem value="date-asc">تاريخ الإضافة (الأقدم)</SelectItem>
                <SelectItem value="date-desc">تاريخ الإضافة (الأحدث)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">إعادة ضبط</Button>
            <Button className="flex-1">تطبيق</Button>
          </div>
        </div>
      )}
    </div>
  );
};

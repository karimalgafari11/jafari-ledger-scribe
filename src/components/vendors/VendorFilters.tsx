
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building, Tag } from "lucide-react";

interface VendorFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalVendors: number;
  activeVendors: number;
  inactiveVendors: number;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const VendorFilters: React.FC<VendorFiltersProps> = ({
  activeTab,
  setActiveTab,
  totalVendors,
  activeVendors,
  inactiveVendors,
  showFilters,
  setShowFilters,
}) => {
  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Building size={16} /> كل الموردين
            <Badge variant="outline" className="ml-2 bg-gray-100">{totalVendors}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Tag size={16} /> نشط
            <Badge variant="outline" className="ml-2 bg-green-100">{activeVendors}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="flex items-center gap-2">
            <Tag size={16} /> غير نشط
            <Badge variant="outline" className="ml-2 bg-gray-100">{inactiveVendors}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {showFilters && (
        <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium mb-3">خيارات التصفية المتقدمة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">التصنيف</label>
              <select className="w-full p-2 border border-gray-200 rounded text-sm">
                <option value="">الكل</option>
                <option value="مستلزمات مكتبية">مستلزمات مكتبية</option>
                <option value="معدات إلكترونية">معدات إلكترونية</option>
                <option value="أثاث مكتبي">أثاث مكتبي</option>
                <option value="أجهزة وتقنية">أجهزة وتقنية</option>
                <option value="منتجات ورقية">منتجات ورقية</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">الرصيد</label>
              <select className="w-full p-2 border border-gray-200 rounded text-sm">
                <option value="">الكل</option>
                <option value="positive">لديه رصيد مستحق</option>
                <option value="zero">رصيد صفر</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button size="sm" className="mr-2">تطبيق</Button>
              <Button size="sm" variant="outline" onClick={() => setShowFilters(false)}>إلغاء</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          تصفية
        </Button>
      </div>
    </>
  );
};

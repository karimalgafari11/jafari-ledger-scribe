
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Filter, PercentCircle, FileDown, FileUp, Check, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { format } from "date-fns";
import { useDiscounts } from '@/hooks/useDiscounts';
import { DiscountDialog } from './DiscountDialog';
import { DeleteDiscountDialog } from './DeleteDiscountDialog';
import { DiscountFilters } from './DiscountFilters';
import { Discount } from '@/types/definitions';

export const DiscountsModule = () => {
  // Hooks
  const { 
    discounts, 
    filteredDiscounts,
    isLoading,
    selectedDiscount,
    setSelectedDiscount,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    searchTerm,
    setSearchTerm,
    createDiscount,
    updateDiscount,
    deleteDiscount
  } = useDiscounts();
  
  // State
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortField, setSortField] = useState<keyof Discount>("code");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Filter discounts based on active tab, search term, status and type
  const getFilteredDiscounts = () => {
    let filtered = filteredDiscounts;
    
    // Filter by tab
    if (activeTab === "regular") {
      filtered = filtered.filter(d => !d.code.startsWith("PROMO"));
    } else if (activeTab === "promotional") {
      filtered = filtered.filter(d => d.code.startsWith("PROMO"));
    } else if (activeTab === "quantity") {
      filtered = filtered.filter(d => d.minimumAmount !== undefined);
    }
    
    // Filter by status
    if (statusFilter === "active") {
      filtered = filtered.filter(d => d.isActive);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter(d => !d.isActive);
    }
    
    // Filter by type
    if (typeFilter === "percentage") {
      filtered = filtered.filter(d => d.type === "percentage");
    } else if (typeFilter === "fixed") {
      filtered = filtered.filter(d => d.type === "fixed");
    }
    
    // Sort the results
    filtered.sort((a, b) => {
      if (sortField === "value") {
        return sortDirection === "asc" 
          ? a[sortField] - b[sortField] 
          : b[sortField] - a[sortField];
      } else {
        const aValue = a[sortField as keyof Discount];
        const bValue = b[sortField as keyof Discount];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === "asc" 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        return 0;
      }
    });
    
    return filtered;
  };
  
  const displayedDiscounts = getFilteredDiscounts();
  
  // Handlers
  const handleSort = (field: keyof Discount) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const handleEdit = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSave = (data: any) => {
    if (isEditDialogOpen && selectedDiscount) {
      updateDiscount(selectedDiscount.id, data);
      setIsEditDialogOpen(false);
      toast.success("تم تحديث الخصم بنجاح");
    } else {
      createDiscount(data);
      setIsCreateDialogOpen(false);
      toast.success("تم إضافة الخصم بنجاح");
    }
  };
  
  const confirmDelete = () => {
    if (selectedDiscount) {
      deleteDiscount(selectedDiscount.id);
      setIsDeleteDialogOpen(false);
      toast.success("تم حذف الخصم بنجاح");
    }
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
  };
  
  const handleExportDiscounts = () => {
    toast.info("جاري تصدير بيانات الخصومات...");
    // Implement export functionality here
  };
  
  const handleImportDiscounts = () => {
    // Implement import functionality here
    toast.info("ميزة استيراد الخصومات قيد التطوير");
  };
  
  const getSortIcon = (field: keyof Discount) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4 inline mr-1" /> : <ArrowDown className="h-4 w-4 inline mr-1" />;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <PercentCircle className="h-5 w-5 text-teal-600" />
            إدارة الخصومات
          </CardTitle>
          <div className="flex gap-3 flex-wrap">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleExportDiscounts}
            >
              <FileDown size={16} />
              تصدير
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleImportDiscounts}
            >
              <FileUp size={16} />
              استيراد
            </Button>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus size={16} />
              إضافة خصم جديد
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DiscountFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          clearFilters={clearFilters}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">كل الخصومات</TabsTrigger>
            <TabsTrigger value="regular">الخصومات العادية</TabsTrigger>
            <TabsTrigger value="promotional">الخصومات الترويجية</TabsTrigger>
            <TabsTrigger value="quantity">خصومات الكميات</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
              </div>
            ) : displayedDiscounts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort("code")}
                    >
                      الكود {getSortIcon("code")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      الاسم {getSortIcon("name")}
                    </TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort("value")}
                    >
                      القيمة {getSortIcon("value")}
                    </TableHead>
                    <TableHead>تاريخ البداية</TableHead>
                    <TableHead>تاريخ النهاية</TableHead>
                    <TableHead>الحد الأدنى</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedDiscounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell className="font-medium">{discount.code}</TableCell>
                      <TableCell>{discount.name}</TableCell>
                      <TableCell>
                        {discount.type === "percentage" ? "نسبة مئوية" : "قيمة ثابتة"}
                      </TableCell>
                      <TableCell>
                        {discount.type === "percentage" ? `${discount.value}%` : `${discount.value} ريال`}
                      </TableCell>
                      <TableCell>
                        {format(new Date(discount.startDate), "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>
                        {discount.endDate 
                          ? format(new Date(discount.endDate), "yyyy-MM-dd")
                          : "غير محدد"}
                      </TableCell>
                      <TableCell>
                        {discount.minimumAmount 
                          ? `${discount.minimumAmount} ريال`
                          : "لا يوجد"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={discount.isActive ? "success" : "secondary"}>
                          {discount.isActive ? "فعال" : "غير فعال"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(discount)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(discount)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-md">
                <PercentCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-600 mb-1">لا توجد خصومات</h3>
                <p className="text-gray-500 mb-4">
                  لم يتم العثور على خصومات تطابق معايير البحث
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  إضافة خصم جديد
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* الحوارات */}
      <DiscountDialog 
        open={isCreateDialogOpen || isEditDialogOpen} 
        onOpenChange={(open) => {
          if (isEditDialogOpen) setIsEditDialogOpen(open);
          else setIsCreateDialogOpen(open);
        }}
        discount={isEditDialogOpen ? selectedDiscount || undefined : undefined}
        onSave={handleSave}
        isLoading={isLoading}
      />
      
      <DeleteDiscountDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        discount={selectedDiscount}
        onDelete={confirmDelete}
        isLoading={isLoading}
      />
    </Card>
  );
};

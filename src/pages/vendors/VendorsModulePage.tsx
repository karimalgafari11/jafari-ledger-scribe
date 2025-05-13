
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Network, Plus, Import, Download, Filter, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockVendors } from "@/data/mockVendors";
import { DataTable } from "@/components/ui/data-table";
import { VendorStatsGrid } from "@/components/vendors/VendorStatsGrid";

// تعريف أعمدة جدول الموردين
const vendorColumns = [
  {
    accessorKey: "name",
    header: "اسم المورد",
  },
  {
    accessorKey: "contactPerson",
    header: "الشخص المسؤول",
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "balance",
    header: "الرصيد",
    cell: ({ row }) => (
      <div className={row.original.balance > 0 ? "text-red-600 font-bold" : "text-green-600"}>
        {new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(row.original.balance)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => (
      <div className={`px-2 py-1 rounded-md inline-block text-xs ${
        row.original.status === "نشط" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}>
        {row.original.status}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="ghost" size="sm" onClick={() => alert(`تعديل: ${row.original.name}`)}>
            تعديل
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert(`عرض: ${row.original.name}`)}>
            عرض
          </Button>
        </div>
      );
    },
  },
];

const VendorsModulePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("vendors");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // تطبيق الفلتر على بيانات الموردين
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = searchTerm === "" || 
                          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (vendor.phone && vendor.phone.includes(searchTerm));
    
    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout className="h-screen overflow-hidden bg-gray-50">
      <div className="flex flex-col h-full">
        <Header title="وحدة الموردين" icon={<Network className="ml-2 h-6 w-6" />} />
        
        <div className="flex-1 overflow-auto p-6">
          <VendorStatsGrid />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="vendors">الموردين</TabsTrigger>
                <TabsTrigger value="transactions">المعاملات</TabsTrigger>
                <TabsTrigger value="statements">كشوف الحساب</TabsTrigger>
                <TabsTrigger value="analytics">تحليلات</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/vendors/manage')}>
                  <RefreshCw className="ml-1 h-4 w-4" />
                  تحديث
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert('تصدير البيانات')}>
                  <Download className="ml-1 h-4 w-4" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert('استيراد البيانات')}>
                  <Import className="ml-1 h-4 w-4" />
                  استيراد
                </Button>
                <Button onClick={() => navigate('/vendors/manage')}>
                  <Plus className="ml-1 h-4 w-4" />
                  مورد جديد
                </Button>
              </div>
            </div>
            
            <TabsContent value="vendors" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Input
                        placeholder="البحث في الموردين..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-3 pr-9"
                      />
                      <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    
                    <div className="w-full sm:w-48">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الحالات</SelectItem>
                          <SelectItem value="نشط">نشط</SelectItem>
                          <SelectItem value="غير نشط">غير نشط</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DataTable columns={vendorColumns} data={filteredVendors} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground py-12">
                    لا توجد معاملات للعرض
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="statements" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground py-12">
                    لا توجد كشوف حساب للعرض
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground py-12">
                    لا توجد بيانات تحليلية للعرض
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default VendorsModulePage;

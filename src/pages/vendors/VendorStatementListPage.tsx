
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockVendors } from "@/data/mockVendors";
import { Search } from "lucide-react";

const VendorStatementListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // فلترة الموردين حسب البحث
  const filteredVendors = mockVendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vendor.contactPerson && vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (vendor.phone && vendor.phone.includes(searchTerm))
  );

  const handleViewStatement = (vendorId: string) => {
    navigate(`/vendors/statement/${vendorId}`);
  };

  return (
    <div className="container p-6 mx-auto">
      <Header title="كشوفات حسابات الموردين" showBack={true} />

      <div className="mt-6">
        <Card className="mb-6">
          <CardHeader className="py-4">
            <CardTitle className="text-lg font-medium">البحث عن مورد</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="relative rtl">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ابحث باسم المورد أو رقم الهاتف..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg font-medium">قائمة الموردين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-right">
                    <th className="p-3 border border-gray-200">اسم المورد</th>
                    <th className="p-3 border border-gray-200">جهة الاتصال</th>
                    <th className="p-3 border border-gray-200">رقم الهاتف</th>
                    <th className="p-3 border border-gray-200">الرصيد المستحق</th>
                    <th className="p-3 border border-gray-200">الحالة</th>
                    <th className="p-3 border border-gray-200">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.length > 0 ? (
                    filteredVendors.map(vendor => (
                      <tr key={vendor.id} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-200 font-medium">{vendor.name}</td>
                        <td className="p-3 border border-gray-200">{vendor.contactPerson || '-'}</td>
                        <td className="p-3 border border-gray-200">{vendor.phone || '-'}</td>
                        <td className="p-3 border border-gray-200">
                          <span className={`font-medium ${
                            vendor.balance > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {vendor.balance.toLocaleString()} ريال
                          </span>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <span className={`px-2 py-1 rounded text-xs ${
                            vendor.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {vendor.status}
                          </span>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <Button onClick={() => handleViewStatement(vendor.id)}>
                            عرض الكشف
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-500">
                        لم يتم العثور على موردين مطابقين لبحثك
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorStatementListPage;

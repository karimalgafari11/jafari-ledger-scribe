
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Filter, PercentCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DiscountsModule = () => {
  const [activeTab, setActiveTab] = useState("regular");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for discounts
  const regularDiscounts = [
    { id: 1, code: "DISC10", name: "خصم عام 10%", type: "نسبة مئوية", value: "10%", appliesTo: "كل المنتجات", startDate: "2024-04-01", endDate: "2024-05-31", status: "فعال" },
    { id: 2, code: "FIXED50", name: "خصم ثابت 50 ريال", type: "قيمة ثابتة", value: "50", appliesTo: "منتجات محددة", startDate: "2024-04-01", endDate: "2024-04-30", status: "فعال" },
    { id: 3, code: "SUMMER25", name: "خصم الصيف", type: "نسبة مئوية", value: "25%", appliesTo: "تصنيف المنتجات", startDate: "2024-06-01", endDate: "2024-08-31", status: "غير فعال" },
  ];
  
  const promotionalDiscounts = [
    { id: 1, code: "PROMO2024", name: "خصم ترويجي 15%", type: "نسبة مئوية", value: "15%", appliesTo: "كل المنتجات", startDate: "2024-04-15", endDate: "2024-05-15", status: "فعال" },
    { id: 2, code: "NEWCUST", name: "خصم عملاء جدد", type: "نسبة مئوية", value: "20%", appliesTo: "أول طلب", startDate: "2024-01-01", endDate: "2024-12-31", status: "فعال" },
  ];
  
  const quantityDiscounts = [
    { id: 1, name: "خصم الكميات الكبيرة", minQuantity: 10, maxQuantity: 50, discountValue: "5%", appliesTo: "كل المنتجات", status: "فعال" },
    { id: 2, name: "خصم الجملة", minQuantity: 51, maxQuantity: 100, discountValue: "10%", appliesTo: "منتجات محددة", status: "فعال" },
    { id: 3, name: "خصم كبار التجار", minQuantity: 101, maxQuantity: null, discountValue: "15%", appliesTo: "كل المنتجات", status: "فعال" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <PercentCircle className="h-5 w-5 text-teal-600" />
            إدارة الخصومات
          </CardTitle>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              تصفية
            </Button>
            <Button className="bg-teal hover:bg-teal-dark text-white flex items-center gap-2">
              <Plus size={16} />
              إضافة خصم جديد
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative w-full md:w-1/3">
            <Input
              placeholder="بحث عن خصم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="mr-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="حالة الخصم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الخصومات</SelectItem>
                <SelectItem value="active">الخصومات الفعالة</SelectItem>
                <SelectItem value="inactive">الخصومات غير الفعالة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="regular" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="regular">الخصومات العادية</TabsTrigger>
            <TabsTrigger value="promotional">الخصومات الترويجية</TabsTrigger>
            <TabsTrigger value="quantity">خصومات الكميات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regular">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الكود</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>القيمة</TableHead>
                  <TableHead>ينطبق على</TableHead>
                  <TableHead>تاريخ البداية</TableHead>
                  <TableHead>تاريخ النهاية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regularDiscounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>{discount.code}</TableCell>
                    <TableCell>{discount.name}</TableCell>
                    <TableCell>{discount.type}</TableCell>
                    <TableCell>{discount.value}</TableCell>
                    <TableCell>{discount.appliesTo}</TableCell>
                    <TableCell>{discount.startDate}</TableCell>
                    <TableCell>{discount.endDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${discount.status === 'فعال' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {discount.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="promotional">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الكود</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>القيمة</TableHead>
                  <TableHead>ينطبق على</TableHead>
                  <TableHead>تاريخ البداية</TableHead>
                  <TableHead>تاريخ النهاية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotionalDiscounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>{discount.code}</TableCell>
                    <TableCell>{discount.name}</TableCell>
                    <TableCell>{discount.type}</TableCell>
                    <TableCell>{discount.value}</TableCell>
                    <TableCell>{discount.appliesTo}</TableCell>
                    <TableCell>{discount.startDate}</TableCell>
                    <TableCell>{discount.endDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${discount.status === 'فعال' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {discount.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="quantity">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الحد الأدنى للكمية</TableHead>
                  <TableHead>الحد الأقصى للكمية</TableHead>
                  <TableHead>قيمة الخصم</TableHead>
                  <TableHead>ينطبق على</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quantityDiscounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>{discount.name}</TableCell>
                    <TableCell>{discount.minQuantity}</TableCell>
                    <TableCell>{discount.maxQuantity || 'غير محدود'}</TableCell>
                    <TableCell>{discount.discountValue}</TableCell>
                    <TableCell>{discount.appliesTo}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${discount.status === 'فعال' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {discount.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

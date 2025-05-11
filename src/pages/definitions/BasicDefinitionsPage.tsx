
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Building, CreditCard, Landmark, CalendarRange, User, Settings } from "lucide-react";

const BasicDefinitionsPage = () => {
  return (
    <PageContainer title="التعاريف الأساسية">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">التعاريف الأساسية للنظام</h1>
          <Button>
            <Plus className="ml-2 h-4 w-4" /> إضافة تعريف جديد
          </Button>
        </div>

        <Tabs defaultValue="branches">
          <TabsList className="mb-4">
            <TabsTrigger value="branches">الفروع</TabsTrigger>
            <TabsTrigger value="fiscal-periods">الفترات المالية</TabsTrigger>
            <TabsTrigger value="payment-methods">طرق الدفع</TabsTrigger>
            <TabsTrigger value="banks">البنوك</TabsTrigger>
            <TabsTrigger value="roles">الأدوار والصلاحيات</TabsTrigger>
          </TabsList>

          <TabsContent value="branches" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5 text-primary" />
                  الفروع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-right">رمز الفرع</th>
                        <th className="p-2 text-right">اسم الفرع</th>
                        <th className="p-2 text-right">العنوان</th>
                        <th className="p-2 text-right">المدير</th>
                        <th className="p-2 text-right">الحالة</th>
                        <th className="p-2 text-right">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">001</td>
                        <td className="p-2">الفرع الرئيسي</td>
                        <td className="p-2">الرياض، شارع العليا</td>
                        <td className="p-2">أحمد محمد</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نشط</span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">حذف</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">002</td>
                        <td className="p-2">فرع جدة</td>
                        <td className="p-2">جدة، شارع التحلية</td>
                        <td className="p-2">خالد أحمد</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نشط</span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">حذف</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fiscal-periods">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarRange className="mr-2 h-5 w-5 text-primary" />
                  الفترات المالية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-right">الفترة</th>
                        <th className="p-2 text-right">تاريخ البداية</th>
                        <th className="p-2 text-right">تاريخ النهاية</th>
                        <th className="p-2 text-right">الحالة</th>
                        <th className="p-2 text-right">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">2023 - الربع الأول</td>
                        <td className="p-2">1 يناير 2023</td>
                        <td className="p-2">31 مارس 2023</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">مغلقة</span>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">تفاصيل</Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">2023 - الربع الثاني</td>
                        <td className="p-2">1 أبريل 2023</td>
                        <td className="p-2">30 يونيو 2023</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">مفتوحة</span>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">تفاصيل</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment-methods">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  طرق الدفع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-right">الرمز</th>
                        <th className="p-2 text-right">الاسم</th>
                        <th className="p-2 text-right">الوصف</th>
                        <th className="p-2 text-right">الحالة</th>
                        <th className="p-2 text-right">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">CASH</td>
                        <td className="p-2">نقدي</td>
                        <td className="p-2">الدفع النقدي المباشر</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">مفعّل</span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">حذف</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">BANK</td>
                        <td className="p-2">تحويل بنكي</td>
                        <td className="p-2">التحويل المباشر للحساب البنكي</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">مفعّل</span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">حذف</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Landmark className="mr-2 h-5 w-5 text-primary" />
                  البنوك وحساباتها
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-right">اسم البنك</th>
                        <th className="p-2 text-right">الفرع</th>
                        <th className="p-2 text-right">رقم الحساب</th>
                        <th className="p-2 text-right">العملة</th>
                        <th className="p-2 text-right">الحالة</th>
                        <th className="p-2 text-right">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">البنك الأهلي</td>
                        <td className="p-2">الرياض</td>
                        <td className="p-2">SA1234567890</td>
                        <td className="p-2">ريال سعودي</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نشط</span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">حذف</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">مصرف الراجحي</td>
                        <td className="p-2">جدة</td>
                        <td className="p-2">SA0987654321</td>
                        <td className="p-2">ريال سعودي</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نشط</span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">حذف</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  الأدوار والصلاحيات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-right">الدور</th>
                        <th className="p-2 text-right">الوصف</th>
                        <th className="p-2 text-right">عدد المستخدمين</th>
                        <th className="p-2 text-right">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">مدير النظام</td>
                        <td className="p-2">صلاحيات كاملة على النظام</td>
                        <td className="p-2">2</td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm">الصلاحيات</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">محاسب</td>
                        <td className="p-2">صلاحيات خاصة بالمحاسبة والمالية</td>
                        <td className="p-2">5</td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">تعديل</Button>
                            <Button variant="ghost" size="sm">الصلاحيات</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default BasicDefinitionsPage;

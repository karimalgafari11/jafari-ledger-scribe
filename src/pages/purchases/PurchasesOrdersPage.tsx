
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PurchasesOrdersPage = () => {
  const navigate = useNavigate();
  
  // بيانات وهمية لأوامر الشراء
  const dummyOrders = [
    { id: "PO001", date: "2025-05-10", vendor: "شركة الأمل للتجارة", total: 5600, status: "قيد الانتظار" },
    { id: "PO002", date: "2025-05-08", vendor: "مؤسسة التقدم", total: 3200, status: "موافق عليه" },
    { id: "PO003", date: "2025-05-05", vendor: "مصنع المستقبل", total: 9800, status: "مكتمل" },
  ];

  return (
    <PageContainer title="أوامر الشراء">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة أوامر الشراء</h1>
          <Button onClick={() => navigate("/purchases/orders/new")}>
            <FilePlus className="ml-2 h-4 w-4" /> أمر شراء جديد
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>قائمة أوامر الشراء</CardTitle>
          </CardHeader>
          <CardContent>
            {dummyOrders.length > 0 ? (
              <div className="rounded-md border overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الأمر</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المورد</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dummyOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="ml-2 h-4 w-4 text-gray-400" />
                            {order.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="ml-2 h-4 w-4 text-gray-400" />
                            {order.vendor}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total.toLocaleString()} ريال</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 
                            order.status === 'قيد الانتظار' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/purchases/orders/${order.id}`)}>
                              <FileText className="ml-1 h-4 w-4" /> عرض
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-100 p-6 rounded-md text-center">
                <p className="text-xl text-gray-600">لا توجد أوامر شراء</p>
                <Button variant="outline" className="mt-4">
                  <FileText className="ml-2 h-4 w-4" /> استعراض الأرشيف
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default PurchasesOrdersPage;

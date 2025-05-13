
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Network, UserPlus, FileText, BarChart2, ShoppingBag } from "lucide-react";
import { VendorStatsGrid } from "@/components/vendors/VendorStatsGrid";

const VendorsPage: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "إدارة الموردين",
      description: "عرض وإضافة وتعديل بيانات الموردين",
      icon: <UserPlus className="h-10 w-10 text-indigo-600" />,
      path: "/vendors/manage"
    },
    {
      title: "كشوفات الحسابات",
      description: "عرض كشوف حسابات الموردين والمدفوعات",
      icon: <FileText className="h-10 w-10 text-emerald-600" />,
      path: "/vendors/statement"
    },
    {
      title: "تقارير الموردين",
      description: "عرض تقارير تحليلية عن الموردين والمشتريات",
      icon: <BarChart2 className="h-10 w-10 text-amber-600" />,
      path: "/vendors/reports"
    },
    {
      title: "المشتريات",
      description: "إدارة فواتير وأوامر الشراء والمرتجعات",
      icon: <ShoppingBag className="h-10 w-10 text-blue-600" />,
      path: "/purchases"
    }
  ];

  return (
    <Layout className="h-screen overflow-hidden bg-gray-50">
      <div className="flex flex-col h-full">
        <Header title="نظام الموردين" icon={<Network className="ml-2 h-6 w-6" />} />
        
        <div className="flex-1 overflow-auto p-6">
          <VendorStatsGrid />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {menuItems.map((item, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  {item.icon}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  أحدث المعاملات مع الموردين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  لا توجد معاملات حديثة للعرض
                </div>
                <div className="flex justify-center mt-4">
                  <Button onClick={() => navigate('/purchases/new')}>
                    إنشاء فاتورة مشتريات جديدة
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  الموردين النشطين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  لا يوجد موردين نشطين للعرض
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" onClick={() => navigate('/vendors/manage')}>
                    إدارة الموردين
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorsPage;

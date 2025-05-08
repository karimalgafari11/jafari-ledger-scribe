import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Report } from "@/hooks/useReports";
import { useReports } from "@/hooks/useReports";
import CustomReportBuilder from "@/components/reports/CustomReportBuilder";

const CustomReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("recent");
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  
  const recentReports: Report[] = [
    {
      id: "1", // Changed to string
      title: "تقرير المبيعات الشهري",
      name: "تقرير المبيعات الشهري",
      description: "تفاصيل المبيعات حسب المنتج والعميل للشهر الحالي",
      date: "2023-05-01",
      category: "sales",
      favorite: true,
      author: "محمد أحمد",
      type: "monthly",
      createdAt: new Date(2023, 4, 1),
      lastRun: new Date(2023, 4, 28)
    },
    {
      id: "2", // Changed to string
      title: "تقرير المصروفات الربع سنوي",
      name: "تقرير المصروفات الربع سنوي",
      description: "تحليل المصروفات حسب الفئة والوقت للربع الحالي",
      date: "2023-04-15",
      category: "expenses",
      favorite: false,
      author: "ليلى سالم",
      type: "quarterly",
      createdAt: new Date(2023, 3, 15),
      lastRun: new Date(2023, 4, 15)
    },
    {
      id: "3", // Changed to string
      title: "تقرير المخزون اليومي",
      name: "تقرير المخزون اليومي",
      description: "ملخص مستويات المخزون وتحديثات المنتجات اليومية",
      date: "2023-05-29",
      category: "inventory",
      favorite: true,
      author: "خالد عبد الله",
      type: "daily",
      createdAt: new Date(2023, 2, 1),
      lastRun: new Date(2023, 4, 29)
    }
  ];

  const savedReports: Report[] = [
    {
      id: "101", // Changed to string
      title: "تقرير الميزانية السنوية",
      name: "تقرير الميزانية السنوية",
      description: "تحليل الميزانية والمصروفات للسنة المالية",
      date: "2023-01-15",
      category: ["finance", "budget"],
      favorite: true,
      author: "سارة محمد",
      type: "annual",
      createdAt: new Date(2023, 0, 15),
      lastRun: new Date(2023, 3, 1)
    },
    {
      id: "102", // Changed to string
      title: "تقرير الأرباح والخسائر",
      name: "تقرير الأرباح والخسائر",
      description: "بيان الأرباح والخسائر ربع السنوي",
      date: "2023-03-31",
      category: ["finance", "profit"],
      favorite: false,
      author: "أحمد علي",
      type: "quarterly",
      createdAt: new Date(2022, 9, 1),
      lastRun: new Date(2023, 2, 31)
    },
    {
      id: "103", // Changed to string
      title: "تقرير التدفقات النقدية",
      name: "تقرير التدفقات النقدية",
      description: "تحليل التدفقات النقدية الداخلة والخارجة",
      date: "2023-05-01",
      category: ["finance", "cashflow"],
      favorite: true,
      author: "نورة إبراهيم",
      type: "monthly",
      createdAt: new Date(2023, 1, 1),
      lastRun: new Date(2023, 4, 1)
    }
  ];
  
  const initialReports = activeTab === "recent" ? recentReports : savedReports;
  const {
    reports,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    toggleFavorite,
  } = useReports(initialReports);

  return (
    <div className="container mx-auto p-6">
      <Header title="التقارير المخصصة" showBack={true}>
        <Button onClick={() => setIsCreatingReport(true)}>
          <Plus className="ml-2 h-4 w-4" /> إنشاء تقرير جديد
        </Button>
      </Header>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="ابحث عن تقرير..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع الفئات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              <SelectItem value="sales">المبيعات</SelectItem>
              <SelectItem value="expenses">المصروفات</SelectItem>
              <SelectItem value="inventory">المخزون</SelectItem>
              <SelectItem value="finance">المالية</SelectItem>
              <SelectItem value="budget">الميزانية</SelectItem>
              <SelectItem value="favorites">المفضلة</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Filter className="ml-2 h-4 w-4" />
            فلترة
          </Button>
          
          <Button variant="outline">
            <Calendar className="ml-2 h-4 w-4" />
            التواريخ
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">التقارير الأخيرة</TabsTrigger>
          <TabsTrigger value="saved">التقارير المحفوظة</TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <CardTitle>{report.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="secondary">{report.category}</Badge>
                    <Button variant="outline" size="sm">
                      عرض التقرير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <CardTitle>{report.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="secondary">{report.category}</Badge>
                    <Button variant="outline" size="sm">
                      عرض التقرير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {isCreatingReport && (
        <CustomReportBuilder onSaveReport={(reportData) => {
          console.log("Report data saved:", reportData);
          setIsCreatingReport(false);
        }} />
      )}
    </div>
  );
};

export default CustomReportsPage;

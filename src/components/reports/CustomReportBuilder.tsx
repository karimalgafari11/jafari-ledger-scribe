
import React, { useState } from 'react';
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, X } from "lucide-react";

interface CustomReportBuilderProps {
  onSave: (report: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export const CustomReportBuilder: React.FC<CustomReportBuilderProps> = ({
  onSave,
  onCancel,
  initialData
}) => {
  const [reportData, setReportData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || 'financial',
    type: initialData?.type || 'table',
    columns: initialData?.columns || [],
    filters: initialData?.filters || [],
    grouping: initialData?.grouping || []
  });

  const handleSave = () => {
    onSave(reportData);
  };

  return (
    <div className="container mx-auto p-6">
      <Header title={initialData ? "تعديل تقرير" : "إنشاء تقرير جديد"} showBack={true}>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            <X className="ml-2 h-4 w-4" /> إلغاء
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!reportData.name}>
            <Save className="ml-2 h-4 w-4" /> حفظ التقرير
          </Button>
        </div>
      </Header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>معلومات التقرير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم التقرير</Label>
                <Input
                  id="name"
                  value={reportData.name}
                  onChange={(e) => setReportData({ ...reportData, name: e.target.value })}
                  placeholder="أدخل اسم التقرير"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف التقرير</Label>
                <Textarea
                  id="description"
                  value={reportData.description}
                  onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                  placeholder="أدخل وصفاً للتقرير"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">فئة التقرير</Label>
                <Select
                  value={reportData.category}
                  onValueChange={(value) => setReportData({ ...reportData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر فئة التقرير" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">مالي</SelectItem>
                    <SelectItem value="sales">مبيعات</SelectItem>
                    <SelectItem value="inventory">مخزون</SelectItem>
                    <SelectItem value="customers">العملاء</SelectItem>
                    <SelectItem value="hr">موارد بشرية</SelectItem>
                    <SelectItem value="projects">مشاريع</SelectItem>
                    <SelectItem value="custom">مخصص</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">نوع التقرير</Label>
                <Select
                  value={reportData.type}
                  onValueChange={(value) => setReportData({ ...reportData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع التقرير" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table">جدول</SelectItem>
                    <SelectItem value="chart">رسم بياني</SelectItem>
                    <SelectItem value="mixed">مختلط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>تكوين التقرير</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="columns">
                <TabsList className="mb-4">
                  <TabsTrigger value="columns">الأعمدة</TabsTrigger>
                  <TabsTrigger value="filters">تصفية</TabsTrigger>
                  <TabsTrigger value="grouping">تجميع</TabsTrigger>
                  <TabsTrigger value="charts">الرسوم البيانية</TabsTrigger>
                </TabsList>
                
                <TabsContent value="columns">
                  <p className="text-muted-foreground">
                    اختر الأعمدة التي تريد عرضها في التقرير
                  </p>
                  {/* Column selection UI will be implemented here */}
                  <div className="bg-muted rounded-md p-4 mt-4 text-center">
                    <p className="text-muted-foreground">سيتم إضافة محدد الأعمدة قريباً</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="filters">
                  <p className="text-muted-foreground">
                    أضف عوامل تصفية لتحديد البيانات المعروضة في التقرير
                  </p>
                  {/* Filters UI will be implemented here */}
                  <div className="bg-muted rounded-md p-4 mt-4 text-center">
                    <p className="text-muted-foreground">سيتم إضافة محدد عوامل التصفية قريباً</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="grouping">
                  <p className="text-muted-foreground">
                    حدد كيفية تجميع بيانات التقرير
                  </p>
                  {/* Grouping UI will be implemented here */}
                  <div className="bg-muted rounded-md p-4 mt-4 text-center">
                    <p className="text-muted-foreground">سيتم إضافة خيارات التجميع قريباً</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="charts">
                  <p className="text-muted-foreground">
                    قم بإعداد الرسوم البيانية للتقرير
                  </p>
                  {/* Charts UI will be implemented here */}
                  <div className="bg-muted rounded-md p-4 mt-4 text-center">
                    <p className="text-muted-foreground">سيتم إضافة إعدادات الرسوم البيانية قريباً</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="ml-2 h-4 w-4" /> رجوع
        </Button>
        <Button onClick={handleSave} disabled={!reportData.name}>
          <Save className="ml-2 h-4 w-4" /> حفظ التقرير
        </Button>
      </div>
    </div>
  );
};

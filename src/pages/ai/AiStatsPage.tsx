
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AiStatsPage: React.FC = () => {
  return (
    <PageContainer title="إحصائيات المساعد الذكي">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">إحصائيات وتحليلات المساعد الذكي</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">عدد المحادثات</CardTitle>
              <BarChart className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">126</div>
              <p className="text-sm text-muted-foreground mt-1">+12% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">معدل الاستجابة</CardTitle>
              <LineChart className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">98.5%</div>
              <p className="text-sm text-muted-foreground mt-1">+3.2% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">وقت الاستجابة</CardTitle>
              <PieChart className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.4s</div>
              <p className="text-sm text-muted-foreground mt-1">-0.3s عن الشهر الماضي</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>أنواع الاستعلامات</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>استعلامات المخزون</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: "35%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>استعلامات الفواتير</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "28%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>استعلامات المبيعات</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "22%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>استعلامات العملاء</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>أداء المساعد الذكي</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>دقة الإجابات</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: "92%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>نسبة الطلبات المنفذة</span>
                  <span className="font-medium">88%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "88%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>رضا المستخدمين</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "95%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>معدل استخدام الميزات</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>أكثر الأسئلة تكرارًا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                  <span>"كيف يمكنني إنشاء فاتورة جديدة؟"</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">32 مرة</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                  <span>"ما هي المنتجات الأكثر مبيعًا هذا الشهر؟"</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">27 مرة</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                  <span>"كيف أحسب ضريبة القيمة المضافة؟"</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">25 مرة</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                  <span>"كم عدد المنتجات المتوفرة في المخزون؟"</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">23 مرة</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                  <span>"قم بإنشاء تقرير المبيعات الشهري"</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">21 مرة</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button variant="outline">عرض المزيد من الإحصائيات</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default AiStatsPage;

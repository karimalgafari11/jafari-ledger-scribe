
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SystemAlert } from "@/types/ai";

interface AlertsTabsProps {
  alerts: SystemAlert[];
}

const AlertsTabs: React.FC<AlertsTabsProps> = ({ alerts }) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            التنبيهات والإشعارات
          </CardTitle>
          <Badge className="bg-amber-100 text-amber-800 border-amber-300">{alerts.length} تنبيهات جديدة</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="alerts" className="w-1/2">تنبيهات مالية</TabsTrigger>
            <TabsTrigger value="tasks" className="w-1/2">مهام مستحقة</TabsTrigger>
          </TabsList>
          <TabsContent value="alerts">
            <ScrollArea className="h-64 w-full">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد تنبيهات جديدة
                </div>
              ) : (
                <div className="space-y-4 mt-2">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      alert.priority === 'high' ? 'bg-red-50 border-red-200 hover:bg-red-100' : 
                      alert.priority === 'medium' ? 'bg-amber-50 border-amber-200 hover:bg-amber-100' : 
                      'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    } cursor-pointer transition-colors`}>
                      <div className="flex justify-between">
                        <h4 className={`font-medium ${
                          alert.priority === 'high' ? 'text-red-700' : 
                          alert.priority === 'medium' ? 'text-amber-700' : 
                          'text-blue-700'
                        }`}>
                          {alert.type === 'inventory' && 'المخزون'}
                          {alert.type === 'expenses' && 'المصروفات'}
                          {alert.type === 'invoices' && 'الفواتير'}
                          {alert.type === 'customers' && 'العملاء'}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{alert.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="tasks">
            <ScrollArea className="h-64 w-full">
              <div className="space-y-4 mt-2">
                <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-amber-700">مراجعة فواتير مستحقة</h4>
                    <span className="text-xs text-gray-500">اليوم</span>
                  </div>
                  <p className="text-sm mt-1">مراجعة 8 فواتير مستحقة السداد</p>
                </div>
                <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-blue-700">تسوية حسابات بنكية</h4>
                    <span className="text-xs text-gray-500">غدًا</span>
                  </div>
                  <p className="text-sm mt-1">إجراء تسوية للحسابات البنكية لشهر مايو</p>
                </div>
                <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-red-700">سداد مستحقات ضريبية</h4>
                    <span className="text-xs text-gray-500">بعد 3 أيام</span>
                  </div>
                  <p className="text-sm mt-1">سداد الضرائب المستحقة للربع الثاني من العام</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" className="text-xs">
            إعدادات التنبيهات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsTabs;


import React from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { ChatInterface } from "@/components/ai/ChatInterface";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, Brain, Shield, Settings, Activity,
  AlertTriangle, Bell, Database, Server, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { SystemAlert } from "@/types/ai";

const AiAssistantPage: React.FC = () => {
  const { 
    securityMode, 
    setSecurityLevel, 
    hasFullAccess, 
    toggleFullAccess, 
    getSystemAlerts
  } = useAiAssistant();
  
  // الحصول على تنبيهات النظام
  const systemAlerts: SystemAlert[] = getSystemAlerts();
  
  // تصنيف التنبيهات حسب النوع
  const inventoryAlerts = systemAlerts.filter(alert => alert.type === "inventory");
  const expenseAlerts = systemAlerts.filter(alert => alert.type === "expenses");
  const invoiceAlerts = systemAlerts.filter(alert => alert.type === "invoices");
  const customerAlerts = systemAlerts.filter(alert => alert.type === "customers");
  
  // تصنيف التنبيهات حسب الأولوية
  const highPriorityAlerts = systemAlerts.filter(alert => alert.priority === "high");
  
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col rtl">
      <Header title="المساعد الذكي" showBack={true} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* جزء المحادثة */}
        <Card className="lg:col-span-2 shadow-sm border-blue-100 overflow-hidden flex flex-col h-[calc(100vh-13rem)]">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-b flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-5 w-5 ml-2 text-blue-600" />
              <h3 className="font-medium">المحادثة مع المساعد الذكي</h3>
              <Badge variant="outline" className="mr-2 bg-blue-50 text-xs">
                {securityMode === "standard" ? "وضع قياسي" : 
                 securityMode === "enhanced" ? "وضع محسّن" : "وضع آمن"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Select
                value={securityMode}
                onValueChange={(value: 'standard' | 'enhanced' | 'strict') => setSecurityLevel(value)}
              >
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue placeholder="وضع الأمان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">وضع قياسي</SelectItem>
                  <SelectItem value="enhanced">وضع محسّن</SelectItem>
                  <SelectItem value="strict">وضع آمن</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleFullAccess}
                className={`text-xs ${hasFullAccess ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}
              >
                {hasFullAccess ? (
                  <>
                    <Shield className="h-3.5 w-3.5 ml-1.5" />
                    وصول كامل
                  </>
                ) : (
                  <>
                    <Shield className="h-3.5 w-3.5 ml-1.5" />
                    وصول مقيد
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <CardContent className="p-0 flex-grow overflow-hidden">
            <ChatInterface />
          </CardContent>
        </Card>
        
        {/* جزء التنبيهات والمعلومات */}
        <div className="space-y-4 overflow-auto h-[calc(100vh-13rem)]">
          {/* ملخص التنبيهات */}
          <Card className="shadow-sm">
            <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b flex items-center">
              <Bell className="h-5 w-5 ml-2 text-amber-600" />
              <h3 className="font-medium">تنبيهات النظام</h3>
              <Badge variant="outline" className="mr-2 bg-amber-100 text-amber-800 text-xs">
                {systemAlerts.length} تنبيه
              </Badge>
            </div>
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-blue-50 p-2 rounded-md text-center">
                  <div className="text-xs text-muted-foreground">المخزون</div>
                  <div className="text-lg font-semibold">{inventoryAlerts.length}</div>
                </div>
                <div className="bg-green-50 p-2 rounded-md text-center">
                  <div className="text-xs text-muted-foreground">المصروفات</div>
                  <div className="text-lg font-semibold">{expenseAlerts.length}</div>
                </div>
                <div className="bg-purple-50 p-2 rounded-md text-center">
                  <div className="text-xs text-muted-foreground">الفواتير</div>
                  <div className="text-lg font-semibold">{invoiceAlerts.length}</div>
                </div>
                <div className="bg-amber-50 p-2 rounded-md text-center">
                  <div className="text-xs text-muted-foreground">العملاء</div>
                  <div className="text-lg font-semibold">{customerAlerts.length}</div>
                </div>
              </div>
              
              {highPriorityAlerts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <AlertTriangle className="h-3.5 w-3.5 ml-1 text-red-500" />
                    تنبيهات عاجلة
                  </h4>
                  <div className="space-y-1.5 max-h-32 overflow-auto">
                    {highPriorityAlerts.slice(0, 3).map((alert, index) => (
                      <div key={index} className="bg-red-50 p-2 rounded-md text-sm border border-red-100 flex items-start">
                        <AlertTriangle className="h-4 w-4 ml-1.5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-red-800">{alert.message}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString('ar-SA')}
                          </div>
                        </div>
                      </div>
                    ))}
                    {highPriorityAlerts.length > 3 && (
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        عرض كل التنبيهات ({highPriorityAlerts.length})
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* بطاقات الوظائف السريعة */}
          <Card className="shadow-sm">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-b flex items-center">
              <Activity className="h-5 w-5 ml-2 text-blue-600" />
              <h3 className="font-medium">الوظائف السريعة</h3>
            </div>
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto py-3 justify-start">
                  <Search className="ml-2 h-4 w-4" />
                  <div className="text-right">
                    <div className="font-medium">تحليل بيانات</div>
                    <div className="text-xs text-muted-foreground">استخراج المعلومات</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-3 justify-start">
                  <Database className="ml-2 h-4 w-4" />
                  <div className="text-right">
                    <div className="font-medium">تحسين الأداء</div>
                    <div className="text-xs text-muted-foreground">اقتراحات للتحسين</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-3 justify-start">
                  <Server className="ml-2 h-4 w-4" />
                  <div className="text-right">
                    <div className="font-medium">فحص النظام</div>
                    <div className="text-xs text-muted-foreground">كشف المشكلات</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-3 justify-start">
                  <Brain className="ml-2 h-4 w-4" />
                  <div className="text-right">
                    <div className="font-medium">إنشاء تقرير</div>
                    <div className="text-xs text-muted-foreground">تقارير تحليلية</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* إعدادات المحادثة */}
          <Card className="shadow-sm">
            <div className="p-3 bg-gradient-to-r from-slate-50 to-gray-50 border-b flex items-center">
              <Settings className="h-5 w-5 ml-2 text-slate-600" />
              <h3 className="font-medium">إعدادات المساعد</h3>
            </div>
            <CardContent className="p-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">حفظ سجل المحادثات</div>
                    <div className="text-xs text-muted-foreground">الاحتفاظ بسجل المحادثات السابقة</div>
                  </div>
                  <div className="w-8 h-4 bg-blue-400 rounded-full relative cursor-pointer">
                    <div className="absolute right-0 top-0 bg-white w-4 h-4 rounded-full shadow"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">التحقق من صحة البيانات</div>
                    <div className="text-xs text-muted-foreground">التحقق من صحة البيانات المدخلة</div>
                  </div>
                  <div className="w-8 h-4 bg-blue-400 rounded-full relative cursor-pointer">
                    <div className="absolute right-0 top-0 bg-white w-4 h-4 rounded-full shadow"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">اقتراحات تلقائية</div>
                    <div className="text-xs text-muted-foreground">عرض اقتراحات بناءً على الاستخدام</div>
                  </div>
                  <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-0 top-0 bg-white w-4 h-4 rounded-full shadow"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;

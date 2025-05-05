
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { 
  ExternalLink, 
  Globe, 
  Database, 
  FileText, 
  CreditCard, 
  Zap, 
  AlertTriangle,
  Check
} from "lucide-react";

// تعريف أنواع البيانات للاتصالات الخارجية
interface ExternalSystem {
  id: string;
  name: string;
  type: 'erp' | 'accounting' | 'banking' | 'ecommerce' | 'payment' | 'custom';
  status: 'active' | 'inactive' | 'pending' | 'error';
  lastSync?: Date;
  url?: string;
  apiKey?: string;
  description?: string;
}

// بيانات تجريبية للأنظمة المتكاملة
const mockExternalSystems: ExternalSystem[] = [
  {
    id: "sys-1",
    name: "نظام إدارة الموارد (ERP)",
    type: "erp",
    status: "active",
    lastSync: new Date(2023, 4, 15),
    url: "https://erp.example.com/api",
    description: "نظام إدارة الموارد الرئيسي للشركة"
  },
  {
    id: "sys-2",
    name: "بوابة الدفع الإلكتروني",
    type: "payment",
    status: "active",
    lastSync: new Date(2023, 4, 18),
    url: "https://payments.example.com/api",
    description: "نظام معالجة المدفوعات والمعاملات المالية"
  },
  {
    id: "sys-3",
    name: "منصة التجارة الإلكترونية",
    type: "ecommerce",
    status: "error",
    lastSync: new Date(2023, 4, 10),
    url: "https://shop.example.com/integration",
    description: "منصة المتجر الإلكتروني للشركة"
  },
  {
    id: "sys-4",
    name: "النظام البنكي",
    type: "banking",
    status: "inactive",
    url: "https://bank.example.com/api",
    description: "واجهة الربط مع النظام البنكي للتحويلات والتسويات"
  },
  {
    id: "sys-5",
    name: "نظام الفواتير الإلكترونية",
    type: "accounting",
    status: "pending",
    url: "https://e-invoicing.example.com/api",
    description: "نظام إدارة وإصدار الفواتير الإلكترونية"
  }
];

const ExternalSystemsPage = () => {
  const [activeTab, setActiveTab] = useState("systems");
  const [systems, setSystems] = useState<ExternalSystem[]>(mockExternalSystems);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isWebhookLoading, setIsWebhookLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      type: "custom",
      url: "",
      apiKey: "",
      description: ""
    }
  });

  // إضافة نظام خارجي جديد
  const handleAddSystem = (data: any) => {
    const newSystem: ExternalSystem = {
      id: `sys-${Date.now()}`,
      name: data.name,
      type: data.type as any,
      status: "inactive",
      url: data.url,
      apiKey: data.apiKey,
      description: data.description
    };

    setSystems([...systems, newSystem]);
    form.reset();
    toast.success("تم إضافة النظام الخارجي بنجاح");
  };

  // حذف نظام خارجي
  const handleDeleteSystem = (id: string) => {
    setSystems(systems.filter(sys => sys.id !== id));
    toast.success("تم حذف النظام الخارجي بنجاح");
  };

  // تغيير حالة نظام خارجي
  const handleToggleSystemStatus = (id: string) => {
    setSystems(systems.map(sys => {
      if (sys.id === id) {
        return {
          ...sys,
          status: sys.status === "active" ? "inactive" : "active"
        };
      }
      return sys;
    }));
    
    toast.success("تم تحديث حالة النظام الخارجي بنجاح");
  };

  // مزامنة نظام خارجي
  const handleSyncSystem = (id: string) => {
    toast.info("جاري مزامنة البيانات مع النظام الخارجي...");
    
    // محاكاة المزامنة - بعد ثانيتين يتم تحديث آخر مزامنة
    setTimeout(() => {
      setSystems(systems.map(sys => {
        if (sys.id === id) {
          return {
            ...sys,
            lastSync: new Date(),
            status: "active"
          };
        }
        return sys;
      }));
      
      toast.success("تمت المزامنة بنجاح");
    }, 2000);
  };

  // إرسال طلب Webhook
  const handleWebhookTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast.error("الرجاء إدخال عنوان Webhook");
      return;
    }

    setIsWebhookLoading(true);
    console.log("Triggering webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: "نظام المحاسبة",
          event: "تحديث البيانات",
          data: {
            message: "تم تحديث البيانات المحاسبية بنجاح"
          }
        }),
      });

      toast.success("تم إرسال طلب Webhook بنجاح");
    } catch (error) {
      console.error("خطأ في إرسال طلب Webhook:", error);
      toast.error("فشل في إرسال طلب Webhook");
    } finally {
      setIsWebhookLoading(false);
    }
  };

  // تحديد لون حالة النظام الخارجي
  const getStatusBadgeVariant = (status: ExternalSystem['status']) => {
    switch(status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'pending': return 'warning';
      case 'error': return 'destructive';
      default: return 'default';
    }
  };

  // الحصول على أيقونة نوع النظام الخارجي
  const getSystemTypeIcon = (type: ExternalSystem['type']) => {
    switch(type) {
      case 'erp': return <Database className="h-4 w-4" />;
      case 'accounting': return <FileText className="h-4 w-4" />;
      case 'banking': return <CreditCard className="h-4 w-4" />;
      case 'ecommerce': return <Globe className="h-4 w-4" />;
      case 'payment': return <CreditCard className="h-4 w-4" />;
      case 'custom': return <Zap className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">الربط مع الأنظمة الخارجية</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 rtl">
          <TabsTrigger value="systems" className="flex justify-center gap-2">
            <Database className="h-4 w-4" />
            الأنظمة المتكاملة
          </TabsTrigger>
          <TabsTrigger value="add" className="flex justify-center gap-2">
            <ExternalLink className="h-4 w-4" />
            إضافة نظام جديد
          </TabsTrigger>
          <TabsTrigger value="webhook" className="flex justify-center gap-2">
            <Zap className="h-4 w-4" />
            Webhook
          </TabsTrigger>
        </TabsList>

        <TabsContent value="systems" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>الأنظمة المتكاملة</CardTitle>
              <CardDescription>
                إدارة الأنظمة الخارجية المتكاملة مع نظام المحاسبة الخاص بك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>النظام</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر مزامنة</TableHead>
                    <TableHead>عنوان الواجهة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systems.map((system) => (
                    <TableRow key={system.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          {system.name}
                          {system.description && (
                            <span className="text-xs text-muted-foreground">{system.description}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getSystemTypeIcon(system.type)}
                          <span>{system.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(system.status) as any}>
                          {system.status === 'active' ? 'نشط' : 
                           system.status === 'inactive' ? 'غير نشط' : 
                           system.status === 'pending' ? 'قيد الانتظار' : 'خطأ'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {system.lastSync ? new Date(system.lastSync).toLocaleString('ar-SA') : '-'}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {system.url || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleSyncSystem(system.id)}>
                            مزامنة
                          </Button>
                          <Button 
                            variant={system.status === 'active' ? 'destructive' : 'default'} 
                            size="sm"
                            onClick={() => handleToggleSystemStatus(system.id)}
                          >
                            {system.status === 'active' ? 'إيقاف' : 'تفعيل'}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteSystem(system.id)}>
                            حذف
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>إضافة نظام خارجي جديد</CardTitle>
              <CardDescription>
                قم بإضافة بيانات الاتصال بنظام خارجي للتكامل معه
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(handleAddSystem)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <FormLabel>اسم النظام</FormLabel>
                    <Input
                      placeholder="أدخل اسم النظام الخارجي"
                      {...form.register("name", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>نوع النظام</FormLabel>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...form.register("type", { required: true })}
                    >
                      <option value="erp">نظام إدارة الموارد (ERP)</option>
                      <option value="accounting">نظام محاسبي</option>
                      <option value="banking">نظام بنكي</option>
                      <option value="ecommerce">نظام تجارة إلكترونية</option>
                      <option value="payment">نظام دفع إلكتروني</option>
                      <option value="custom">نظام مخصص</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <FormLabel>عنوان الواجهة البرمجية (API URL)</FormLabel>
                  <Input
                    placeholder="https://example.com/api"
                    {...form.register("url")}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>مفتاح الواجهة البرمجية (API Key)</FormLabel>
                  <Input
                    type="password"
                    placeholder="أدخل مفتاح الواجهة البرمجية"
                    {...form.register("apiKey")}
                  />
                </div>
                
                <div className="space-y-2">
                  <FormLabel>وصف النظام</FormLabel>
                  <Input
                    placeholder="أدخل وصفًا مختصرًا للنظام الخارجي"
                    {...form.register("description")}
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto">
                    إضافة النظام
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhook" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>إعداد Webhook</CardTitle>
              <CardDescription>
                استخدم Webhook لإرسال بيانات من النظام المحاسبي إلى أنظمة خارجية عند حدوث أحداث معينة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <p className="text-sm text-amber-700">
                  Webhook يسمح بإرسال بيانات إلى أنظمة خارجية. تأكد من صحة عنوان URL المستخدم.
                </p>
              </div>

              <form onSubmit={handleWebhookTrigger} className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>عنوان Webhook</FormLabel>
                  <Input
                    placeholder="https://example.com/webhook"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    أدخل عنوان URL الذي ترغب في إرسال البيانات إليه
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isWebhookLoading || !webhookUrl}
                    className="w-full md:w-auto"
                  >
                    {isWebhookLoading ? "جاري الإرسال..." : "اختبار Webhook"}
                  </Button>
                </div>
              </form>

              <div className="mt-8">
                <h3 className="font-medium mb-2">عنوان Webhook الخاص بنظامك</h3>
                <div className="p-4 bg-muted rounded-md flex items-center justify-between">
                  <code className="text-sm">https://yourapp.example.com/api/webhook</code>
                  <Button variant="ghost" size="sm">
                    نسخ
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  يمكن للأنظمة الخارجية استخدام هذا العنوان لإرسال بيانات إلى نظامك المحاسبي
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="font-medium">إعدادات الإشعارات</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">إشعار عند إضافة فاتورة جديدة</p>
                    <p className="text-xs text-muted-foreground">إرسال بيانات الفواتير الجديدة إلى الأنظمة الخارجية</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">إشعار عند تسجيل دفعة جديدة</p>
                    <p className="text-xs text-muted-foreground">إرسال بيانات المدفوعات إلى الأنظمة الخارجية</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">إشعار عند تغيير حالة الفاتورة</p>
                    <p className="text-xs text-muted-foreground">إرسال إشعار عند تحديث حالة الفواتير</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>حالة الاتصال بالأنظمة الخارجية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">أنظمة متصلة</p>
                    <p className="text-2xl font-bold text-green-800">
                      {systems.filter(s => s.status === 'active').length}
                    </p>
                  </div>
                  <div className="p-2 bg-green-200 rounded-full">
                    <Check className="h-5 w-5 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700">أنظمة بها أخطاء</p>
                    <p className="text-2xl font-bold text-red-800">
                      {systems.filter(s => s.status === 'error').length}
                    </p>
                  </div>
                  <div className="p-2 bg-red-200 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-red-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-700">أنظمة قيد الانتظار</p>
                    <p className="text-2xl font-bold text-yellow-800">
                      {systems.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <div className="p-2 bg-yellow-200 rounded-full">
                    <Database className="h-5 w-5 text-yellow-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">إجمالي الأنظمة</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {systems.length}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-200 rounded-full">
                    <Globe className="h-5 w-5 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExternalSystemsPage;

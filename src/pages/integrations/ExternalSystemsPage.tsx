
import React, { useState, useEffect } from "react";
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
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  ExternalLink, 
  Globe, 
  Database, 
  FileText, 
  CreditCard, 
  Zap, 
  AlertTriangle,
  Check,
  Link,
  Server,
  Webhook,
  PlugZap
} from "lucide-react";
import { IntegrationStatCards } from "@/components/integrations/IntegrationStatCards";
import { IntegrationActivityChart } from "@/components/integrations/IntegrationActivityChart";
import { SystemConnectionHealth } from "@/components/integrations/SystemConnectionHealth";
import Header from "@/components/Header";

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
  connections?: number;
  dataTransferred?: string;
  successRate?: number;
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
    description: "نظام إدارة الموارد الرئيسي للشركة",
    connections: 524,
    dataTransferred: "1.2 GB",
    successRate: 98.7
  },
  {
    id: "sys-2",
    name: "بوابة الدفع الإلكتروني",
    type: "payment",
    status: "active",
    lastSync: new Date(2023, 4, 18),
    url: "https://payments.example.com/api",
    description: "نظام معالجة المدفوعات والمعاملات المالية",
    connections: 872,
    dataTransferred: "756 MB",
    successRate: 99.5
  },
  {
    id: "sys-3",
    name: "منصة التجارة الإلكترونية",
    type: "ecommerce",
    status: "error",
    lastSync: new Date(2023, 4, 10),
    url: "https://shop.example.com/integration",
    description: "منصة المتجر الإلكتروني للشركة",
    connections: 142,
    dataTransferred: "3.5 GB",
    successRate: 85.2
  },
  {
    id: "sys-4",
    name: "النظام البنكي",
    type: "banking",
    status: "inactive",
    url: "https://bank.example.com/api",
    description: "واجهة الربط مع النظام البنكي للتحويلات والتسويات",
    connections: 0,
    dataTransferred: "0 KB",
    successRate: 0
  },
  {
    id: "sys-5",
    name: "نظام الفواتير الإلكترونية",
    type: "accounting",
    status: "pending",
    url: "https://e-invoicing.example.com/api",
    description: "نظام إدارة وإصدار الفواتير الإلكترونية",
    connections: 68,
    dataTransferred: "425 MB",
    successRate: 92.3
  }
];

// بيانات تجريبية لسجل الاتصالات
const connectionLogs = [
  { timestamp: new Date(2023, 5, 20, 10, 15), system: "نظام إدارة الموارد (ERP)", status: "success", message: "تمت مزامنة البيانات بنجاح", dataSize: "2.3 MB" },
  { timestamp: new Date(2023, 5, 20, 9, 30), system: "بوابة الدفع الإلكتروني", status: "success", message: "تم تحديث معلومات المدفوعات", dataSize: "450 KB" },
  { timestamp: new Date(2023, 5, 20, 8, 45), system: "منصة التجارة الإلكترونية", status: "error", message: "فشل في الاتصال - خطأ في المصادقة", dataSize: "0 KB" },
  { timestamp: new Date(2023, 5, 19, 22, 0), system: "نظام إدارة الموارد (ERP)", status: "success", message: "تمت مزامنة البيانات بنجاح", dataSize: "1.7 MB" },
  { timestamp: new Date(2023, 5, 19, 18, 30), system: "نظام الفواتير الإلكترونية", status: "warning", message: "تأخر في الاستجابة - تمت المزامنة جزئياً", dataSize: "820 KB" }
];

const ExternalSystemsPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [systems, setSystems] = useState<ExternalSystem[]>(mockExternalSystems);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isWebhookLoading, setIsWebhookLoading] = useState(false);
  const [healthCheckStatus, setHealthCheckStatus] = useState<{[key: string]: 'healthy' | 'degraded' | 'error'}>({});
  const navigate = useNavigate();

  // نموذج إضافة نظام خارجي
  const form = useForm({
    defaultValues: {
      name: "",
      type: "custom",
      url: "",
      apiKey: "",
      description: ""
    }
  });

  // محاكاة فحص حالة الأنظمة عند تحميل الصفحة
  useEffect(() => {
    const checkSystemsHealth = () => {
      const newHealthStatus: {[key: string]: 'healthy' | 'degraded' | 'error'} = {};
      
      systems.forEach(system => {
        if (system.status === 'active') {
          newHealthStatus[system.id] = Math.random() > 0.8 ? 'degraded' : 'healthy';
        } else if (system.status === 'error') {
          newHealthStatus[system.id] = 'error';
        } else {
          newHealthStatus[system.id] = 'degraded';
        }
      });
      
      setHealthCheckStatus(newHealthStatus);
    };
    
    checkSystemsHealth();
    
    // فحص الصحة كل 30 ثانية
    const intervalId = setInterval(checkSystemsHealth, 30000);
    return () => clearInterval(intervalId);
  }, [systems]);

  // إضافة نظام خارجي جديد
  const handleAddSystem = (data: any) => {
    const newSystem: ExternalSystem = {
      id: `sys-${Date.now()}`,
      name: data.name,
      type: data.type as any,
      status: "inactive",
      url: data.url,
      apiKey: data.apiKey,
      description: data.description,
      connections: 0,
      dataTransferred: "0 KB",
      successRate: 0
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
          // تحسين قيم البيانات والاتصالات بشكل عشوائي
          const connections = sys.connections || 0;
          const dataSize = parseFloat((sys.dataTransferred || "0").split(" ")[0]);
          const dataUnit = (sys.dataTransferred || "KB").split(" ")[1];
          
          const newConnections = connections + Math.floor(Math.random() * 10 + 5);
          const newDataSize = dataSize + (Math.random() * 0.5).toFixed(1);
          
          return {
            ...sys,
            lastSync: new Date(),
            status: "active",
            connections: newConnections,
            dataTransferred: `${newDataSize} ${dataUnit}`,
            successRate: Math.min(99.9, (sys.successRate || 80) + Math.random() * 2)
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
      await fetch(webhookUrl, {
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

  // التنقل إلى صفحة API
  const handleNavigateToApiDocs = () => {
    navigate('/integrations/api-docs');
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
  
  // تحويل رقم إلى نسبة مئوية معروضة
  const formatPercentage = (value: number | undefined) => {
    if (value === undefined) return '0%';
    return `${value.toFixed(1)}%`;
  };

  // الرجوع إلى الصفحة السابقة
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header showBack={true} onBackClick={handleGoBack} title="الربط مع الأنظمة الخارجية">
        <Button variant="outline" onClick={handleNavigateToApiDocs}>
          <FileText className="h-4 w-4 me-2" />
          توثيق API
        </Button>
      </Header>
      
      <div className="container p-6 mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5 rtl">
            <TabsTrigger value="dashboard" className="flex justify-center gap-2">
              <Server className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="systems" className="flex justify-center gap-2">
              <Database className="h-4 w-4" />
              الأنظمة المتكاملة
            </TabsTrigger>
            <TabsTrigger value="add" className="flex justify-center gap-2">
              <ExternalLink className="h-4 w-4" />
              إضافة نظام
            </TabsTrigger>
            <TabsTrigger value="webhook" className="flex justify-center gap-2">
              <Webhook className="h-4 w-4" />
              Webhook
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex justify-center gap-2">
              <FileText className="h-4 w-4" />
              سجل الاتصالات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-4">
            <div className="grid grid-cols-1 gap-6">
              {/* بطاقات الإحصائيات */}
              <IntegrationStatCards systems={systems} />
              
              {/* حالة اتصال الأنظمة */}
              <SystemConnectionHealth systems={systems} healthStatus={healthCheckStatus} />
              
              {/* الرسم البياني للأنشطة */}
              <IntegrationActivityChart systems={systems} />

              {/* بطاقة النظرة العامة */}
              <Card>
                <CardHeader>
                  <CardTitle>النظرة العامة للتكاملات</CardTitle>
                  <CardDescription>
                    تفاصيل حالة التكاملات والأداء العام للأنظمة الخارجية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card className="bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-blue-700">متوسط نسبة النجاح</p>
                            <p className="text-2xl font-bold text-blue-800">
                              {formatPercentage(systems.reduce((acc, sys) => acc + (sys.successRate || 0), 0) / 
                                              systems.filter(sys => sys.successRate !== undefined).length)}
                            </p>
                          </div>
                          <div className="p-2 bg-blue-200 rounded-full">
                            <Check className="h-5 w-5 text-blue-700" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-b from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-green-700">إجمالي البيانات المنقولة</p>
                            <p className="text-2xl font-bold text-green-800">5.8 GB</p>
                          </div>
                          <div className="p-2 bg-green-200 rounded-full">
                            <Database className="h-5 w-5 text-green-700" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-b from-purple-50 to-purple-100 border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-purple-700">عدد الاتصالات (24 ساعة)</p>
                            <p className="text-2xl font-bold text-purple-800">1,204</p>
                          </div>
                          <div className="p-2 bg-purple-200 rounded-full">
                            <Link className="h-5 w-5 text-purple-700" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              {/* التنبيهات والمشكلات الهامة */}
              <Card>
                <CardHeader className="bg-amber-50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                      المشكلات والتنبيهات
                    </CardTitle>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      3 مشكلات نشطة
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 hover:bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">خطأ في الاتصال مع منصة التجارة الإلكترونية</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            فشل في المصادقة - تحقق من صلاحية مفتاح API
                          </p>
                        </div>
                        <Badge variant="destructive">عالي</Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-muted-foreground">منذ 3 ساعات</span>
                        <Button variant="outline" size="sm" className="h-7">
                          إصلاح
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">تأخر في استجابة نظام الفواتير الإلكترونية</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            زمن الاستجابة يتجاوز 3 ثوان - قد يؤثر على أداء النظام
                          </p>
                        </div>
                        <Badge variant="warning" className="bg-amber-100 text-amber-800 hover:bg-amber-200">متوسط</Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-muted-foreground">منذ 12 ساعة</span>
                        <Button variant="outline" size="sm" className="h-7">
                          فحص
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">تحذير: غياب المزامنة لأكثر من يومين</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            النظام البنكي لم تتم مزامنته منذ 48 ساعة
                          </p>
                        </div>
                        <Badge variant="default">منخفض</Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-muted-foreground">منذ 2 يوم</span>
                        <Button variant="outline" size="sm" className="h-7" onClick={() => handleSyncSystem("sys-4")}>
                          مزامنة
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 px-4 py-3 flex justify-center">
                  <Button variant="ghost" size="sm" className="text-xs w-full">
                    عرض كافة المشكلات (8)
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
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
                      <TableHead>عدد الاتصالات</TableHead>
                      <TableHead>نسبة النجاح</TableHead>
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
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 font-medium">
                            {system.connections || 0}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  (system.successRate || 0) > 95 ? 'bg-green-500' : 
                                  (system.successRate || 0) > 80 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${system.successRate || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{formatPercentage(system.successRate)}</span>
                          </div>
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddSystem)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>اسم النظام</Label>
                        <Input
                          placeholder="أدخل اسم النظام الخارجي"
                          {...form.register("name", { required: true })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>نوع النظام</Label>
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
                      <Label>عنوان الواجهة البرمجية (API URL)</Label>
                      <Input
                        placeholder="https://example.com/api"
                        {...form.register("url")}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>مفتاح الواجهة البرمجية (API Key)</Label>
                      <Input
                        type="password"
                        placeholder="أدخل مفتاح الواجهة البرمجية"
                        {...form.register("apiKey")}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>وصف النظام</Label>
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
                </Form>
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
                    <Label>عنوان Webhook</Label>
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
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText("https://yourapp.example.com/api/webhook");
                        toast.success("تم نسخ عنوان Webhook");
                      }}
                    >
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
          
          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>سجل الاتصالات</CardTitle>
                <CardDescription>
                  عرض سجل الاتصالات والعمليات مع الأنظمة الخارجية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* فلترة السجلات */}
                  <div className="flex flex-wrap gap-2 justify-between items-center bg-muted/20 p-3 rounded-lg mb-4">
                    <div className="flex gap-2 items-center">
                      <Button variant="outline" size="sm">اليوم</Button>
                      <Button variant="ghost" size="sm">آخر 7 أيام</Button>
                      <Button variant="ghost" size="sm">الشهر الحالي</Button>
                      <Button variant="ghost" size="sm">مخصص</Button>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.success("تم تصدير السجل بنجاح")}
                      >
                        تصدير السجل
                      </Button>
                    </div>
                  </div>
                  
                  {/* جدول السجلات */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>التاريخ والوقت</TableHead>
                        <TableHead>النظام</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الرسالة</TableHead>
                        <TableHead>حجم البيانات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connectionLogs.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell>{log.timestamp.toLocaleString('ar-SA')}</TableCell>
                          <TableCell>{log.system}</TableCell>
                          <TableCell>
                            <Badge variant={
                              log.status === 'success' ? 'success' : 
                              log.status === 'warning' ? 'warning' : 
                              'destructive'
                            } className={
                              log.status === 'success' ? 'bg-green-100 text-green-800' : 
                              log.status === 'warning' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'
                            }>
                              {log.status === 'success' ? 'نجاح' : 
                               log.status === 'warning' ? 'تحذير' : 'خطأ'}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.message}</TableCell>
                          <TableCell>{log.dataSize}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {/* ترقيم الصفحات */}
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mt-4">
                    <Button variant="outline" size="sm" disabled>
                      السابق
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary/10 border-primary">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      التالي
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ExternalSystemsPage;

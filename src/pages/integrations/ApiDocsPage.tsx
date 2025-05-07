
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Play, Server, FileCode, BookOpen, Code, Lock, Shield } from "lucide-react";
import { toast } from "sonner";

const ApiDocsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [apiKey, setApiKey] = useState("sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX");
  const [isApiKeyHidden, setIsApiKeyHidden] = useState(true);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const toggleApiKeyVisibility = () => {
    setIsApiKeyHidden(!isApiKeyHidden);
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">واجهة برمجة التطبيقات (API)</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4 rtl">
          <TabsTrigger value="overview" className="flex justify-center gap-2">
            <BookOpen className="h-4 w-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="authentication" className="flex justify-center gap-2">
            <Shield className="h-4 w-4" />
            المصادقة
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="flex justify-center gap-2">
            <Server className="h-4 w-4" />
            نقاط النهاية
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex justify-center gap-2">
            <Code className="h-4 w-4" />
            أمثلة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>واجهة برمجة التطبيق للتكامل مع الأنظمة الخارجية</CardTitle>
              <CardDescription>
                استخدم واجهة برمجة التطبيقات (API) للوصول إلى بيانات النظام المحاسبي وتكامله مع الأنظمة الخارجية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-blue-100 bg-blue-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <FileCode className="mr-2 h-5 w-5 text-blue-600" />
                        توثيق شامل
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        توثيق تفصيلي لكل نقطة نهاية API مع أمثلة الطلب والاستجابة
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-100 bg-purple-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Lock className="mr-2 h-5 w-5 text-purple-600" />
                        معايير الأمان
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        تشفير البيانات ومصادقة قوية مع دعم OAuth2 والمفاتيح الخاصة
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-100 bg-green-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Server className="mr-2 h-5 w-5 text-green-600" />
                        تكامل سهل
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        واجهات RESTful سهلة الاستخدام مع دعم JSON لتكامل بسيط وفعال
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 border rounded-md p-4 bg-muted/20">
                  <h3 className="font-medium mb-2">المجالات المتاحة للتكامل</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50">الفواتير</Badge>
                    <Badge variant="outline" className="bg-blue-50">العملاء</Badge>
                    <Badge variant="outline" className="bg-blue-50">المنتجات</Badge>
                    <Badge variant="outline" className="bg-blue-50">المخزون</Badge>
                    <Badge variant="outline" className="bg-blue-50">المحاسبة</Badge>
                    <Badge variant="outline" className="bg-blue-50">التقارير</Badge>
                    <Badge variant="outline" className="bg-blue-50">المدفوعات</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">كيفية البدء</h3>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center mr-2">1</span>
                      <p>قم بإنشاء مفتاح API من صفحة الإعدادات</p>
                    </li>
                    <li className="flex">
                      <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center mr-2">2</span>
                      <p>استخدم المفتاح في طلبات HTTP مع رأس المصادقة</p>
                    </li>
                    <li className="flex">
                      <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center mr-2">3</span>
                      <p>قم بالوصول إلى نقاط النهاية المناسبة وتكامل البيانات</p>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>المصادقة</CardTitle>
              <CardDescription>
                إعداد وإدارة مفاتيح API للوصول الآمن إلى واجهة برمجة التطبيق
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4 bg-muted/30">
                  <h3 className="font-medium mb-2">مفتاح API الخاص بك</h3>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted p-2 rounded-md font-mono text-sm flex-1 flex items-center">
                      <code>{isApiKeyHidden ? "••••••••••••••••••••••••••••••" : apiKey}</code>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={toggleApiKeyVisibility}
                    >
                      {isApiKeyHidden ? "إظهار" : "إخفاء"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(apiKey, "تم نسخ مفتاح API")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    يجب الحفاظ على سرية هذا المفتاح. لا تقم بمشاركته في أي مكان عام.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-3">أمثلة المصادقة</h3>
                  <div className="bg-muted/30 rounded-md p-3">
                    <h4 className="font-medium text-sm mb-1">طلب HTTP</h4>
                    <div className="bg-muted p-2 rounded-md font-mono text-xs">
                      <pre>
{`GET /api/v1/invoices HTTP/1.1
Host: api.example.com
Authorization: Bearer sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX
Content-Type: application/json
`}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-1" 
                        onClick={() => copyToClipboard(
                          `GET /api/v1/invoices HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX\nContent-Type: application/json`, 
                          "تم نسخ مثال الطلب"
                        )}
                      >
                        <Copy className="h-3 w-3 mr-1" /> نسخ
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">إدارة مفاتيح API</h3>
                  <div className="flex flex-col gap-2">
                    <Button className="w-full md:w-auto">
                      إنشاء مفتاح API جديد
                    </Button>
                    <Button variant="destructive" className="w-full md:w-auto">
                      إلغاء تنشيط المفتاح الحالي
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>نقاط نهاية API</CardTitle>
              <CardDescription>
                توثيق لنقاط نهاية API المتاحة ومعلمات الطلب والاستجابة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-200">GET</Badge>
                      <code>/api/v1/invoices</code>
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard("/api/v1/invoices", "تم نسخ المسار")}>
                      <Copy className="h-4 w-4 mr-1" /> نسخ
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">استرجاع قائمة الفواتير بناءً على المعايير المحددة</p>
                  
                  <h4 className="text-sm font-medium mt-3 mb-1">المعلمات</h4>
                  <div className="bg-muted/30 rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-start p-2">الاسم</th>
                          <th className="text-start p-2">النوع</th>
                          <th className="text-start p-2">الوصف</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-muted">
                          <td className="p-2 font-mono">limit</td>
                          <td className="p-2">عدد</td>
                          <td className="p-2">عدد السجلات المراد استرجاعها (افتراضي: 20)</td>
                        </tr>
                        <tr className="border-t border-muted">
                          <td className="p-2 font-mono">offset</td>
                          <td className="p-2">عدد</td>
                          <td className="p-2">إزاحة البداية لاسترجاع السجلات (افتراضي: 0)</td>
                        </tr>
                        <tr className="border-t border-muted">
                          <td className="p-2 font-mono">status</td>
                          <td className="p-2">نص</td>
                          <td className="p-2">تصفية بواسطة حالة الفاتورة (مثال: paid, pending)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <Badge className="mr-2 bg-blue-100 text-blue-800 hover:bg-blue-200">POST</Badge>
                      <code>/api/v1/invoices</code>
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard("/api/v1/invoices", "تم نسخ المسار")}>
                      <Copy className="h-4 w-4 mr-1" /> نسخ
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">إنشاء فاتورة جديدة</p>
                  
                  <h4 className="text-sm font-medium mt-3 mb-1">مثال طلب JSON</h4>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs overflow-auto max-h-60">
                    <pre>
{`{
  "customer_id": "cus_123456789",
  "items": [
    {
      "product_id": "prod_123",
      "quantity": 2,
      "unit_price": 50
    }
  ],
  "payment_terms": "net_30",
  "notes": "ملاحظات الفاتورة"
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <Badge className="mr-2 bg-amber-100 text-amber-800 hover:bg-amber-200">PUT</Badge>
                      <code>/api/v1/invoices/{'{invoice_id}'}</code>
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard("/api/v1/invoices/{invoice_id}", "تم نسخ المسار")}>
                      <Copy className="h-4 w-4 mr-1" /> نسخ
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">تحديث فاتورة موجودة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>أمثلة على الاستخدام</CardTitle>
              <CardDescription>
                أمثلة على التكامل مع واجهة برمجة التطبيق بلغات برمجة مختلفة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">JavaScript / Node.js</h3>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(
                      `const axios = require('axios');\n\nasync function getInvoices() {\n  try {\n    const response = await axios.get('https://api.example.com/api/v1/invoices', {\n      headers: {\n        'Authorization': 'Bearer sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX',\n        'Content-Type': 'application/json'\n      }\n    });\n    \n    console.log(response.data);\n    return response.data;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n\ngetInvoices();`,
                      "تم نسخ مثال JavaScript"
                    )}>
                      <Copy className="h-4 w-4 mr-1" /> نسخ
                    </Button>
                  </div>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs overflow-auto max-h-60">
                    <pre>
{`const axios = require('axios');

async function getInvoices() {
  try {
    const response = await axios.get('https://api.example.com/api/v1/invoices', {
      headers: {
        'Authorization': 'Bearer sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        'Content-Type': 'application/json'
      }
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

getInvoices();`}
                    </pre>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Python</h3>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(
                      `import requests\n\ndef get_invoices():\n    url = "https://api.example.com/api/v1/invoices"\n    headers = {\n        "Authorization": "Bearer sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX",\n        "Content-Type": "application/json"\n    }\n    \n    response = requests.get(url, headers=headers)\n    \n    if response.status_code == 200:\n        return response.json()\n    else:\n        print(f"Error: {response.status_code}")\n        print(response.text)\n        return None\n\nresult = get_invoices()\nprint(result)`,
                      "تم نسخ مثال Python"
                    )}>
                      <Copy className="h-4 w-4 mr-1" /> نسخ
                    </Button>
                  </div>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs overflow-auto max-h-60">
                    <pre>
{`import requests

def get_invoices():
    url = "https://api.example.com/api/v1/invoices"
    headers = {
        "Authorization": "Bearer sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

result = get_invoices()
print(result)`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">cURL</h3>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(
                      `curl -X GET "https://api.example.com/api/v1/invoices" \\\n  -H "Authorization: Bearer sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX" \\\n  -H "Content-Type: application/json"`,
                      "تم نسخ مثال cURL"
                    )}>
                      <Copy className="h-4 w-4 mr-1" /> نسخ
                    </Button>
                  </div>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs overflow-auto max-h-60">
                    <pre>
{`curl -X GET "https://api.example.com/api/v1/invoices" \\
  -H "Authorization: Bearer sk-demo-XXXX-XXXX-XXXX-XXXXXXXXXXXX" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full md:w-auto" onClick={() => window.open("https://github.com/company/api-examples", "_blank")}>
                    <ExternalLink className="h-4 w-4 mr-2" /> عرض المزيد من الأمثلة على GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocsPage;

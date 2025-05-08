
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileEdit, FileText, Copy, Trash2, Download, Plus, Check, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Sample template data
const sampleTemplates = [
  {
    id: "template-1",
    name: "الفاتورة الرسمية",
    type: "invoice",
    isDefault: true,
    previewImage: "https://placehold.co/600x400/e5f7ff/0369a1?text=فاتورة+رسمية&font=open-sans",
    lastModified: "2023-04-15",
    usageCount: 248,
    showLogo: true,
    showSignature: true,
    showWatermark: false,
    showQrCode: true,
    paperSize: "A4"
  },
  {
    id: "template-2",
    name: "الفاتورة المختصرة",
    type: "invoice",
    isDefault: false,
    previewImage: "https://placehold.co/600x400/f0f9ff/075985?text=فاتورة+مختصرة&font=open-sans",
    lastModified: "2023-05-10",
    usageCount: 124,
    showLogo: true,
    showSignature: false,
    showWatermark: false,
    showQrCode: true,
    paperSize: "A4"
  },
  {
    id: "template-3",
    name: "فاتورة إيصال الكاشير",
    type: "invoice",
    isDefault: false,
    previewImage: "https://placehold.co/600x400/f0fdf4/166534?text=إيصال+كاشير&font=open-sans",
    lastModified: "2023-03-22",
    usageCount: 1520,
    showLogo: false,
    showSignature: false,
    showWatermark: false,
    showQrCode: true,
    paperSize: "Thermal"
  },
  {
    id: "template-4",
    name: "عرض سعر تفصيلي",
    type: "quote",
    isDefault: true,
    previewImage: "https://placehold.co/600x400/fefce8/854d0e?text=عرض+سعر+تفصيلي&font=open-sans",
    lastModified: "2023-06-05",
    usageCount: 87,
    showLogo: true,
    showSignature: true,
    showWatermark: true,
    showQrCode: false,
    paperSize: "A4"
  },
  {
    id: "template-5",
    name: "عرض سعر مختصر",
    type: "quote",
    isDefault: false,
    previewImage: "https://placehold.co/600x400/fff7ed/9a3412?text=عرض+سعر+مختصر&font=open-sans",
    lastModified: "2023-02-18",
    usageCount: 56,
    showLogo: true,
    showSignature: true,
    showWatermark: false,
    showQrCode: false,
    paperSize: "A4"
  },
  {
    id: "template-6",
    name: "نموذج مرتجعات",
    type: "return",
    isDefault: true,
    previewImage: "https://placehold.co/600x400/fef2f2/b91c1c?text=نموذج+مرتجعات&font=open-sans",
    lastModified: "2023-05-30",
    usageCount: 28,
    showLogo: true,
    showSignature: true,
    showWatermark: false,
    showQrCode: true,
    paperSize: "A4"
  }
];

const InvoiceTemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("invoice");
  const [showingDetails, setShowingDetails] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof sampleTemplates[0] | null>(null);
  
  // Filter templates based on active tab
  const filteredTemplates = sampleTemplates.filter(template => template.type === activeTab);
  
  const handleEditTemplate = (template: typeof sampleTemplates[0]) => {
    setSelectedTemplate(template);
    setShowingDetails(true);
    toast.info(`تحرير القالب: ${template.name}`);
  };
  
  const handleDuplicateTemplate = (template: typeof sampleTemplates[0]) => {
    toast.success(`تم نسخ القالب: ${template.name}`);
  };
  
  const handleDeleteTemplate = (template: typeof sampleTemplates[0]) => {
    toast.success(`تم حذف القالب: ${template.name}`);
  };
  
  const handleDownloadTemplate = (template: typeof sampleTemplates[0]) => {
    toast.success(`جاري تنزيل القالب: ${template.name}`);
  };
  
  const handleSetDefault = (template: typeof sampleTemplates[0]) => {
    toast.success(`تم تعيين القالب "${template.name}" كقالب افتراضي`);
  };
  
  const handleCreateTemplate = () => {
    toast.info("إنشاء قالب جديد");
  };
  
  const handleBack = () => {
    if (showingDetails) {
      setShowingDetails(false);
      setSelectedTemplate(null);
    } else {
      navigate(-1);
    }
  };
  
  const getTemplateTypeBadge = (type: string) => {
    switch (type) {
      case "invoice":
        return <Badge className="bg-blue-100 text-blue-700">فاتورة مبيعات</Badge>;
      case "quote":
        return <Badge className="bg-amber-100 text-amber-700">عرض سعر</Badge>;
      case "return":
        return <Badge className="bg-red-100 text-red-700">مرتجعات</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="h-full w-full flex flex-col overflow-hidden">
        <Header 
          title={showingDetails ? `تحرير قالب: ${selectedTemplate?.name}` : "قوالب الفواتير وعروض الأسعار"} 
          showBack={true} 
          onBackClick={handleBack}
        >
          <div className="flex items-center gap-4">
            <FileCheck className="h-5 w-5 text-primary" />
            <span className="text-sm text-gray-300">إدارة قوالب الطباعة</span>
          </div>
        </Header>

        <div className="flex-1 overflow-auto p-6">
          {!showingDetails ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">قوالب الطباعة</h1>
                <Button onClick={handleCreateTemplate}>
                  <Plus className="ml-2 h-4 w-4" />
                  إنشاء قالب جديد
                </Button>
              </div>

              <Tabs defaultValue="invoice" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="invoice">فواتير المبيعات</TabsTrigger>
                  <TabsTrigger value="quote">عروض الأسعار</TabsTrigger>
                  <TabsTrigger value="return">المرتجعات</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                      <Card key={template.id} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden bg-gray-100">
                          <img 
                            src={template.previewImage} 
                            alt={template.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{template.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                {getTemplateTypeBadge(template.type)}
                                {template.isDefault && (
                                  <Badge variant="secondary">افتراضي</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-0">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">آخر تعديل:</span>
                              <span className="font-medium mr-1">{template.lastModified}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">عدد الاستخدام:</span>
                              <span className="font-medium mr-1">{template.usageCount}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">حجم الورق:</span>
                              <span className="font-medium mr-1">{template.paperSize}</span>
                            </div>
                            <div className="flex items-center">
                              {template.showLogo && <span className="text-xs bg-gray-100 px-1 ml-1 rounded">شعار</span>}
                              {template.showSignature && <span className="text-xs bg-gray-100 px-1 ml-1 rounded">توقيع</span>}
                              {template.showQrCode && <span className="text-xs bg-gray-100 px-1 ml-1 rounded">QR</span>}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-4">
                          <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                            <FileEdit className="ml-1 h-4 w-4" />
                            تحرير
                          </Button>
                          <div className="flex items-center gap-1">
                            {!template.isDefault && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleSetDefault(template)}
                                title="تعيين كقالب افتراضي"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDuplicateTemplate(template)}
                              title="نسخ القالب"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDownloadTemplate(template)}
                              title="تنزيل القالب"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => handleDeleteTemplate(template)}
                              title="حذف القالب"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            selectedTemplate && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>معاينة القالب</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center p-0 bg-gray-100">
                      <img 
                        src={selectedTemplate.previewImage} 
                        alt={selectedTemplate.name}
                        className="max-w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>إعدادات العرض</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-logo">إظهار شعار الشركة</Label>
                            <Switch id="show-logo" defaultChecked={selectedTemplate.showLogo} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-signature">إظهار التوقيع</Label>
                            <Switch id="show-signature" defaultChecked={selectedTemplate.showSignature} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-watermark">إظهار العلامة المائية</Label>
                            <Switch id="show-watermark" defaultChecked={selectedTemplate.showWatermark} />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-qr">إظهار رمز QR</Label>
                            <Switch id="show-qr" defaultChecked={selectedTemplate.showQrCode} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="paper-size">حجم الورق</Label>
                            <select 
                              id="paper-size"
                              defaultValue={selectedTemplate.paperSize}
                              className="w-24 p-2 border rounded-md"
                            >
                              <option value="A4">A4</option>
                              <option value="A5">A5</option>
                              <option value="Letter">Letter</option>
                              <option value="Thermal">Thermal</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="is-default">تعيين كقالب افتراضي</Label>
                            <Switch id="is-default" defaultChecked={selectedTemplate.isDefault} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>معلومات القالب</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="template-name">اسم القالب</Label>
                          <Input 
                            id="template-name" 
                            defaultValue={selectedTemplate.name} 
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="template-type">نوع القالب</Label>
                          <select 
                            id="template-type"
                            defaultValue={selectedTemplate.type}
                            className="w-full p-2 border rounded-md mt-1"
                          >
                            <option value="invoice">فاتورة مبيعات</option>
                            <option value="quote">عرض سعر</option>
                            <option value="return">مرتجعات</option>
                          </select>
                        </div>
                        <div>
                          <Label>إحصائيات استخدام القالب</Label>
                          <div className="mt-1 bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">عدد مرات الاستخدام:</span>
                              <span className="font-medium">{selectedTemplate.usageCount}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                              <span className="text-muted-foreground">آخر تعديل:</span>
                              <span className="font-medium">{selectedTemplate.lastModified}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>عناصر القالب</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="border rounded-md p-3 bg-gray-50 flex justify-between items-center">
                          <span>ترويسة الفاتورة</span>
                          <Button variant="outline" size="sm">تعديل</Button>
                        </div>
                        <div className="border rounded-md p-3 bg-gray-50 flex justify-between items-center">
                          <span>جدول الأصناف</span>
                          <Button variant="outline" size="sm">تعديل</Button>
                        </div>
                        <div className="border rounded-md p-3 bg-gray-50 flex justify-between items-center">
                          <span>ملخص القيم والإجماليات</span>
                          <Button variant="outline" size="sm">تعديل</Button>
                        </div>
                        <div className="border rounded-md p-3 bg-gray-50 flex justify-between items-center">
                          <span>التذييل والشروط</span>
                          <Button variant="outline" size="sm">تعديل</Button>
                        </div>
                        <div className="border rounded-md p-3 bg-gray-50 flex justify-between items-center">
                          <span>حقل التوقيع</span>
                          <Button variant="outline" size="sm">تعديل</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleBack}>إلغاء</Button>
                    <Button className="bg-green-600 hover:bg-green-700">حفظ التغييرات</Button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceTemplatesPage;

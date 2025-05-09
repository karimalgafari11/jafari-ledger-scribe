
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, FilePlus, Clock, Settings, Printer, FileText, FileUp } from "lucide-react";
import { useSalesInvoice } from "@/hooks/sales/useSalesInvoice";
import { toast } from "sonner";
import { InvoiceSettings, InvoiceSettingsType } from "@/components/invoices/invoice-form/InvoiceSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceQuickInfo } from "@/components/invoices/invoice-form/InvoiceQuickInfo";
import { Badge } from "@/components/ui/badge";
import { InvoiceItem } from "@/types/invoices";

// تعريف الإعدادات الافتراضية
const defaultSettings: InvoiceSettingsType = {
  showCustomerDetails: true,
  showItemCodes: true,
  showItemNotes: true,
  showDiscount: true,
  showTax: true,
  showSignature: false,
  showCompanyLogo: true,
  fontSize: 'medium',
  tableColumns: ['serial', 'code', 'name', 'quantity', 'price', 'total', 'notes'],
  tableWidth: 100,
};

const SalesInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const [invoiceSettings, setInvoiceSettings] = useState<InvoiceSettingsType>(defaultSettings);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [showTips, setShowTips] = useState<boolean>(true);
  
  const {
    invoice,
    isLoading,
    createNewInvoice,
    updateInvoiceField,
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem,
    applyDiscount,
    calculateTotals,
    saveInvoice,
    convertQuoteToInvoice
  } = useSalesInvoice();

  useEffect(() => {
    // إنشاء فاتورة جديدة
    createNewInvoice();
    
    // تطبيق حجم الخط من الإعدادات عالميًا
    document.documentElement.style.setProperty(
      '--invoice-font-size', 
      invoiceSettings.fontSize === 'small' ? '0.875rem' : 
      invoiceSettings.fontSize === 'large' ? '1.125rem' : '1rem'
    );
    
    document.body.dir = 'rtl';
    
    return () => {
      // إعادة تعيين حجم الخط عند إزالة المكون
      document.documentElement.style.removeProperty('--invoice-font-size');
    };
  }, [invoiceSettings.fontSize]);

  const handleSave = async () => {
    if (invoice.items.length === 0) {
      toast.error("لا يمكن حفظ فاتورة بدون أصناف");
      return;
    }

    try {
      await saveInvoice();
      toast.success("تم حفظ الفاتورة بنجاح");
      navigate("/invoices/outgoing");
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ الفاتورة");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNewInvoice = () => {
    // إعادة تعيين الفاتورة الحالية وإنشاء فاتورة جديدة
    createNewInvoice();
    toast.info("تم إنشاء فاتورة جديدة");
  };

  const handleSettingsChange = (newSettings: InvoiceSettingsType) => {
    setInvoiceSettings(newSettings);
    
    // تطبيق حجم الخط من الإعدادات عالميًا
    document.documentElement.style.setProperty(
      '--invoice-font-size', 
      newSettings.fontSize === 'small' ? '0.875rem' : 
      newSettings.fontSize === 'large' ? '1.125rem' : '1rem'
    );
  };

  const handlePrintPreview = () => {
    window.print();
  };

  // إنشاء دوال وسيطة للتحويل بين أنواع المعلمات
  const handleUpdateItem = (index: number, item: Partial<InvoiceItem>) => {
    if (item.id) {
      updateInvoiceItem(item.id, item);
    } else {
      console.error("لا يمكن تحديث العنصر بدون معرف");
    }
  };

  const handleRemoveItem = (index: number) => {
    const itemId = invoice.items[index]?.id;
    if (itemId) {
      removeInvoiceItem(itemId);
    } else {
      console.error("لا يمكن إزالة العنصر في الفهرس", index);
    }
  };

  return (
    <Layout>
      <style>
        {`
          .invoice-text {
            font-size: var(--invoice-font-size, 1.125rem);
          }
          .invoice-table th, .invoice-table td {
            font-size: var(--invoice-font-size, 1.125rem);
          }
          .invoice-item-table {
            width: 100%;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .invoice-item-table th, .invoice-item-table td {
            border: 1px solid #000;
            padding: 0.5rem;
          }
          .search-results {
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid #ccc;
            border-radius: 4px;
            position: absolute;
            background: white;
            z-index: 100;
            width: 100%;
          }
          .smooth-transition {
            transition: all 0.3s ease-in-out;
          }
          .table-bordered {
            border-collapse: collapse;
          }
          .table-bordered th,
          .table-bordered td {
            border: 1px solid #e2e8f0;
          }
          @media print {
            body * {
              visibility: hidden;
            }
            .print-section, .print-section * {
              visibility: visible;
            }
            .print-hide {
              display: none !important;
            }
            .print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .tab-content {
              visibility: visible !important;
            }
          }
        `}
      </style>
      <div className="h-full w-full flex flex-col overflow-hidden print:overflow-visible" dir="rtl">
        <Header title="فاتورة مبيعات جديدة" showBack={true} onBackClick={handleBack} />

        <div className="flex-1 overflow-auto print:overflow-visible print-section py-2 px-4 bg-gray-50">
          {/* شريط الإجراءات العلوي */}
          <div className="flex justify-between items-center mb-4 print-hide">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">إنشاء فاتورة مبيعات</h2>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  {invoice.status === 'draft' ? 'مسودة' : invoice.status}
                </Badge>
                <span>•</span>
                <span>{invoice.invoiceNumber}</span>
              </div>
            </div>
            
            <div className="space-x-1 flex rtl:space-x-reverse">
              <Button 
                variant="outline"
                className="print-hide h-9 text-base smooth-transition hover:bg-primary hover:text-white"
                onClick={handleNewInvoice}
                disabled={isLoading}
              >
                <FilePlus className="ml-1 h-4 w-4" />
                فاتورة جديدة
              </Button>
              
              <Button 
                variant="outline"
                className="print-hide h-9 text-base smooth-transition hover:bg-blue-500 hover:text-white"
                onClick={handlePrintPreview}
                disabled={isLoading}
              >
                <Printer className="ml-1 h-4 w-4" />
                معاينة الطباعة
              </Button>
              
              <Button 
                variant="outline" 
                className="print-hide h-9 text-base"
                onClick={handleBack}
                disabled={isLoading}
              >
                <ArrowLeft className="ml-1 h-4 w-4" />
                رجوع
              </Button>
              
              <InvoiceSettings 
                settings={invoiceSettings}
                onSettingsChange={handleSettingsChange}
              />
              
              <Button 
                onClick={handleSave} 
                disabled={isLoading || invoice.items.length === 0}
                className="print-hide h-9 text-base bg-green-600 hover:bg-green-700"
              >
                <Save className="ml-1 h-4 w-4" />
                حفظ الفاتورة
              </Button>
            </div>
          </div>

          {/* قسم النصائح الاختياري */}
          {showTips && (
            <Card className="mb-4 bg-blue-50 border-blue-200 shadow-sm print-hide">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">نصائح سريعة:</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-600">
                    <li>اضغط على زر "إضافة صنف" لإضافة منتجات للفاتورة</li>
                    <li>يمكنك تعديل المعلومات بالنقر المباشر على حقول الفاتورة</li>
                    <li>يمكنك التنقل بين خلايا الجدول باستخدام لوحة المفاتيح</li>
                    <li>يمكن تغيير إعدادات الفاتورة من زر الإعدادات</li>
                    <li>تأكد من تعبئة بيانات العميل قبل حفظ الفاتورة</li>
                  </ul>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-blue-700"
                  onClick={() => setShowTips(false)}
                >
                  إغلاق
                </Button>
              </CardContent>
            </Card>
          )}

          {/* علامات تبويب لمختلف العروض */}
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="print-hide"
            defaultValue="editor"
          >
            <TabsList className="mb-2">
              <TabsTrigger value="editor" className="text-base">
                <FileText className="mr-2 h-4 w-4" />
                تحرير الفاتورة
              </TabsTrigger>
              <TabsTrigger value="upload" className="text-base">
                <FileUp className="mr-2 h-4 w-4" />
                تحميل من PDF
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-base">
                <Printer className="mr-2 h-4 w-4" />
                معاينة الطباعة
              </TabsTrigger>
              <TabsTrigger value="history" className="text-base">
                <Clock className="mr-2 h-4 w-4" />
                النسخ المحفوظة
              </TabsTrigger>
            </TabsList>

            {/* منطقة المحتوى الرئيسية */}
            <TabsContent value="editor" className="tab-content">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* نموذج الفاتورة الرئيسي */}
                <div className="md:col-span-3">
                  <Card className="mb-2 print:shadow-none print:border-none">
                    <CardContent className="p-4 bg-white">
                      <InvoiceForm 
                        invoice={invoice} 
                        onFieldChange={updateInvoiceField} 
                        onAddItem={addInvoiceItem} 
                        onUpdateItem={handleUpdateItem} 
                        onRemoveItem={handleRemoveItem} 
                        onApplyDiscount={applyDiscount} 
                        isLoading={isLoading}
                        settings={invoiceSettings}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                {/* الشريط الجانبي مع معلومات إضافية */}
                <div className="md:col-span-1 print-hide">
                  <InvoiceQuickInfo 
                    invoice={invoice} 
                    onFieldChange={updateInvoiceField}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="tab-content">
              <Card className="mb-2">
                <CardHeader className="bg-gray-50">
                  <CardTitle>تحميل فاتورة من ملف PDF</CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-white">
                  <p className="text-center py-8">
                    قريباً: ستتمكن من تحميل فواتير من ملفات PDF لاستخراج البيانات منها تلقائياً
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="tab-content">
              <Card className="mb-2">
                <CardHeader className="bg-gray-50">
                  <CardTitle>معاينة الطباعة</CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-white">
                  <InvoiceForm 
                    invoice={invoice} 
                    onFieldChange={updateInvoiceField} 
                    onAddItem={addInvoiceItem} 
                    onUpdateItem={handleUpdateItem} 
                    onRemoveItem={handleRemoveItem} 
                    onApplyDiscount={applyDiscount} 
                    isLoading={isLoading}
                    settings={{...invoiceSettings, showDiscount: false, showItemNotes: false}}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="tab-content">
              <Card>
                <CardHeader className="bg-gray-50">
                  <CardTitle>النسخ المحفوظة</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-center text-muted-foreground py-8">
                    لم يتم حفظ أي نسخ سابقة من هذه الفاتورة
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SalesInvoicePage;

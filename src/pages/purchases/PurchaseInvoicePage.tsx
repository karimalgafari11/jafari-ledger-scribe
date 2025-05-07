
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, FilePlus, Clock, Settings, Printer, FileText, FileUp } from "lucide-react";
import { usePurchaseInvoice } from "@/hooks/purchases";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PurchaseInvoiceForm } from "@/components/purchases/PurchaseInvoiceForm";
import { PurchaseInvoiceSettings } from "@/components/purchases/PurchaseInvoiceSettings";
import { PDFInvoiceUploader } from "@/components/purchases/PDFInvoiceUploader";

// Define default settings
const defaultSettings = {
  showVendorDetails: true,
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

const PurchaseInvoicePage = () => {
  const navigate = useNavigate();
  const [invoiceSettings, setInvoiceSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [showTips, setShowTips] = useState<boolean>(true);
  const [pdfInvoiceData, setPdfInvoiceData] = useState<any>(null);
  
  const {
    invoice,
    createNewInvoice,
    updateField,
    updateDate,
    addItem,
    updateItem,
    removeItem,
    applyDiscount,
    applyExpenses,
    calculateRemaining,
    saveInvoice,
    printInvoice,
    sendViaWhatsApp,
    isLoading,
    isAddingItem,
    setIsAddingItem,
    editingItemIndex,
    setEditingItemIndex
  } = usePurchaseInvoice({ pdfData: pdfInvoiceData });

  useEffect(() => {
    // Create a new invoice
    createNewInvoice();
    
    // Apply the font size from settings globally
    document.documentElement.style.setProperty(
      '--invoice-font-size', 
      invoiceSettings.fontSize === 'small' ? '0.875rem' : 
      invoiceSettings.fontSize === 'large' ? '1.125rem' : '1rem'
    );
    
    return () => {
      // Reset font size when unmounting
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
      navigate("/purchases/invoices");
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ الفاتورة");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNewInvoice = () => {
    // Reset the current invoice and create a new one
    createNewInvoice();
    toast.info("تم إنشاء فاتورة شراء جديدة");
  };

  const handleSettingsChange = (newSettings: any) => {
    setInvoiceSettings(newSettings);
    
    // Apply the font size from settings globally
    document.documentElement.style.setProperty(
      '--invoice-font-size', 
      newSettings.fontSize === 'small' ? '0.875rem' : 
      newSettings.fontSize === 'large' ? '1.125rem' : '1rem'
    );
  };

  const handlePrintPreview = () => {
    window.print();
  };

  const handlePDFProcessed = (invoiceData: any) => {
    console.log("PDF processed with data:", invoiceData);
    setPdfInvoiceData(invoiceData);
    setActiveTab("editor");
    toast.success("تم استخراج بيانات الفاتورة من PDF بنجاح");
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
      <div className="h-full w-full flex flex-col overflow-hidden print:overflow-visible">
        <Header title="فاتورة مشتريات جديدة" showBack={true} onBackClick={handleBack} />

        <div className="flex-1 overflow-auto print:overflow-visible print-section py-2 px-4 bg-gray-50">
          {/* Top action bar */}
          <div className="flex justify-between items-center mb-4 print-hide">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">إنشاء فاتورة مشتريات</h2>
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
              
              <PurchaseInvoiceSettings 
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

          {/* Optional tips section */}
          {showTips && (
            <Card className="mb-4 bg-blue-50 border-blue-200 shadow-sm print-hide">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">نصائح سريعة:</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-600">
                    <li>اضغط على زر "إضافة صنف" لإضافة منتجات للفاتورة</li>
                    <li>يمكنك تعديل المعلومات بالنقر المباشر على حقول الفاتورة</li>
                    <li>يمكن تغيير إعدادات الفاتورة من زر الإعدادات</li>
                    <li>تأكد من تعبئة بيانات المورد قبل حفظ الفاتورة</li>
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

          {/* Tabs for different views */}
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

            {/* Main content area */}
            <TabsContent value="editor" className="tab-content">
              {/* تمت إزالة تقسيم الشاشة إلى عمودين وإزالة المربعات الجانبية */}
              <Card className="mb-2 print:shadow-none print:border-none">
                <CardContent className="p-4 bg-white">
                  <PurchaseInvoiceForm
                    initialData={pdfInvoiceData}
                    settings={invoiceSettings}
                    invoice={invoice}
                    onFieldChange={updateField}
                    onDateChange={updateDate}
                    addItem={addItem}
                    updateItem={updateItem}
                    removeItem={removeItem}
                    applyDiscount={applyDiscount}
                    applyExpenses={applyExpenses}
                    calculateRemaining={calculateRemaining}
                    onSave={handleSave}
                    onPrint={printInvoice}
                    onWhatsAppSend={sendViaWhatsApp}
                    isLoading={isLoading}
                    isAddingItem={isAddingItem}
                    setIsAddingItem={setIsAddingItem}
                    editingItemIndex={editingItemIndex}
                    setEditingItemIndex={setEditingItemIndex}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="tab-content">
              <Card className="mb-2">
                <CardHeader className="bg-gray-50">
                  <CardTitle>تحميل فاتورة من ملف PDF</CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-white">
                  <PDFInvoiceUploader onPDFProcessed={handlePDFProcessed} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="tab-content">
              <Card className="mb-2">
                <CardHeader className="bg-gray-50">
                  <CardTitle>معاينة الطباعة</CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-white">
                  <PurchaseInvoiceForm
                    initialData={null}
                    settings={{...invoiceSettings, showDiscount: false, showItemNotes: false}}
                    invoice={invoice}
                    onFieldChange={updateField}
                    onDateChange={updateDate}
                    addItem={addItem}
                    updateItem={updateItem}
                    removeItem={removeItem}
                    applyDiscount={applyDiscount}
                    applyExpenses={applyExpenses}
                    calculateRemaining={calculateRemaining}
                    onSave={handleSave}
                    onPrint={printInvoice}
                    onWhatsAppSend={sendViaWhatsApp}
                    isLoading={isLoading}
                    isPrintPreview={true}
                    isAddingItem={isAddingItem}
                    setIsAddingItem={setIsAddingItem}
                    editingItemIndex={editingItemIndex}
                    setEditingItemIndex={setEditingItemIndex}
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

export default PurchaseInvoicePage;

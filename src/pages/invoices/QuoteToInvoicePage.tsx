
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, FileText, Printer, Receipt } from "lucide-react";
import { useSalesInvoice } from "@/hooks/sales/useSalesInvoice";
import { toast } from "sonner";
import { InvoiceSettings, InvoiceSettingsType } from "@/components/invoices/invoice-form/InvoiceSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceQuickInfo } from "@/components/invoices/invoice-form/InvoiceQuickInfo";
import { Badge } from "@/components/ui/badge";
import { InvoiceItem } from "@/types/invoices";

// Sample quote data (in a real app this would come from an API)
const sampleQuotes = [
  {
    id: "q1001",
    quoteNumber: "QT-1001",
    date: "2023-05-10",
    customerId: "cust001",
    customerName: "شركة التقدم التجارية",
    customerPhone: "0555123456",
    validUntil: "2023-05-25",
    totalAmount: 12500,
    status: "active",
    items: [
      {
        id: "qi001",
        productId: "prod001",
        code: "P001",
        name: "لابتوب ديل XPS",
        description: "لابتوب ديل XPS 15 بوصة - معالج i7",
        quantity: 2,
        price: 4500,
        discount: 0,
        discountType: "percentage",
        tax: 15,
        total: 9000
      },
      {
        id: "qi002",
        productId: "prod002",
        code: "P002",
        name: "شاشة ديل UltraSharp",
        description: "شاشة ديل UltraSharp 27 بوصة",
        quantity: 3,
        price: 1200,
        discount: 5,
        discountType: "percentage",
        tax: 15,
        total: 3500
      }
    ],
    notes: "عرض سعر خاص يسري حتى نهاية الشهر"
  }
];

// Define default settings
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

const QuoteToInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [invoiceSettings, setInvoiceSettings] = useState<InvoiceSettingsType>(defaultSettings);
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [quoteData, setQuoteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    invoice,
    createNewInvoice,
    updateInvoiceField,
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem,
    applyDiscount,
    calculateTotals,
    saveInvoice
  } = useSalesInvoice();

  useEffect(() => {
    // Fetch quote data (simulated)
    const fetchQuote = async () => {
      try {
        // In a real app, this would be an API call
        const quote = sampleQuotes.find(q => q.id === id);
        if (quote) {
          setQuoteData(quote);
          // Create invoice and populate with quote data
          const newInvoice = createNewInvoice();
          
          // Update invoice fields from quote data
          updateInvoiceField("customerId", quote.customerId);
          updateInvoiceField("customerName", quote.customerName);
          updateInvoiceField("customerPhone", quote.customerPhone);
          updateInvoiceField("notes", `تم إنشاؤها من عرض السعر رقم ${quote.quoteNumber}. ${quote.notes || ''}`);
          
          // Add items from quote to invoice
          quote.items.forEach((item: any) => {
            addInvoiceItem({
              productId: item.productId,
              code: item.code,
              name: item.name,
              description: item.description,
              quantity: item.quantity,
              price: item.price
            });
          });
          
          toast.success("تم تحويل عرض السعر إلى فاتورة بنجاح");
        } else {
          toast.error("لم يتم العثور على عرض السعر");
          navigate("/invoices/quotes-module");
        }
        setIsLoading(false);
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب بيانات عرض السعر");
        setIsLoading(false);
        navigate("/invoices/quotes-module");
      }
    };
    
    fetchQuote();
  }, [id]);

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

  const handleSettingsChange = (newSettings: InvoiceSettingsType) => {
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

  // Create adapter functions to convert between parameter types
  const handleUpdateItem = (index: number, item: Partial<InvoiceItem>) => {
    if (item.id) {
      updateInvoiceItem(item.id, item);
    } else {
      console.error("Cannot update item without ID");
    }
  };

  const handleRemoveItem = (index: number) => {
    const itemId = invoice.items[index]?.id;
    if (itemId) {
      removeInvoiceItem(itemId);
    } else {
      console.error("Cannot remove item at index", index);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">جاري تحميل بيانات عرض السعر...</h2>
            <p className="text-gray-500">يرجى الانتظار</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>
        {`
          .invoice-text {
            font-size: var(--invoice-font-size, 1.125rem);
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
        <Header title="تحويل عرض سعر إلى فاتورة مبيعات" showBack={true} onBackClick={handleBack} />

        <div className="flex-1 overflow-auto print:overflow-visible print-section py-2 px-4 bg-gray-50">
          {/* Quote info banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4 print-hide">
            <div className="flex items-center">
              <Percent className="text-blue-500 mr-2 h-5 w-5" />
              <div>
                <h3 className="font-semibold text-blue-700">معلومات عرض السعر الأصلي</h3>
                <p className="text-blue-600">رقم عرض السعر: {quoteData?.quoteNumber} | العميل: {quoteData?.customerName}</p>
              </div>
            </div>
          </div>

          {/* Top action bar */}
          <div className="flex justify-between items-center mb-4 print-hide">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">إنشاء فاتورة من عرض سعر</h2>
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
              <TabsTrigger value="preview" className="text-base">
                <Printer className="mr-2 h-4 w-4" />
                معاينة الطباعة
              </TabsTrigger>
            </TabsList>

            {/* Main content area */}
            <TabsContent value="editor" className="tab-content">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Main invoice form */}
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
                
                {/* Sidebar with additional information */}
                <div className="md:col-span-1 print-hide">
                  <InvoiceQuickInfo 
                    invoice={invoice} 
                    onFieldChange={updateInvoiceField}
                  />
                </div>
              </div>
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
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default QuoteToInvoicePage;

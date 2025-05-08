
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InventoryAccountingSettings } from "@/components/inventory/InventoryAccountingSettings";
import { useInventoryAccountingIntegration } from "@/hooks/useInventoryAccountingIntegration";
import { InventoryValuationMethod } from "@/types/accountingRules";
import { Loader2, FileBarChart2, Settings2, Package, Receipt } from "lucide-react";

// مكون لعرض تقرير تكاليف المخزون
const InventoryCostReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const generateReport = () => {
    setIsLoading(true);
    // محاكاة تحميل التقرير
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">تقرير تكاليف المخزون</h3>
        <Button 
          onClick={generateReport} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileBarChart2 className="h-4 w-4" />}
          <span>تحديث التقرير</span>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>جاري تحميل تقرير التكاليف...</p>
          </div>
        </div>
      ) : (
        <div className="border rounded overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-right">رمز المنتج</th>
                <th className="px-4 py-2 text-right">اسم المنتج</th>
                <th className="px-4 py-2 text-center">الكمية</th>
                <th className="px-4 py-2 text-center">تكلفة الوحدة</th>
                <th className="px-4 py-2 text-center">إجمالي التكلفة</th>
              </tr>
            </thead>
            <tbody>
              {/* عرض بيانات نموذجية */}
              <tr className="border-t">
                <td className="px-4 py-2">SKU-001</td>
                <td className="px-4 py-2">حاسوب محمول</td>
                <td className="px-4 py-2 text-center">15</td>
                <td className="px-4 py-2 text-center">2,500.00 ر.س</td>
                <td className="px-4 py-2 text-center">37,500.00 ر.س</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">SKU-002</td>
                <td className="px-4 py-2">شاشة كمبيوتر</td>
                <td className="px-4 py-2 text-center">25</td>
                <td className="px-4 py-2 text-center">850.00 ر.س</td>
                <td className="px-4 py-2 text-center">21,250.00 ر.س</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">SKU-003</td>
                <td className="px-4 py-2">طابعة ليزر</td>
                <td className="px-4 py-2 text-center">8</td>
                <td className="px-4 py-2 text-center">1,200.00 ر.س</td>
                <td className="px-4 py-2 text-center">9,600.00 ر.س</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">SKU-004</td>
                <td className="px-4 py-2">جهاز راوتر</td>
                <td className="px-4 py-2 text-center">12</td>
                <td className="px-4 py-2 text-center">320.00 ر.س</td>
                <td className="px-4 py-2 text-center">3,840.00 ر.س</td>
              </tr>
              <tr className="border-t bg-muted/30 font-medium">
                <td colSpan={4} className="px-4 py-2 text-left">الإجمالي</td>
                <td className="px-4 py-2 text-center">72,190.00 ر.س</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// مكون لعرض تكامل المخزون مع الفواتير
const InventoryInvoicesIntegration = () => {
  const { processSalesInvoice, processPurchaseInvoice, getInventoryValuationMethod } = useInventoryAccountingIntegration();
  const [activeTab, setActiveTab] = useState("sales");
  
  const testSalesInvoiceIntegration = async () => {
    // محاكاة معالجة فاتورة مبيعات
    const mockInvoiceItems = [
      {
        id: "item1",
        productId: "p1",
        code: "SKU-001",
        name: "حاسوب محمول",
        description: "حاسوب محمول بمواصفات عالية",
        quantity: 2,
        price: 3500,
        discount: 0,
        discountType: "percentage" as const,
        tax: 15,
        total: 7000
      }
    ];
    
    const result = await processSalesInvoice(mockInvoiceItems, {
      valuationMethod: getInventoryValuationMethod(),
      createJournalEntries: true,
      documentId: `INV-${Date.now()}`,
      documentType: "sale"
    });
    
    console.log("نتيجة معالجة فاتورة المبيعات:", result);
  };
  
  const testPurchaseInvoiceIntegration = async () => {
    // محاكاة معالجة فاتورة مشتريات
    const mockInvoiceItems = [
      {
        id: "item1",
        productId: "p1",
        code: "SKU-001",
        name: "حاسوب محمول",
        description: "حاسوب محمول بمواصفات عالية",
        quantity: 5,
        price: 3000,
        discount: 0,
        discountType: "percentage" as const,
        tax: 15,
        total: 15000
      }
    ];
    
    const result = await processPurchaseInvoice(mockInvoiceItems, {
      valuationMethod: getInventoryValuationMethod(),
      createJournalEntries: true,
      documentId: `PO-${Date.now()}`,
      documentType: "purchase"
    });
    
    console.log("نتيجة معالجة فاتورة المشتريات:", result);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted/50 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">تكامل الفواتير مع المخزون</h3>
        <p className="text-sm text-muted-foreground mb-4">
          إعداد تأثير الفواتير على حركة وتكلفة المخزون
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">فواتير المبيعات</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                تأثير فواتير المبيعات على خفض المخزون وتسجيل تكلفة المبيعات
              </p>
              <Button onClick={testSalesInvoiceIntegration}>اختبار التكامل</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">فواتير المشتريات</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                تأثير فواتير المشتريات على زيادة المخزون وتحديث تكلفة المنتجات
              </p>
              <Button onClick={testPurchaseInvoiceIntegration}>اختبار التكامل</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// الصفحة الرئيسية لإدارة تكاليف المخزون
const InventoryCostingPage: React.FC = () => {
  return (
    <Layout>
      <Header 
        title="إدارة تكاليف المخزون" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">إعدادات تقييم المخزون وتكامل المحاسبة</span>
      </Header>
      
      <div className="container mx-auto p-4">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" /> الإعدادات
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center gap-2">
              <FileBarChart2 className="h-4 w-4" /> التكاليف
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" /> الفواتير
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <InventoryAccountingSettings />
          </TabsContent>
          
          <TabsContent value="costs">
            <InventoryCostReport />
          </TabsContent>
          
          <TabsContent value="integration">
            <InventoryInvoicesIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InventoryCostingPage;

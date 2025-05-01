
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PrinterIcon, Share2, Save } from "lucide-react";
import { useSalesInvoice } from "@/hooks/useSalesInvoice";
import { toast } from "sonner";

const SalesInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    invoice, 
    createNewInvoice, 
    updateInvoiceField, 
    addInvoiceItem, 
    updateInvoiceItem, 
    removeInvoiceItem,
    applyDiscount,
    calculateTotals,
    saveInvoice,
    isLoading 
  } = useSalesInvoice();

  // عند تحميل الصفحة، إنشاء فاتورة جديدة
  useEffect(() => {
    createNewInvoice();
  }, []);

  const handleSave = async () => {
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

  return (
    <Layout>
      <div className="h-full w-full flex flex-col overflow-hidden print:overflow-visible">
        <Header title="فاتورة مبيعات جديدة" showBack={true} onBackClick={handleBack} />

        <div className="flex-1 overflow-auto px-6 py-4 print:overflow-visible print-section">
          <div className="flex justify-between items-center mb-6 print:mb-8 print-hide">
            <h2 className="text-2xl font-bold">إنشاء فاتورة مبيعات</h2>
            <div className="space-x-2 flex rtl">
              <Button onClick={handleBack} variant="outline" className="print-hide">
                <ArrowLeft className="ml-2 h-4 w-4" />
                إلغاء
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isLoading || invoice.items.length === 0}
                className="print-hide"
              >
                <Save className="ml-2 h-4 w-4" />
                حفظ الفاتورة
              </Button>
            </div>
          </div>

          <Card className="mb-6 print:shadow-none print:border-none">
            <CardContent className="p-6">
              <InvoiceForm 
                invoice={invoice}
                onFieldChange={updateInvoiceField}
                onAddItem={addInvoiceItem}
                onUpdateItem={updateInvoiceItem}
                onRemoveItem={removeInvoiceItem}
                onApplyDiscount={applyDiscount}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SalesInvoicePage;

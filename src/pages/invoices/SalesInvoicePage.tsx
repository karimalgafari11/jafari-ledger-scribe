
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useSalesInvoice } from "@/hooks/useSalesInvoice";
import { toast } from "sonner";
import { InvoiceSettings, InvoiceSettingsType } from "@/components/invoices/invoice-form/InvoiceSettings";

// Define default settings
const defaultSettings: InvoiceSettingsType = {
  showCustomerDetails: true,
  showItemCodes: true,
  showItemNotes: false,
  showDiscount: true,
  showTax: true,
  showSignature: false,
  showCompanyLogo: true,
};

const SalesInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const [invoiceSettings, setInvoiceSettings] = useState(defaultSettings);
  
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

  const handleSettingsChange = (newSettings: InvoiceSettingsType) => {
    setInvoiceSettings(newSettings);
  };

  return (
    <Layout>
      <div className="h-full w-full flex flex-col overflow-hidden print:overflow-visible">
        <Header title="فاتورة مبيعات جديدة" showBack={true} onBackClick={handleBack} />

        <div className="flex-1 overflow-auto print:overflow-visible print-section py-[2px] px-[3px] bg-gray-50">
          <div className="flex justify-between items-center mb-1 print:mb-2 print-hide">
            <h2 className="text-sm font-semibold">إنشاء فاتورة مبيعات</h2>
            <div className="space-x-1 flex rtl">
              <InvoiceSettings 
                settings={invoiceSettings}
                onSettingsChange={handleSettingsChange}
              />
              <Button onClick={handleBack} variant="outline" className="print-hide h-7 text-xs">
                <ArrowLeft className="ml-1 h-3 w-3" />
                إلغاء
              </Button>
              <Button onClick={handleSave} disabled={isLoading} className="print-hide h-7 text-xs">
                <Save className="ml-1 h-3 w-3" />
                حفظ
              </Button>
            </div>
          </div>

          <Card className="mb-2 print:shadow-none print:border-none">
            <CardContent className="p-2 bg-white">
              <InvoiceForm 
                invoice={invoice} 
                onFieldChange={updateInvoiceField} 
                onAddItem={addInvoiceItem} 
                onUpdateItem={updateInvoiceItem} 
                onRemoveItem={removeInvoiceItem} 
                onApplyDiscount={applyDiscount} 
                isLoading={isLoading}
                settings={invoiceSettings}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SalesInvoicePage;

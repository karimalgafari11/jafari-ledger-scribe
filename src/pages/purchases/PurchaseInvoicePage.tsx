
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { PurchaseInvoiceForm } from "@/components/purchases/PurchaseInvoiceForm";
import { PDFInvoiceUploader } from "@/components/purchases/PDFInvoiceUploader";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileUp } from "lucide-react";

const PurchaseInvoicePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("manual");
  const [pdfInvoiceData, setPdfInvoiceData] = useState<any>(null);
  
  const handleBack = () => {
    navigate('/purchases/invoices');
  };

  const handlePDFProcessed = (invoiceData: any) => {
    console.log("PDF processed with data:", invoiceData);
    setPdfInvoiceData(invoiceData);
    setActiveTab("manual");
  };

  return (
    <Layout>
      <Header 
        title="فاتورة شراء جديدة" 
        showBack={true}
        onBackClick={handleBack}
      />
      <div className="flex-1 overflow-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              إدخال يدوي
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              تحميل من PDF
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="mt-4">
            <PurchaseInvoiceForm initialData={pdfInvoiceData} />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-4">
            <PDFInvoiceUploader onPDFProcessed={handlePDFProcessed} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PurchaseInvoicePage;

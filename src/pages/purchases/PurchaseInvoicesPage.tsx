
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Import } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { PurchaseInvoicesTable } from "@/components/purchases/PurchaseInvoicesTable";
import { PurchaseInvoiceFilters } from "@/components/purchases/PurchaseInvoiceFilters";
import { PurchaseInvoiceActions } from "@/components/purchases/PurchaseInvoiceActions";
import { usePurchaseInvoices } from "@/hooks/purchases/usePurchaseInvoices";
import { DataImportExportDialog } from "@/components/data-management/DataImportExportDialog";
import { useDataImportExport } from "@/hooks/useDataImportExport";
import { PurchaseInvoice } from "@/types/purchases";
import { PurchaseInvoiceStats } from "@/components/purchases/PurchaseInvoiceStats";

const PurchaseInvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    invoices,
    setInvoices,
    isLoading,
    statistics,
    selectedInvoices,
    toggleInvoiceSelection,
    selectAllInvoices,
    unselectAllInvoices,
    deleteInvoices
  } = usePurchaseInvoices();

  const onDeleteSelected = () => {
    if (selectedInvoices.length === 0) {
      toast.warning("يرجى تحديد الفواتير المراد حذفها أولاً");
      return;
    }

    if (confirm(`هل أنت متأكد من حذف ${selectedInvoices.length} فواتير محددة؟`)) {
      deleteInvoices(selectedInvoices);
      toast.success(`تم حذف ${selectedInvoices.length} فواتير بنجاح`);
    }
  };

  const onPrintSelected = () => {
    if (selectedInvoices.length === 0) {
      toast.warning("يرجى تحديد الفواتير المراد طباعتها أولاً");
      return;
    }
    toast.info(`جاري إعداد طباعة ${selectedInvoices.length} فواتير`);
  };

  // استخدام الخطاف الجديد لاستيراد/تصدير البيانات
  const {
    dialogOpen,
    handleImport,
    handleExport,
    openImportExportDialog,
    closeImportExportDialog
  } = useDataImportExport(invoices, {
    // تحويل البيانات المستوردة إلى الشكل المناسب
    transformImportData: (data) => {
      // تحقق من هيكل البيانات المستوردة
      if (!Array.isArray(data)) {
        throw new Error("البيانات المستوردة غير صالحة، يجب أن تكون مصفوفة");
      }

      // التحقق من وجود الحقول الإلزامية
      const required = ["invoiceNumber", "vendorName", "date", "totalAmount"];
      
      for (const item of data) {
        for (const field of required) {
          if (!item[field]) {
            throw new Error(`حقل ${field} إلزامي لجميع الفواتير`);
          }
        }
      }
      
      // إضافة حقول افتراضية للبيانات المستوردة
      const processedData = data.map((invoice) => ({
        id: invoice.id || `imported-${Math.random().toString(36).substring(2, 15)}`,
        vendorId: invoice.vendorId || `vendor-${Math.random().toString(36).substring(2, 10)}`,
        status: invoice.status || "pending",
        items: invoice.items || [],
        ...invoice
      }));
      
      // إضافة الفواتير المستوردة إلى القائمة الحالية
      setInvoices(prevInvoices => [...prevInvoices, ...processedData]);
      
      return processedData;
    },
    
    // تحويل البيانات للتصدير
    transformExportData: (data) => {
      // تحضير البيانات للتصدير (إزالة الحقول الغير ضرورية)
      return data.map((invoice: PurchaseInvoice) => ({
        invoiceNumber: invoice.invoiceNumber,
        vendorName: invoice.vendorName,
        date: invoice.date,
        dueDate: invoice.dueDate || "-",
        totalAmount: invoice.totalAmount,
        status: getStatusInArabic(invoice.status),
        paymentMethod: invoice.paymentMethod === "cash" ? "نقداً" : "آجل",
        amountPaid: invoice.amountPaid || 0,
        remaining: invoice.totalAmount - (invoice.amountPaid || 0),
        warehouseName: invoice.warehouseName || "-"
      }));
    },
    
    // التحقق من صحة البيانات المستوردة
    validateImportData: (data) => {
      if (!data || data.length === 0) {
        return "لا توجد بيانات للاستيراد";
      }
      
      return true;
    },
    
    // خيارات إضافية للتصدير
    exportOptions: {
      fileName: "فواتير_المشتريات",
      sheetName: "فواتير المشتريات",
      includeHeaders: true
    },
    
    // الدالة التي يتم تنفيذها بعد نجاح الاستيراد
    onImportSuccess: (data) => {
      toast.success(`تم استيراد ${data.length} فاتورة بنجاح`);
    }
  });

  // دالة مساعدة لتحويل حالة الفاتورة إلى اللغة العربية
  const getStatusInArabic = (status: string): string => {
    switch (status) {
      case "paid": return "مدفوعة";
      case "pending": return "معلقة";
      case "overdue": return "متأخرة";
      case "draft": return "مسودة";
      default: return status;
    }
  };

  return (
    <Layout>
      <Header title="فواتير المشتريات" showBack={true} backPath="/purchases">
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/purchases/new")} className="bg-primary">
            <Plus className="ml-1 h-4 w-4" /> فاتورة جديدة
          </Button>
          <Button variant="outline" onClick={openImportExportDialog}>
            <Import className="ml-1 h-4 w-4" /> استيراد / تصدير
          </Button>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        <PurchaseInvoiceStats statistics={statistics} />

        <Card className="mt-6 p-4">
          <PurchaseInvoiceFilters />

          {selectedInvoices.length > 0 && (
            <PurchaseInvoiceActions
              selectedCount={selectedInvoices.length}
              onExport={(format) => {
                handleExport(format);
                return "";
              }}
              onDelete={onDeleteSelected}
              onPrint={onPrintSelected}
              onSelectAll={selectAllInvoices}
              onUnselectAll={unselectAllInvoices}
            />
          )}

          <PurchaseInvoicesTable
            invoices={invoices}
            isLoading={isLoading}
            selectedInvoices={selectedInvoices}
            onToggleSelection={toggleInvoiceSelection}
          />
        </Card>
      </div>

      {/* إضافة مكون الاستيراد والتصدير */}
      <DataImportExportDialog
        open={dialogOpen}
        onClose={closeImportExportDialog}
        title="استيراد / تصدير فواتير المشتريات"
        importTitle="استيراد فواتير المشتريات"
        exportTitle="تصدير فواتير المشتريات"
        supportedFormats={['.xlsx', '.csv', '.json']}
        allowedExportTypes={['excel', 'csv', 'pdf', 'json']}
        onImport={handleImport}
        onExport={(format) => {
          handleExport(format);
          return "";
        }}
        entityName="فواتير المشتريات"
        importInstructions="قم بتحميل ملف يحتوي على بيانات فواتير المشتريات. يجب أن يتضمن الملف الحقول التالية: رقم الفاتورة، اسم المورد، التاريخ، والمبلغ الإجمالي."
        exportInstructions="اختر صيغة التصدير المناسبة. سيتم تصدير جميع الفواتير المعروضة حالياً."
      />
    </Layout>
  );
};

export default PurchaseInvoicesPage;

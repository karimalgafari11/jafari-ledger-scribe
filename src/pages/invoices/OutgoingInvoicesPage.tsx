
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Import } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { InvoiceStatCards } from "@/components/invoices/outgoing/InvoiceStatCards";
import { InvoicesTable } from "@/components/invoices/outgoing/InvoicesTable";
import { InvoiceFilters } from "@/components/invoices/outgoing/InvoiceFilters";
import { InvoicesActions } from "@/components/invoices/outgoing/InvoicesActions";
import { useOutgoingInvoices } from "@/hooks/invoices/useOutgoingInvoices";
import { DataImportExportDialog } from "@/components/data-management/DataImportExportDialog";
import { useDataImportExport } from "@/hooks/useDataImportExport";
import { Invoice } from "@/types/invoices";

const OutgoingInvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    invoices,
    isLoading,
    statistics,
    filter,
    setFilter,
    selectedInvoices,
    toggleInvoiceSelection,
    selectAllInvoices,
    unselectAllInvoices,
    deleteInvoices
  } = useOutgoingInvoices();

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

  const onWhatsAppSend = () => {
    if (selectedInvoices.length === 0) {
      toast.warning("يرجى تحديد الفواتير المراد إرسالها أولاً");
      return;
    }
    toast.info(`جاري إعداد ${selectedInvoices.length} فواتير للإرسال عبر واتساب`);
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
      const required = ["invoiceNumber", "customerName", "date", "totalAmount"];
      
      for (const item of data) {
        for (const field of required) {
          if (!item[field]) {
            throw new Error(`حقل ${field} إلزامي لجميع الفواتير`);
          }
        }
      }
      
      // إضافة حقول افتراضية للبيانات المستوردة
      return data.map((invoice) => ({
        id: invoice.id || `imported-${Math.random().toString(36).substring(2, 15)}`,
        customerId: invoice.customerId || `cust-${Math.random().toString(36).substring(2, 10)}`,
        status: invoice.status || "pending",
        items: invoice.items || [],
        ...invoice
      }));
    },
    
    // تحويل البيانات للتصدير
    transformExportData: (data) => {
      // تحضير البيانات للتصدير (إزالة الحقول الغير ضرورية)
      return data.map((invoice: Invoice) => ({
        invoiceNumber: invoice.invoiceNumber,
        customerName: invoice.customerName,
        date: invoice.date,
        dueDate: invoice.dueDate || "-",
        totalAmount: invoice.totalAmount,
        status: getStatusInArabic(invoice.status),
        paymentMethod: invoice.paymentMethod === "cash" ? "نقداً" : "آجل",
        amountPaid: invoice.amountPaid || 0,
        remaining: invoice.totalAmount - (invoice.amountPaid || 0)
      }));
    },
    
    // التحقق من صحة البيانات المستوردة
    validateImportData: (data) => {
      if (!data || data.length === 0) {
        return "لا توجد بيانات للاستيراد";
      }
      
      // يمكن إضافة المزيد من التحقق حسب متطلبات العمل
      return true;
    },
    
    // خيارات إضافية للتصدير
    exportOptions: {
      fileName: "فواتير_المبيعات",
      sheetName: "فواتير المبيعات",
      includeHeaders: true
    },
    
    // الدالة التي يتم تنفيذها بعد نجاح الاستيراد
    onImportSuccess: (data) => {
      toast.success(`تم استيراد ${data.length} فاتورة بنجاح`);
      // في التطبيق الحقيقي، ستتم إضافة الفواتير المستوردة إلى قاعدة البيانات
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
      <Header title="فواتير المبيعات" showBack={true} backPath="/invoices/outgoing-module">
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/invoices/sales")} className="bg-primary">
            <Plus className="ml-1 h-4 w-4" /> فاتورة جديدة
          </Button>
          <Button variant="outline" onClick={openImportExportDialog}>
            <Import className="ml-1 h-4 w-4" /> استيراد / تصدير
          </Button>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        <InvoiceStatCards statistics={statistics} isLoading={isLoading} />

        <Card className="mt-6 p-4">
          <InvoiceFilters filter={filter} />

          {selectedInvoices.length > 0 && (
            <InvoicesActions
              selectedCount={selectedInvoices.length}
              onExport={(format) => {
                handleExport(format);
                return "";
              }}
              onDelete={onDeleteSelected}
              onPrint={onPrintSelected}
              onWhatsApp={onWhatsAppSend}
              onSelectAll={selectAllInvoices}
              onUnselectAll={unselectAllInvoices}
            />
          )}

          <InvoicesTable
            invoices={invoices}
            isLoading={isLoading}
            selectedInvoices={selectedInvoices}
            onToggleSelection={toggleInvoiceSelection}
            onView={() => {}} // Add empty handlers for required props
            onEdit={() => {}}
            onDelete={() => {}}
            onDuplicate={() => {}}
          />
        </Card>
      </div>

      {/* إضافة مكون الاستيراد والتصدير */}
      <DataImportExportDialog
        open={dialogOpen}
        onClose={closeImportExportDialog}
        title="استيراد / تصدير فواتير المبيعات"
        importTitle="استيراد فواتير المبيعات"
        exportTitle="تصدير فواتير المبيعات"
        supportedFormats={['.xlsx', '.csv', '.json']}
        allowedExportTypes={['excel', 'csv', 'pdf', 'json']}
        onImport={handleImport}
        onExport={(format) => {
          handleExport(format);
          return "";
        }}
        entityName="فواتير المبيعات"
        importInstructions="قم بتحميل ملف يحتوي على بيانات الفواتير. يجب أن يتضمن الملف الحقول التالية: رقم الفاتورة، اسم العميل، التاريخ، والمبلغ الإجمالي."
        exportInstructions="اختر صيغة التصدير المناسبة. سيتم تصدير جميع الفواتير المعروضة حالياً (بعد تطبيق الفلترة)."
      />
    </Layout>
  );
};

export default OutgoingInvoicesPage;

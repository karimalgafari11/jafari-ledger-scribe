
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
import { useTranslation } from "@/hooks/useTranslation";

const OutgoingInvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
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

  // Add state for the filter visibility
  const [showFilters, setShowFilters] = useState(false);

  const onDeleteSelected = () => {
    if (selectedInvoices.length === 0) {
      toast.warning(language === 'ar' ? "يرجى تحديد الفواتير المراد حذفها أولاً" : "Please select invoices to delete first");
      return;
    }

    if (confirm(language === 'ar' 
      ? `هل أنت متأكد من حذف ${selectedInvoices.length} فواتير محددة؟` 
      : `Are you sure you want to delete ${selectedInvoices.length} selected invoices?`)) {
      deleteInvoices(selectedInvoices);
      toast.success(language === 'ar' 
        ? `تم حذف ${selectedInvoices.length} فواتير بنجاح` 
        : `Successfully deleted ${selectedInvoices.length} invoices`);
    }
  };

  const onPrintSelected = () => {
    if (selectedInvoices.length === 0) {
      toast.warning(language === 'ar' ? "يرجى تحديد الفواتير المراد طباعتها أولاً" : "Please select invoices to print first");
      return;
    }
    toast.info(language === 'ar' 
      ? `جاري إعداد طباعة ${selectedInvoices.length} فواتير` 
      : `Preparing to print ${selectedInvoices.length} invoices`);
  };

  const onWhatsAppSend = () => {
    if (selectedInvoices.length === 0) {
      toast.warning(language === 'ar' ? "يرجى تحديد الفواتير المراد إرسالها أولاً" : "Please select invoices to send first");
      return;
    }
    toast.info(language === 'ar' 
      ? `جاري إعداد ${selectedInvoices.length} فواتير للإرسال عبر واتساب` 
      : `Preparing to send ${selectedInvoices.length} invoices via WhatsApp`);
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
        throw new Error(language === 'ar' ? "البيانات المستوردة غير صالحة، يجب أن تكون مصفوفة" : "Imported data is invalid, it should be an array");
      }

      // التحقق من وجود الحقول الإلزامية
      const required = ["invoiceNumber", "customerName", "date", "totalAmount"];
      
      for (const item of data) {
        for (const field of required) {
          if (!item[field]) {
            throw new Error(language === 'ar' 
              ? `حقل ${field} إلزامي لجميع الفواتير`
              : `Field ${field} is required for all invoices`);
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
        paymentMethod: language === 'ar' 
          ? (invoice.paymentMethod === "cash" ? "نقداً" : "آجل")
          : invoice.paymentMethod,
        amountPaid: invoice.amountPaid || 0,
        remaining: invoice.totalAmount - (invoice.amountPaid || 0)
      }));
    },
    
    // التحقق من صحة البيانات المستوردة
    validateImportData: (data) => {
      if (!data || data.length === 0) {
        return language === 'ar' ? "لا توجد بيانات للاستيراد" : "No data to import";
      }
      
      // يمكن إضافة المزيد من التحقق حسب متطلبات العمل
      return true;
    },
    
    // خيارات إضافية للتصدير
    exportOptions: {
      fileName: language === 'ar' ? "فواتير_المبيعات" : "Sales_Invoices",
      sheetName: language === 'ar' ? "فواتير المبيعات" : "Sales Invoices",
      includeHeaders: true
    },
    
    // الدالة التي يتم تنفيذها بعد نجاح الاستيراد
    onImportSuccess: (data) => {
      toast.success(language === 'ar' 
        ? `تم استيراد ${data.length} فاتورة بنجاح`
        : `Successfully imported ${data.length} invoices`);
      // في التطبيق الحقيقي، ستتم إضافة الفواتير المستوردة إلى قاعدة البيانات
    }
  });

  // دالة مساعدة لتحويل حالة الفاتورة إلى اللغة العربية
  const getStatusInArabic = (status: string): string => {
    if (language === 'ar') {
      switch (status) {
        case "paid": return "مدفوعة";
        case "pending": return "معلقة";
        case "overdue": return "متأخرة";
        case "draft": return "مسودة";
        default: return status;
      }
    } else {
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Layout>
      <Header title={t('salesInvoices')} showBack={true} backPath="/invoices/outgoing-module">
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/invoices/sales")} className="bg-primary">
            <Plus className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} /> 
            {language === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}
          </Button>
          <Button variant="outline" onClick={openImportExportDialog}>
            <Import className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} /> 
            {language === 'ar' ? 'استيراد / تصدير' : 'Import / Export'}
          </Button>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        <InvoiceStatCards statistics={statistics} isLoading={isLoading} />

        <Card className="mt-6 p-4">
          {/* Fix: Add the missing props to InvoiceFilters */}
          {showFilters && (
            <InvoiceFilters 
              filter={filter} 
              onFilterChange={handleFilterChange} 
              onClose={toggleFilters} 
            />
          )}

          {/* Add a button to toggle filters */}
          {!showFilters && (
            <div className="mb-4">
              <Button variant="outline" onClick={toggleFilters}>
                {t('showFilters')}
              </Button>
            </div>
          )}

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
        title={language === 'ar' ? "استيراد / تصدير فواتير المبيعات" : "Import / Export Sales Invoices"}
        importTitle={language === 'ar' ? "استيراد فواتير المبيعات" : "Import Sales Invoices"}
        exportTitle={language === 'ar' ? "تصدير فواتير المبيعات" : "Export Sales Invoices"}
        supportedFormats={['.xlsx', '.csv', '.json']}
        allowedExportTypes={['excel', 'csv', 'pdf', 'json']}
        onImport={handleImport}
        onExport={(format) => {
          handleExport(format);
          return "";
        }}
        entityName={language === 'ar' ? "فواتير المبيعات" : "Sales Invoices"}
        importInstructions={language === 'ar' 
          ? "قم بتحميل ملف يحتوي على بيانات الفواتير. يجب أن يتضمن الملف الحقول التالية: رقم الفاتورة، اسم العميل، التاريخ، والمبلغ الإجمالي."
          : "Upload a file containing invoice data. The file must include the following fields: invoice number, customer name, date, and total amount."}
        exportInstructions={language === 'ar'
          ? "اختر صيغة التصدير المناسبة. سيتم تصدير جميع الفواتير المعروضة حالياً (بعد تطبيق الفلترة)."
          : "Choose the appropriate export format. All currently displayed invoices will be exported (after applying filters)."}
      />
    </Layout>
  );
};

export default OutgoingInvoicesPage;

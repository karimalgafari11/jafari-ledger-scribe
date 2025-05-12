
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { VendorReportStats } from "@/components/vendors/reports/VendorReportStats";
import { VendorReportFilters } from "@/components/vendors/reports/VendorReportFilters";
import { VendorReportCharts } from "@/components/vendors/reports/VendorReportCharts";
import { VendorReportList } from "@/components/vendors/reports/VendorReportList";
import { useVendorReports } from "@/hooks/useVendorReports";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/ui/error-boundary/ErrorBoundary";
import { useErrorContext } from "@/contexts/ErrorContext";
import { ErrorDisplay } from "@/components/ui/error-display/ErrorDisplay";
import { useActivityLogger } from "@/hooks/useActivityLogger";

const VendorReportsPage = () => {
  const { reportError } = useErrorContext();
  const logger = useActivityLogger({
    moduleName: "تقارير الموردين",
    showToasts: false,
    persistToDatabase: true,
    consoleOutput: true
  });

  const {
    dateRange,
    setDateRange,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    vendorData,
    filteredExpenses,
    applyFilters,
    resetFilters,
    exportReport,
    printReport,
    totalPurchases,
    avgPurchaseValue,
    activeVendorsCount,
    pieChartData,
    barChartData,
    lineChartData
  } = useVendorReports();

  // تسجيل زيارة الصفحة
  React.useEffect(() => {
    logger.info("زيارة_صفحة", "تم فتح صفحة تقارير الموردين");
  }, [logger]);

  // معالجة التصدير والإبلاغ عن أي أخطاء
  const handleExport = async () => {
    try {
      logger.info("تصدير_تقرير", "بدء تصدير تقرير الموردين");
      await exportReport();
      logger.success("تصدير_تقرير", "تم تصدير تقرير الموردين بنجاح");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "خطأ غير معروف أثناء التصدير";
      logger.error("تصدير_تقرير", errorMessage);
      reportError({
        message: "فشل تصدير التقرير",
        severity: "medium",
        source: "VendorReportsPage",
        data: { error }
      });
    }
  };

  // معالجة الطباعة والإبلاغ عن أي أخطاء
  const handlePrint = async () => {
    try {
      logger.info("طباعة_تقرير", "بدء طباعة تقرير الموردين");
      await printReport(filteredExpenses, "تقرير الموردين");
      logger.success("طباعة_تقرير", "تم تجهيز تقرير الموردين للطباعة بنجاح");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "خطأ غير معروف أثناء الطباعة";
      logger.error("طباعة_تقرير", errorMessage);
      reportError({
        message: "فشل طباعة التقرير",
        severity: "medium",
        source: "VendorReportsPage",
        data: { error }
      });
    }
  };

  // معالجة تصدير PDF
  const handleExportPDF = () => {
    try {
      logger.info("تصدير_pdf", "بدء تصدير تقرير الموردين بصيغة PDF");
      toast.info("جاري إنشاء تقرير PDF...");
      // هنا سيتم إضافة رمز تصدير PDF الفعلي
      setTimeout(() => {
        toast.success("تم تصدير تقرير PDF بنجاح");
        logger.success("تصدير_pdf", "تم تصدير تقرير الموردين بصيغة PDF بنجاح");
      }, 1500);
    } catch (error) {
      logger.error("تصدير_pdf", "فشل تصدير تقرير PDF");
      reportError({
        message: "فشل تصدير تقرير PDF",
        severity: "medium",
        source: "VendorReportsPage"
      });
    }
  };

  // معالجة تصدير Excel
  const handleExportExcel = () => {
    try {
      logger.info("تصدير_excel", "بدء تصدير تقرير الموردين بصيغة Excel");
      toast.info("جاري إنشاء تقرير Excel...");
      // هنا سيتم إضافة رمز تصدير Excel الفعلي
      setTimeout(() => {
        toast.success("تم تصدير تقرير Excel بنجاح");
        logger.success("تصدير_excel", "تم تصدير تقرير الموردين بصيغة Excel بنجاح");
      }, 1500);
    } catch (error) {
      logger.error("تصدير_excel", "فشل تصدير تقرير Excel");
      reportError({
        message: "فشل تصدير تقرير Excel",
        severity: "medium",
        source: "VendorReportsPage"
      });
    }
  };

  return (
    <PageContainer title="تقارير الموردين" className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">تقارير الموردين</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleExport}
          >
            <Download size={16} />
            <span>تصدير</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handlePrint}
          >
            <Printer size={16} />
            <span>طباعة</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleExportPDF}
          >
            <FileText size={16} />
            <span>PDF</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleExportExcel}
          >
            <FileText size={16} />
            <span>Excel</span>
          </Button>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <ErrorBoundary fallback={
        <ErrorDisplay 
          error={{
            message: "حدث خطأ أثناء تحميل إحصائيات الموردين",
            severity: "medium",
            source: "VendorReportStats"
          }}
        />
      }>
        <VendorReportStats
          totalPurchases={totalPurchases}
          avgPurchaseValue={avgPurchaseValue}
          activeVendorsCount={activeVendorsCount}
        />
      </ErrorBoundary>

      {/* فلاتر التقارير */}
      <Card className="mb-6 mt-6">
        <CardContent className="p-6">
          <ErrorBoundary>
            <VendorReportFilters
              dateRange={dateRange}
              setDateRange={setDateRange}
              category={category}
              setCategory={setCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
          </ErrorBoundary>
        </CardContent>
      </Card>

      {/* الرسوم البيانية */}
      <ErrorBoundary fallback={
        <Card className="my-6 p-6">
          <ErrorDisplay 
            error={{
              message: "حدث خطأ أثناء تحميل الرسوم البيانية",
              severity: "medium",
              source: "VendorReportCharts"
            }}
            variant="compact"
          />
        </Card>
      }>
        <VendorReportCharts
          pieChartData={pieChartData}
          barChartData={barChartData}
          lineChartData={lineChartData}
        />
      </ErrorBoundary>

      {/* قائمة المشتريات حسب المورد */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">سجل المشتريات حسب المورد</h2>
          <ErrorBoundary>
            <VendorReportList 
              vendors={vendorData} 
              filteredExpenses={filteredExpenses}
            />
          </ErrorBoundary>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default VendorReportsPage;

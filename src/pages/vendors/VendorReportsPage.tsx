
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

const VendorReportsPage = () => {
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

  return (
    <PageContainer title="تقارير الموردين" className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">تقارير الموردين</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => exportReport()}
          >
            <Download size={16} />
            <span>تصدير</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => printReport(filteredExpenses, "تقرير الموردين")}
          >
            <Printer size={16} />
            <span>طباعة</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => toast.info("جاري إنشاء تقرير PDF...")}
          >
            <FileText size={16} />
            <span>PDF</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => toast.info("جاري إنشاء تقرير Excel...")}
          >
            <FileText size={16} />
            <span>Excel</span>
          </Button>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <VendorReportStats
        totalPurchases={totalPurchases}
        avgPurchaseValue={avgPurchaseValue}
        activeVendorsCount={activeVendorsCount}
      />

      {/* فلاتر التقارير */}
      <Card className="mb-6 mt-6">
        <CardContent className="p-6">
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
        </CardContent>
      </Card>

      {/* الرسوم البيانية */}
      <VendorReportCharts
        pieChartData={pieChartData}
        barChartData={barChartData}
        lineChartData={lineChartData}
      />

      {/* قائمة المشتريات حسب المورد */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">سجل المشتريات حسب المورد</h2>
          <VendorReportList 
            vendors={vendorData} 
            filteredExpenses={filteredExpenses}
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default VendorReportsPage;

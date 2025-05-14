
import React, { useState, useEffect } from 'react';
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVendorReports } from "@/hooks/useVendorReports";
import { VendorReportList } from "@/components/vendors/reports/VendorReportList";
import { VendorReportStats } from "@/components/vendors/reports/VendorReportStats";
import { VendorReportCharts } from "@/components/vendors/reports/VendorReportCharts";
import { VendorReportFilters } from "@/components/vendors/reports/VendorReportFilters";
import { Button } from "@/components/ui/button";
import { Download, Printer, Mail, FileText } from "lucide-react";
import { Expense } from "@/types/expenses";
import { toast } from "sonner";

// Mock data for reports until the hook provides it
const mockReports = [
  { id: '1', type: 'purchases', vendorName: 'Vendor 1' },
  { id: '2', type: 'payments', vendorName: 'Vendor 2' },
  { id: '3', type: 'performance', vendorName: 'Vendor 3' }
];

const VendorReportsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [mockIsLoading, setMockIsLoading] = useState(false);
  
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
  
  // Switch to overview tab when period changes
  useEffect(() => {
    setActiveTab("overview");
  }, [selectedPeriod]);
  
  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    exportReport(format);
  };
  
  const handlePrint = () => {
    printReport();
  };
  
  const handleEmail = () => {
    // Mock email report functionality
    toast.success('تم إرسال التقرير بالبريد الإلكتروني');
  };
  
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  return (
    <PageContainer title="تقارير الموردين">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">تقارير الموردين</h1>
            <p className="text-muted-foreground">تحليل ومراجعة أداء الموردين والمشتريات</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="ml-2 h-4 w-4" />
              طباعة
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
              <FileText className="ml-2 h-4 w-4" />
              تصدير Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
              <Download className="ml-2 h-4 w-4" />
              تصدير PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleEmail}>
              <Mail className="ml-2 h-4 w-4" />
              إرسال بالبريد
            </Button>
          </div>
        </div>
        
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="purchases">المشتريات</TabsTrigger>
                <TabsTrigger value="payments">المدفوعات</TabsTrigger>
                <TabsTrigger value="performance">تقييم الأداء</TabsTrigger>
              </TabsList>
            </Tabs>
            
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
          </div>
          
          <TabsContent value="overview" className="m-0">
            <VendorReportStats 
              totalPurchases={totalPurchases}
              avgPurchaseValue={avgPurchaseValue}
              activeVendorsCount={activeVendorsCount}
            />
            <div className="mt-6">
              <VendorReportCharts 
                pieChartData={pieChartData}
                barChartData={barChartData}
                lineChartData={lineChartData}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="purchases" className="m-0">
            <VendorReportList 
              title="تقارير المشتريات حسب المورد" 
              vendors={vendorData}
              filteredExpenses={filteredExpenses.filter((exp: Expense) => exp.category === 'purchases')}
            />
          </TabsContent>
          
          <TabsContent value="payments" className="m-0">
            <VendorReportList 
              title="تقارير المدفوعات حسب المورد"
              vendors={vendorData}
              filteredExpenses={filteredExpenses.filter((exp: Expense) => exp.category === 'payments')}
            />
          </TabsContent>
          
          <TabsContent value="performance" className="m-0">
            <VendorReportList 
              title="تقييم أداء الموردين"
              vendors={vendorData}
              filteredExpenses={filteredExpenses.filter((exp: Expense) => exp.category === 'performance')}
            />
          </TabsContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default VendorReportsPage;

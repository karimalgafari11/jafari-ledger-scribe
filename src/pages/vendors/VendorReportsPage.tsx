
import React, { useState, useEffect } from 'react';
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVendorReports } from "@/hooks/useVendorReports";
import VendorReportList from "@/components/vendors/reports/VendorReportList";
import VendorReportStats from "@/components/vendors/reports/VendorReportStats";
import VendorReportCharts from "@/components/vendors/reports/VendorReportCharts";
import VendorReportFilters from "@/components/vendors/reports/VendorReportFilters";
import { Button } from "@/components/ui/button";
import { Download, Printer, Mail, FileText } from "lucide-react";

const VendorReportsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const { 
    reports, 
    stats,
    isLoading,
    exportReport,
    printReport,
    emailReport
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
    emailReport();
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
              selectedPeriod={selectedPeriod}
              isOpen={isFiltersOpen}
              onToggle={toggleFilters}
              onPeriodChange={handlePeriodChange}
            />
          </div>
          
          <TabsContent value="overview" className="m-0">
            <VendorReportStats stats={stats} />
            <div className="mt-6">
              <VendorReportCharts period={selectedPeriod} />
            </div>
          </TabsContent>
          
          <TabsContent value="purchases" className="m-0">
            <VendorReportList 
              title="تقارير المشتريات حسب المورد" 
              reports={reports.filter(r => r.type === 'purchases')}
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="payments" className="m-0">
            <VendorReportList 
              title="تقارير المدفوعات حسب المورد" 
              reports={reports.filter(r => r.type === 'payments')}
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="performance" className="m-0">
            <VendorReportList 
              title="تقييم أداء الموردين" 
              reports={reports.filter(r => r.type === 'performance')}
              isLoading={isLoading} 
            />
          </TabsContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default VendorReportsPage;

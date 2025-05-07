
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { AdvancedReportFilters } from "@/components/reports/AdvancedReportFilters";
import { ReportDashboard } from "@/components/reports/ReportDashboard";
import { ReportTable } from "@/components/reports/ReportTable";
import { mockVendors } from "@/data/mockVendors";
import { useVendorReports } from "@/hooks/useVendorReports";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
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
    <div className="container p-6 mx-auto">
      <Header title="تقارير الموردين" showBack={true}>
        <div className="flex gap-2 rtl">
          <Button variant="outline" size="sm" onClick={printReport}>
            <Printer size={16} className="ml-1" />
            طباعة
          </Button>
          <Button variant="outline" size="sm" onClick={exportReport}>
            <Download size={16} className="ml-1" />
            تصدير
          </Button>
        </div>
      </Header>

      <div className="mt-6 space-y-6">
        <AdvancedReportFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          category={category}
          setCategory={setCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rtl">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-blue-600">إجمالي المشتريات</p>
              <p className="text-3xl font-bold mt-2">{totalPurchases.toLocaleString()} ريال</p>
              <p className="text-xs text-blue-500 mt-1">من جميع الموردين</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-purple-600">متوسط قيمة المشتريات</p>
              <p className="text-3xl font-bold mt-2">{avgPurchaseValue.toLocaleString()} ريال</p>
              <p className="text-xs text-purple-500 mt-1">لكل مورد</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-green-600">الموردين النشطين</p>
              <p className="text-3xl font-bold mt-2">{activeVendorsCount}</p>
              <p className="text-xs text-green-500 mt-1">من إجمالي {mockVendors.length} مورد</p>
            </CardContent>
          </Card>
        </div>

        <ReportDashboard 
          title="تحليل الموردين"
          summary="تحليل التعاملات مع الموردين"
          pieChartData={pieChartData}
          barChartData={barChartData}
          lineChartData={lineChartData}
        />

        <Card>
          <CardHeader>
            <CardTitle>تفاصيل المشتريات والموردين</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportTable expenses={filteredExpenses} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الموردين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-right">
                    <th className="p-3 border border-gray-200">اسم المورد</th>
                    <th className="p-3 border border-gray-200">جهة الاتصال</th>
                    <th className="p-3 border border-gray-200">الهاتف</th>
                    <th className="p-3 border border-gray-200">البريد الإلكتروني</th>
                    <th className="p-3 border border-gray-200">الرصيد</th>
                    <th className="p-3 border border-gray-200">الحالة</th>
                    <th className="p-3 border border-gray-200">فئة المورد</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorData.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-200">{vendor.name}</td>
                      <td className="p-3 border border-gray-200">{vendor.contactPerson || '-'}</td>
                      <td className="p-3 border border-gray-200">{vendor.phone || '-'}</td>
                      <td className="p-3 border border-gray-200">{vendor.email || '-'}</td>
                      <td className="p-3 border border-gray-200">{vendor.balance.toLocaleString()} ريال</td>
                      <td className="p-3 border border-gray-200">
                        <span className={`px-2 py-1 rounded text-xs ${
                          vendor.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-200">{vendor.category || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorReportsPage;

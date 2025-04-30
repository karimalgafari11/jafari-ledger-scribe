
import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { useReports } from "@/hooks/useReports";
import { allReports } from "@/data/reports";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FilterPopover } from "@/components/reports/FilterPopover";
import { ReportCategories } from "@/components/reports/ReportCategories";
import { ReportsList } from "@/components/reports/ReportsList";
import { AdvancedReportFilters } from "@/components/reports/AdvancedReportFilters";
import { ReportExportOptions } from "@/components/reports/ReportExportOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { FileText, Plus, Settings } from "lucide-react";

const Reports = () => {
  const {
    reports: filteredReports,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    toggleFavorite
  } = useReports(allReports);

  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const reportRef = useRef<HTMLDivElement>(null);

  const handleNewReport = () => {
    toast.info("قريباً - سيتم إضافة هذه الميزة قريباً");
  };

  const handleFilter = (value: string) => {
    setActiveCategory(value);
    toast.info("تم تحديث الفلتر");
  };

  const handleReportClick = (reportId: number) => {
    toast.success("جاري فتح التقرير...");
    console.log(`Opening report: ${reportId}`);
    // هنا يمكن إضافة منطق لفتح التقرير أو تحويل المستخدم إلى صفحة التقرير
  };

  const handleApplyFilters = () => {
    setSearchQuery(searchQuery);
    setActiveCategory(selectedCategory);
    toast.success("تم تطبيق الفلترة");
  };

  const handleResetFilters = () => {
    setDateRange({
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(),
    });
    setSelectedCategory("all");
    setSearchQuery("");
    setActiveCategory("all");
    toast.success("تم إعادة ضبط الفلترة");
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="التقارير" showBack={true}>
          <div className="flex items-center gap-4 rtl">
            <FilterPopover 
              activeCategory={activeCategory}
              onFilterChange={handleFilter}
            />
            <Link to="/reports/templates">
              <Button variant="outline" className="flex items-center gap-1">
                <Settings className="ml-2 h-4 w-4" />
                إدارة القوالب
              </Button>
            </Link>
            <Button 
              onClick={handleNewReport}
              className="bg-teal hover:bg-teal-dark text-white"
            >
              <Plus className="ml-2 h-4 w-4" />
              تقرير جديد
            </Button>
          </div>
        </Header>
      </div>

      <main className="p-6">
        <Tabs defaultValue="list" className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="list">قائمة التقارير</TabsTrigger>
              <TabsTrigger value="search">بحث متقدم</TabsTrigger>
            </TabsList>
            {filteredReports.length > 0 && (
              <ReportExportOptions
                reportTitle="قائمة التقارير"
              />
            )}
          </div>

          <TabsContent value="list">
            {/* Search Bar */}
            <div className="mb-6 max-w-md mx-auto">
              <div className="relative rtl">
                <Input
                  type="text"
                  placeholder="ابحث عن تقرير..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <ReportCategories 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <div ref={reportRef}>
              <ReportsList 
                reports={filteredReports}
                activeCategory={activeCategory}
                onReportClick={handleReportClick}
                onFavoriteClick={toggleFavorite}
              />
            </div>
          </TabsContent>

          <TabsContent value="search">
            <AdvancedReportFilters
              dateRange={dateRange}
              setDateRange={setDateRange}
              category={selectedCategory}
              setCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />

            <div className="bg-white p-6 rounded-md shadow mb-6">
              <h3 className="text-lg font-medium mb-4 rtl">نتائج البحث</h3>
              
              {filteredReports.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredReports.map((report) => (
                    <div 
                      key={report.id}
                      className="p-4 border rounded-md hover:bg-gray-50 transition-colors flex justify-between items-center rtl"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 ml-2" />
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-gray-600">{report.description}</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleReportClick(report.id)}>
                        عرض التقرير
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-md border border-dashed">
                  <p className="text-gray-500">لا توجد نتائج مطابقة لمعايير البحث</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Reports;

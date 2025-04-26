
import { Header } from "@/components/Header"
import { Input } from "@/components/ui/input"
import { useReports } from "@/hooks/useReports"
import { allReports } from "@/data/reports"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FilterPopover } from "@/components/reports/FilterPopover"
import { ReportCategories } from "@/components/reports/ReportCategories"
import { ReportsList } from "@/components/reports/ReportsList"

const Reports = () => {
  const {
    reports: filteredReports,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    toggleFavorite
  } = useReports(allReports);

  const handleNewReport = () => {
    toast.info("قريباً - سيتم إضافة هذه الميزة قريباً");
  };

  const handleFilter = (value: string) => {
    setActiveCategory(value);
    toast.info("تم تحديث الفلتر");
  };

  const handleReportClick = (reportId: number) => {
    toast.info("جاري فتح التقرير...");
    console.log(`Opening report: ${reportId}`);
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
            <Button 
              onClick={handleNewReport}
              className="bg-teal hover:bg-teal-dark text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              تقرير جديد
            </Button>
          </div>
        </Header>
      </div>

      <main className="p-6">
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

        <ReportsList 
          reports={filteredReports}
          activeCategory={activeCategory}
          onReportClick={handleReportClick}
          onFavoriteClick={toggleFavorite}
        />
      </main>
    </div>
  );
};

export default Reports;

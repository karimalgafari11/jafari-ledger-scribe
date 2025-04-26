
import { Header } from "@/components/Header";
import { ReportCategory } from "@/components/ReportCategory";
import { ReportCard } from "@/components/ReportCard";
import { Input } from "@/components/ui/input";
import { useReports } from "@/hooks/useReports";
import { Bookmark, Star, ShoppingCart, Package, Wallet, Wrench } from "lucide-react";
import { allReports } from "@/data/reports";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
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
                    <path d="M4 12h8" />
                    <path d="M4 18V6" />
                    <path d="M12 6v12" />
                    <path d="M16 12h4" />
                    <path d="M16 6v12" />
                  </svg>
                  تصفية
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 rtl">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">الفئة</h4>
                    <Select onValueChange={handleFilter} defaultValue={activeCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع التقارير</SelectItem>
                        <SelectItem value="favorites">المفضلة</SelectItem>
                        <SelectItem value="sales">المبيعات</SelectItem>
                        <SelectItem value="inventory">المخزون</SelectItem>
                        <SelectItem value="financial">المالية</SelectItem>
                        <SelectItem value="inventory-control">التحكم بالمخزون</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

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
        {/* Single Search Bar */}
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

        {/* Report Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 rtl">فئات التقارير</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 rtl">
            <ReportCategory 
              icon={<Bookmark className="text-yellow-500" />} 
              label="المفضلة"
              isActive={activeCategory === 'favorites'}
              onClick={() => setActiveCategory('favorites')}
            />
            <ReportCategory 
              icon={<ShoppingCart className="text-blue-500" />} 
              label="المبيعات"
              isActive={activeCategory === 'sales'}
              onClick={() => setActiveCategory('sales')}
            />
            <ReportCategory 
              icon={<Package className="text-green-500" />} 
              label="المخزون"
              isActive={activeCategory === 'inventory'}
              onClick={() => setActiveCategory('inventory')}
            />
            <ReportCategory 
              icon={<Wallet className="text-purple-500" />} 
              label="المالية"
              isActive={activeCategory === 'financial'}
              onClick={() => setActiveCategory('financial')}
            />
            <ReportCategory 
              icon={<Wrench className="text-orange-500" />} 
              label="التحكم بالمخزون"
              isActive={activeCategory === 'inventory-control'}
              onClick={() => setActiveCategory('inventory-control')}
            />
            <ReportCategory 
              icon={<Star className="text-gray-500" />} 
              label="جميع التقارير"
              isActive={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
          </div>
        </div>

        {/* Report Cards */}
        <div className="rtl">
          <h2 className="text-xl font-semibold mb-4">
            {activeCategory === 'favorites' && 'التقارير المفضلة'}
            {activeCategory === 'sales' && 'تقارير المبيعات'}
            {activeCategory === 'inventory' && 'تقارير المخزون'}
            {activeCategory === 'financial' && 'التقارير المالية'}
            {activeCategory === 'inventory-control' && 'تقارير التحكم بالمخزون'}
            {activeCategory === 'all' && 'جميع التقارير'}
          </h2>
          
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">لا توجد تقارير مطابقة لبحثك</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map(report => (
                <ReportCard 
                  key={report.id}
                  title={report.title}
                  description={report.description}
                  date={report.date}
                  favorite={report.favorite}
                  onFavoriteClick={() => toggleFavorite(report.id)}
                  onClick={() => handleReportClick(report.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reports;

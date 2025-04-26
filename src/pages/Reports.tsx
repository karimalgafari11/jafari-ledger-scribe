
import { Header } from "@/components/Header";
import { ReportCategory } from "@/components/ReportCategory";
import { ReportCard } from "@/components/ReportCard";
import { Input } from "@/components/ui/input";
import { useReports } from "@/hooks/useReports";
import { BookmarkStar, Star, ShoppingCart, Package, Wallet, Wrench } from "lucide-react";
import { allReports } from "@/data/reports";
import { toast } from "sonner";

const Reports = () => {
  const {
    reports: filteredReports,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    toggleFavorite
  } = useReports(allReports);

  const handleReportClick = (reportId: number) => {
    toast.info("Opening report...");
    console.log(`Opening report: ${reportId}`);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <Header title="التقارير" showBack={true} />
      
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
              icon={<BookmarkStar className="text-yellow-500" />} 
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

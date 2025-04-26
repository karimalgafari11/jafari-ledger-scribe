
import { useState } from "react";
import { ReportCard } from "@/components/ReportCard";
import { Header } from "@/components/Header";
import { ReportCategory } from "@/components/ReportCategory";
import { Search, Star, ShoppingCart, Package, Wallet, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

type ReportCategory = 'favorites' | 'sales' | 'inventory' | 'financial' | 'inventory-control' | 'all';
type Report = {
  id: number;
  title: string;
  description: string;
  date: string;
  favorite: boolean;
  category: ReportCategory | ReportCategory[];
};

const Reports = () => {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allReports: Report[] = [
    // Financial Reports
    {
      id: 1,
      title: "الميزانية العمومية",
      description: "يعرض الأصول والخصوم وحقوق الملكية",
      date: "2023/04/25",
      favorite: true,
      category: 'financial'
    },
    {
      id: 2,
      title: "قائمة الدخل",
      description: "يعرض الإيرادات والمصروفات وصافي الربح أو الخسارة",
      date: "2023/04/25",
      favorite: false,
      category: 'financial'
    },
    {
      id: 3,
      title: "التدفقات المالية",
      description: "يعرض حركة النقد الداخل والخارج",
      date: "2023/04/25",
      favorite: true,
      category: 'financial'
    },
    {
      id: 4,
      title: "دفتر الأستاذ",
      description: "يسجل جميع العمليات المحاسبية",
      date: "2023/04/25",
      favorite: false,
      category: 'financial'
    },
    {
      id: 5,
      title: "كشف الحساب",
      description: "تفاصيل حسابات العملاء أو الموردين",
      date: "2023/04/25",
      favorite: false,
      category: 'financial'
    },
    {
      id: 6,
      title: "ميزان المراجعة",
      description: "توازن الأرصدة المدينة والدائنة",
      date: "2023/04/25",
      favorite: true,
      category: 'financial'
    },
    {
      id: 7,
      title: "معلومات المحفظة",
      description: "يعرض تفاصيل المحفظة المالية",
      date: "2023/04/25",
      favorite: false,
      category: 'financial'
    },
    {
      id: 8,
      title: "توزيع المصروفات",
      description: "تحليل المصاريف حسب الفئات",
      date: "2023/04/25",
      favorite: false,
      category: 'financial'
    },
    
    // Sales Reports
    {
      id: 9,
      title: "الفواتير",
      description: "تسجيل الفواتير الصادرة للعملاء عند البيع",
      date: "2023/04/25",
      favorite: true,
      category: 'sales'
    },
    {
      id: 10,
      title: "عروض الأسعار",
      description: "إنشاء وإدارة عروض الأسعار",
      date: "2023/04/25",
      favorite: false,
      category: 'sales'
    },
    {
      id: 11,
      title: "أوامر البيع",
      description: "إدارة أوامر البيع المعتمدة",
      date: "2023/04/25",
      favorite: false,
      category: 'sales'
    },
    {
      id: 12,
      title: "الإيصالات",
      description: "تسجيل المبالغ المستلمة من العملاء",
      date: "2023/04/25",
      favorite: true,
      category: 'sales'
    },
    {
      id: 13,
      title: "مرتجعات المبيعات",
      description: "تسجيل المرتجعات المالية",
      date: "2023/04/25",
      favorite: false,
      category: 'sales'
    },
    {
      id: 14,
      title: "العملاء",
      description: "إدارة قاعدة بيانات العملاء",
      date: "2023/04/25",
      favorite: true,
      category: 'sales'
    },
    {
      id: 15,
      title: "تقارير المبيعات",
      description: "تقارير تحليلية حسب المنتج، العميل، أو المنطقة",
      date: "2023/04/25",
      favorite: false,
      category: 'sales'
    },
    
    // Inventory Reports
    {
      id: 16,
      title: "حركة المخزون",
      description: "تفاصيل دخول وخروج المخزون",
      date: "2023/04/25",
      favorite: true,
      category: 'inventory'
    },
    {
      id: 17,
      title: "المخزون الحالي",
      description: "كمية وقيمة الأصناف الحالية",
      date: "2023/04/25",
      favorite: false,
      category: 'inventory'
    },
    {
      id: 18,
      title: "الأصناف الراكدة",
      description: "المنتجات ذات الحركة البطيئة",
      date: "2023/04/25",
      favorite: true,
      category: 'inventory'
    },
    {
      id: 19,
      title: "مستويات إعادة الطلب",
      description: "تنبيه بالأصناف التي تحتاج إلى إعادة طلب",
      date: "2023/04/25",
      favorite: false,
      category: 'inventory'
    },
    {
      id: 20,
      title: "تقييم المخزون",
      description: "تقدير القيمة الإجمالية للمخزون الحالي",
      date: "2023/04/25",
      favorite: true,
      category: 'inventory'
    },
    
    // Inventory Control Reports
    {
      id: 21,
      title: "الجرد الفعلي",
      description: "مقارنة بين الجرد الفعلي والمسجل",
      date: "2023/04/25",
      favorite: false,
      category: 'inventory-control'
    },
    {
      id: 22,
      title: "الفروقات المخزنية",
      description: "الفروقات بين الكميات المتوقعة والفعلية",
      date: "2023/04/25",
      favorite: true,
      category: 'inventory-control'
    },
    {
      id: 23,
      title: "المخزون التالف أو المفقود",
      description: "تسجيل التالف والمفقود من المخزون",
      date: "2023/04/25",
      favorite: false,
      category: 'inventory-control'
    },
    {
      id: 24,
      title: "أوامر التحويل الداخلي",
      description: "تسجيل نقل البضائع بين المستودعات",
      date: "2023/04/25",
      favorite: true,
      category: 'inventory-control'
    }
  ];

  const handleCategoryClick = (category: ReportCategory) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredReports = allReports.filter((report) => {
    // Filter by category
    const categoryMatch = 
      activeCategory === 'all' || 
      activeCategory === 'favorites' && report.favorite ||
      (Array.isArray(report.category) 
        ? report.category.includes(activeCategory)
        : report.category === activeCategory);
    
    // Filter by search query
    const searchMatch = 
      !searchQuery || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleReportClick = (reportId: number) => {
    console.log(`Opening report: ${reportId}`);
    // Here you would navigate to the detailed report page
  };

  const handleToggleFavorite = (reportId: number) => {
    // Here you would implement logic to toggle favorite status
    console.log(`Toggle favorite for report: ${reportId}`);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <Header title="التقارير" showBack={true} />
      
      <main className="p-6">
        {/* Search Bar */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="relative rtl">
            <input
              type="text"
              placeholder="ابحث عن تقرير..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Report Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 rtl">فئات التقارير</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 rtl">
            <ReportCategory 
              icon={<Star className="text-yellow-500" />} 
              label="المفضلة"
              isActive={activeCategory === 'favorites'}
              onClick={() => handleCategoryClick('favorites')}
            />
            <ReportCategory 
              icon={<ShoppingCart className="text-blue-500" />} 
              label="المبيعات"
              isActive={activeCategory === 'sales'}
              onClick={() => handleCategoryClick('sales')}
            />
            <ReportCategory 
              icon={<Package className="text-green-500" />} 
              label="المخزون"
              isActive={activeCategory === 'inventory'}
              onClick={() => handleCategoryClick('inventory')}
            />
            <ReportCategory 
              icon={<Wallet className="text-purple-500" />} 
              label="المالية"
              isActive={activeCategory === 'financial'}
              onClick={() => handleCategoryClick('financial')}
            />
            <ReportCategory 
              icon={<Wrench className="text-orange-500" />} 
              label="التحكم بالمخزون"
              isActive={activeCategory === 'inventory-control'}
              onClick={() => handleCategoryClick('inventory-control')}
            />
            <ReportCategory 
              icon={<div className="text-2xl">🔍</div>} 
              label="جميع التقارير"
              isActive={activeCategory === 'all'}
              onClick={() => handleCategoryClick('all')}
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

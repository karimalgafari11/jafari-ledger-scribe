import { ReportCard } from "@/components/ReportCard";
import { Report } from "@/hooks/useReports";
interface ReportsListProps {
  reports: Report[];
  activeCategory: string;
  onReportClick: (reportId: number) => void;
  onFavoriteClick: (reportId: number) => void;
}
export function ReportsList({
  reports,
  activeCategory,
  onReportClick,
  onFavoriteClick
}: ReportsListProps) {
  return <div className="rtl">
      <h2 className="text-xl mb-4 font-semibold text-inherit">
        {activeCategory === 'favorites' && 'التقارير المفضلة'}
        {activeCategory === 'sales' && 'تقارير المبيعات'}
        {activeCategory === 'inventory' && 'تقارير المخزون'}
        {activeCategory === 'financial' && 'التقارير المالية'}
        {activeCategory === 'inventory-control' && 'تقارير التحكم بالمخزون'}
        {activeCategory === 'all' && 'جميع التقارير'}
      </h2>
      
      {reports.length === 0 ? <div className="text-center py-8">
          <p className="text-gray-500">لا توجد تقارير مطابقة لبحثك</p>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map(report => <ReportCard key={report.id} title={report.title} description={report.description} date={report.date} favorite={report.favorite} onFavoriteClick={() => onFavoriteClick(report.id)} onClick={() => onReportClick(report.id)} />)}
        </div>}
    </div>;
}
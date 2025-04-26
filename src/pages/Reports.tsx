
import { ReportCard } from "@/components/ReportCard";
import { Header } from "@/components/Header";

const Reports = () => {
  const financialReports = [
    {
      id: 1,
      title: "الميزانية العمومية",
      description: "هي قائمة تظهر أصول و خصوم و حقوق المساهمين في تاريخ محدد",
      date: "2023/04/25",
      favorite: true
    },
    {
      id: 2,
      title: "قائمة الدخل",
      description: "هي تقرير مالي يوضح إيرادات الشركة خلال فترة محددة و مصروفاتها و الربح الناتج",
      date: "2023/04/25",
      favorite: false
    },
    {
      id: 3,
      title: "التدفقات المالية",
      description: "هي قائمة توضح مصادر الأموال و استخداماتها في الشركة خلال فترة زمنية محددة",
      date: "2023/04/25",
      favorite: true
    },
    {
      id: 4,
      title: "دفتر الأستاذ",
      description: "هو سجل يتضمن جميع العمليات المالية مصنفة حسب الحسابات المالية للشركة",
      date: "2023/04/25",
      favorite: false
    },
    {
      id: 5,
      title: "كشف الحساب",
      description: "عرض تفاصيل حركة حساب معين من حسابات المؤسسة، من إيداع و سحب و رصيد",
      date: "2023/04/25",
      favorite: false
    },
    {
      id: 6,
      title: "ميزان المراجعة",
      description: "هو جدول يعرض أرصدة جميع الحسابات المالية في المؤسسة في تاريخ محدد",
      date: "2023/04/25",
      favorite: true
    },
    {
      id: 7,
      title: "معاملات المحفظة",
      description: "تقرير يوضح المعاملات المالية للمحفظة الإلكترونية للشركة",
      date: "2023/04/25",
      favorite: false
    },
    {
      id: 8,
      title: "توزيع المصروفات",
      description: "تقرير تحليلي يوضح توزيع مصروفات الشركة حسب الأقسام و الفئات",
      date: "2023/04/25",
      favorite: false
    }
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <Header title="التقارير" showBack={true} />
      
      <main className="p-6">
        <div className="mb-8 rtl">
          <h2 className="text-xl font-semibold mb-4">التقارير المفضلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {financialReports
              .filter(report => report.favorite)
              .map(report => (
                <ReportCard 
                  key={report.id}
                  title={report.title}
                  description={report.description}
                  date={report.date}
                  favorite={report.favorite}
                />
              ))
            }
          </div>
        </div>
        
        <div className="rtl">
          <h2 className="text-xl font-semibold mb-4">جميع التقارير</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {financialReports.map(report => (
              <ReportCard 
                key={report.id}
                title={report.title}
                description={report.description}
                date={report.date}
                favorite={report.favorite}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;

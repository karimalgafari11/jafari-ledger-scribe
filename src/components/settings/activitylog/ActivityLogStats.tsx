
import { UserActivity } from "@/types/permissions";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  LineChart, 
  PieChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Pie,
  Cell
} from "recharts";
import { useMemo } from "react";

interface ActivityLogStatsProps {
  activities: UserActivity[];
}

const ActivityLogStats = ({ activities }: ActivityLogStatsProps) => {
  
  // إحصائيات الأنشطة
  const stats = useMemo(() => {
    // الأنشطة حسب النوع
    const actionCounts: Record<string, number> = {};
    activities.forEach(activity => {
      const action = activity.action;
      actionCounts[action] = (actionCounts[action] || 0) + 1;
    });
    
    // الأنشطة حسب الحالة
    const statusCounts: Record<string, number> = {};
    activities.forEach(activity => {
      const status = activity.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    // الأنشطة حسب الوحدة
    const moduleCounts: Record<string, number> = {};
    activities.forEach(activity => {
      const module = activity.module;
      moduleCounts[module] = (moduleCounts[module] || 0) + 1;
    });
    
    // الأنشطة حسب المستخدم
    const userCounts: Record<string, number> = {};
    activities.forEach(activity => {
      const username = activity.username;
      userCounts[username] = (userCounts[username] || 0) + 1;
    });
    
    // الأنشطة حسب اليوم
    const dateCounts: Record<string, number> = {};
    activities.forEach(activity => {
      const date = new Date(activity.timestamp).toLocaleDateString('ar-SA');
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
    
    return {
      actionCounts,
      statusCounts,
      moduleCounts,
      userCounts,
      dateCounts
    };
  }, [activities]);
  
  // إعداد بيانات الرسم البياني الخطي
  const timelineData = useMemo(() => {
    const data: { date: string; count: number }[] = [];
    const dates = Object.keys(stats.dateCounts);
    
    // ترتيب التواريخ تصاعدياً
    dates.sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    
    dates.forEach(date => {
      data.push({
        date,
        count: stats.dateCounts[date]
      });
    });
    
    return data;
  }, [stats.dateCounts]);
  
  // إعداد بيانات الرسم البياني الدائري
  const pieData = useMemo(() => {
    const actionData = [];
    for (const [action, count] of Object.entries(stats.actionCounts)) {
      actionData.push({
        name: getActionName(action),
        value: count
      });
    }
    return actionData;
  }, [stats.actionCounts]);
  
  // ألوان للرسم البياني الدائري
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2', '#58D68D', '#F4D03F', '#EC7063'];
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-bold">إجمالي الأنشطة</h3>
            <p className="text-3xl font-bold mt-2">{activities.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-bold">عمليات ناجحة</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">
              {stats.statusCounts['success'] || 0}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-bold">عمليات فاشلة</h3>
            <p className="text-3xl font-bold mt-2 text-red-600">
              {stats.statusCounts['failed'] || 0}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-bold">المستخدمين النشطين</h3>
            <p className="text-3xl font-bold mt-2">
              {Object.keys(stats.userCounts).length}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-4">نشاط المستخدمين عبر الوقت</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timelineData}
                  margin={{
                    top: 5, right: 20, left: 0, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} name="عدد الأنشطة" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-4">توزيع الأنشطة حسب النوع</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// وظيفة مساعدة لعرض اسم الإجراء بالعربية
function getActionName(action: string): string {
  const actions: Record<string, string> = {
    login: 'تسجيل دخول',
    logout: 'تسجيل خروج',
    create: 'إنشاء',
    update: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    export: 'تصدير',
    import: 'استيراد',
    approve: 'اعتماد',
    reject: 'رفض',
    backup: 'نسخ احتياطي',
    restore: 'استعادة',
    system: 'نظام'
  };
  
  return actions[action] || action;
}

export default ActivityLogStats;

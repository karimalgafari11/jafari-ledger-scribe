
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ExternalSystem {
  id: string;
  name: string;
  type: string;
  status: string;
  lastSync?: Date;
}

// بيانات تجريبية للرسم البياني
const activityData = [
  { day: 'السبت', مزامنات: 13, اتصالات: 40, أخطاء: 2 },
  { day: 'الأحد', مزامنات: 18, اتصالات: 45, أخطاء: 1 },
  { day: 'الإثنين', مزامنات: 22, اتصالات: 78, أخطاء: 3 },
  { day: 'الثلاثاء', مزامنات: 25, اتصالات: 92, أخطاء: 4 },
  { day: 'الأربعاء', مزامنات: 20, اتصالات: 55, أخطاء: 0 },
  { day: 'الخميس', مزامنات: 27, اتصالات: 105, أخطاء: 5 },
  { day: 'الجمعة', مزامنات: 15, اتصالات: 48, أخطاء: 1 },
];

interface IntegrationActivityChartProps {
  systems: ExternalSystem[];
}

export const IntegrationActivityChart: React.FC<IntegrationActivityChartProps> = ({ systems }) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>نشاط التكامل الأسبوعي</CardTitle>
        <CardDescription>
          إحصائيات المزامنة والاتصال مع الأنظمة الخارجية خلال الأسبوع الماضي
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activityData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorSyncs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0369a1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0369a1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConnections" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Area 
                type="monotone" 
                dataKey="مزامنات" 
                stroke="#0369a1" 
                fillOpacity={1} 
                fill="url(#colorSyncs)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="اتصالات" 
                stroke="#8b5cf6" 
                fillOpacity={1} 
                fill="url(#colorConnections)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="أخطاء" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorErrors)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <div className="text-sm font-medium text-blue-700">إجمالي المزامنات</div>
            <div className="mt-1 text-2xl font-bold text-blue-900">140</div>
            <div className="mt-1 text-xs text-blue-600">+12% عن الأسبوع السابق</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
            <div className="text-sm font-medium text-purple-700">إجمالي الاتصالات</div>
            <div className="mt-1 text-2xl font-bold text-purple-900">463</div>
            <div className="mt-1 text-xs text-purple-600">+5% عن الأسبوع السابق</div>
          </div>
          <div className="bg-red-50 p-3 rounded-md border border-red-100">
            <div className="text-sm font-medium text-red-700">إجمالي الأخطاء</div>
            <div className="mt-1 text-2xl font-bold text-red-900">16</div>
            <div className="mt-1 text-xs text-red-600">-2% عن الأسبوع السابق</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

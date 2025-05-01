
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Product } from "@/types/inventory";
import { Expense } from "@/types/expenses";

interface AiAnalyticsPanelProps {
  performanceData: any[];
  categoryData: any[];
  customerData: any[];
  inventoryData: any[];
  lowStockItems: Product[];
  pendingExpenses: Expense[];
  COLORS: string[];
}

export const AiAnalyticsPanel: React.FC<AiAnalyticsPanelProps> = ({
  performanceData,
  categoryData,
  customerData,
  inventoryData,
  lowStockItems,
  pendingExpenses,
  COLORS
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle>توصيات المساعد الذكي</CardTitle>
          <CardDescription>توصيات مبنية على تحليل بيانات نظامك</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockItems.length > 0 && (
              <div className="p-4 rounded-md bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
                <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  توصية: إعادة طلب المنتجات منخفضة المخزون
                </h3>
                <p className="text-sm text-amber-700 mb-2">
                  هناك {lowStockItems.length} منتج وصل مخزونها إلى الحد الأدنى أو أقل. يوصى بإعادة طلبها في أقرب وقت.
                </p>
                <ScrollArea className="h-24 w-full">
                  <ul className="space-y-1 text-xs">
                    {lowStockItems.map(item => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className={`${item.quantity === 0 ? 'text-red-500 font-bold' : 'text-amber-700'}`}>
                          {item.quantity} / {item.reorderLevel}
                        </span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            )}
            
            {pendingExpenses.length > 0 && (
              <div className="p-4 rounded-md bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  توصية: مراجعة المصروفات المعلقة
                </h3>
                <p className="text-sm text-blue-700 mb-2">
                  هناك {pendingExpenses.length} مصروفات تنتظر الموافقة منذ أكثر من 3 أيام.
                </p>
              </div>
            )}
            
            <div className="p-4 rounded-md bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
              <h3 className="font-medium text-green-800 mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                توصية: التركيز على المنتجات الأكثر مبيعاً
              </h3>
              <p className="text-sm text-green-700">
                وفقاً لتحليل البيانات، المنتجات الأكثر مبيعاً الشهر الحالي هي "قميص قطني" و "بنطلون جينز". يُنصح بزيادة المخزون وعمل عروض ترويجية.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle>المبيعات والمصروفات الأسبوعية</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
                <Area type="monotone" dataKey="expenses" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle>صافي الربح الأسبوعي</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle>المبيعات حسب التصنيف</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle>تحليل العملاء</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={customerData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="معدل العملاء" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-white/70 backdrop-blur-sm border-blue-100">
          <CardHeader>
            <CardTitle>تحليل المخزون</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#8884d8" name="المخزون الحالي" />
                <Bar dataKey="optimal" fill="#82ca9d" name="المستوى الأمثل" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

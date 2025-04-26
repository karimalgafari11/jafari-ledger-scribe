
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/charts";

const Dashboard = () => {
  // Sample data for charts
  const revenueData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "الإيرادات",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(10, 110, 120, 0.6)",
        borderColor: "#0a6e78",
      }
    ],
  };

  const expensesData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "المصروفات",
        data: [28, 48, 40, 19, 86, 27],
        borderColor: "#0a6e78",
        backgroundColor: "transparent",
      }
    ],
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <Header title="لوحة التحكم" />

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 rtl">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي الإيرادات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231 ر.س</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <span>↑ 12.5%</span>
                <span className="mr-1 text-gray-500">مقارنة بالشهر الماضي</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">إجمالي المصروفات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,550 ر.س</div>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <span>↑ 8.2%</span>
                <span className="mr-1 text-gray-500">مقارنة بالشهر الماضي</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">صافي الربح</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20,681 ر.س</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <span>↑ 18.3%</span>
                <span className="mr-1 text-gray-500">مقارنة بالشهر الماضي</span>
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rtl">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الإيرادات</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart 
                data={revenueData}
                className="w-full h-full"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>تحليل المصروفات</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart 
                data={expensesData}
                className="w-full h-full"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

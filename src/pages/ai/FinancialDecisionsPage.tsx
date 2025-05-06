
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import FinancialDecisionsWidget from "@/components/ai/FinancialDecisionsWidget";
import { AiAnalyticsPanel } from "@/components/ai/AiAnalyticsPanel";
import { AiRulesPanel } from "@/components/ai/AiRulesPanel";
import { Product } from "@/types/inventory";
import { Expense } from "@/types/expenses";
import { useNavigate } from "react-router-dom";

const FinancialDecisionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("analysis");
  const { analyzePerformance } = useAiAssistant();
  
  const performance = analyzePerformance();
  
  // Create mock data for the analytics panel
  const mockData = {
    performanceData: [
      { name: "الأحد", sales: 4000, expenses: 2400, profit: 1600 },
      { name: "الإثنين", sales: 3000, expenses: 1398, profit: 1602 },
      { name: "الثلاثاء", sales: 2000, expenses: 9800, profit: -7800 },
      { name: "الأربعاء", sales: 2780, expenses: 3908, profit: -1128 },
      { name: "الخميس", sales: 1890, expenses: 4800, profit: -2910 },
      { name: "الجمعة", sales: 2390, expenses: 3800, profit: -1410 },
      { name: "السبت", sales: 3490, expenses: 4300, profit: -810 },
    ],
    categoryData: [
      { name: "إلكترونيات", value: 400 },
      { name: "ملابس", value: 300 },
      { name: "أثاث", value: 300 },
      { name: "أدوات منزلية", value: 200 },
      { name: "أخرى", value: 100 },
    ],
    customerData: [
      { name: "الولاء", value: 80 },
      { name: "التكرار", value: 65 },
      { name: "القيمة", value: 90 },
      { name: "المدة", value: 70 },
      { name: "الإنفاق", value: 85 },
    ],
    inventoryData: [
      { name: "إلكترونيات", stock: 120, optimal: 100 },
      { name: "ملابس", stock: 85, optimal: 150 },
      { name: "أثاث", stock: 30, optimal: 50 },
      { name: "أدوات منزلية", stock: 60, optimal: 75 },
      { name: "أخرى", stock: 40, optimal: 30 },
    ],
    // Fixed to match Product type
    lowStockItems: [
      { 
        id: "1", 
        name: "هاتف ذكي", 
        quantity: 5, 
        reorderLevel: 10, 
        code: "PHN-001", 
        price: 1299.99, 
        category: "إلكترونيات", 
        isActive: true 
      },
      { 
        id: "2", 
        name: "جهاز تابلت", 
        quantity: 2, 
        reorderLevel: 8, 
        code: "TAB-002", 
        price: 899.99, 
        category: "إلكترونيات", 
        isActive: true 
      },
      { 
        id: "3", 
        name: "سماعات لاسلكية", 
        quantity: 0, 
        reorderLevel: 15, 
        code: "AUD-003", 
        price: 299.99, 
        category: "إلكترونيات", 
        isActive: true 
      },
    ] as Product[],
    // Fixed to match Expense type (removed createdAt)
    pendingExpenses: [
      { 
        id: "1", 
        description: "إيجار المكتب", 
        amount: 5000, 
        status: "pending" as 'pending' | 'approved' | 'rejected',
        date: new Date(), 
        category: "إيجارات", 
        paymentMethod: "bank" as 'cash' | 'credit' | 'bank'
      },
      { 
        id: "2", 
        description: "فواتير الكهرباء", 
        amount: 1200, 
        status: "pending" as 'pending' | 'approved' | 'rejected',
        date: new Date(), 
        category: "مرافق", 
        paymentMethod: "bank" as 'cash' | 'credit' | 'bank'
      },
    ] as Expense[],
    COLORS: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]
  };
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="القرارات المالية الذكية" showBack={true} />
      
      <div className="grid gap-6 mt-4">
        <FinancialDecisionsWidget performance={performance} />
        
        <Card className="shadow-sm border-blue-100">
          <CardHeader className="pb-4">
            <CardTitle>تحليلات وقرارات مالية</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="analysis" className="flex-1">التحليل المالي</TabsTrigger>
                <TabsTrigger value="rules" className="flex-1">القواعد والتوصيات</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">إعدادات التحليل</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis">
                <AiAnalyticsPanel 
                  performanceData={mockData.performanceData}
                  categoryData={mockData.categoryData}
                  customerData={mockData.customerData}
                  inventoryData={mockData.inventoryData}
                  lowStockItems={mockData.lowStockItems}
                  pendingExpenses={mockData.pendingExpenses}
                  COLORS={mockData.COLORS}
                />
              </TabsContent>
              
              <TabsContent value="rules">
                <AiRulesPanel />
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="text-center p-10 text-gray-500">
                  <p>سيتم تفعيل إعدادات التحليل المالي قريباً</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDecisionsPage;

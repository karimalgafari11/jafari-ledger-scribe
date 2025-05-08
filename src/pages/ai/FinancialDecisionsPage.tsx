
import React, { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { useFinancialDecisions } from "@/hooks/useFinancialDecisions";
import { FinancialDecisionCard } from "@/components/ai/FinancialDecisionCard";
import { AiAnalyticsPanel } from "@/components/ai/AiAnalyticsPanel";
import { AiRulesPanel } from "@/components/ai/AiRulesPanel";
import { Product } from "@/types/inventory";
import { Expense } from "@/types/expenses";
import {
  FinancialDecision,
  FinancialDecisionStatus
} from "@/types/ai-finance";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, AlertCircle, FileText, Filter, SlidersHorizontal, BarChart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const FinancialDecisionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("decisions");
  const { analyzePerformance } = useAiAssistant();
  const { 
    decisions, 
    filteredDecisions, 
    isLoading, 
    filters, 
    updateFilters, 
    implementDecision, 
    acceptDecision,
    dismissDecision, 
    getDecisionStats 
  } = useFinancialDecisions();
  
  const performance = analyzePerformance();
  const stats = getDecisionStats();
  
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

  const renderStatsCard = useCallback(() => (
    <Card className="shadow-sm mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart className="h-5 w-5 text-primary" />
          إحصائيات القرارات المالية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <div className="text-green-700 text-xs mb-1">القرارات المنفذة</div>
            <div className="text-2xl font-bold">{stats.implemented}</div>
            <Progress 
              value={(stats.implemented / stats.total) * 100} 
              className="h-1 mt-2"
              indicatorClassName="bg-green-500"
            />
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
            <div className="text-amber-700 text-xs mb-1">القرارات المقبولة</div>
            <div className="text-2xl font-bold">{stats.accepted}</div>
            <Progress 
              value={(stats.accepted / stats.total) * 100} 
              className="h-1 mt-2"
              indicatorClassName="bg-amber-500"
            />
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="text-blue-700 text-xs mb-1">القرارات المقترحة</div>
            <div className="text-2xl font-bold">{stats.suggested}</div>
            <Progress 
              value={(stats.suggested / stats.total) * 100} 
              className="h-1 mt-2"
              indicatorClassName="bg-blue-500"
            />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="text-gray-700 text-xs mb-1">إجمالي التأثير المالي</div>
            <div className="text-2xl font-bold text-green-600">
              {(stats.totalPositiveImpact - Math.abs(stats.totalNegativeImpact)).toLocaleString()} ريال
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Calculator className="h-4 w-4 text-indigo-500" />
            <span className="text-xs text-gray-600">قيود محاسبية: {stats.byType.journal_entry}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-600">تسعير: {stats.byType.pricing}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span className="text-xs text-gray-600">مخصصات: {stats.byType.provision}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-gray-600">فروقات: {stats.byType.variance}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ), [stats]);

  const renderFilters = useCallback(() => (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" /> فلتر
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">نوع القرار</h4>
                <Select
                  value={filters.type}
                  onValueChange={(value) => updateFilters({ type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="journal_entry">قيود محاسبية</SelectItem>
                      <SelectItem value="pricing">تسعير</SelectItem>
                      <SelectItem value="provision">مخصصات</SelectItem>
                      <SelectItem value="variance">فروقات</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">حالة القرار</h4>
                <Select
                  value={filters.status}
                  onValueChange={(value) => updateFilters({ status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="suggested">مقترح</SelectItem>
                      <SelectItem value="accepted">مقبول</SelectItem>
                      <SelectItem value="implemented">منفذ</SelectItem>
                      <SelectItem value="rejected">مرفوض</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">ترتيب حسب</h4>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => updateFilters({ sortBy: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="impact">التأثير المالي</SelectItem>
                      <SelectItem value="confidence">مستوى الثقة</SelectItem>
                      <SelectItem value="date">التاريخ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">نوع الترتيب</h4>
                <Select
                  value={filters.sortOrder}
                  onValueChange={(value) => updateFilters({ sortOrder: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="نوع الترتيب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="desc">تنازلي</SelectItem>
                      <SelectItem value="asc">تصاعدي</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => updateFilters({
                  type: 'all',
                  status: 'all',
                  sortBy: 'impact',
                  sortOrder: 'desc'
                })}
                className="w-full"
              >
                إعادة تعيين الفلتر
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex gap-1">
          <Button 
            variant={filters.type === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => updateFilters({ type: 'all' })}
            className="h-8 px-2 py-1"
          >
            الكل
          </Button>
          <Button 
            variant={filters.type === 'journal_entry' ? "default" : "outline"} 
            size="sm" 
            onClick={() => updateFilters({ type: 'journal_entry' })}
            className="h-8 px-2 py-1 flex items-center gap-1"
          >
            <Calculator className="h-3 w-3" />
            قيود
          </Button>
          <Button 
            variant={filters.type === 'pricing' ? "default" : "outline"} 
            size="sm" 
            onClick={() => updateFilters({ type: 'pricing' })}
            className="h-8 px-2 py-1 flex items-center gap-1"
          >
            <DollarSign className="h-3 w-3" />
            تسعير
          </Button>
          <Button 
            variant={filters.type === 'provision' ? "default" : "outline"} 
            size="sm" 
            onClick={() => updateFilters({ type: 'provision' })}
            className="h-8 px-2 py-1 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" />
            مخصصات
          </Button>
          <Button 
            variant={filters.type === 'variance' ? "default" : "outline"} 
            size="sm" 
            onClick={() => updateFilters({ type: 'variance' })}
            className="h-8 px-2 py-1 flex items-center gap-1"
          >
            <FileText className="h-3 w-3" />
            فروقات
          </Button>
        </div>
      </div>

      <div className="flex gap-1">
        <Button 
          variant={filters.status === 'all' ? "default" : "ghost"} 
          size="sm" 
          onClick={() => updateFilters({ status: 'all' })}
          className="h-8 px-3"
        >
          الكل
          <Badge variant="outline" className="mr-2 bg-gray-100">{decisions.length}</Badge>
        </Button>
        <Button 
          variant={filters.status === 'suggested' ? "default" : "ghost"} 
          size="sm" 
          onClick={() => updateFilters({ status: 'suggested' })}
          className="h-8 px-3"
        >
          مقترح
          <Badge variant="outline" className="mr-2 bg-blue-100">{stats.suggested}</Badge>
        </Button>
        <Button 
          variant={filters.status === 'accepted' ? "default" : "ghost"} 
          size="sm" 
          onClick={() => updateFilters({ status: 'accepted' })}
          className="h-8 px-3"
        >
          مقبول
          <Badge variant="outline" className="mr-2 bg-amber-100">{stats.accepted}</Badge>
        </Button>
        <Button 
          variant={filters.status === 'implemented' ? "default" : "ghost"} 
          size="sm" 
          onClick={() => updateFilters({ status: 'implemented' })}
          className="h-8 px-3"
        >
          منفذ
          <Badge variant="outline" className="mr-2 bg-green-100">{stats.implemented}</Badge>
        </Button>
      </div>
    </div>
  ), [filters, updateFilters, decisions.length, stats]);
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="القرارات المالية الذكية" showBack={true} />
      
      <div className="mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="decisions" className="flex-1">القرارات المالية</TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1">التحليل المالي</TabsTrigger>
            <TabsTrigger value="rules" className="flex-1">القواعد والتوصيات</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">إعدادات التحليل</TabsTrigger>
          </TabsList>
          
          <TabsContent value="decisions">
            {renderStatsCard()}
            {renderFilters()}
            
            <ScrollArea className="h-[calc(100vh-350px)] w-full pr-4">
              {filteredDecisions.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  لا توجد قرارات مطابقة لمعايير البحث
                </div>
              ) : (
                filteredDecisions.map(decision => (
                  <FinancialDecisionCard
                    key={decision.id}
                    decision={decision}
                    onImplement={implementDecision}
                    onAccept={acceptDecision}
                    onDismiss={dismissDecision}
                    isLoading={isLoading}
                    showDetails={true}
                  />
                ))
              )}
            </ScrollArea>
          </TabsContent>
          
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
      </div>
    </div>
  );
};

export default FinancialDecisionsPage;

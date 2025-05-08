
import { Product } from "@/types/inventory";
import { Expense } from "@/types/expenses";
import { JournalEntry, JournalStatus } from "@/types/journal";
import { mockProducts } from "@/data/mockProducts";
import { mockExpenses } from "@/data/mockExpenses";
import { mockJournalEntries } from "@/data/mockJournalEntries";

export const useAiDataAccess = () => {
  // Query for low stock products
  const getLowStockProducts = (): Product[] => {
    return mockProducts.filter(product => product.quantity <= product.reorderLevel);
  };
  
  // Query for pending expenses
  const getPendingExpenses = (): Expense[] => {
    return mockExpenses.filter(expense => expense.status === "pending");
  };
  
  // Query for pending journal entries
  const getPendingJournalEntries = (): JournalEntry[] => {
    return mockJournalEntries.filter(entry => entry.status === JournalStatus.Pending);
  };

  // Analyze performance data
  const analyzePerformance = () => {
    return {
      totalSales: 156750.25,
      lastWeekGrowth: 12.5,
      topProduct: mockProducts[0],
      recommendedActions: [
        "زيادة مخزون المنتجات الأكثر مبيعاً",
        "التواصل مع العملاء المتأخرين عن السداد",
        "مراجعة المصروفات المعلقة للموافقة عليها"
      ],
      profitMargin: 18.5,
      currentRatio: 1.8,
      revenueGrowth: 5.7,
      expenseTrend: 3.2,
      cashFlow: 45000,
      keyInsights: [
        "معدل نمو المبيعات أعلى من معدل نمو المصروفات بنسبة 2.5%",
        "هامش الربح في تحسن مستمر للربع الثالث على التوالي",
        "المنتجات الإلكترونية تشكل 65% من إجمالي المبيعات",
        "انخفاض في قيمة المخزون الراكد بنسبة 12% عن الفترة السابقة"
      ],
      recommendations: [
        {
          priority: 'high' as 'high',
          description: "إعادة هيكلة سياسة التسعير للمنتجات منخفضة الدوران",
          potentialImpact: "زيادة محتملة في هامش الربح بنسبة 3-5%",
          implementationDifficulty: 'moderate' as 'moderate'
        },
        {
          priority: 'medium' as 'medium',
          description: "تحسين إدارة المخزون للمنتجات عالية الطلب",
          potentialImpact: "تقليل تكلفة التخزين بنسبة 8-10%",
          implementationDifficulty: 'easy' as 'easy'
        },
        {
          priority: 'medium' as 'medium',
          description: "مراجعة شروط الائتمان مع العملاء المتأخرين",
          potentialImpact: "تحسين التدفق النقدي بقيمة 15000+ ريال شهرياً",
          implementationDifficulty: 'moderate' as 'moderate'
        }
      ]
    };
  };

  return {
    getLowStockProducts,
    getPendingExpenses,
    getPendingJournalEntries,
    analyzePerformance
  };
};

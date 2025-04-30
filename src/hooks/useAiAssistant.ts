
import { useState, useEffect } from "react";
import { ApiResponse, Message, SystemAlert, AiAssistantContext } from "@/types/ai";
import { Product } from "@/types/inventory";
import { Expense } from "@/types/expenses";
import { Customer } from "@/types/customers";
import { mockProducts } from "@/data/mockProducts";
import { mockExpenses } from "@/data/mockExpenses";
import { mockCustomers } from "@/data/mockCustomers";

export const useAiAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [systemContext, setSystemContext] = useState<AiAssistantContext>({
    lowStockItems: 0,
    unpaidInvoices: 0,
    pendingExpenses: 0,
    pendingApprovals: 0,
    recentAlerts: []
  });
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);

  const API_KEY = "sk-1c339b5c5397486ebbcc7730383c8cdc";
  const API_URL = "https://api.deepseek.com/v1/chat/completions";

  // جمع معلومات النظام لتوفير سياق للمساعد الذكي
  useEffect(() => {
    collectSystemContext();
  }, []);

  const collectSystemContext = () => {
    // فحص المخزون المنخفض
    const lowStockProducts = mockProducts.filter(
      (product) => product.quantity <= product.reorderLevel
    );
    
    // فحص المصروفات المعلقة
    const pendingExpenses = mockExpenses.filter(
      (expense) => expense.status === "pending"
    );
    
    // إنشاء تنبيهات النظام
    const alerts: SystemAlert[] = [];
    
    // إضافة تنبيهات المخزون
    lowStockProducts.forEach(product => {
      if (product.quantity === 0) {
        alerts.push({
          type: "inventory",
          message: `نفاد مخزون المنتج: ${product.name}`,
          priority: "high",
          data: product,
          timestamp: new Date()
        });
      } else if (product.quantity <= product.reorderLevel / 2) {
        alerts.push({
          type: "inventory",
          message: `مخزون منخفض جداً للمنتج: ${product.name} (${product.quantity} قطعة)`,
          priority: "medium",
          data: product,
          timestamp: new Date()
        });
      } else {
        alerts.push({
          type: "inventory",
          message: `مخزون منخفض للمنتج: ${product.name} (${product.quantity} قطعة)`,
          priority: "low",
          data: product,
          timestamp: new Date()
        });
      }
    });
    
    // إضافة تنبيهات المصروفات
    pendingExpenses.forEach(expense => {
      alerts.push({
        type: "expenses",
        message: `مصروف بقيمة ${expense.amount} ينتظر الموافقة: ${expense.description}`,
        priority: "medium",
        data: expense,
        timestamp: new Date()
      });
    });
    
    // العملاء ذوو الديون العالية
    const highDebtCustomers = mockCustomers.filter(
      (customer) => customer.balance > customer.creditLimit * 0.8
    );
    
    highDebtCustomers.forEach(customer => {
      alerts.push({
        type: "customers",
        message: `رصيد العميل ${customer.name} تجاوز ${Math.round(customer.balance / customer.creditLimit! * 100)}% من الحد الائتماني`,
        priority: "high",
        data: customer,
        timestamp: new Date()
      });
    });
    
    // تحديث السياق العام للنظام
    setSystemContext({
      lowStockItems: lowStockProducts.length,
      unpaidInvoices: 5, // قيمة افتراضية للعرض
      pendingExpenses: pendingExpenses.length,
      pendingApprovals: pendingExpenses.length + 3, // قيمة افتراضية للعرض
      recentAlerts: alerts
    });
    
    // تعيين التنبيهات
    setSystemAlerts(alerts);
  };

  // بناء رسالة النظام بناءً على سياق التطبيق
  const buildSystemPrompt = () => {
    return `أنت مساعد ذكي متخصص في نظام إدارة المخزون والمحاسبة. دورك هو مساعدة المستخدم بالمعلومات المفيدة والإجابة على أسئلته بخصوص نظام إدارة المخزون والمبيعات والمشتريات والمحاسبة.

معلومات حالية عن النظام:
- يوجد حالياً ${systemContext.lowStockItems} منتج بمخزون منخفض يحتاج إلى إعادة طلب.
- يوجد ${systemContext.unpaidInvoices} فاتورة غير مدفوعة.
- يوجد ${systemContext.pendingExpenses} مصروف ينتظر الموافقة.
- يوجد ${systemContext.pendingApprovals} عملية تنتظر الموافقة بشكل عام.

عندما يسأل المستخدم عن:
- المخزون: قدم معلومات حول المنتجات، مستويات المخزون، إعادة الطلب.
- المبيعات: قدم معلومات حول الفواتير، العملاء، المبيعات الأخيرة.
- المشتريات: قدم معلومات حول المشتريات، الموردين، الطلبات.
- المحاسبة: قدم معلومات حول الإيرادات، المصروفات، التقارير المالية.

أجب بأسلوب مهني ومختصر ومفيد. قدم اقتراحات عملية للمستخدم بناءً على المعلومات المتاحة.`;
  };

  // إرسال رسالة إلى API المساعد الذكي
  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // بناء رسائل للإرسال إلى API
      const systemMessage = {
        role: "system" as const,
        content: buildSystemPrompt(),
      };
      
      const userMessage = {
        role: "user" as const,
        content: message,
      };
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [systemMessage, userMessage],
          temperature: 0.5, // خفض قيمة الحرارة للحصول على إجابات أكثر دقة
          max_tokens: 1000, // زيادة عدد الرموز للحصول على إجابات أكثر تفصيلًا
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "حدث خطأ في الاتصال بالخدمة");
      }

      const data: ApiResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // استعلام عن منتجات المخزون المنخفض
  const getLowStockProducts = (): Product[] => {
    return mockProducts.filter(product => product.quantity <= product.reorderLevel);
  };
  
  // استعلام عن المصروفات المعلقة
  const getPendingExpenses = (): Expense[] => {
    return mockExpenses.filter(expense => expense.status === "pending");
  };
  
  // تحليل أداء المبيعات (افتراضية حالياً)
  const analyzePerformance = () => {
    return {
      totalSales: 156750.25,
      lastWeekGrowth: 12.5,
      topProduct: mockProducts[0],
      recommendedActions: [
        "زيادة مخزون المنتجات الأكثر مبيعاً",
        "التواصل مع العملاء المتأخرين عن السداد",
        "مراجعة المصروفات المعلقة للموافقة عليها"
      ]
    };
  };

  return { 
    sendMessage, 
    isLoading, 
    systemAlerts,
    getLowStockProducts,
    getPendingExpenses,
    analyzePerformance
  };
};

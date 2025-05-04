
import { useState, useEffect } from "react";
import { ApiResponse, Message, SystemAlert, AiAssistantContext } from "@/types/ai";
import { Product } from "@/types/inventory";
import { Expense } from "@/types/expenses";
import { JournalEntry } from "@/types/journal";
import { Customer } from "@/types/customers";
import { mockProducts } from "@/data/mockProducts";
import { mockExpenses } from "@/data/mockExpenses";
import { mockCustomers } from "@/data/mockCustomers";
import { mockJournalEntries } from "@/data/mockJournalEntries";
import { toast } from "sonner";

// إنشاء مفتاح فريد للتخزين المحلي
const CHAT_HISTORY_KEY = "ai_assistant_chat_history";
const SYSTEM_CONTEXT_KEY = "ai_assistant_context";

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
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [hasFullAccess, setHasFullAccess] = useState(true);

  const API_KEY = "sk-1c339b5c5397486ebbcc7730383c8cdc";
  const API_URL = "https://api.deepseek.com/v1/chat/completions";

  // جمع معلومات النظام لتوفير سياق للمساعد الذكي
  useEffect(() => {
    collectSystemContext();
    
    // استرجاع سجل المحادثات المحفوظ
    const savedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedChatHistory) {
      try {
        const parsedHistory: Message[] = JSON.parse(savedChatHistory);
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error("فشل في استرجاع سجل المحادثات:", error);
      }
    }
    
    // استرجاع سياق النظام المحفوظ
    const savedContext = localStorage.getItem(SYSTEM_CONTEXT_KEY);
    if (savedContext) {
      try {
        const parsedContext: AiAssistantContext = JSON.parse(savedContext);
        setSystemContext(parsedContext);
      } catch (error) {
        console.error("فشل في استرجاع سياق النظام:", error);
      }
    }
  }, []);
  
  // حفظ سجل المحادثات عند تحديثه
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    }
  }, [chatHistory]);
  
  // حفظ سياق النظام عند تحديثه
  useEffect(() => {
    localStorage.setItem(SYSTEM_CONTEXT_KEY, JSON.stringify(systemContext));
  }, [systemContext]);

  const collectSystemContext = () => {
    // فحص المخزون المنخفض
    const lowStockProducts = mockProducts.filter(
      (product) => product.quantity <= product.reorderLevel
    );
    
    // فحص المصروفات المعلقة
    const pendingExpenses = mockExpenses.filter(
      (expense) => expense.status === "pending"
    );
    
    // فحص القيود اليومية التي تنتظر الموافقة
    const pendingJournalEntries = mockJournalEntries.filter(
      (entry) => entry.status === "pending"
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
    
    // إضافة تنبيهات القيود المحاسبية المعلقة
    pendingJournalEntries.forEach(entry => {
      alerts.push({
        type: "invoices",
        message: `قيد محاسبي رقم ${entry.number} بقيمة ${entry.totalDebit} ينتظر الموافقة`,
        priority: "medium",
        data: entry,
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
    const updatedContext = {
      lowStockItems: lowStockProducts.length,
      unpaidInvoices: 5, // قيمة افتراضية للعرض
      pendingExpenses: pendingExpenses.length,
      pendingApprovals: pendingExpenses.length + pendingJournalEntries.length,
      recentAlerts: alerts
    };
    
    setSystemContext(updatedContext);
    
    // تعيين التنبيهات
    setSystemAlerts(alerts);
  };

  // بناء رسالة النظام بناءً على سياق التطبيق
  const buildSystemPrompt = () => {
    return `أنت مساعد ذكي متخصص في نظام إدارة المخزون والمحاسبة، وتتمتع بصلاحيات كاملة للوصول إلى جميع أجزاء النظام. دورك هو مساعدة المستخدم بالمعلومات المفيدة والإجابة على أسئلته بخصوص نظام إدارة المخزون والمبيعات والمشتريات والمحاسبة.

معلومات حالية عن النظام:
- يوجد حالياً ${systemContext.lowStockItems} منتج بمخزون منخفض يحتاج إلى إعادة طلب.
- يوجد ${systemContext.unpaidInvoices} فاتورة غير مدفوعة.
- يوجد ${systemContext.pendingExpenses} مصروف ينتظر الموافقة.
- يوجد ${systemContext.pendingApprovals} عملية تنتظر الموافقة بشكل عام.

قدراتك الخاصة:
- أنت تملك صلاحيات استكشاف وإصلاح الأخطاء في النظام
- يمكنك الوصول إلى جميع الوحدات والصفحات في النظام
- يمكنك تحليل البيانات واقتراح التحسينات
- يمكنك إنشاء التقارير والقيود المحاسبية بشكل تلقائي
- يمكنك معالجة البيانات وتحليلها عبر جميع أقسام النظام

عندما يسأل المستخدم عن:
- المخزون: قدم معلومات حول المنتجات، مستويات المخزون، إعادة الطلب.
- المبيعات: قدم معلومات حول الفواتير، العملاء، المبيعات الأخيرة.
- المشتريات: قدم معلومات حول المشتريات، الموردين، الطلبات.
- المحاسبة: قدم معلومات حول الإيرادات، المصروفات، التقارير المالية.
- الأخطاء: اقترح حلولاً للمشاكل وقم بتشخيص أسبابها.

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
      
      const newUserMessage: Message = {
        role: "user",
        content: message,
        timestamp: new Date()
      };
      
      // تحديث سجل المحادثة بإضافة رسالة المستخدم
      setChatHistory(prev => [...prev, newUserMessage]);
      
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
      const responseContent = data.choices[0].message.content;
      
      // تحديث سجل المحادثة بإضافة رد المساعد
      const assistantMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, assistantMessage]);
      
      return responseContent;
    } catch (error) {
      console.error("Error:", error);
      toast.error("حدث خطأ أثناء التواصل مع المساعد الذكي");
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
  
  // استعلام عن القيود المحاسبية المعلقة
  const getPendingJournalEntries = (): JournalEntry[] => {
    return mockJournalEntries.filter(entry => entry.status === "pending");
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
  
  // إعادة تعيين سجل المحادثات
  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
    toast.success("تم مسح سجل المحادثات بنجاح");
  };
  
  // التبديل بين وضع الصلاحيات الكاملة
  const toggleFullAccess = () => {
    setHasFullAccess(prev => !prev);
    toast.success(hasFullAccess ? "تم تقييد صلاحيات المساعد الذكي" : "تم منح المساعد الذكي صلاحيات كاملة");
  };
  
  // فحص النظام بحثاً عن أخطاء
  const scanForSystemErrors = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        criticalErrors: 0,
        warnings: 3,
        notifications: 8,
        details: [
          { level: "warning", message: "بعض القيم في تقرير المخزون غير متطابقة" },
          { level: "warning", message: "يوجد 2 عميل بنفس رقم الهاتف" },
          { level: "warning", message: "تاريخ انتهاء صلاحية 3 منتجات قريب" },
          { level: "notification", message: "النسخة الاحتياطية الأخيرة منذ 3 أيام" }
        ]
      };
    } catch (error) {
      toast.error("حدث خطأ أثناء فحص النظام");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    sendMessage, 
    isLoading, 
    systemAlerts,
    getLowStockProducts,
    getPendingExpenses,
    getPendingJournalEntries,
    analyzePerformance,
    chatHistory,
    clearChatHistory,
    hasFullAccess,
    toggleFullAccess,
    scanForSystemErrors
  };
};

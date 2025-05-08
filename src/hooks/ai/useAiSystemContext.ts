
import { useState, useEffect, useCallback } from "react";
import { SystemAlert, AiAssistantContext } from "@/types/ai";
import { mockProducts } from "@/data/mockProducts";
import { mockExpenses } from "@/data/mockExpenses";
import { mockJournalEntries } from "@/data/mockJournalEntries";
import { mockCustomers } from "@/data/mockCustomers";
import { v4 as uuidv4 } from 'uuid';
import { JournalStatus } from "@/types/journal";
import { useAiSecurityContext } from "./useAiSecurityContext";

// Local storage key for system context
const SYSTEM_CONTEXT_KEY = "ai_assistant_context";

export const useAiSystemContext = () => {
  const [systemContext, setSystemContext] = useState<AiAssistantContext>({
    lowStockItems: 0,
    unpaidInvoices: 0,
    pendingExpenses: 0,
    pendingApprovals: 0,
    recentAlerts: []
  });
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  
  const { identityVerified, currentVerificationLevel, hasFullAccess } = useAiSecurityContext();

  // Initialize system context
  useEffect(() => {
    collectSystemContext();
    
    // Load system context from localStorage
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
  
  // Save system context to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(SYSTEM_CONTEXT_KEY, JSON.stringify(systemContext));
  }, [systemContext]);

  // Collect system context data from various sources
  const collectSystemContext = useCallback(() => {
    // Check for low stock products
    const lowStockProducts = mockProducts.filter(
      (product) => product.quantity <= product.reorderLevel
    );
    
    // Check for pending expenses
    const pendingExpenses = mockExpenses.filter(
      (expense) => expense.status === "pending"
    );
    
    // Check for journal entries awaiting approval
    const pendingJournalEntries = mockJournalEntries.filter(
      (entry) => entry.status === JournalStatus.Pending
    );
    
    // Create system alerts
    const alerts: SystemAlert[] = [];
    
    // Add inventory alerts
    lowStockProducts.forEach(product => {
      if (product.quantity === 0) {
        alerts.push({
          id: uuidv4(),
          title: `نفاد مخزون المنتج: ${product.name}`,
          type: "inventory",
          message: `نفاد مخزون المنتج: ${product.name}`,
          priority: "high",
          severity: "high",
          data: product,
          timestamp: new Date(),
          read: false
        });
      } else if (product.quantity <= product.reorderLevel / 2) {
        alerts.push({
          id: uuidv4(),
          title: `مخزون منخفض جداً للمنتج: ${product.name}`,
          type: "inventory",
          message: `مخزون منخفض جداً للمنتج: ${product.name} (${product.quantity} قطعة)`,
          priority: "medium",
          severity: "medium",
          data: product,
          timestamp: new Date(),
          read: false
        });
      } else {
        alerts.push({
          id: uuidv4(),
          title: `مخزون منخفض للمنتج: ${product.name}`,
          type: "inventory",
          message: `مخزون منخفض للمنتج: ${product.name} (${product.quantity} قطعة)`,
          priority: "low",
          severity: "low",
          data: product,
          timestamp: new Date(),
          read: false
        });
      }
    });
    
    // Add expense alerts
    pendingExpenses.forEach(expense => {
      alerts.push({
        id: uuidv4(),
        title: `مصروف ينتظر الموافقة: ${expense.description}`,
        type: "expenses",
        message: `مصروف بقيمة ${expense.amount} ينتظر الموافقة: ${expense.description}`,
        priority: "medium",
        severity: "medium",
        data: expense,
        timestamp: new Date(),
        read: false
      });
    });
    
    // Add journal entry alerts
    pendingJournalEntries.forEach(entry => {
      alerts.push({
        id: uuidv4(),
        title: `قيد محاسبي ينتظر الموافقة: ${entry.entryNumber}`,
        type: "invoices",
        message: `قيد محاسبي رقم ${entry.entryNumber} بقيمة ${entry.totalDebit} ينتظر الموافقة`,
        priority: "medium",
        severity: "medium",
        data: entry,
        timestamp: new Date(),
        read: false
      });
    });
    
    // Add high-debt customer alerts
    const highDebtCustomers = mockCustomers.filter(
      (customer) => customer.balance > customer.creditLimit! * 0.8
    );
    
    highDebtCustomers.forEach(customer => {
      alerts.push({
        id: uuidv4(),
        title: `تجاوز العميل الحد الائتماني: ${customer.name}`,
        type: "customers",
        message: `رصيد العميل ${customer.name} تجاوز ${Math.round(customer.balance / customer.creditLimit! * 100)}% من الحد الائتماني`,
        priority: "high",
        severity: "high",
        data: customer,
        timestamp: new Date(),
        read: false
      });
    });
    
    // Update system context
    const updatedContext = {
      lowStockItems: lowStockProducts.length,
      unpaidInvoices: 5, // Default value for display purposes
      pendingExpenses: pendingExpenses.length,
      pendingApprovals: pendingExpenses.length + pendingJournalEntries.length,
      recentAlerts: alerts
    };
    
    setSystemContext(updatedContext);
    setSystemAlerts(alerts);
  }, []);

  // Build system prompt based on application context and verification status
  const buildSystemPrompt = useCallback(() => {
    const securityLevel = !identityVerified ? 'محدود' : 
                          currentVerificationLevel === 1 ? 'أساسي' :
                          currentVerificationLevel === 2 ? 'متقدم' : 'كامل';
    
    return `أنت مساعد ذكي متخصص في نظام إدارة المخزون والمحاسبة، وتتمتع بصلاحيات ${hasFullAccess ? 'كاملة' : 'محدودة'} للوصول إلى أجزاء النظام. دورك هو مساعدة المستخدم بالمعلومات المفيدة والإجابة على أسئلته بخصوص نظام إدارة المخزون والمبيعات والمشتريات والمحاسبة.

معلومات حالية عن النظام:
- يوجد حالياً ${systemContext.lowStockItems} منتج بمخزون منخفض يحتاج إلى إعادة طلب.
- يوجد ${systemContext.unpaidInvoices} فاتورة غير مدفوعة.
- يوجد ${systemContext.pendingExpenses} مصروف ينتظر الموافقة.
- يوجد ${systemContext.pendingApprovals} عملية تنتظر الموافقة بشكل عام.

مستوى أمان الجلسة: ${securityLevel}
مستوى التحقق الحالي: ${currentVerificationLevel}
صلاحية الوصول: ${hasFullAccess ? 'كاملة' : 'محدودة'}

قواعد الأمان المهمة:
1. لا تقدم معلومات مالية حساسة إلا بعد التحقق من المستخدم بمستوى 2 على الأقل.
2. لا تقدم معلومات عملاء حساسة إلا بعد التحقق من المستخدم بمستوى 1 على الأقل.
3. لا تقدم معلومات نظام حساسة إلا بعد التحقق من المستخدم بمستوى 2 على الأقل.
4. إذا طلب المستخدم معلومات لا تملك صلاحية الوصول إليها، اطلب منه التحقق من هويته أولاً.

قدراتك الخاصة:
- أنت تملك صلاحيات استكشاف وإصلاح الأخطاء في النظام
- يمكنك الوصول إلى جميع الوحدات والصفحات في النظام
- يمكنك تحليل البيانات واقتراح التحسينات
- يمكنك إنشاء التقارير والقيود المحاسبية بشكل تلقائي
- يمكنك معالجة البيانات وتحليلها عبر جميع أقسام النظام

أجب بأسلوب مهني ومختصر ومفيد. قدم اقتراحات عملية للمستخدم بناءً على المعلومات المتاحة.`;
  }, [systemContext, identityVerified, currentVerificationLevel, hasFullAccess]);

  // Get system alerts
  const getSystemAlerts = useCallback((): SystemAlert[] => {
    return systemAlerts;
  }, [systemAlerts]);
  
  // Generate random system alerts
  const generateSystemAlerts = useCallback(() => {
    const alerts: SystemAlert[] = [];
    
    // Low Inventory Alert
    if (Math.random() > 0.3) {
      alerts.push({
        id: uuidv4(),
        title: "مخزون منخفض",
        message: "المنتج 'هاتف ذكي سامسونج' وصل إلى مستوى إعادة الطلب",
        type: "inventory",
        priority: "high",
        severity: "high",
        timestamp: new Date(),
        read: false,
        data: {
          name: 'هاتف ذكي سامسونج',
          sku: 'SM-G980F',
          currentStock: 5,
          reorderLevel: 10
        }
      });
    }
    
    // Medium Priority Inventory Alert
    if (Math.random() > 0.5) {
      alerts.push({
        id: uuidv4(),
        title: "مخزون متناقص",
        message: "المنتج 'سماعات بلوتوث' يقترب من مستوى إعادة الطلب",
        type: "inventory",
        priority: "medium",
        severity: "medium",
        timestamp: new Date(),
        read: false,
        data: {
          name: 'سماعات بلوتوث',
          sku: 'BT-500',
          currentStock: 12,
          reorderLevel: 10
        }
      });
    }
    
    // Additional alerts...
    return alerts;
  }, []);

  return {
    systemContext,
    systemAlerts,
    getSystemAlerts,
    generateSystemAlerts,
    buildSystemPrompt
  };
};

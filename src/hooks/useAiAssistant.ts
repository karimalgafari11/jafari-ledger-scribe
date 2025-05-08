import { useState, useEffect, useCallback } from "react";
import { ApiResponse, Message, SystemAlert, AiAssistantContext } from "@/types/ai";
import { Product } from "@/types/inventory";
import { Expense } from "@/types/expenses";
import { JournalEntry, JournalStatus } from "@/types/journal";
import { Customer } from "@/types/customers";
import { mockProducts } from "@/data/mockProducts";
import { mockExpenses } from "@/data/mockExpenses";
import { mockCustomers } from "@/data/mockCustomers";
import { mockJournalEntries } from "@/data/mockJournalEntries";
import { toast } from "sonner";
import { 
  SensitiveDataCategory, 
  VerificationLevel, 
  VerificationRequest, 
  isSensitiveData,
  getRequiredVerificationLevel
} from "@/utils/aiSecurityUtils";

// Local storage keys
const CHAT_HISTORY_KEY = "ai_assistant_chat_history";
const SYSTEM_CONTEXT_KEY = "ai_assistant_context";
const VERIFICATION_STATUS_KEY = "ai_assistant_verification";

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
  const [currentVerificationLevel, setCurrentVerificationLevel] = useState<VerificationLevel>(VerificationLevel.NONE);
  const [pendingVerification, setPendingVerification] = useState<VerificationRequest | null>(null);
  const [securityMode, setSecurityMode] = useState<'standard' | 'enhanced' | 'strict'>('standard');
  const [identityVerified, setIdentityVerified] = useState(false);

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
    
    // استرجاع حالة التحقق المحفوظة
    const savedVerification = localStorage.getItem(VERIFICATION_STATUS_KEY);
    if (savedVerification) {
      try {
        const verification = JSON.parse(savedVerification);
        setCurrentVerificationLevel(verification.level || VerificationLevel.NONE);
        setIdentityVerified(verification.verified || false);
        
        // إعادة التحقق إذا مر وقت معين
        const verifiedAt = new Date(verification.timestamp || 0);
        const currentTime = new Date();
        const timeDiff = (currentTime.getTime() - verifiedAt.getTime()) / (1000 * 60); // بالدقائق
        
        // إعادة التحقق بعد 30 دقيقة
        if (timeDiff > 30) {
          setIdentityVerified(false);
          setCurrentVerificationLevel(VerificationLevel.NONE);
        }
      } catch (error) {
        console.error("فشل في استرجاع حالة التحقق:", error);
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
  
  // حفظ حالة التحقق عند تغييرها
  useEffect(() => {
    localStorage.setItem(VERIFICATION_STATUS_KEY, JSON.stringify({
      level: currentVerificationLevel,
      verified: identityVerified,
      timestamp: new Date().toISOString()
    }));
  }, [currentVerificationLevel, identityVerified]);

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
      (entry) => entry.status === JournalStatus.Pending
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
        message: `قيد محاسبي رقم ${entry.entryNumber} بقيمة ${entry.totalDebit} ينتظر الموافقة`,
        priority: "medium",
        data: entry,
        timestamp: new Date()
      });
    });
    
    // العملاء ذوو الديون العالية
    const highDebtCustomers = mockCustomers.filter(
      (customer) => customer.balance > customer.creditLimit! * 0.8
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

  // Add explicit getter for system alerts
  const getSystemAlerts = (): SystemAlert[] => {
    return systemAlerts;
  };

  // التحقق من هوية المستخدم قبل تقديم معلومات حساسة
  const verifyUserIdentity = async (category: SensitiveDataCategory): Promise<boolean> => {
    const requiredLevel = getRequiredVerificationLevel(category);
    
    // إذا كان المستخدم مُتحقق منه بالفعل بمستوى أعلى أو مساوي، نعود true
    if (identityVerified && currentVerificationLevel >= requiredLevel) {
      return true;
    }
    
    // إنشاء طلب تحقق جديد
    const verificationRequest: VerificationRequest = {
      category,
      requiredLevel,
      timestamp: new Date(),
      verified: false,
      message: `يلزم التحقق من هويتك للوصول إلى معلومات ${
        category === SensitiveDataCategory.FINANCIAL ? 'مالية' :
        category === SensitiveDataCategory.CUSTOMER ? 'العملاء' :
        category === SensitiveDataCategory.INVENTORY ? 'المخزون' : 'النظام'
      }`
    };
    
    setPendingVerification(verificationRequest);
    
    // الانتظار حتى يتم التحقق من الهوية
    return new Promise<boolean>((resolve) => {
      // في الإصدار الحالي، نستخدم مهلة قصيرة للمحاكاة - في الواقع، سيتم استبدال هذا برمز تحقق حقيقي
      setTimeout(() => {
        // نفترض أن المستخدم تم التحقق منه
        setCurrentVerificationLevel(requiredLevel);
        setIdentityVerified(true);
        setPendingVerification(null);
        resolve(true);
      }, 1000);
    });
  };
  
  // تحليل الرسالة للكشف عن طلبات للمعلومات الحساسة
  const analyzeMessageForSensitiveRequests = useCallback((message: string): SensitiveDataCategory | null => {
    const financialKeywords = ['مال', 'أرباح', 'خسائر', 'رصيد', 'ميزانية', 'قيود', 'محاسبة', 'تقارير مالية'];
    const customerKeywords = ['عميل', 'عملاء', 'زبون', 'زبائن', 'بيانات العملاء', 'معلومات العملاء'];
    const inventoryKeywords = ['مخزون', 'بضاعة', 'سعر التكلفة', 'قيمة المخزون'];
    const systemKeywords = ['كلمة سر', 'كلمة المرور', 'API', 'مفتاح', 'إعدادات النظام', 'صلاحيات'];
    
    if (financialKeywords.some(keyword => message.includes(keyword))) {
      return SensitiveDataCategory.FINANCIAL;
    } else if (customerKeywords.some(keyword => message.includes(keyword))) {
      return SensitiveDataCategory.CUSTOMER;
    } else if (inventoryKeywords.some(keyword => message.includes(keyword))) {
      return SensitiveDataCategory.INVENTORY;
    } else if (systemKeywords.some(keyword => message.includes(keyword))) {
      return SensitiveDataCategory.SYSTEM;
    }
    
    return null;
  }, []);

  // بناء رسالة النظام بناءً على سياق التطبيق وحالة التحقق
  const buildSystemPrompt = () => {
    const securityLevel = !identityVerified ? 'محدود' : 
                          currentVerificationLevel === VerificationLevel.BASIC ? 'أساسي' :
                          currentVerificationLevel === VerificationLevel.TWO_FACTOR ? 'متقدم' : 'كامل';
    
    return `أنت مساعد ذكي متخصص في نظام إدارة المخزون والمحاسبة، وتتمتع بصلاحيات ${hasFullAccess ? 'كاملة' : 'محدودة'} ��لوصول إلى أج����اء النظام. دورك هو مساعدة المستخدم بالمعلومات المفيدة والإجابة على أسئلته بخصوص نظام إدارة المخزون والمبيعات والمشتريات والمحاسبة.

معلومات حالية عن النظام:
- يوجد حالياً ${systemContext.lowStockItems} منتج بمخزون منخفض يحتاج إلى إعادة طلب.
- يوجد ${systemContext.unpaidInvoices} فاتورة غير مدفوعة.
- يوجد ${systemContext.pendingExpenses} مصروف ينتظر الموافقة.
- يوجد ${systemContext.pendingApprovals} عملية تنتظر الموافقة بشكل عام.

مستوى أمان الجلسة: ${securityLevel}
مستوى التحقق الحالي: ${currentVerificationLevel}
صلاحية الوصول: ${hasFullAccess ? 'كاملة' : 'محدودة'}

قواعد الأمان المهمة:
1. لا تقدم معلومات مالية حساسة إلا بعد التحقق من المستخدم بمستوى ${VerificationLevel.TWO_FACTOR} على الأقل.
2. لا تقدم معلومات عملاء حساسة إلا بعد التحقق من المستخدم بمستوى ${VerificationLevel.BASIC} على الأقل.
3. لا تقدم معلومات نظام حساسة إلا بعد التحقق من المستخدم بمستوى ${VerificationLevel.TWO_FACTOR} على الأقل.
4. إذا طلب المستخدم معلومات لا تملك صلاحية الوصول إليها، اطلب منه التحقق من هويته أولاً.

قدراتك الخاصة:
- أنت تملك صلاحيات استكشاف وإصلاح الأخطاء في النظام
- يمكنك الوصول إلى جميع الوحدات والصفحات في النظام
- يمكنك تحليل البيانات واقتراح التحسينات
- يمكنك إنشاء التقارير والقيود المحاسبية بشكل تلقائي
- يمكنك معالجة البيانات وتحليلها عبر جميع أقسام النظام

أجب بأسلوب مهني ومختصر ومفيد. قدم اقتراحات عملية للمستخدم بناءً على المعلومات المتاحة.`;
  };

  // إرسال رسالة إلى API المساعد الذكي مع التحقق من الأمان أولاً
  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // تحليل الرسالة للكشف عن طلبات معلومات حساسة
      const sensitiveCategory = analyzeMessageForSensitiveRequests(message);
      
      // إذا كانت الرسالة تتضمن طلب معلومات حساسة وليس لدى المستخدم صلاحية
      if (sensitiveCategory && securityMode !== 'standard') {
        // التحقق من هوية المستخدم قبل إرسال الطلب
        const isVerified = await verifyUserIdentity(sensitiveCategory);
        
        if (!isVerified) {
          // إضافة رسالة التحقق إلى سجل المحادثة
          const newUserMessage: Message = {
            role: "user",
            content: message,
            timestamp: new Date()
          };
          
          const verificationMessage: Message = {
            role: "assistant",
            content: "يرجى التحقق من هويتك أولاً للوصول إلى هذه المعلومات الحساسة.",
            timestamp: new Date()
          };
          
          setChatHistory(prev => [...prev, newUserMessage, verificationMessage]);
          return verificationMessage.content;
        }
      }
      
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
    return mockJournalEntries.filter(entry => entry.status === JournalStatus.Pending);
  };
  
  // Extended analyzePerformance function to include all required properties
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
      // Add all the missing properties needed by the AiPerformanceAnalysis interface
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
  
  // الدخول إلى وضع الأمان المحسّن
  const setSecurityLevel = (level: 'standard' | 'enhanced' | 'strict') => {
    setSecurityMode(level);
    // إعادة تعيين حالة التحقق عند تغيير مستوى الأمان
    if (level !== 'standard') {
      setIdentityVerified(false);
      setCurrentVerificationLevel(VerificationLevel.NONE);
    }
    toast.success(`تم تعيين مستوى الأمان إلى: ${
      level === 'standard' ? 'قياسي' : 
      level === 'enhanced' ? 'محسّن' : 'صارم'
    }`);
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
    scanForSystemErrors,
    securityMode,
    setSecurityLevel,
    identityVerified,
    currentVerificationLevel,
    pendingVerification,
    verifyUserIdentity,
    // Add the getter function
    getSystemAlerts
  };
};

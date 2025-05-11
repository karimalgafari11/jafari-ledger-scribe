
import { useState, useEffect, useCallback } from "react";
import { Message, SystemAlert } from "@/types/ai";
import { toast } from "sonner";
import { analyzeMessageForSensitiveRequests } from "@/utils/aiSecurityUtils";
import { useAiSecurityContext } from "./useAiSecurityContext";
import { useAiSystemContext } from "./useAiSystemContext";
import { v4 as uuidv4 } from 'uuid';
import { useAiDataAccess } from "./useAiDataAccess";

const CHAT_HISTORY_KEY = "ai_assistant_chat_history";

export const useAiChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const { buildSystemPrompt } = useAiSystemContext();
  const dataAccess = useAiDataAccess();
  const { 
    hasFullAccess, 
    securityMode, 
    identityVerified,
    currentVerificationLevel,
    pendingVerification,
    setPendingVerification,
    verifyUserIdentity
  } = useAiSecurityContext();

  // استخدام مفتاح API كنموذج
  const API_KEY = "example-api-key";
  
  // ردود محادثة مسبقة التجهيز
  const preparedResponses: Record<string, string> = {
    greeting: "مرحباً بك! كيف يمكنني مساعدتك اليوم؟",
    inventory: "بناءً على بيانات المخزون، لديك 5 منتجات منخفضة المخزون تحتاج إلى إعادة الطلب. هل تريد عرض قائمة بهذه المنتجات؟",
    invoices: "لديك 3 فواتير مستحقة بإجمالي 4,500 ريال. هل تريد الاطلاع على تفاصيل هذه الفواتير أو تنفيذ إجراء معين عليها؟",
    sales_report: "إليك ملخص تقرير المبيعات لهذا الأسبوع:\n\nإجمالي المبيعات: 45,320 ريال\nعدد الفواتير: 87\nمتوسط قيمة الفاتورة: 521 ريال\nأفضل منتج مبيعًا: هاتف سامسونج S21\n\nهل تريد مزيدًا من التفاصيل أو إجراء تحليل معين؟",
    tax_calculation: "للقيام بحساب ضريبة القيمة المضافة، يجب ضرب المبلغ الأساسي في 0.15 (15%). على سبيل المثال، لمبلغ 1000 ريال، ستكون الضريبة 150 ريال، والمجموع 1150 ريال. هل هناك مبلغ محدد تريد حساب الضريبة عليه؟",
    customer_search: "وجدت 3 عملاء يطابقون معايير البحث الخاصة بك. هل تريد عرض معلوماتهم أو تصفية النتائج بشكل أكبر؟",
    not_understood: "عذراً، لم أفهم طلبك بشكل واضح. هل يمكنك توضيح ما تحتاجه بطريقة مختلفة؟",
    data_processing: "جاري معالجة البيانات... تم الانتهاء! إليك النتائج التي طلبتها.",
    export_success: "تم تصدير البيانات بنجاح إلى الصيغة المطلوبة.",
    insufficient_permissions: "عذراً، أنت لا تملك الصلاحيات الكافية للوصول إلى هذه المعلومات. يرجى التحقق من إعدادات الأمان أو التواصل مع المسؤول.",
    empty_data: "لم أجد أي نتائج تطابق معايير البحث. هل تريد تغيير المعايير أو البحث عن شيء آخر؟"
  };

  // تحميل سجل المحادثات من localStorage
  useEffect(() => {
    const savedChatHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedChatHistory) {
      try {
        const parsedHistory: Message[] = JSON.parse(savedChatHistory);
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error("فشل في استرجاع سجل المحادثات:", error);
      }
    }
  }, []);
  
  // حفظ سجل المحادثات في localStorage عند تغييره
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // استخراج نوع الاستعلام من المحادثة
  const extractQueryType = (message: string): keyof typeof preparedResponses | null => {
    message = message.toLowerCase();
    
    if (message.includes("مرحب") || message.includes("أهلا") || message.includes("صباح") || message.includes("مساء")) {
      return "greeting";
    } else if (message.includes("مخزون") || message.includes("منتج") || message.includes("بضاع")) {
      return "inventory";
    } else if (message.includes("فاتور") || message.includes("مستحق") || message.includes("دفع")) {
      return "invoices";
    } else if (message.includes("تقرير") || message.includes("مبيع") || message.includes("إحصائ")) {
      return "sales_report";
    } else if (message.includes("ضريب") || message.includes("قيمة مضافة") || message.includes("حساب")) {
      return "tax_calculation";
    } else if (message.includes("عميل") || message.includes("زبون") || message.includes("بحث")) {
      return "customer_search";
    } else if (message.includes("صدر") || message.includes("إكسل") || message.includes("ملف")) {
      return "export_success";
    }
    
    // محاكاة عملية سؤال غير واضح
    const clarity = Math.random();
    if (clarity < 0.1) {
      return "not_understood";
    }
    
    // محاكاة عملية عدم وجود نتائج
    const hasData = Math.random();
    if (hasData < 0.1) {
      return "empty_data";
    }
    
    return null;
  };

  // إضافة تأخير زمني للمحاكاة
  const simulateAPIDelay = async (): Promise<void> => {
    return new Promise((resolve) => {
      // تأخير عشوائي بين 1 و 3 ثوان
      const delay = 1000 + Math.random() * 2000;
      setTimeout(resolve, delay);
    });
  };

  // إرسال رسالة إلى المساعد الذكي
  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // تحليل الرسالة بحثًا عن طلبات معلومات حساسة
      const sensitiveCategory = analyzeMessageForSensitiveRequests(message);
      
      // إذا كانت الرسالة تحتوي على طلب معلومات حساسة ووضع الأمان ليس قياسيًا
      if (sensitiveCategory && securityMode !== 'standard') {
        // التحقق من هوية المستخدم قبل معالجة الطلب
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
      
      // إضافة رسالة المستخدم إلى سجل المحادثة
      const newUserMessage: Message = {
        role: "user",
        content: message,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, newUserMessage]);
      
      // محاكاة تأخير API
      await simulateAPIDelay();
      
      // استخراج نوع الاستعلام والحصول على رد مناسب
      const queryType = extractQueryType(message);
      let responseContent = "";
      
      if (queryType) {
        responseContent = preparedResponses[queryType];
      } else {
        // إذا لم يتم التعرف على نوع الاستعلام، استخدم رداً عاماً
        responseContent = "أنا هنا لمساعدتك في إدارة نظامك. يمكنني تقديم معلومات عن المخزون، الفواتير، العملاء، المبيعات، وأكثر. كيف يمكنني مساعدتك بشكل محدد؟";
      }
      
      // إضافة رد المساعد إلى سجل المحادثة
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
  
  // مسح سجل المحادثات
  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
    toast.success("تم مسح سجل المحادثات بنجاح");
  };

  return {
    sendMessage,
    isLoading,
    chatHistory,
    clearChatHistory
  };
};

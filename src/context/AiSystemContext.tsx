
import React, { createContext, useState, useContext, ReactNode } from "react";
import { SystemAlert } from "@/types/ai";
import { v4 as uuidv4 } from "uuid";

interface AiSystemContextType {
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  systemAlerts: SystemAlert[];
  addAlert: (alert: Omit<SystemAlert, "id" | "timestamp" | "read">) => void;
  markAlertAsRead: (id: string) => void;
  clearAlerts: () => void;
  buildSystemPrompt: () => string;
}

const AiSystemContextDefault: AiSystemContextType = {
  systemPrompt: "",
  setSystemPrompt: () => {},
  systemAlerts: [],
  addAlert: () => {},
  markAlertAsRead: () => {},
  clearAlerts: () => {},
  buildSystemPrompt: () => "",
};

const AISystemContext = createContext<AiSystemContextType>(AiSystemContextDefault);

export const useAiSystemContext = () => useContext(AISystemContext);

export const AiSystemContext = ({ children }: { children: ReactNode }) => {
  const [systemPrompt, setSystemPrompt] = useState<string>(
    "أنت مساعد ذكي لنظام إدارة محاسبي. تساعد المستخدمين في إدارة المخزون، الفواتير، المصروفات، والعملاء. " +
    "يمكنك الإجابة على الأسئلة والاستفسارات المتعلقة بالنظام، وتقديم النصائح والإرشادات. " +
    "كما يمكنك استخراج معلومات من قواعد البيانات المتاحة، وإنشاء تقارير بسيطة، وإجراء حسابات. " +
    "قدم المعلومات بطريقة واضحة ومفيدة، واطلب توضيحات عندما تكون الأسئلة غامضة."
  );
  
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);

  const addAlert = (alert: Omit<SystemAlert, "id" | "timestamp" | "read">) => {
    const newAlert: SystemAlert = {
      ...alert,
      id: uuidv4(),
      timestamp: new Date(),
      read: false,
    };
    setSystemAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
  };

  const markAlertAsRead = (id: string) => {
    setSystemAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const clearAlerts = () => {
    setSystemAlerts([]);
  };

  const buildSystemPrompt = () => {
    const currentDate = new Date().toLocaleDateString('ar-SA');
    const currentTime = new Date().toLocaleTimeString('ar-SA');
    
    return `${systemPrompt}
    
التاريخ الحالي: ${currentDate}
الوقت الحالي: ${currentTime}

قم بالإجابة باللغة العربية دائمًا. أنت مساعد متخصص في المحاسبة والإدارة المالية.

بإمكانك المساعدة في:
- إدارة المخزون وتتبع المنتجات
- إنشاء وإدارة الفواتير
- مراقبة المصروفات والإيرادات
- إدارة العملاء والموردين
- تقديم تحليلات مالية وإحصاءات
- المساعدة في الحسابات الضريبية وحساب القيمة المضافة

استخدم أسلوبًا مهنيًا ولطيفًا. قدم إجابات موجزة ودقيقة.`;
  };

  return (
    <AISystemContext.Provider
      value={{
        systemPrompt,
        setSystemPrompt,
        systemAlerts,
        addAlert,
        markAlertAsRead,
        clearAlerts,
        buildSystemPrompt,
      }}
    >
      {children}
    </AISystemContext.Provider>
  );
};

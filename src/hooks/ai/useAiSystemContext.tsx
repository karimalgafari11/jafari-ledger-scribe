
import { useState, useCallback } from 'react';
import { SystemAlert } from '@/types/ai';
import { v4 as uuidv4 } from 'uuid';

export const useAiSystemContext = () => {
  const [systemPrompt, setSystemPrompt] = useState<string>(
    "أنت مساعد ذكي لنظام إدارة محاسبي. تساعد المستخدمين في إدارة المخزون، الفواتير، المصروفات، والعملاء."
  );
  
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  
  const addAlert = useCallback((alert: Omit<SystemAlert, "id" | "timestamp" | "read">) => {
    const newAlert: SystemAlert = {
      ...alert,
      id: uuidv4(),
      timestamp: new Date(),
      read: false,
    };
    setSystemAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
  }, []);

  const markAlertAsRead = useCallback((id: string) => {
    setSystemAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  }, []);

  const clearAlerts = useCallback(() => {
    setSystemAlerts([]);
  }, []);
  
  const generateSystemAlerts = useCallback(() => {
    const alertTypes = [
      {
        title: "منتجات منخفضة المخزون",
        message: "هناك 5 منتجات وصلت إلى حد إعادة الطلب",
        type: "inventory" as const,
        priority: "high" as const
      },
      {
        title: "فواتير مستحقة",
        message: "لديك 3 فواتير مستحقة تحتاج إلى مراجعة",
        type: "invoices" as const,
        priority: "medium" as const
      },
      {
        title: "تحديث النظام",
        message: "يتوفر تحديث جديد للنظام. ننصح بتثبيته في أقرب وقت",
        type: "system" as const,
        priority: "low" as const
      }
    ];
    
    // إضافة تنبيهات تجريبية
    alertTypes.forEach(alert => addAlert(alert));
    
    return alertTypes.length;
  }, [addAlert]);
  
  // بناء المطالبة النظامية
  const buildSystemPrompt = useCallback(() => {
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
  }, [systemPrompt]);
  
  // الحصول على تنبيهات النظام
  const getSystemAlerts = useCallback(() => {
    return systemAlerts;
  }, [systemAlerts]);

  return {
    systemPrompt,
    setSystemPrompt,
    systemAlerts,
    addAlert,
    markAlertAsRead,
    clearAlerts,
    generateSystemAlerts,
    getSystemAlerts,
    buildSystemPrompt
  };
};

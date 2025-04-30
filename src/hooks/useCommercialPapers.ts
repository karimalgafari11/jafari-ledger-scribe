
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { CommercialPaper, DueNotification } from "@/types/definitions";
import { toast } from "sonner";

// بيانات تجريبية للأوراق التجارية
const initialPapers: CommercialPaper[] = [
  {
    id: uuid(),
    referenceNumber: "CHQ-20250430-001",
    type: "cheque",
    customerId: "1",
    customerName: "شركة الأفق للتجارة",
    amount: 5000,
    currencyId: "1",
    currencyCode: "SAR",
    issueDate: new Date("2025-04-15"),
    dueDate: new Date("2025-05-15"),
    bankId: "1",
    bankName: "البنك السعودي",
    status: "active",
    notes: "دفعة مبيعات الربع الأول",
  },
  {
    id: uuid(),
    referenceNumber: "PN-20250430-002",
    type: "promissory_note",
    customerId: "2",
    customerName: "مؤسسة النور للمقاولات",
    amount: 12000,
    currencyId: "1",
    currencyCode: "SAR",
    issueDate: new Date("2025-04-01"),
    dueDate: new Date("2025-06-01"),
    status: "active",
    notes: "دفعة مشروع توريد المواد",
  }
];

// بيانات تجريبية للتنبيهات
const initialNotifications: DueNotification[] = [];

export const useCommercialPapers = () => {
  const [papers, setPapers] = useState<CommercialPaper[]>(initialPapers);
  const [notifications, setNotifications] = useState<DueNotification[]>(initialNotifications);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<CommercialPaper | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // البحث في الأوراق التجارية
  const filteredPapers = papers.filter(
    (paper) =>
      paper.referenceNumber.includes(searchTerm) ||
      (paper.customerName && paper.customerName.includes(searchTerm)) ||
      (paper.vendorName && paper.vendorName.includes(searchTerm))
  );

  // توليد تنبيهات الاستحقاق
  useEffect(() => {
    // التحقق من الأوراق التجارية التي تستحق قريباً
    const checkDueDates = () => {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      papers.forEach(paper => {
        if (paper.status === 'active') {
          const dueDate = new Date(paper.dueDate);
          
          // إنشاء تنبيه للأوراق التي تستحق خلال الأسبوع القادم
          if (dueDate <= nextWeek && dueDate >= today) {
            // التحقق من عدم وجود تنبيه مسبق
            const existingNotification = notifications.find(
              n => n.entityId === paper.id && n.status === 'pending'
            );
            
            if (!existingNotification) {
              const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              const priority = daysUntilDue <= 2 ? 'high' : daysUntilDue <= 5 ? 'medium' : 'low';
              
              const newNotification: DueNotification = {
                id: uuid(),
                entityId: paper.id,
                entityType: 'commercial_paper',
                dueDate: paper.dueDate,
                amount: paper.amount,
                currencyId: paper.currencyId,
                title: `استحقاق ${paper.type === 'cheque' ? 'شيك' : paper.type === 'promissory_note' ? 'سند لأمر' : 'كمبيالة'}`,
                message: `يستحق ${paper.type === 'cheque' ? 'الشيك' : paper.type === 'promissory_note' ? 'السند لأمر' : 'الكمبيالة'} رقم ${paper.referenceNumber} بقيمة ${paper.amount} ${paper.currencyCode} في تاريخ ${dueDate.toLocaleDateString('ar-SA')}`,
                priority: priority,
                status: 'pending',
                notificationDate: today,
              };
              
              setNotifications(prev => [...prev, newNotification]);
            }
          }
        }
      });
    };
    
    checkDueDates();
    
    // تشغيل الفحص كل يوم
    const intervalId = setInterval(checkDueDates, 86400000);
    
    return () => clearInterval(intervalId);
  }, [papers]);

  // إضافة ورقة تجارية جديدة
  const createPaper = (paper: Omit<CommercialPaper, "id">) => {
    setIsLoading(true);
    setTimeout(() => {
      const newPaper: CommercialPaper = {
        ...paper,
        id: uuid(),
      };
      setPapers([...papers, newPaper]);
      toast.success("تم إضافة الورقة التجارية بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  // تعديل ورقة تجارية
  const updatePaper = (id: string, updates: Partial<CommercialPaper>) => {
    setIsLoading(true);
    setTimeout(() => {
      setPapers(
        papers.map((paper) =>
          paper.id === id
            ? { ...paper, ...updates }
            : paper
        )
      );
      toast.success("تم تحديث بيانات الورقة التجارية بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  // حذف ورقة تجارية
  const deletePaper = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPapers(papers.filter((paper) => paper.id !== id));
      // حذف التنبيهات المرتبطة
      setNotifications(notifications.filter(n => n.entityId !== id));
      toast.success("تم حذف الورقة التجارية بنجاح");
      setIsLoading(false);
    }, 500);
    return true;
  };

  // تغيير حالة ورقة تجارية
  const updatePaperStatus = (id: string, status: CommercialPaper['status']) => {
    updatePaper(id, { status });
  };

  // معالجة تنبيه
  const updateNotificationStatus = (id: string, status: DueNotification['status']) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, status }
          : notification
      )
    );
    
    if (status === 'processed') {
      toast.success("تم معالجة التنبيه بنجاح");
    } else if (status === 'dismissed') {
      toast.info("تم تجاهل التنبيه");
    }
  };

  return {
    papers,
    filteredPapers,
    notifications,
    isLoading,
    selectedPaper,
    setSelectedPaper,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    searchTerm,
    setSearchTerm,
    createPaper,
    updatePaper,
    deletePaper,
    updatePaperStatus,
    updateNotificationStatus,
  };
};

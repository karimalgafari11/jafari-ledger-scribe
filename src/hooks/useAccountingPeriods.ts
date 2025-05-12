import { useState } from "react";
import { AccountingPeriod } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية للفترات المحاسبية
const initialPeriods: AccountingPeriod[] = [
  {
    id: uuid(),
    name: "الربع الأول 2023",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-03-31"),
    isClosed: true,
    closedAt: new Date("2023-04-10"),
    fiscalYearId: "2023",
  },
  {
    id: uuid(),
    name: "الربع الثاني 2023",
    startDate: new Date("2023-04-01"),
    endDate: new Date("2023-06-30"),
    isClosed: true,
    closedAt: new Date("2023-07-08"),
    fiscalYearId: "2023",
  },
  {
    id: uuid(),
    name: "الربع الثالث 2023",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-09-30"),
    isClosed: true,
    closedAt: new Date("2023-10-15"),
    fiscalYearId: "2023",
  },
  {
    id: uuid(),
    name: "الربع الرابع 2023",
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-31"),
    isClosed: false,
    fiscalYearId: "2023",
  },
];

export const useAccountingPeriods = () => {
  const [periods, setPeriods] = useState<AccountingPeriod[]>(initialPeriods);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<AccountingPeriod | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);

  // البحث وتصفية الفترات المحاسبية
  const filteredPeriods = periods.filter(
    (period) => {
      const matchesSearch = 
        period.name.includes(searchTerm) ||
        (period.fiscalYearId && period.fiscalYearId.includes(searchTerm));
      
      const matchesYear = yearFilter === "all" 
        ? true
        : period.fiscalYearId === yearFilter;
      
      return matchesSearch && matchesYear;
    }
  );

  // إضافة فترة محاسبية جديدة
  const createPeriod = (period: Omit<AccountingPeriod, "id">) => {
    setIsLoading(true);
    
    // التحقق من عدم وجود تداخل في التواريخ
    const hasOverlap = periods.some(p => 
      (period.startDate >= p.startDate && period.startDate <= p.endDate) ||
      (period.endDate >= p.startDate && period.endDate <= p.endDate) ||
      (p.startDate >= period.startDate && p.startDate <= period.endDate)
    );
    
    if (hasOverlap) {
      setIsLoading(false);
      toast.error("هناك تداخل في التواريخ مع فترة محاسبية أخرى");
      return false;
    }
    
    setTimeout(() => {
      const newPeriod: AccountingPeriod = {
        ...period,
        id: uuid(),
      };
      setPeriods([...periods, newPeriod]);
      setIsLoading(false);
      toast.success("تم إضافة الفترة المحاسبية بنجاح");
      return true;
    }, 500);
    
    return true;
  };

  // تعديل فترة محاسبية موجودة
  const updatePeriod = (id: string, updates: Partial<AccountingPeriod>) => {
    setIsLoading(true);
    
    // التحقق من عدم وجود تداخل في التواريخ
    if (updates.startDate || updates.endDate) {
      const currentPeriod = periods.find(p => p.id === id);
      if (currentPeriod) {
        const startDate = updates.startDate || currentPeriod.startDate;
        const endDate = updates.endDate || currentPeriod.endDate;
        
        const hasOverlap = periods.some(p => 
          p.id !== id && (
            (startDate >= p.startDate && startDate <= p.endDate) ||
            (endDate >= p.startDate && endDate <= p.endDate) ||
            (p.startDate >= startDate && p.startDate <= endDate)
          )
        );
        
        if (hasOverlap) {
          setIsLoading(false);
          toast.error("هناك تداخل في التواريخ مع فترة محاسبية أخرى");
          return false;
        }
      }
    }
    
    setTimeout(() => {
      setPeriods(
        periods.map((period) =>
          period.id === id
            ? { ...period, ...updates }
            : period
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث بيانات الفترة المحاسبية بنجاح");
    }, 500);
    
    return true;
  };

  // حذف فترة محاسبية
  const deletePeriod = (id: string) => {
    const periodToDelete = periods.find(p => p.id === id);
    
    // لا يمكن حذف فترة مغلقة
    if (periodToDelete?.isClosed) {
      toast.error("لا يمكن حذف فترة محاسبية مغلقة");
      return false;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setPeriods(periods.filter((period) => period.id !== id));
      setIsLoading(false);
      toast.success("تم حذف الفترة المحاسبية بنجاح");
    }, 500);
    
    return true;
  };

  // إغلاق فترة محاسبية
  const closePeriod = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPeriods(
        periods.map((period) =>
          period.id === id
            ? { ...period, isClosed: true, closedAt: new Date() }
            : period
        )
      );
      setIsLoading(false);
      toast.success("تم إغلاق الفترة المحاسبية بنجاح");
    }, 800);
  };

  // إعادة فتح فترة محاسبية
  const reopenPeriod = (id: string) => {
    // التحقق من وجود فترة لاحقة مغلقة
    const periodToReopen = periods.find(p => p.id === id);
    if (periodToReopen) {
      const hasClosedLaterPeriod = periods.some(p => 
        p.startDate > periodToReopen.endDate && p.isClosed
      );
      
      if (hasClosedLaterPeriod) {
        toast.error("لا يمكن إعادة فتح هذه الفترة لأن هناك فترات لاحقة مغلقة");
        return false;
      }
      
      setIsLoading(true);
      setTimeout(() => {
        setPeriods(
          periods.map((period) =>
            period.id === id
              ? { ...period, isClosed: false, closedAt: undefined }
              : period
          )
        );
        setIsLoading(false);
        toast.success("تم إعادة فتح الفترة المحاسبية بنجاح");
      }, 800);
      
      return true;
    }
    
    return false;
  };

  // الحصول على قائمة السنوات المالية
  const fiscalYears = Array.from(new Set(periods.map(p => p.fiscalYearId || "")));

  return {
    periods,
    filteredPeriods,
    isLoading,
    searchTerm,
    setSearchTerm,
    yearFilter,
    setYearFilter,
    selectedPeriod,
    setSelectedPeriod,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isCloseDialogOpen,
    setIsCloseDialogOpen,
    createPeriod,
    updatePeriod,
    deletePeriod,
    closePeriod,
    reopenPeriod,
    fiscalYears,
  };
};

import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoices";
import { toast } from "sonner";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";

// نوع إحصائيات الفواتير
export type InvoiceStatistics = {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
};

// نوع خيارات الفلترة
export type InvoiceFilter = {
  status: "all" | "paid" | "pending" | "overdue" | "draft";
  dateRange: DateRange | undefined;
  customer: string;
  paymentMethod: "all" | "cash" | "credit" | undefined;
  minAmount: number | undefined;
  maxAmount: number | undefined;
  query: string;
};

// إنشاء بيانات فواتير وهمية للعرض
const createMockInvoices = (): Invoice[] => {
  const statuses: ("draft" | "pending" | "paid" | "overdue")[] = ["paid", "pending", "draft", "overdue"];
  const paymentMethods: ("cash" | "credit")[] = ["cash", "credit"];
  const customerNames = [
    "شركة النور للتجارة",
    "مؤسسة السلام",
    "شركة الأفق التجارية",
    "مؤسسة الريادة",
    "شركة التقنية المتطورة",
    "مؤسسة النهضة",
    "شركة الأمل",
    "مؤسسة الإبداع",
    "شركة الرواد",
    "مؤسسة التميز"
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const id = `inv-${(1000 + i).toString().padStart(4, '0')}`;
    const invoiceNumber = `INV-${(2000 + i).toString().padStart(4, '0')}`;
    const totalAmount = Math.floor(Math.random() * 10000) + 1000;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const customerId = `cust-${(100 + Math.floor(Math.random() * 20)).toString()}`;
    const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const date = format(subDays(new Date(), Math.floor(Math.random() * 60)), "yyyy-MM-dd");
    const dueDate = status === "paid" ? undefined : format(subDays(new Date(), -Math.floor(Math.random() * 30)), "yyyy-MM-dd");
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const amountPaid = status === "paid" ? totalAmount : Math.floor(Math.random() * totalAmount);

    return {
      id,
      invoiceNumber,
      customerId,
      customerName,
      date,
      dueDate,
      items: [],
      totalAmount,
      status,
      paymentMethod,
      amountPaid
    };
  });
};

// حساب إحصائيات الفواتير
const calculateStatistics = (invoices: Invoice[]): InvoiceStatistics => {
  const total = invoices.length;
  const paid = invoices.filter(inv => inv.status === "paid").length;
  const pending = invoices.filter(inv => inv.status === "pending").length;
  const overdue = invoices.filter(inv => inv.status === "overdue").length;

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const paidAmount = invoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);
  const pendingAmount = invoices
    .filter(inv => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);
  const overdueAmount = invoices
    .filter(inv => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  return {
    total,
    paid,
    pending,
    overdue,
    totalAmount,
    paidAmount,
    pendingAmount,
    overdueAmount
  };
};

// فلترة الفواتير حسب الخيارات المحددة
const filterInvoices = (invoices: Invoice[], filter: InvoiceFilter): Invoice[] => {
  return invoices.filter(invoice => {
    // فلترة حسب الحالة
    if (filter.status !== "all" && invoice.status !== filter.status) {
      return false;
    }

    // فلترة حسب نطاق التاريخ
    if (filter.dateRange && filter.dateRange.from) {
      const invoiceDate = new Date(invoice.date);
      const fromDate = filter.dateRange.from;
      const toDate = filter.dateRange.to || new Date();

      if (invoiceDate < fromDate || invoiceDate > toDate) {
        return false;
      }
    }

    // فلترة حسب العميل
    if (filter.customer && invoice.customerName.indexOf(filter.customer) === -1) {
      return false;
    }

    // فلترة حسب طريقة الدفع
    if (filter.paymentMethod && filter.paymentMethod !== "all" && invoice.paymentMethod !== filter.paymentMethod) {
      return false;
    }

    // فلترة حسب المبلغ
    if (filter.minAmount !== undefined && invoice.totalAmount < filter.minAmount) {
      return false;
    }
    if (filter.maxAmount !== undefined && invoice.totalAmount > filter.maxAmount) {
      return false;
    }

    // فلترة حسب نص البحث
    if (filter.query) {
      const query = filter.query.toLowerCase();
      return (
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.customerName.toLowerCase().includes(query)
      );
    }

    return true;
  });
};

export const useOutgoingInvoices = () => {
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState<InvoiceStatistics>({
    total: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0,
    overdueAmount: 0
  });
  
  const [filter, setFilter] = useState<InvoiceFilter>({
    status: "all",
    dateRange: undefined,
    customer: "",
    paymentMethod: undefined,
    minAmount: undefined,
    maxAmount: undefined,
    query: ""
  });
  
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  // تحميل بيانات الفواتير
  useEffect(() => {
    const loadInvoices = async () => {
      setIsLoading(true);
      try {
        // محاكاة تأخير API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // استخدام بيانات وهمية
        const mockInvoices = createMockInvoices();
        setAllInvoices(mockInvoices);
        setFilteredInvoices(mockInvoices);
        
        // حساب الإحصائيات
        setStatistics(calculateStatistics(mockInvoices));
      } catch (error) {
        toast.error("حدث خطأ أثناء تحميل الفواتير");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInvoices();
  }, []);

  // تطبيق الفلترة عندما تتغير خيارات الفلترة
  useEffect(() => {
    const filtered = filterInvoices(allInvoices, filter);
    setFilteredInvoices(filtered);
    setSelectedInvoices([]);
  }, [filter, allInvoices]);

  // تبديل تحديد فاتورة
  const toggleInvoiceSelection = (invoiceId: string) => {
    setSelectedInvoices(prev => {
      if (prev.includes(invoiceId)) {
        return prev.filter(id => id !== invoiceId);
      } else {
        return [...prev, invoiceId];
      }
    });
  };

  // تحديد كل الفواتير
  const selectAllInvoices = () => {
    const allIds = filteredInvoices.map(invoice => invoice.id);
    setSelectedInvoices(allIds);
  };

  // إلغاء تحديد كل الفواتير
  const unselectAllInvoices = () => {
    setSelectedInvoices([]);
  };

  // تصدير الفواتير
  const exportInvoices = (format: "pdf" | "excel") => {
    // محاكاة عملية التصدير - في الواقع سيكون هذا طلب API
    console.log(`تصدير ${selectedInvoices.length || 'جميع'} الفواتير بتنسيق ${format}`);
    // هنا ستكون عملية التصدير الفعلية
  };

  // حذف الفواتير
  const deleteInvoices = (invoiceIds: string[]) => {
    // في الواقع، سيكون هذا طلب API لحذف الفواتير
    setAllInvoices(prev => prev.filter(invoice => !invoiceIds.includes(invoice.id)));
    setSelectedInvoices(prev => prev.filter(id => !invoiceIds.includes(id)));
  };

  return {
    invoices: filteredInvoices,
    isLoading,
    statistics,
    filter,
    setFilter,
    selectedInvoices,
    toggleInvoiceSelection,
    selectAllInvoices,
    unselectAllInvoices,
    exportInvoices,
    deleteInvoices
  };
};

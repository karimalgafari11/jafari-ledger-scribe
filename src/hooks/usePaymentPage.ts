
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockVendors } from "@/data/mockVendors";

// بيانات تجريبية للفواتير
const mockInvoices = [
  {
    id: "INV-001",
    vendorId: "v-001",
    number: "PINV-2024-001",
    date: "2024-04-01",
    dueDate: "2024-04-30",
    amount: 5000,
    remainingAmount: 5000,
    status: "unpaid"
  },
  {
    id: "INV-002",
    vendorId: "v-002",
    number: "PINV-2024-002",
    date: "2024-03-15",
    dueDate: "2024-04-15",
    amount: 3200,
    remainingAmount: 3200,
    status: "unpaid"
  },
  {
    id: "INV-003",
    vendorId: "v-003",
    number: "PINV-2024-003",
    date: "2024-03-25",
    dueDate: "2024-04-25",
    amount: 8500,
    remainingAmount: 8500,
    status: "unpaid"
  },
];

// بيانات تجريبية للحسابات البنكية
const mockBankAccounts = [
  { id: "bank-001", name: "البنك الأهلي - الحساب الرئيسي", accountNumber: "SA0123456789", balance: 150000 },
  { id: "bank-002", name: "البنك الراجحي - حساب المدفوعات", accountNumber: "SA9876543210", balance: 75000 },
];

// بيانات تجريبية لصناديق النقدية
const mockCashRegisters = [
  { id: "cash-001", name: "الصندوق الرئيسي", balance: 25000 },
  { id: "cash-002", name: "صندوق المشتريات", balance: 10000 },
];

// بيانات تجريبية لسجل المدفوعات
const initialPaymentHistory = [
  {
    id: "PAY-001",
    vendorName: "شركة المستلزمات المكتبية",
    amount: 5000,
    date: "2024-04-15",
    paymentMethod: "bank",
    reference: "TRN-87652",
    status: "completed" as const,
    invoiceNumber: "PINV-2024-005"
  },
  {
    id: "PAY-002",
    vendorName: "مؤسسة الإمداد التجارية",
    amount: 3200,
    date: "2024-04-10",
    paymentMethod: "check",
    reference: "CHK-12345",
    status: "completed" as const,
    invoiceNumber: "PINV-2024-004"
  },
  {
    id: "PAY-003",
    vendorName: "شركة تقنيات المستقبل",
    amount: 8500,
    date: "2024-04-05",
    paymentMethod: "bank",
    reference: "TRN-98765",
    status: "pending" as const,
    invoiceNumber: "PINV-2024-003"
  },
  {
    id: "PAY-004",
    vendorName: "مؤسسة التوريدات العامة",
    amount: 12000,
    date: "2024-03-28",
    paymentMethod: "cash",
    status: "completed" as const
  },
  {
    id: "PAY-005",
    vendorName: "شركة المنتجات الكيميائية",
    amount: 7500,
    date: "2024-03-22",
    paymentMethod: "card",
    reference: "CARD-54321",
    status: "failed" as const
  }
];

export const usePaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [isLoading, setIsLoading] = useState(false);
  const [vendorData, setVendorData] = useState<any[]>([]);
  const [invoiceData, setInvoiceData] = useState<any[]>(mockInvoices);
  const [bankAccountsData, setBankAccountsData] = useState<any[]>(mockBankAccounts);
  const [cashRegistersData, setCashRegistersData] = useState<any[]>(mockCashRegisters);
  const [paymentHistory, setPaymentHistory] = useState(initialPaymentHistory);
  
  // إحصائيات المدفوعات
  const paymentStats = {
    totalPaid: 28700,
    pendingPayments: 8500,
    thisMonthPayments: 16700,
    overdueAmount: 15000,
    previousMonthChange: 14200, // قيمة مدفوعات الشهر السابق (للمقارنة)
  };

  // تحميل بيانات المورد عند التغيير أو عند فتح الصفحة مع معرف مورد
  useEffect(() => {
    // فلترة الموردين الذين لديهم أرصدة مستحقة فقط
    const filteredVendors = mockVendors.filter(vendor => vendor.balance > 0);
    setVendorData(filteredVendors);
    
    // التحقق من وجود معرف مورد في عنوان URL
    const vendorId = searchParams.get("vendorId");
    if (vendorId) {
      // سنتعامل مع اختيار المورد في مكون النموذج
    }
  }, [searchParams]);

  // محاكاة تسجيل عملية دفع جديدة
  const handlePaymentSubmit = (values: any) => {
    setIsLoading(true);
    
    // العثور على المورد للحصول على الاسم
    const vendor = mockVendors.find(v => v.id === values.vendorId);
    
    // العثور على الفاتورة إذا تم تحديدها
    const invoice = values.invoiceId ? mockInvoices.find(inv => inv.id === values.invoiceId) : null;
    
    // محاكاة استدعاء API
    setTimeout(() => {
      // إنشاء سجل دفع جديد
      const newPayment = {
        id: `PAY-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        vendorName: vendor?.name || "غير معروف",
        amount: values.amount,
        date: values.paymentDate,
        paymentMethod: values.paymentMethod,
        reference: values.reference,
        status: "completed" as const,
        invoiceNumber: invoice?.number
      };
      
      // إضافة الدفعة إلى السجل
      setPaymentHistory([newPayment, ...paymentHistory]);
      
      // إظهار رسالة نجاح
      toast.success(`تم تسجيل عملية سداد بقيمة ${values.amount} ريال بنجاح`);
      
      // إعادة تعيين حالة التحميل
      setIsLoading(false);
    }, 1500);
  };

  return {
    vendorData,
    invoiceData,
    bankAccountsData,
    cashRegistersData,
    paymentStats,
    paymentHistory,
    handlePaymentSubmit,
    isLoading
  };
};

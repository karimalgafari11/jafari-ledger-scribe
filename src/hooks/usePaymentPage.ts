
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockVendors } from "@/data/mockVendors";

// Sample payment history data
const initialPaymentHistory = [
  {
    id: "PAY-001",
    vendorName: "شركة المستلزمات المكتبية",
    amount: 5000,
    date: "2024-04-15",
    paymentMethod: "bank",
    reference: "TRN-87652",
    status: "completed" as const,
  },
  {
    id: "PAY-002",
    vendorName: "مؤسسة الإمداد التجارية",
    amount: 3200,
    date: "2024-04-10",
    paymentMethod: "check",
    reference: "CHK-12345",
    status: "completed" as const,
  },
  {
    id: "PAY-003",
    vendorName: "شركة تقنيات المستقبل",
    amount: 8500,
    date: "2024-04-05",
    paymentMethod: "bank",
    reference: "TRN-98765",
    status: "pending" as const,
  },
];

export const usePaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [isLoading, setIsLoading] = useState(false);
  const [vendorData, setVendorData] = useState<any[]>([]);
  const [paymentHistory, setPaymentHistory] = useState(initialPaymentHistory);
  
  // Payment stats
  const paymentStats = {
    totalPaid: 28700,
    pendingPayments: 8500,
    thisMonthPayments: 16700,
    overdueAmount: 15000,
  };

  useEffect(() => {
    // Filter only vendors with outstanding balances
    const filteredVendors = mockVendors.filter(vendor => vendor.balance > 0);
    setVendorData(filteredVendors);
    
    // Check if there's a vendor ID in the URL
    const vendorId = searchParams.get("vendorId");
    if (vendorId) {
      // This would typically pre-select the vendor in the form
      // We'll handle this in the form component
    }
  }, [searchParams]);

  const handlePaymentSubmit = (values: any) => {
    setIsLoading(true);
    
    // Find vendor to get name
    const vendor = mockVendors.find(v => v.id === values.vendorId);
    
    // Simulate API call
    setTimeout(() => {
      // Create new payment record
      const newPayment = {
        id: `PAY-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        vendorName: vendor?.name || "غير معروف",
        amount: values.amount,
        date: values.paymentDate,
        paymentMethod: values.paymentMethod,
        reference: values.reference,
        status: "completed" as const,
      };
      
      // Add payment to history
      setPaymentHistory([newPayment, ...paymentHistory]);
      
      // Show success toast
      toast.success(`تم تسجيل عملية سداد بقيمة ${values.amount} ريال بنجاح`);
      
      setIsLoading(false);
    }, 1500);
  };

  return {
    vendorData,
    paymentStats,
    paymentHistory,
    handlePaymentSubmit,
    isLoading
  };
};

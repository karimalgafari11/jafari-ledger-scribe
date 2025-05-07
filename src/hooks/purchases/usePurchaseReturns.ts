
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { PurchaseReturn } from '@/types/purchases';

interface UsePurchaseReturnsProps {
  initialReturns?: PurchaseReturn[];
}

export const usePurchaseReturns = ({ initialReturns = [] }: UsePurchaseReturnsProps = {}) => {
  // حالة البيانات
  const [returns, setReturns] = useState<PurchaseReturn[]>(initialReturns);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // آخر 30 يوم
    to: new Date()
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');

  // تصفية البيانات
  const filteredReturns = useMemo(() => {
    return returns.filter(returnItem => {
      // تصفية حسب كلمة البحث
      const matchesSearch = !searchQuery || 
        returnItem.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        returnItem.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (returnItem.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      
      // تصفية حسب التاريخ
      const matchesDate = returnItem.date >= dateRange.from && returnItem.date <= dateRange.to;
      
      // تصفية حسب الحالة
      const matchesStatus = statusFilter === 'all' || returnItem.status === statusFilter;
      
      // تصفية حسب المورد
      const matchesVendor = vendorFilter === 'all' || returnItem.vendorId === vendorFilter;
      
      return matchesSearch && matchesDate && matchesStatus && matchesVendor;
    });
  }, [returns, dateRange, searchQuery, statusFilter, vendorFilter]);

  // إحصائيات
  const stats = useMemo(() => {
    const totalReturns = filteredReturns.length;
    const totalAmount = filteredReturns.reduce((sum, item) => sum + item.totalAmount, 0);
    const pendingReturns = filteredReturns.filter(item => item.status === 'pending').length;
    const approvedReturns = filteredReturns.filter(item => item.status === 'approved').length;
    const rejectedReturns = filteredReturns.filter(item => item.status === 'rejected').length;
    const completedReturns = filteredReturns.filter(item => item.status === 'completed').length;

    return {
      totalReturns,
      totalAmount,
      pendingReturns,
      approvedReturns,
      rejectedReturns,
      completedReturns
    };
  }, [filteredReturns]);

  // بيانات الرسم البياني
  const chartData = useMemo(() => {
    // تجميع البيانات حسب التاريخ
    const dataByDate = filteredReturns.reduce((acc, item) => {
      const dateKey = item.date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, amount: 0, count: 0 };
      }
      acc[dateKey].amount += item.totalAmount;
      acc[dateKey].count += 1;
      return acc;
    }, {} as Record<string, { date: string; amount: number; count: number }>);

    // تحويلها إلى مصفوفة
    return Object.values(dataByDate).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredReturns]);

  // وظائف التفاعل
  const addReturn = (returnItem: PurchaseReturn) => {
    setReturns([...returns, returnItem]);
    toast.success(`تم إضافة المرتجع ${returnItem.returnNumber} بنجاح`);
  };

  const updateReturn = (id: string, updatedReturn: Partial<PurchaseReturn>) => {
    setReturns(returns.map(item => 
      item.id === id ? { ...item, ...updatedReturn, updatedAt: new Date() } : item
    ));
    toast.success(`تم تحديث المرتجع ${id} بنجاح`);
  };

  const approveReturn = (id: string, approvedBy: string) => {
    updateReturn(id, { status: 'approved', approvedBy });
    toast.success(`تمت الموافقة على المرتجع ${id}`);
  };

  const rejectReturn = (id: string, approvedBy: string) => {
    updateReturn(id, { status: 'rejected', approvedBy });
    toast.info(`تم رفض المرتجع ${id}`);
  };

  const completeReturn = (id: string) => {
    updateReturn(id, { status: 'completed' });
    toast.success(`تم إكمال معالجة المرتجع ${id}`);
  };

  const deleteReturn = (id: string) => {
    setReturns(returns.filter(item => item.id !== id));
    toast.info(`تم حذف المرتجع ${id}`);
  };

  const exportReturns = () => {
    toast.success('جاري تصدير بيانات المرتجعات...');
    setTimeout(() => {
      toast.success('تم تصدير البيانات بنجاح');
    }, 1500);
  };

  const printReturns = () => {
    toast.info('جاري تجهيز الصفحة للطباعة...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return {
    returns,
    filteredReturns,
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    vendorFilter,
    setVendorFilter,
    stats,
    chartData,
    addReturn,
    updateReturn,
    approveReturn,
    rejectReturn,
    completeReturn,
    deleteReturn,
    exportReturns,
    printReturns
  };
};

export default usePurchaseReturns;

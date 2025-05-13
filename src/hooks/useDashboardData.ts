
import { useState, useEffect } from 'react';

interface Invoice {
  id: string;
  customer: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export const useDashboardData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    totalRevenue: '٥٨,٠٠٠ ر.س',
    newCustomers: 123,
    totalOrders: 765,
    averageOrderValue: '٤٥٠ ر.س',
    recentInvoices: [
      { id: '1', customer: 'محمد أحمد', amount: '١٢٠٠ ر.س', status: 'paid' as const, date: '١٢ مايو ٢٠٢٥' },
      { id: '2', customer: 'خالد سالم', amount: '٧٥٠ ر.س', status: 'pending' as const, date: '١٥ مايو ٢٠٢٥' },
      { id: '3', customer: 'فاطمة علي', amount: '٢٣٠٠ ر.س', status: 'overdue' as const, date: '٨ مايو ٢٠٢٥' },
      { id: '4', customer: 'سعيد محمود', amount: '٥٦٠ ر.س', status: 'paid' as const, date: '١٠ مايو ٢٠٢٥' }
    ],
    tasks: [
      { id: '1', title: 'مراجعة تقرير المبيعات', completed: true, dueDate: 'اليوم' },
      { id: '2', title: 'اجتماع مع العملاء', completed: false, dueDate: 'غداً' },
      { id: '3', title: 'تحديث قائمة المنتجات', completed: false, dueDate: '١٦ مايو' },
      { id: '4', title: 'مراجعة المخزون', completed: false, dueDate: '١٨ مايو' }
    ]
  });

  useEffect(() => {
    // محاكاة طلب API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return {
    ...data,
    isLoading,
    error
  };
};

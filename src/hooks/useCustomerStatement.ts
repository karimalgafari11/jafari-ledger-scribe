
import { useState, useEffect } from "react";
import { Customer } from "@/types/customers";
import { Transaction } from "@/types/transactions";
import { mockCustomers } from "@/data/mockCustomers";

// Mock transactions data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2023-10-01'),
    type: 'invoice',
    reference: 'INV-001',
    description: 'فاتورة مبيعات',
    debit: 5000,
    credit: 0,
    balance: 5000
  },
  {
    id: '2',
    date: new Date('2023-10-10'),
    type: 'payment',
    reference: 'PAY-001',
    description: 'دفعة نقدية',
    debit: 0,
    credit: 3000,
    balance: 2000
  },
  {
    id: '3',
    date: new Date('2023-10-15'),
    type: 'invoice',
    reference: 'INV-002',
    description: 'فاتورة مبيعات',
    debit: 3500,
    credit: 0,
    balance: 5500
  },
  {
    id: '4',
    date: new Date('2023-10-20'),
    type: 'return',
    reference: 'RTN-001',
    description: 'مرتجع مبيعات',
    debit: 0,
    credit: 500,
    balance: 5000
  },
  {
    id: '5',
    date: new Date('2023-11-01'),
    type: 'payment',
    reference: 'PAY-002',
    description: 'دفعة نقدية',
    debit: 0,
    credit: 1000,
    balance: 4000
  }
];

export const useCustomerStatement = (customerId: string | undefined) => {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // البحث عن العميل بواسطة المعرف
    const foundCustomer = mockCustomers.find(c => c.id === customerId);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setTransactions(mockTransactions);
    }
    setIsLoading(false);
  }, [customerId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('سيتم تنزيل كشف الحساب كملف PDF');
  };

  const handleSendEmail = () => {
    if (customer?.email) {
      alert(`سيتم إرسال كشف الحساب إلى ${customer.email}`);
    }
  };

  return {
    customer,
    transactions,
    isLoading,
    handlePrint,
    handleDownload,
    handleSendEmail
  };
};

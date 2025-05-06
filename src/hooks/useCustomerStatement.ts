
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

type TransactionType = Transaction["type"] | "all";

export const useCustomerStatement = (customerId: string | undefined) => {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [paginatedTransactions, setPaginatedTransactions] = useState<Transaction[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<TransactionType[]>(["all", "invoice", "payment", "return"]);
  const [dateRange, setDateRange] = useState<{from: Date; to: Date}>({
    from: new Date('2023-10-01'),
    to: new Date('2023-11-01')
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // البحث عن العميل بواسطة المعرف
    const foundCustomer = mockCustomers.find(c => c.id === customerId);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setAllTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
    }
    setIsLoading(false);
  }, [customerId]);

  useEffect(() => {
    // Apply filters based on selected transaction types and date range
    let filtered = allTransactions;
    
    // Filter by date range
    filtered = filtered.filter(transaction => 
      transaction.date >= dateRange.from && 
      transaction.date <= dateRange.to
    );
    
    // Filter by transaction types
    if (!selectedTypes.includes("all") && selectedTypes.length > 0) {
      filtered = filtered.filter(transaction => 
        selectedTypes.includes(transaction.type)
      );
    } else if (selectedTypes.length === 0) {
      // If no filters selected, show no results
      filtered = [];
    }
    
    setFilteredTransactions(filtered);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / pageSize)));
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedTypes, dateRange, allTransactions, pageSize]);

  useEffect(() => {
    // Apply pagination to filtered transactions
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedTransactions(filteredTransactions.slice(startIndex, endIndex));
  }, [filteredTransactions, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handleTypeFilterChange = (types: TransactionType[]) => {
    setSelectedTypes(types);
  };
  
  const handleDateRangeChange = (range: {from: Date; to: Date}) => {
    setDateRange(range);
  };

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
    transactions: paginatedTransactions,
    allTransactions: filteredTransactions,
    isLoading,
    selectedTypes,
    dateRange,
    currentPage,
    totalPages,
    pageSize,
    handleTypeFilterChange,
    handleDateRangeChange,
    handlePageChange,
    handlePageSizeChange,
    handlePrint,
    handleDownload,
    handleSendEmail
  };
};

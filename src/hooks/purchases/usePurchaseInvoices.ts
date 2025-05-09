
import { useState } from 'react';
import { PurchaseInvoice } from '@/types/purchases';
import { mockPurchaseInvoices } from '@/data/mockPurchaseInvoices';

export interface InvoiceFilter {
  search: string;
  status?: string;
  dateRange?: { from: Date; to: Date } | undefined;
  vendor?: string;
}

export function usePurchaseInvoices() {
  const [invoices, setInvoices] = useState<PurchaseInvoice[]>(mockPurchaseInvoices);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [filter, setFilter] = useState<InvoiceFilter>({
    search: '',
    status: undefined,
    dateRange: undefined,
    vendor: undefined,
  });

  // الإحصائيات الخاصة بالفواتير
  const statistics = {
    total: invoices.length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    pending: invoices.filter(inv => inv.status === 'pending').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
  };

  const toggleInvoiceSelection = (id: string) => {
    setSelectedInvoices(prev => 
      prev.includes(id) 
        ? prev.filter(invoiceId => invoiceId !== id) 
        : [...prev, id]
    );
  };

  const selectAllInvoices = () => {
    if (selectedInvoices.length === invoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(invoices.map(invoice => invoice.id));
    }
  };

  const unselectAllInvoices = () => {
    setSelectedInvoices([]);
  };

  const deleteInvoices = (ids: string[]) => {
    setInvoices(prev => prev.filter(invoice => !ids.includes(invoice.id)));
    setSelectedInvoices(prev => prev.filter(id => !ids.includes(id)));
  };

  // إضافة بيانات جديدة
  const addInvoices = (newInvoices: PurchaseInvoice[]) => {
    setInvoices(prev => [...prev, ...newInvoices]);
  };

  return {
    invoices,
    setInvoices,
    isLoading,
    statistics,
    selectedInvoices,
    filter,
    setFilter,
    toggleInvoiceSelection,
    selectAllInvoices,
    unselectAllInvoices,
    deleteInvoices,
    addInvoices
  };
}


import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Invoice {
  id: string;
  customer: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
}

interface RecentInvoicesProps {
  invoices?: Invoice[];
}

export const RecentInvoices: React.FC<RecentInvoicesProps> = ({ invoices = [] }) => {
  if (invoices.length === 0) {
    return <div className="text-center py-4 text-gray-500">لا توجد فواتير حديثة</div>;
  }
  
  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center justify-between gap-2">
          <div>
            <p className="font-medium">{invoice.customer}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className={`px-2 py-1 text-xs rounded-full ${
                invoice.status === 'paid' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                  : invoice.status === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
              }`}
            >
              {invoice.status === 'paid' ? 'مدفوعة' : invoice.status === 'pending' ? 'معلقة' : 'متأخرة'}
            </span>
            <span className="font-medium">{invoice.amount}</span>
            <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

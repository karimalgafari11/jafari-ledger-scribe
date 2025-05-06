
import { Transaction } from "@/types/transactions";
import { Customer } from "@/types/customers";
import { TransactionsTable } from "@/components/customers/TransactionsTable";
import { FileText } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface StatementContentProps {
  transactions: Transaction[];
  customer: Customer;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const StatementContent = ({ 
  transactions, 
  customer,
  currentPage,
  totalPages,
  onPageChange
}: StatementContentProps) => {
  return (
    <>
      {transactions.length > 0 ? (
        <div className="space-y-4">
          <TransactionsTable 
            transactions={transactions} 
            totalBalance={customer.balance}
          />
          
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => onPageChange(i + 1)}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-md">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">لا توجد معاملات في الفترة المحددة</p>
          <p className="text-gray-500 text-sm mt-1">يمكنك تغيير نطاق البحث لعرض المزيد من المعاملات</p>
        </div>
      )}
    </>
  );
};

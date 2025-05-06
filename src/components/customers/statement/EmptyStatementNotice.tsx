
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle } from "lucide-react";
import { Customer } from "@/types/customers";
import { useNavigate } from "react-router-dom";

interface EmptyStatementNoticeProps {
  customer: Customer;
  onDateRangeReset: () => void;
}

export const EmptyStatementNotice = ({ customer, onDateRangeReset }: EmptyStatementNoticeProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-md">
      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 font-medium">لا توجد معاملات في الفترة المحددة</p>
      <p className="text-gray-500 text-sm mt-1">يمكنك تغيير نطاق البحث لعرض المزيد من المعاملات</p>
      
      <div className="mt-6 flex gap-4 justify-center">
        <Button variant="outline" onClick={onDateRangeReset}>
          إعادة ضبط الفترة
        </Button>
        <Button variant="outline" onClick={() => navigate('/customers/statement')}>
          اختيار عميل آخر
        </Button>
      </div>
      
      {customer.balance === 0 && (
        <div className="mt-8 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 p-3 rounded-lg max-w-md mx-auto">
          <AlertCircle size={20} />
          <p className="text-sm">هذا العميل ليس لديه أي رصيد أو معاملات سابقة</p>
        </div>
      )}
    </div>
  );
};

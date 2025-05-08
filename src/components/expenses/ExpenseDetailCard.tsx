
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Expense } from "@/types/expenses";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { FileText, Clock, Tag, DollarSign, CreditCard, FileCheck } from "lucide-react";

interface ExpenseDetailCardProps {
  expense: Expense;
}

export const ExpenseDetailCard = ({ expense }: ExpenseDetailCardProps) => {
  const getStatusInfo = () => {
    switch (expense.status) {
      case "approved":
        return { label: "مقبول", color: "bg-green-100 text-green-800" };
      case "rejected":
        return { label: "مرفوض", color: "bg-red-100 text-red-800" };
      case "pending":
      default:
        return { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-800" };
    }
  };

  const getPaymentMethodInfo = () => {
    switch (expense.paymentMethod) {
      case "cash":
        return { label: "نقداً", icon: <DollarSign size={18} className="ml-2" /> };
      case "credit":
        return { label: "بطاقة ائتمان", icon: <CreditCard size={18} className="ml-2" /> };
      case "bank":
        return { label: "تحويل بنكي", icon: <FileCheck size={18} className="ml-2" /> };
      default:
        return { label: "غير محدد", icon: <DollarSign size={18} className="ml-2" /> };
    }
  };

  const status = getStatusInfo();
  const paymentMethod = getPaymentMethodInfo();

  return (
    <Card className="overflow-hidden border-2 border-gray-200 transition-all hover:shadow-md">
      <CardHeader className="bg-gray-50 pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={20} />
            <span>{expense.description}</span>
          </div>
          <Badge className={status.color}>{status.label}</Badge>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock size={14} className="opacity-70" />
          <span>{format(expense.date, "dd MMMM yyyy", { locale: ar })}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex items-center justify-between rounded-md bg-gray-50 p-3">
            <div className="flex items-center">
              <DollarSign className="ml-2 text-green-600" size={22} />
              <span className="text-lg font-bold">{expense.amount.toLocaleString("ar-SA")} ريال</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Tag size={18} className="ml-2 text-blue-600" />
            <div>
              <div className="text-sm text-gray-500">التصنيف</div>
              <div>{expense.category}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            {paymentMethod.icon}
            <div>
              <div className="text-sm text-gray-500">طريقة الدفع</div>
              <div>{paymentMethod.label}</div>
            </div>
          </div>
          
          {expense.notes && (
            <div className="col-span-2 mt-2 rounded-md bg-gray-50 p-3">
              <div className="text-sm font-semibold text-gray-500">ملاحظات:</div>
              <div className="mt-1">{expense.notes}</div>
            </div>
          )}
          
          {expense.attachments && expense.attachments.length > 0 && (
            <div className="col-span-2 mt-2">
              <div className="text-sm font-semibold text-gray-500">المرفقات:</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {expense.attachments.map((attachment, i) => (
                  <Badge key={i} variant="outline" className="flex items-center gap-1">
                    <FileText size={12} />
                    {attachment}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

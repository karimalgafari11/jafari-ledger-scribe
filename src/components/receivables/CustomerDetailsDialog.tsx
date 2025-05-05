
import React from "react";
import { Customer } from "@/types/customers";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export const CustomerDetailsDialog: React.FC<CustomerDetailsDialogProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const navigate = useNavigate();

  if (!customer) return null;

  const handleViewStatement = () => {
    navigate(`/customers/statement/${customer.id}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">تفاصيل الذمم المدينة</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold">{customer.name}</h3>
              <p className="text-sm text-gray-500">{customer.type === 'company' ? 'شركة' : 'فرد'}</p>
            </div>
            <div className="text-left">
              <div className="text-xl font-bold text-red-600">{formatCurrency(customer.balance)}</div>
              <p className="text-sm text-gray-500">الرصيد المستحق</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <div className="text-sm font-semibold">رقم الحساب</div>
              <div>{customer.accountNumber || '-'}</div>
            </div>
            <div>
              <div className="text-sm font-semibold">حد الائتمان</div>
              <div>{formatCurrency(customer.creditLimit || 0)}</div>
            </div>
            <div>
              <div className="text-sm font-semibold">رقم الهاتف</div>
              <div dir="ltr" className="text-left">{customer.phone}</div>
            </div>
            <div>
              <div className="text-sm font-semibold">البريد الإلكتروني</div>
              <div>{customer.email}</div>
            </div>
            <div>
              <div className="text-sm font-semibold">العنوان</div>
              <div className="line-clamp-2">{customer.address}</div>
            </div>
            {customer.vatNumber && (
              <div>
                <div className="text-sm font-semibold">الرقم الضريبي</div>
                <div>{customer.vatNumber}</div>
              </div>
            )}
            <div>
              <div className="text-sm font-semibold">تاريخ الإنشاء</div>
              <div>{formatDate(customer.createdAt.toISOString())}</div>
            </div>
            <div>
              <div className="text-sm font-semibold">آخر تحديث</div>
              <div>{formatDate(customer.updatedAt.toISOString())}</div>
            </div>
          </div>

          {customer.notes && (
            <div className="mt-4">
              <div className="text-sm font-semibold">ملاحظات</div>
              <div className="text-sm bg-gray-50 p-2 rounded border mt-1">
                {customer.notes}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleViewStatement}
              className="gap-2"
            >
              <FileText size={16} />
              عرض كشف الحساب
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

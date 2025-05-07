
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import { Printer, Download } from "lucide-react";
import { toast } from "sonner";

interface PaymentReceiptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
}

export const PaymentReceiptDialog: React.FC<PaymentReceiptDialogProps> = ({ isOpen, onClose, payment }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!payment) return null;

  // تنسيق التاريخ إلى اللغة العربية
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  // ترجمة طرق الدفع
  const translatePaymentMethod = (method: string) => {
    switch (method) {
      case "cash":
        return "نقدي";
      case "bank":
        return "تحويل بنكي";
      case "check":
        return "شيك";
      case "card":
        return "بطاقة ائتمانية";
      default:
        return method;
    }
  };

  // محاكاة لطباعة الإيصال
  const handlePrint = () => {
    toast.success("جاري إرسال الإيصال للطباعة...");
    // هنا يمكن إضافة منطق الطباعة الفعلي
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  // محاكاة لتنزيل الإيصال كملف PDF
  const handleDownload = () => {
    toast.success("جاري تنزيل الإيصال كملف PDF...");
    // هنا يمكن إضافة منطق التنزيل الفعلي
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] rtl">
        <DialogHeader>
          <DialogTitle className="text-xl mb-2">إيصال سداد دفعة</DialogTitle>
        </DialogHeader>
        
        <div ref={receiptRef} className="border rounded-md p-4 bg-white">
          {/* رأس الإيصال */}
          <div className="text-center border-b pb-4 mb-4">
            <div className="font-bold text-xl mb-1">شركة الجعفري</div>
            <div className="text-gray-600 text-sm">سند قبض</div>
            <div className="text-gray-600 text-sm mt-2">
              رقم السند: {payment.id}
            </div>
          </div>
          
          {/* تفاصيل المورد والتاريخ */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-gray-600 text-sm">المورد:</div>
              <div className="font-medium">{payment.vendorName}</div>
            </div>
            <div className="text-left">
              <div className="text-gray-600 text-sm">التاريخ:</div>
              <div className="font-medium">{formatDate(payment.date)}</div>
            </div>
          </div>
          
          {/* المبلغ والتفاصيل */}
          <div className="border-t border-b py-4 mb-4">
            <div className="text-center mb-4">
              <div className="text-gray-600 text-sm">المبلغ:</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(payment.amount)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-600 text-sm">طريقة الدفع:</div>
                <div className="font-medium">{translatePaymentMethod(payment.paymentMethod)}</div>
              </div>
              {payment.reference && (
                <div className="text-left">
                  <div className="text-gray-600 text-sm">رقم المرجع:</div>
                  <div className="font-medium">{payment.reference}</div>
                </div>
              )}
              {payment.invoiceNumber && (
                <div>
                  <div className="text-gray-600 text-sm">رقم الفاتورة:</div>
                  <div className="font-medium">{payment.invoiceNumber}</div>
                </div>
              )}
              <div className="text-left">
                <div className="text-gray-600 text-sm">حالة السداد:</div>
                <div className={
                  payment.status === "completed" 
                    ? "text-green-600 font-medium"
                    : payment.status === "pending"
                    ? "text-amber-600 font-medium"
                    : "text-red-600 font-medium"
                }>
                  {payment.status === "completed" 
                    ? "مكتمل" 
                    : payment.status === "pending" 
                    ? "قيد المعالجة" 
                    : "فشل"
                  }
                </div>
              </div>
            </div>
          </div>
          
          {/* التوقيعات */}
          <div className="grid grid-cols-2 gap-4 text-center pt-4">
            <div>
              <div className="text-gray-600 text-sm mb-6">توقيع المستلم</div>
              <div className="border-t border-gray-300 w-32 mx-auto"></div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-6">توقيع المسؤول</div>
              <div className="border-t border-gray-300 w-32 mx-auto"></div>
            </div>
          </div>
          
          {/* ختم الشركة */}
          <div className="text-center mt-4">
            <div className="text-gray-600 text-sm">ختم الشركة</div>
            <div className="w-20 h-20 border border-dashed border-gray-300 rounded-full mx-auto mt-2"></div>
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onClose}>
              إغلاق
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
                <Download size={16} />
                تنزيل PDF
              </Button>
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <Printer size={16} />
                طباعة
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

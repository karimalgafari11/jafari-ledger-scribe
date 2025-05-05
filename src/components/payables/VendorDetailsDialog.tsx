
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import { Card } from "@/components/ui/card";

interface VendorDetailsDialogProps {
  vendor: any;
  open: boolean;
  onClose: () => void;
  onMakePayment: (vendor: any) => void;
}

export const VendorDetailsDialog: React.FC<VendorDetailsDialogProps> = ({
  vendor,
  open,
  onClose,
  onMakePayment
}) => {
  if (!vendor) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl rtl">
        <DialogHeader>
          <DialogTitle>تفاصيل المورد</DialogTitle>
          <DialogDescription>
            معلومات المورد والمستحقات المالية
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <Card className="p-4 space-y-3">
            <h3 className="font-bold text-lg border-b pb-2">بيانات المورد</h3>
            <div>
              <div className="text-sm text-gray-500">اسم المورد</div>
              <div className="font-medium">{vendor.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">الشخص المسؤول</div>
              <div className="font-medium">{vendor.contactPerson || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">رقم الهاتف</div>
              <div className="font-medium">{vendor.phone || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">البريد الإلكتروني</div>
              <div className="font-medium">{vendor.email || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">العنوان</div>
              <div className="font-medium">{vendor.address || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">فئة المورد</div>
              <div className="font-medium">{vendor.category || "-"}</div>
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <h3 className="font-bold text-lg border-b pb-2">المعلومات المالية</h3>
            <div>
              <div className="text-sm text-gray-500">الرصيد المستحق</div>
              <div className="font-medium text-lg text-purple-600">{formatCurrency(vendor.balance)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">حد الائتمان</div>
              <div className="font-medium">{formatCurrency(vendor.creditLimit || 0)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">تاريخ الاستحقاق</div>
              <div className="font-medium">
                {vendor.dueDate ? new Intl.DateTimeFormat('ar-SA').format(new Date(vendor.dueDate)) : "-"}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">الرقم الضريبي</div>
              <div className="font-medium">{vendor.taxNumber || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">رقم الحساب</div>
              <div className="font-medium">{vendor.accountNumber || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">حالة المورد</div>
              <div className="font-medium">{vendor.status || "-"}</div>
            </div>
          </Card>
        </div>

        <DialogFooter className="sm:justify-between flex-row-reverse">
          <Button type="button" variant="default" onClick={() => onMakePayment(vendor)}>
            سداد المستحقات
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

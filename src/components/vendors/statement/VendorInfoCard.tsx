
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface VendorInfoCardProps {
  vendor: {
    name: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    address?: string;
    taxNumber?: string;
  };
}

export const VendorInfoCard: React.FC<VendorInfoCardProps> = ({ vendor }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>بيانات المورد</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">اسم المورد</p>
            <p className="font-medium">{vendor.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">جهة الاتصال</p>
            <p className="font-medium">{vendor.contactPerson || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">رقم الهاتف</p>
            <p className="font-medium">{vendor.phone || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">البريد الإلكتروني</p>
            <p className="font-medium">{vendor.email || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">العنوان</p>
            <p className="font-medium">{vendor.address || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">الرقم الضريبي</p>
            <p className="font-medium">{vendor.taxNumber || '-'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

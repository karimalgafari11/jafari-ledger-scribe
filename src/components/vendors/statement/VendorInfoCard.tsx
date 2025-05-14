
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Vendor } from "@/types/vendor";

interface VendorInfoCardProps {
  vendor: Vendor;
}

export const VendorInfoCard: React.FC<VendorInfoCardProps> = ({ vendor }) => {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">معلومات المورد</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-gray-500">اسم المورد</p>
            <p className="font-medium">{vendor.name}</p>
          </div>
          
          {vendor.contactPerson && (
            <div>
              <p className="text-sm text-gray-500">جهة الاتصال</p>
              <p className="font-medium">{vendor.contactPerson}</p>
            </div>
          )}
          
          {vendor.phone && (
            <div>
              <p className="text-sm text-gray-500">رقم الهاتف</p>
              <p className="font-medium" dir="ltr">{vendor.phone}</p>
            </div>
          )}
          
          {vendor.email && (
            <div>
              <p className="text-sm text-gray-500">البريد الإلكتروني</p>
              <p className="font-medium">{vendor.email}</p>
            </div>
          )}
          
          {vendor.address && (
            <div>
              <p className="text-sm text-gray-500">العنوان</p>
              <p className="font-medium">{vendor.address}</p>
            </div>
          )}
          
          {vendor.taxNumber && (
            <div>
              <p className="text-sm text-gray-500">الرقم الضريبي</p>
              <p className="font-medium">{vendor.taxNumber}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

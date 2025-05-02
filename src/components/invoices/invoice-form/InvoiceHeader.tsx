
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  isEditing: boolean;
}

interface InvoiceHeaderProps {
  companyInfo: CompanyInfo;
  toggleCompanyEdit: () => void;
  handleCompanyInfoChange: (field: string, value: string) => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  companyInfo,
  toggleCompanyEdit,
  handleCompanyInfoChange
}) => {
  return (
    <div className="border-2 border-black rounded-md p-4 mb-6 bg-white relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Logo size="medium" className="ml-4" />
          {companyInfo.isEditing ? (
            <div className="space-y-2">
              <Input
                value={companyInfo.name}
                onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                className="mb-1"
                placeholder="اسم الشركة"
              />
              <Input
                value={companyInfo.phone}
                onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                className="mb-1"
                placeholder="رقم الهاتف"
              />
              <Input
                value={companyInfo.email}
                onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                className="mb-1"
                placeholder="البريد الإلكتروني"
              />
              <Input
                value={companyInfo.address}
                onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                placeholder="العنوان"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{companyInfo.name}</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{companyInfo.phone}</p>
                <p>{companyInfo.email}</p>
                <p>{companyInfo.address}</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <Button 
            onClick={toggleCompanyEdit} 
            variant="ghost" 
            size="sm" 
            className="print-hide"
          >
            {companyInfo.isEditing ? 'حفظ' : 'تعديل بيانات الشركة'}
          </Button>
        </div>
      </div>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold border-b-2 border-t-2 border-black py-2">فاتورة مبيعات</h1>
        <p className="text-lg mt-2">Sales Invoice</p>
      </div>
    </div>
  );
};

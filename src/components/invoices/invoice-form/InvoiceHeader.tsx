
import React from "react";
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
  showLogo?: boolean;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  companyInfo,
  toggleCompanyEdit,
  handleCompanyInfoChange,
  showLogo = true
}) => {
  return (
    <div className="border-2 border-black p-2 mb-4 bg-white relative rounded">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {showLogo && <Logo size="small" className="ml-2" />}
          
          {companyInfo.isEditing ? (
            <div className="space-y-1">
              <Input 
                value={companyInfo.name} 
                onChange={e => handleCompanyInfoChange('name', e.target.value)} 
                className="mb-1 h-7 text-sm" 
                placeholder="اسم الشركة" 
              />
              <Input 
                value={companyInfo.phone} 
                onChange={e => handleCompanyInfoChange('phone', e.target.value)} 
                className="mb-1 h-7 text-sm" 
                placeholder="رقم الهاتف" 
              />
              <Input 
                value={companyInfo.email} 
                onChange={e => handleCompanyInfoChange('email', e.target.value)} 
                className="mb-1 h-7 text-sm" 
                placeholder="البريد الإلكتروني" 
              />
              <Input 
                value={companyInfo.address} 
                onChange={e => handleCompanyInfoChange('address', e.target.value)} 
                placeholder="العنوان"
                className="h-7 text-sm" 
              />
            </div>
          ) : (
            <div className="space-y-0">
              <h2 className="font-bold text-xl">{companyInfo.name}</h2>
              <div className="text-xs text-gray-600">
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
            className="print-hide text-xs h-7"
          >
            {companyInfo.isEditing ? 'حفظ' : 'تعديل'}
          </Button>
        </div>
      </div>
      
      <div className="text-center mb-2 mt-1">
        <h1 className="font-bold border-b-2 border-t-2 border-black py-0 text-xl">فاتورة مبيعات</h1>
        <p className="text-sm">Sales Invoice</p>
      </div>
    </div>
  );
};

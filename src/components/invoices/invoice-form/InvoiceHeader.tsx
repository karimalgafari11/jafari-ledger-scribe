
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
    <div className="border border-gray-300 p-1 mb-2 bg-white relative rounded-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {showLogo && <Logo size="small" className="ml-1 h-8 w-8" />}
          
          {companyInfo.isEditing ? (
            <div className="space-y-0.5">
              <Input 
                value={companyInfo.name} 
                onChange={e => handleCompanyInfoChange('name', e.target.value)} 
                className="mb-0.5 h-5 text-xs" 
                placeholder="اسم الشركة" 
              />
              <Input 
                value={companyInfo.phone} 
                onChange={e => handleCompanyInfoChange('phone', e.target.value)} 
                className="mb-0.5 h-5 text-xs" 
                placeholder="رقم الهاتف" 
              />
              <Input 
                value={companyInfo.email} 
                onChange={e => handleCompanyInfoChange('email', e.target.value)} 
                className="mb-0.5 h-5 text-xs" 
                placeholder="البريد الإلكتروني" 
              />
              <Input 
                value={companyInfo.address} 
                onChange={e => handleCompanyInfoChange('address', e.target.value)} 
                placeholder="العنوان"
                className="h-5 text-xs" 
              />
            </div>
          ) : (
            <div className="space-y-0">
              <h2 className="font-bold text-sm">{companyInfo.name}</h2>
              <div className="text-xs text-gray-600">
                <p className="leading-tight">{companyInfo.phone}</p>
                <p className="leading-tight">{companyInfo.email}</p>
                <p className="leading-tight">{companyInfo.address}</p>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <Button 
            onClick={toggleCompanyEdit} 
            variant="ghost" 
            size="xs" 
            className="print-hide text-xs h-5"
          >
            {companyInfo.isEditing ? 'حفظ' : 'تعديل'}
          </Button>
        </div>
      </div>
      
      <div className="text-center mb-0.5 mt-0.5">
        <h1 className="font-bold border-b border-t border-gray-300 py-0 text-sm">فاتورة مبيعات</h1>
        <p className="text-xs">Sales Invoice</p>
      </div>
    </div>
  );
};

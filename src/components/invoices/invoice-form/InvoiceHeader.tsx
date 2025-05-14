
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";

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
    <div className="flex justify-between items-start border-b border-gray-200 pb-1 mb-1 print:pb-2 print:mb-2">
      {/* Company Logo (Left) */}
      {showLogo && (
        <div className="w-12 h-12 print:w-16 print:h-16">
          <img 
            src="/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png" 
            alt="Company Logo" 
            className="w-full h-full object-contain" 
          />
        </div>
      )}

      {/* Company Information (Center) */}
      <div className="text-center flex-1 px-2">
        {companyInfo.isEditing ? (
          <div className="space-y-0.5">
            <Input
              value={companyInfo.name}
              onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
              className="text-center font-bold h-5 text-xs"
            />
            <div className="flex gap-1 justify-center">
              <Input
                value={companyInfo.phone}
                onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                className="text-center w-1/3 h-5 text-xs"
              />
              <Input
                value={companyInfo.email}
                onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                className="text-center w-1/3 h-5 text-xs"
              />
            </div>
            <Input
              value={companyInfo.address}
              onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
              className="text-center h-5 text-xs"
            />
            <Button onClick={toggleCompanyEdit} size="xs" className="h-5 text-xs">
              <Save className="ml-1 h-3 w-3" />
              حفظ
            </Button>
          </div>
        ) : (
          <div className="space-y-0.5 relative">
            <h2 className="font-bold text-sm">{companyInfo.name}</h2>
            <p className="text-xs">
              {companyInfo.phone} | {companyInfo.email}
            </p>
            <p className="text-xs">{companyInfo.address}</p>
            <Button
              onClick={toggleCompanyEdit}
              variant="ghost"
              size="xs"
              className="absolute -left-1 top-0 h-5 w-5 p-0.5 print-hide"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Invoice Title (Right) */}
      <div className="text-center w-16">
        <div className="border border-gray-300 rounded-md p-1">
          <h2 className="text-sm font-bold mb-0.5">فاتورة</h2>
          <p className="text-xs">مبيعات</p>
        </div>
      </div>
    </div>
  );
};

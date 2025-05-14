
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface CompanyInfo {
  name: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  taxNumber: string;
  website: string;
}

interface InvoiceHeaderProps {
  companyInfo: CompanyInfo;
  toggleCompanyEdit: () => void;
  handleCompanyInfoChange: (key: keyof CompanyInfo, value: string) => void;
  showLogo?: boolean;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  companyInfo,
  toggleCompanyEdit,
  handleCompanyInfoChange,
  showLogo = true
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const startEditing = () => {
    setIsEditing(true);
    toggleCompanyEdit();
  };
  
  const stopEditing = () => {
    setIsEditing(false);
    toggleCompanyEdit();
  };

  return (
    <Card className="print-section mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="companyName">اسم الشركة</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.name}
                    onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="companyPhone">رقم الهاتف</Label>
                    <Input
                      id="companyPhone"
                      value={companyInfo.phone}
                      onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="companyEmail">البريد الإلكتروني</Label>
                    <Input
                      id="companyEmail"
                      value={companyInfo.email}
                      onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="companyAddress">العنوان</Label>
                  <Textarea
                    id="companyAddress"
                    value={companyInfo.address}
                    onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                    <Input
                      id="taxNumber"
                      value={companyInfo.taxNumber}
                      onChange={(e) => handleCompanyInfoChange('taxNumber', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">الموقع الإلكتروني</Label>
                    <Input
                      id="website"
                      value={companyInfo.website}
                      onChange={(e) => handleCompanyInfoChange('website', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-1">{companyInfo.name || "اسم الشركة"}</h2>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>{companyInfo.address || "عنوان الشركة"}</p>
                  <p>هاتف: {companyInfo.phone || "000-0000-0000"}</p>
                  <p>بريد إلكتروني: {companyInfo.email || "info@company.com"}</p>
                  <p>الرقم الضريبي: {companyInfo.taxNumber || "000-000-000"}</p>
                  <p>موقع إلكتروني: {companyInfo.website || "www.company.com"}</p>
                </div>
              </div>
            )}
          </div>
          
          {showLogo && (
            <div className="ml-6">
              <div className="w-24 h-24 bg-gray-100 border flex items-center justify-center">
                {companyInfo.logo ? (
                  <img src={companyInfo.logo} alt="Company Logo" className="max-w-full max-h-full" />
                ) : (
                  <span className="text-gray-400 text-xs text-center">شعار الشركة</span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="print-hide">
          {isEditing ? (
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={stopEditing}
              >
                <X className="ml-1 h-4 w-4" />
                إلغاء
              </Button>
              <Button
                size="sm"
                onClick={stopEditing}
              >
                <Check className="ml-1 h-4 w-4" />
                حفظ
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={startEditing}
              className="flex items-center text-gray-600"
            >
              <Pencil className="ml-1 h-4 w-4" />
              تعديل معلومات الشركة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

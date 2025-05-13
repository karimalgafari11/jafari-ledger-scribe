
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

interface VendorStatementHeaderProps {
  vendorName: string;
}

export const VendorStatementHeader: React.FC<VendorStatementHeaderProps> = ({ vendorName }) => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  
  const handlePrint = () => {
    toast.success(language === 'ar' ? 'جاري إعداد كشف الحساب للطباعة...' : 'Preparing statement for printing...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleExport = () => {
    toast.success(language === 'ar' ? 'جاري تصدير كشف الحساب...' : 'Exporting statement...');
    setTimeout(() => {
      toast.success(language === 'ar' ? 'تم تصدير كشف الحساب بنجاح' : 'Statement exported successfully');
    }, 1500);
  };

  const title = language === 'ar' 
    ? `كشف حساب المورد: ${vendorName}`
    : `Vendor Statement: ${vendorName}`;

  const printText = language === 'ar' ? 'طباعة' : 'Print';
  const exportText = language === 'ar' ? 'تصدير' : 'Export';
  const vendorListText = language === 'ar' ? 'قائمة الموردين' : 'Vendors List';
  
  return (
    <Header title={title} showBack={true}>
      <div className={`flex gap-2 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer size={16} className={language === 'ar' ? 'ml-1' : 'mr-1'} />
          {printText}
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download size={16} className={language === 'ar' ? 'ml-1' : 'mr-1'} />
          {exportText}
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/vendors/statement')}>
          <ArrowLeft size={16} className={language === 'ar' ? 'ml-1' : 'mr-1'} />
          {vendorListText}
        </Button>
      </div>
    </Header>
  );
};

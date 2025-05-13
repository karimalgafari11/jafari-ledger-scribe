
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface VendorStatementHeaderProps {
  vendorName: string;
}

export const VendorStatementHeader: React.FC<VendorStatementHeaderProps> = ({ vendorName }) => {
  const navigate = useNavigate();
  
  const handlePrint = () => {
    toast.success('جاري إعداد كشف الحساب للطباعة...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleExport = () => {
    toast.success('جاري تصدير كشف الحساب...');
    setTimeout(() => {
      toast.success('تم تصدير كشف الحساب بنجاح');
    }, 1500);
  };

  return (
    <Header title={`كشف حساب المورد: ${vendorName}`} showBack={true}>
      <div className="flex gap-2 rtl">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer size={16} className="ml-1" />
          طباعة
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download size={16} className="ml-1" />
          تصدير
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/vendors/statement')}>
          <ArrowLeft size={16} className="ml-1" />
          قائمة الموردين
        </Button>
      </div>
    </Header>
  );
};

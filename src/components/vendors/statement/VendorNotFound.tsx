
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const VendorNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container p-6 mx-auto">
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">لم يتم العثور على المورد</h2>
        <p className="text-gray-500 mb-6">المورد المطلوب غير موجود أو تم حذفه</p>
        <Button onClick={() => navigate('/vendors/statement')}>
          العودة إلى قائمة الموردين
        </Button>
      </div>
    </div>
  );
};

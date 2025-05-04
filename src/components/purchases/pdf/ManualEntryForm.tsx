
import React from "react";
import { Button } from "@/components/ui/button";

interface ManualEntryFormProps {
  onSwitchToAuto: () => void;
}

export const ManualEntryForm: React.FC<ManualEntryFormProps> = ({ onSwitchToAuto }) => {
  return (
    <div className="text-center p-8">
      <p>واجهة الإدخال اليدوي للبيانات</p>
      <Button 
        variant="outline"
        onClick={onSwitchToAuto}
        className="mt-4"
      >
        العودة للمعالجة الآلية
      </Button>
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface BackupHistoryHeaderProps {
  onTriggerFileUpload: () => void;
}

export const BackupHistoryHeader: React.FC<BackupHistoryHeaderProps> = ({ onTriggerFileUpload }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle>سجل النسخ الاحتياطية</CardTitle>
        <CardDescription>
          عرض وإدارة النسخ الاحتياطية المتوفرة
        </CardDescription>
      </div>
      <div>
        <Button
          onClick={onTriggerFileUpload}
          variant="outline"
          className="flex items-center gap-1"
        >
          <Upload className="h-4 w-4" />
          تحميل نسخة احتياطية
        </Button>
      </div>
    </div>
  );
};

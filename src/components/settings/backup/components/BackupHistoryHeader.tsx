
import React from "react";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, Bug } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex items-center gap-1"
        >
          <Link to="/settings/backup-test">
            <Bug className="h-4 w-4" />
            اختبار النظام
          </Link>
        </Button>
        
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

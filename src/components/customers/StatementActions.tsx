
import { Button } from "@/components/ui/button";
import { Download, Printer, Mail } from "lucide-react";

interface StatementActionsProps {
  onPrint: () => void;
  onDownload: () => void;
  onSendEmail: () => void;
  hasEmail: boolean;
}

export const StatementActions = ({ onPrint, onDownload, onSendEmail, hasEmail }: StatementActionsProps) => {
  return (
    <div className="flex items-center gap-2 rtl">
      <Button variant="outline" onClick={onPrint}>
        <Printer size={16} className="ml-2" />
        طباعة
      </Button>
      <Button variant="outline" onClick={onDownload}>
        <Download size={16} className="ml-2" />
        تنزيل PDF
      </Button>
      {hasEmail && (
        <Button variant="outline" onClick={onSendEmail}>
          <Mail size={16} className="ml-2" />
          إرسال بالبريد
        </Button>
      )}
    </div>
  );
};

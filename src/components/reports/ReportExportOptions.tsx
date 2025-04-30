
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Download, 
  FileSpreadsheet, 
  Mail, 
  Printer, 
  File, 
  ChevronDown, 
  Share2,
  Calendar
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ReportExportOptionsProps {
  reportId?: string;
  reportTitle: string;
}

export const ReportExportOptions: React.FC<ReportExportOptionsProps> = ({ 
  reportId, 
  reportTitle 
}) => {
  const [emailDialogOpen, setEmailDialogOpen] = React.useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = React.useState(false);

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    toast.success(`جاري تصدير التقرير بصيغة ${format === 'pdf' ? 'PDF' : format === 'excel' ? 'Excel' : 'CSV'}`);
  };

  const handlePrint = () => {
    toast.info("جاري إرسال التقرير للطباعة...");
    window.print();
  };

  const handleSendEmail = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("تم إرسال التقرير إلى البريد الإلكتروني بنجاح");
    setEmailDialogOpen(false);
  };

  const handleScheduleReport = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("تم جدولة التقرير بنجاح");
    setScheduleDialogOpen(false);
  };

  const handleShare = (platform: 'whatsapp' | 'telegram' | 'link') => {
    if (platform === 'link') {
      navigator.clipboard.writeText(`https://example.com/reports/${reportId}`);
      toast.success("تم نسخ رابط التقرير");
    } else {
      toast.success(`جاري مشاركة التقرير عبر ${platform === 'whatsapp' ? 'واتساب' : 'تلغرام'}`);
    }
  };

  return (
    <div className="flex gap-2 rtl">
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="ml-2 h-4 w-4" />
        طباعة
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
            <ChevronDown className="mr-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport('pdf')}>
            <File className="ml-2 h-4 w-4" />
            PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('excel')}>
            <FileSpreadsheet className="ml-2 h-4 w-4" />
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('csv')}>
            <FileSpreadsheet className="ml-2 h-4 w-4" />
            CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Mail className="ml-2 h-4 w-4" />
            إرسال بالبريد
          </Button>
        </DialogTrigger>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>إرسال التقرير عبر البريد الإلكتروني</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSendEmail} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="emailTo">إرسال إلى</Label>
              <Input
                id="emailTo"
                type="email"
                placeholder="example@domain.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="emailSubject">الموضوع</Label>
              <Input
                id="emailSubject"
                defaultValue={`تقرير: ${reportTitle}`}
              />
            </div>
            <div>
              <Label htmlFor="emailBody">الرسالة</Label>
              <Input
                id="emailBody"
                defaultValue="مرفق التقرير المطلوب."
              />
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox id="pdfFormat" defaultChecked />
              <Label htmlFor="pdfFormat">إرفاق التقرير بصيغة PDF</Label>
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit">إرسال</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Calendar className="ml-2 h-4 w-4" />
            جدولة التقرير
          </Button>
        </DialogTrigger>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>جدولة إرسال التقرير</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleScheduleReport} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="scheduleFrequency">التكرار</Label>
              <select
                id="scheduleFrequency"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="daily">يومياً</option>
                <option value="weekly">أسبوعياً</option>
                <option value="monthly">شهرياً</option>
              </select>
            </div>
            <div>
              <Label htmlFor="scheduleTime">وقت الإرسال</Label>
              <Input
                id="scheduleTime"
                type="time"
                defaultValue="08:00"
              />
            </div>
            <div>
              <Label htmlFor="scheduleEmail">البريد الإلكتروني</Label>
              <Input
                id="scheduleEmail"
                type="email"
                placeholder="example@domain.com"
                required
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit">حفظ الجدولة</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Share2 className="ml-2 h-4 w-4" />
            مشاركة
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
            واتساب
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('telegram')}>
            تلغرام
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('link')}>
            نسخ الرابط
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

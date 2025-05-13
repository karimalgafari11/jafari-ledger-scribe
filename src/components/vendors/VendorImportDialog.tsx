
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface VendorImportDialogProps {
  open: boolean;
  onClose: () => void;
}

export const VendorImportDialog: React.FC<VendorImportDialogProps> = ({
  open,
  onClose
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast.info(`تم اختيار الملف: ${files[0].name}`);
      // في التطبيق الحقيقي، هنا ستقوم بمعالجة ملف الاستيراد
    }
  };

  const handleImport = () => {
    toast.success("تم استيراد بيانات الموردين بنجاح");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>استيراد بيانات الموردين</DialogTitle>
          <DialogDescription>
            قم بتحميل ملف بصيغة CSV أو Excel لاستيراد بيانات الموردين
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file-upload" className="col-span-4">
              اختر الملف
            </Label>
            <div className="col-span-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  اسحب الملف هنا أو انقر للتصفح
                </p>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  تصفح الملفات
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold">تنسيق الملف المطلوب:</p>
            <ul className="list-disc list-inside mt-1">
              <li>اسم المورد (إجباري)</li>
              <li>الشخص المسؤول</li>
              <li>رقم الهاتف</li>
              <li>البريد الإلكتروني</li>
              <li>العنوان</li>
              <li>الرقم الضريبي</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleImport}>استيراد</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

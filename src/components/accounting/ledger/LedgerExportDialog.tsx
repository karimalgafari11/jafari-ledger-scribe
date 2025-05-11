
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Check, FileText } from "lucide-react";
import { Transaction } from "@/types/transactions";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LedgerExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Transaction[];
  accountName?: string;
}

export const LedgerExportDialog: React.FC<LedgerExportDialogProps> = ({
  open,
  onOpenChange,
  data,
  accountName
}) => {
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf' | 'csv'>('excel');
  const [exportOptions, setExportOptions] = useState({
    includeHeaders: true,
    includeMetadata: true,
    includeBalances: true
  });

  const handleExport = () => {
    // In a real app, this would trigger an actual export
    // For now, we'll just close the dialog after a delay
    setTimeout(() => {
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تصدير البيانات</DialogTitle>
          <DialogDescription>
            تصدير {data.length} عملية {accountName ? `لحساب ${accountName}` : ''}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">صيغة التصدير</h4>
            <RadioGroup 
              value={exportFormat} 
              onValueChange={(value) => setExportFormat(value as 'excel' | 'pdf' | 'csv')}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center gap-1">
                  <FileSpreadsheet className="h-4 w-4" />
                  Excel (.xlsx)
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  PDF (.pdf)
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV (.csv)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">خيارات التصدير</h4>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeHeaders"
                  checked={exportOptions.includeHeaders}
                  onChange={(e) => 
                    setExportOptions(prev => ({ ...prev, includeHeaders: e.target.checked }))
                  }
                />
                <Label htmlFor="includeHeaders">تضمين الترويسات</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeMetadata"
                  checked={exportOptions.includeMetadata}
                  onChange={(e) => 
                    setExportOptions(prev => ({ ...prev, includeMetadata: e.target.checked }))
                  }
                />
                <Label htmlFor="includeMetadata">تضمين بيانات وصفية</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeBalances"
                  checked={exportOptions.includeBalances}
                  onChange={(e) => 
                    setExportOptions(prev => ({ ...prev, includeBalances: e.target.checked }))
                  }
                />
                <Label htmlFor="includeBalances">تضمين الأرصدة</Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" onClick={handleExport}>
            تصدير البيانات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

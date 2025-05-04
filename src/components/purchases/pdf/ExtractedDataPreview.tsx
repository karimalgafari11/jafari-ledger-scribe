
import React from "react";
import { InfoIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseItem } from "@/types/purchases";

interface ExtractedDataPreviewProps {
  errorMessage: string;
  extractedData: any;
  selectedItems: Record<string, boolean>;
  pdfTextContent: string;
  onToggleItemSelection: (index: string) => void;
  onToggleSelectAll: () => void;
  onApplyData: () => void;
  onBack: () => void;
}

export const ExtractedDataPreview: React.FC<ExtractedDataPreviewProps> = ({
  errorMessage,
  extractedData,
  selectedItems,
  pdfTextContent,
  onToggleItemSelection,
  onToggleSelectAll,
  onApplyData,
  onBack,
}) => {
  return (
    <div className="space-y-4">
      {errorMessage && (
        <Alert variant="destructive">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      {extractedData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-bold text-green-800 mb-2">تم استخراج البيانات</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-green-700"><strong>رقم الفاتورة:</strong> {extractedData.invoiceNumber || "غير معروف"}</p>
              <p className="text-sm text-green-700"><strong>التاريخ:</strong> {extractedData.date}</p>
            </div>
            <div>
              <p className="text-sm text-green-700"><strong>المورد:</strong> {extractedData.vendorName || "غير محدد"}</p>
              <p className="text-sm text-green-700"><strong>إجمالي المبلغ:</strong> {extractedData.totalAmount.toFixed(2)} ر.س</p>
            </div>
          </div>
        </div>
      )}
      
      {extractedData && extractedData.items && extractedData.items.length > 0 && (
        <div className="border p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">الأصناف المستخرجة ({extractedData.items.length} صنف):</h3>
            <div className="flex items-center">
              <Checkbox 
                id="select-all" 
                checked={extractedData.items.every((_: any, i: number) => selectedItems[i.toString()])}
                onCheckedChange={onToggleSelectAll} 
              />
              <label htmlFor="select-all" className="mr-2 text-sm font-medium">
                تحديد الكل
              </label>
            </div>
          </div>
          <ScrollArea className="h-[300px] border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">تحديد</TableHead>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead className="w-28 text-center">رمز الصنف</TableHead>
                  <TableHead className="text-center">اسم الصنف</TableHead>
                  <TableHead className="w-16 text-center">الكمية</TableHead>
                  <TableHead className="w-28 text-center">السعر</TableHead>
                  <TableHead className="w-28 text-center">الإجمالي</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {extractedData.items.map((item: PurchaseItem, i: number) => (
                  <TableRow key={i} className={!selectedItems[i.toString()] ? "bg-gray-50 opacity-60" : ""}>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={!!selectedItems[i.toString()]} 
                        onCheckedChange={() => onToggleItemSelection(i.toString())}
                      />
                    </TableCell>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell className="text-center">{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-center">{item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center font-semibold">{item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
      
      {pdfTextContent && (
        <div className="border p-4 rounded-md">
          <h3 className="font-bold mb-2">النص المستخرج من PDF:</h3>
          <div className="bg-gray-50 p-4 rounded-md text-xs font-mono whitespace-pre-wrap h-[150px] overflow-auto dirLTR">
            {pdfTextContent}
          </div>
        </div>
      )}
      
      <div className="flex justify-between gap-2">
        <Button 
          variant="outline"
          onClick={onBack}
        >
          عودة للتحميل
        </Button>
        <Button 
          onClick={onApplyData}
          className="bg-green-500 hover:bg-green-600"
          disabled={!extractedData || extractedData.items?.length === 0 || Object.values(selectedItems).every(v => !v)}
        >
          <Check className="mr-2 h-4 w-4" />
          تطبيق البيانات المحددة
        </Button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .dirLTR {
            direction: ltr;
            text-align: left;
          }
        `
      }} />
    </div>
  );
};

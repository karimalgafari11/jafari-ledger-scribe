
import React, { useState } from 'react';
import { Check, Edit2, AlertTriangle, Save, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InvoiceAnalysisResult } from '@/hooks/ai/usePDFInvoiceAnalysis';
import { useJournalEntryForm } from '@/hooks/useJournalEntryForm';
import { useToast } from '@/hooks/use-toast';

interface InvoiceAnalysisReviewProps {
  analysisResult: InvoiceAnalysisResult;
  onSave: (data: InvoiceAnalysisResult) => Promise<boolean>;
  onReset: () => void;
  onEdit?: (data: InvoiceAnalysisResult) => void;
}

export const InvoiceAnalysisReview: React.FC<InvoiceAnalysisReviewProps> = ({
  analysisResult,
  onSave,
  onReset,
  onEdit
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const success = await onSave(analysisResult);
      if (success) {
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم حفظ بيانات الفاتورة والقيد المحاسبي في النظام"
        });
      } else {
        throw new Error("فشل حفظ البيانات");
      }
    } catch (err) {
      toast({
        title: "فشل الحفظ",
        description: err instanceof Error ? err.message : "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const totalDebit = analysisResult.suggestedJournalEntry.debit.reduce((sum, item) => sum + item.amount, 0);
  const totalCredit = analysisResult.suggestedJournalEntry.credit.reduce((sum, item) => sum + item.amount, 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>مراجعة تحليل الفاتورة</CardTitle>
          <CardDescription>تم استخراج البيانات التالية من الفاتورة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">معلومات الفاتورة</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-sm">نوع المستند:</span>
                  <span className="font-medium">{analysisResult.documentType}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-sm">رقم الفاتورة:</span>
                  <span className="font-medium">{analysisResult.invoiceNumber}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-sm">التاريخ:</span>
                  <span className="font-medium">{analysisResult.date}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-sm">المورد/العميل:</span>
                  <span className="font-medium">{analysisResult.vendorName}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">ملخص المبالغ</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-sm">المبلغ الفرعي:</span>
                  <span className="font-medium">{analysisResult.subtotal.toFixed(2)} ريال</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-sm">الضريبة:</span>
                  <span className="font-medium">{analysisResult.tax.toFixed(2)} ريال</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-sm font-medium">الإجمالي:</span>
                  <span className="font-bold">{analysisResult.total.toFixed(2)} ريال</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">بنود الفاتورة</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الوصف</TableHead>
                  <TableHead className="text-center">الكمية</TableHead>
                  <TableHead className="text-center">السعر</TableHead>
                  <TableHead className="text-center">المجموع</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysisResult.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-center">{item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">القيد المحاسبي المقترح</h3>
              {!isBalanced && (
                <span className="text-xs flex items-center text-amber-600">
                  <AlertTriangle className="w-3 h-3 mr-1" /> القيد غير متوازن
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium mb-1">مدين</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الحساب</TableHead>
                      <TableHead className="text-left">المبلغ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysisResult.suggestedJournalEntry.debit.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell className="text-left">{entry.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold">الإجمالي</TableCell>
                      <TableCell className="text-left font-bold">{totalDebit.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h4 className="text-xs font-medium mb-1">دائن</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الحساب</TableHead>
                      <TableHead className="text-left">المبلغ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysisResult.suggestedJournalEntry.credit.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell className="text-left">{entry.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold">الإجمالي</TableCell>
                      <TableCell className="text-left font-bold">{totalCredit.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" /> إعادة التحليل
          </Button>
          <div className="space-x-2 flex">
            {onEdit && (
              <Button variant="outline" onClick={() => onEdit(analysisResult)} className="ml-2">
                <Edit2 className="mr-2 h-4 w-4" /> تعديل
              </Button>
            )}
            <Button onClick={handleSave} disabled={isSaving || !isBalanced}>
              {isSaving ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              حفظ القيد
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

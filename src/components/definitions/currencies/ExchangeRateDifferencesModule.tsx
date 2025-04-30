
import React, { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, FileCheck, MoreHorizontal, PieChart, RefreshCw } from "lucide-react";
import { useExchangeRateDifferences } from "@/hooks/useExchangeRateDifferences";
import { ExchangeRateDifference } from "@/types/exchangeRateTypes";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { toast } from "sonner";
import { JournalEntry } from "@/types/journal";

export const ExchangeRateDifferencesModule = () => {
  const { 
    differences, 
    isLoading, 
    processDifference,
    createJournalEntry,
    calculateDifferences
  } = useExchangeRateDifferences();
  
  const { 
    addEntry,
  } = useJournalEntries();
  
  const [selectedDifference, setSelectedDifference] = useState<ExchangeRateDifference | null>(null);
  const [isGeneratingJournalEntry, setIsGeneratingJournalEntry] = useState(false);
  
  const handleProcessDifference = async (difference: ExchangeRateDifference) => {
    setSelectedDifference(difference);
    setIsGeneratingJournalEntry(true);
    
    try {
      const journalEntryData = await createJournalEntry(difference);
      
      // Add the journal entry and get the complete entry with ID
      const completeJournalEntry = addEntry(journalEntryData);
      
      // Mark difference as processed with the journal entry ID
      processDifference(difference.id, completeJournalEntry.id);
      
      toast.success("تم إنشاء قيد محاسبي بفرق سعر الصرف بنجاح");
    } catch (error) {
      console.error("Error creating journal entry:", error);
      toast.error("حدث خطأ أثناء إنشاء القيد المحاسبي");
    } finally {
      setIsGeneratingJournalEntry(false);
      setSelectedDifference(null);
    }
  };
  
  const handleGenerateAll = async () => {
    // Filter only unprocessed differences
    const unprocessedDifferences = differences.filter(diff => !diff.processed);
    
    if (unprocessedDifferences.length === 0) {
      toast.info("لا توجد فروقات أسعار صرف غير معالجة");
      return;
    }
    
    setIsGeneratingJournalEntry(true);
    
    try {
      let successCount = 0;
      
      // Process each difference
      for (const difference of unprocessedDifferences) {
        try {
          const journalEntryData = await createJournalEntry(difference);
          const completeJournalEntry = addEntry(journalEntryData);
          processDifference(difference.id, completeJournalEntry.id);
          successCount++;
        } catch (error) {
          console.error(`Error processing difference ${difference.id}:`, error);
        }
      }
      
      toast.success(`تم إنشاء ${successCount} قيد محاسبي بنجاح`);
    } catch (error) {
      console.error("Error batch processing differences:", error);
      toast.error("حدث خطأ أثناء معالجة فروق أسعار الصرف");
    } finally {
      setIsGeneratingJournalEntry(false);
    }
  };
  
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>فروق أسعار الصرف</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => calculateDifferences()}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            حساب الفروق
          </Button>
          <Button
            onClick={handleGenerateAll}
            disabled={isGeneratingJournalEntry}
            className="flex items-center gap-1"
          >
            <FileCheck className="h-4 w-4" />
            إنشاء قيود لجميع الفروق
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>من العملة</TableHead>
                <TableHead>إلى العملة</TableHead>
                <TableHead>السعر القديم</TableHead>
                <TableHead>السعر الجديد</TableHead>
                <TableHead>مبلغ الفرق</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-center">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    جاري التحميل...
                  </TableCell>
                </TableRow>
              ) : differences.length > 0 ? (
                differences.map((difference) => (
                  <TableRow key={difference.id}>
                    <TableCell>{format(new Date(difference.date), "yyyy-MM-dd")}</TableCell>
                    <TableCell>{difference.sourceCurrencyId}</TableCell>
                    <TableCell>{difference.targetCurrencyId}</TableCell>
                    <TableCell>{difference.originalRate.toFixed(4)}</TableCell>
                    <TableCell>{difference.newRate.toFixed(4)}</TableCell>
                    <TableCell 
                      className={
                        difference.differenceAmount > 0 
                          ? "text-green-600 font-semibold" 
                          : "text-red-600 font-semibold"
                      }
                    >
                      {difference.differenceAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          difference.processed 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {difference.processed ? "تم المعالجة" : "معلق"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {!difference.processed ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleProcessDifference(difference)}
                            disabled={isGeneratingJournalEntry}
                          >
                            <FileCheck className="h-4 w-4" />
                            <span className="mr-1">إنشاء قيد</span>
                          </Button>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <FileCheck className="mr-2 h-4 w-4" />
                                <span>عرض القيد</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    لا توجد فروقات أسعار صرف مسجلة
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

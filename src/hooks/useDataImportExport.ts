
import { useState } from "react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';

export interface DataImportExportOptions {
  // الدالة التي تحول البيانات الواردة إلى الشكل المطلوب
  transformImportData?: (data: any) => Promise<any> | any;
  
  // الدالة التي تحول البيانات المطلوب تصديرها إلى الشكل المناسب
  transformExportData?: (data: any) => Promise<any> | any;
  
  // الدالة التي تتحقق من صحة البيانات المستوردة
  validateImportData?: (data: any) => Promise<boolean | string> | boolean | string;
  
  // خيارات إضافية لتصدير البيانات
  exportOptions?: {
    fileName?: string;
    sheetName?: string;
    includeHeaders?: boolean;
  };
  
  // دالة يتم استدعاؤها بعد استيراد البيانات بنجاح
  onImportSuccess?: (data: any) => void;
  
  // دالة يتم استدعاؤها بعد تصدير البيانات بنجاح
  onExportSuccess?: () => void;
}

// نوع البيانات التي يتم استيرادها/تصديرها
export type ImportExportData = Array<Record<string, any>>;

export function useDataImportExport(
  data: ImportExportData = [],
  options: DataImportExportOptions = {}
) {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { 
    transformImportData = (data) => data, 
    transformExportData = (data) => data, 
    validateImportData = () => true,
    exportOptions = {},
    onImportSuccess,
    onExportSuccess
  } = options;
  
  const handleImport = async (fileContent: string | ArrayBuffer, fileType: string) => {
    setIsImporting(true);
    
    try {
      // معالجة البيانات المستوردة حسب نوع الملف
      let importedData: any[] = [];
      
      if (fileType === 'csv') {
        // التعامل مع fileContent كنص فقط إذا كان نوع الملف CSV
        if (typeof fileContent !== 'string') {
          const decoder = new TextDecoder('utf-8');
          importedData = parseCSV(decoder.decode(fileContent));
        } else {
          importedData = parseCSV(fileContent);
        }
      } else if (fileType === 'xlsx' || fileType === 'xls') {
        // التحقق من أن fileContent هو ArrayBuffer
        if (typeof fileContent === 'string') {
          throw new Error('Cannot parse Excel file from string content');
        }
        importedData = parseExcel(fileContent);
      } else if (fileType === 'json') {
        // التعامل مع fileContent كنص فقط إذا كان نوع الملف JSON
        if (typeof fileContent !== 'string') {
          const decoder = new TextDecoder('utf-8');
          importedData = JSON.parse(decoder.decode(fileContent));
        } else {
          importedData = JSON.parse(fileContent);
        }
      } else {
        throw new Error(`نوع الملف غير مدعوم: ${fileType}`);
      }
      
      // تحويل البيانات باستخدام الدالة المقدمة
      const transformedData = await transformImportData(importedData);
      
      // التحقق من صحة البيانات
      const validationResult = await validateImportData(transformedData);
      if (validationResult !== true) {
        throw new Error(typeof validationResult === 'string' ? 
          validationResult : 'البيانات المستوردة غير صحيحة');
      }
      
      // استدعاء دالة النجاح إذا تم تقديمها
      onImportSuccess?.(transformedData);
      
      return transformedData;
    } catch (error) {
      console.error("Error importing data:", error);
      throw error;
    } finally {
      setIsImporting(false);
    }
  };
  
  const handleExport = async (exportType: string): Promise<Blob | void> => {
    setIsExporting(true);
    
    try {
      // تحويل البيانات للتصدير
      const exportData = await transformExportData(data);
      
      // وضع الإعدادات الافتراضية
      const { 
        fileName = 'export', 
        sheetName = 'Sheet1', 
        includeHeaders = true 
      } = exportOptions;
      
      let result: Blob | null = null;
      
      // تصدير البيانات حسب النوع المطلوب
      switch (exportType) {
        case 'excel':
          result = exportToExcel(exportData, sheetName, includeHeaders);
          break;
        case 'csv':
          result = exportToCSV(exportData, includeHeaders);
          break;
        case 'pdf':
          result = await exportToPDF(exportData, includeHeaders);
          break;
        case 'json':
          result = exportToJSON(exportData);
          break;
        default:
          throw new Error(`نوع التصدير غير مدعوم: ${exportType}`);
      }
      
      // استدعاء دالة النجاح
      onExportSuccess?.();
      
      return result;
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error(`فشل تصدير البيانات: ${(error as Error).message}`);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };
  
  // دالة مساعدة لتحليل ملف CSV
  const parseCSV = (csvText: string) => {
    // تقسيم النص إلى أسطر
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || '';
        return obj;
      }, {} as Record<string, any>);
    });
  };
  
  // دالة مساعدة لتحليل ملف Excel
  const parseExcel = (buffer: ArrayBuffer) => {
    const workbook = XLSX.read(buffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    return XLSX.utils.sheet_to_json(worksheet, { raw: false });
  };
  
  // دالة مساعدة لتصدير البيانات إلى Excel
  const exportToExcel = (data: any[], sheetName: string, includeHeaders: boolean): Blob => {
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: !includeHeaders });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  };
  
  // دالة مساعدة لتصدير البيانات إلى CSV
  const exportToCSV = (data: any[], includeHeaders: boolean): Blob => {
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: !includeHeaders });
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    return new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
  };
  
  // دالة مساعدة لتصدير البيانات إلى PDF
  const exportToPDF = async (data: any[], includeHeaders: boolean): Promise<Blob> => {
    // في حالة تطبيق حقيقي، يمكن استخدام مكتبة مثل jspdf أو pdfmake
    // هنا نقوم بمحاكاة عملية إنشاء PDF عن طريق إنشاء HTML وتحويله
    
    // هذا مجرد تنفيذ وهمي، في التطبيق الحقيقي سيتم استخدام مكتبة PDF مناسبة
    await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة للمعالجة
    
    const jsonStr = JSON.stringify(data, null, 2);
    return new Blob([jsonStr], { type: 'application/pdf' });
  };
  
  // دالة مساعدة لتصدير البيانات إلى JSON
  const exportToJSON = (data: any[]): Blob => {
    const jsonStr = JSON.stringify(data, null, 2);
    return new Blob([jsonStr], { type: 'application/json' });
  };
  
  // واجهة للمكون
  const openImportExportDialog = () => setDialogOpen(true);
  const closeImportExportDialog = () => setDialogOpen(false);
  
  return {
    isImporting,
    isExporting,
    dialogOpen,
    handleImport,
    handleExport,
    openImportExportDialog,
    closeImportExportDialog
  };
}

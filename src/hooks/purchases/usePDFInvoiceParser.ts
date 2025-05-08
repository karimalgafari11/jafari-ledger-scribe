
import { useCallback, useState } from 'react';
import { PurchaseItem } from '@/types/purchases';
import { toast } from 'sonner';

interface ParsedInvoice {
  invoiceNumber?: string;
  date?: Date;
  vendor?: string;
  vendorTaxId?: string;
  subtotal?: number;
  tax?: number;
  totalAmount?: number;
  items: PurchaseItem[];
  paymentTerms?: string;
  dueDate?: Date;
  currency?: string;
}

interface ParserConfig {
  vendorNameRegex?: RegExp;
  vendorTaxIdRegex?: RegExp;
  dateRegex?: RegExp;
  invoiceNumberRegex?: RegExp;
  itemsTableStartRegex?: RegExp;
  itemsTableEndRegex?: RegExp;
  subtotalRegex?: RegExp;
  taxRegex?: RegExp;
  totalRegex?: RegExp;
  vendorMap?: Record<string, any>;
  fallbackExtraction?: boolean;
  customParser?: (text: string) => Partial<ParsedInvoice>;
}

export const usePDFInvoiceParser = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [rawText, setRawText] = useState("");
  const [parsedData, setParsedData] = useState<ParsedInvoice | null>(null);
  
  // القواعد الافتراضية للتحليل
  const defaultConfig: ParserConfig = {
    vendorNameRegex: /المورد:|الشركة:|بائع:|Vendor:|Supplier:|Company:/i,
    vendorTaxIdRegex: /الرقم الضريبي:|VAT No:|Tax ID:|TIN:/i,
    dateRegex: /تاريخ الفاتورة:|تاريخ:|Date:|Invoice Date:/i,
    invoiceNumberRegex: /رقم الفاتورة:|فاتورة رقم:|Invoice No:|Invoice Number:/i,
    itemsTableStartRegex: /المنتجات|الصنف|البيان|الوصف|المواد|Items|Description|Products/i,
    itemsTableEndRegex: /الإجمالي|المجموع|Total|Subtotal/i,
    subtotalRegex: /المجموع الفرعي|إجمالي المبلغ|Subtotal|Net Amount:/i,
    taxRegex: /ضريبة القيمة المضافة|الضريبة|VAT|Tax|VAT \d+%/i,
    totalRegex: /الإجمالي|المجموع الكلي|Total Amount|Grand Total/i,
    fallbackExtraction: true,
    vendorMap: {
      // يمكن إضافة خريطة للموردين المعروفين وصيغ فواتيرهم المعروفة
      "شركة الرياض للتجارة": {
        pattern: /رياض/i,
        format: "standardArabic"
      },
      "Al-Othaim Markets": {
        pattern: /العثيم/i,
        format: "othaim"
      }
    }
  };

  // استخراج النص من PDF
  const extractTextFromPDF = useCallback(async (file: File): Promise<string> => {
    try {
      setIsProcessing(true);
      setProgress(10);
      
      // هنا يمكننا استخدام مكتبة pdf.js لاستخراج النص
      // لكن لتبسيط المثال سنفترض أن النص تم استخراجه
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة المعالجة
      
      setProgress(40);
      
      // في الواقع، سنستخدم شيفرة مثل:
      // const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      // let text = '';
      // for(let i = 1; i <= pdf.numPages; i++) {
      //   const page = await pdf.getPage(i);
      //   const content = await page.getTextContent();
      //   text += content.items.map(item => item.str).join(' ');
      // }
      
      // نستخدم بيانات وهمية للعرض
      const mockText = `
        شركة الرياض للتجارة
        الرقم الضريبي: 123456789
        
        فاتورة رقم: INV-2023-001
        تاريخ الفاتورة: 15/04/2023
        
        العميل: شركة الجعفري للمحاسبة
        
        المنتجات:
        ---------------------------
        1 | كمبيوتر محمول HP | 2 | 3500 | 7000
        2 | طابعة ليزر Canon | 1 | 1200 | 1200
        3 | حبر طابعة | 5 | 150 | 750
        ---------------------------
        
        المجموع الفرعي: 8950
        ضريبة القيمة المضافة (15%): 1342.5
        الإجمالي: 10292.5
        
        شروط الدفع: 30 يوم
        تاريخ الاستحقاق: 15/05/2023
      `;
      
      setRawText(mockText);
      setProgress(70);
      
      return mockText;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      setErrorMessage("فشل في استخراج النص من ملف PDF");
      throw error;
    }
  }, []);
  
  // تحليل النص واستخراج البيانات منه
  const parseInvoiceText = useCallback((text: string, config: ParserConfig = defaultConfig): ParsedInvoice => {
    try {
      setProgress(80);
      
      // البحث عن المورد
      let vendorName: string | undefined;
      const vendorMatch = text.match(new RegExp(`${config.vendorNameRegex?.source}\\s*([^\\n]+)`, 'i'));
      if (vendorMatch && vendorMatch[1]) {
        vendorName = vendorMatch[1].trim();
      } else {
        // محاولة البحث عن اسم المورد من القائمة المعروفة
        for (const [vendor, info] of Object.entries(config.vendorMap || {})) {
          if ((info as any).pattern && text.match((info as any).pattern)) {
            vendorName = vendor;
            break;
          }
        }
      }
      
      // البحث عن الرقم الضريبي
      let vendorTaxId: string | undefined;
      const taxIdMatch = text.match(new RegExp(`${config.vendorTaxIdRegex?.source}\\s*([^\\n]+)`, 'i'));
      if (taxIdMatch && taxIdMatch[1]) {
        vendorTaxId = taxIdMatch[1].trim().replace(/[^\d]/g, '');
      }
      
      // البحث عن رقم الفاتورة
      let invoiceNumber: string | undefined;
      const invoiceNumberMatch = text.match(new RegExp(`${config.invoiceNumberRegex?.source}\\s*([^\\n]+)`, 'i'));
      if (invoiceNumberMatch && invoiceNumberMatch[1]) {
        invoiceNumber = invoiceNumberMatch[1].trim();
      }
      
      // البحث عن التاريخ
      let date: Date | undefined;
      const dateMatch = text.match(new RegExp(`${config.dateRegex?.source}\\s*([^\\n]+)`, 'i'));
      if (dateMatch && dateMatch[1]) {
        const dateStr = dateMatch[1].trim();
        
        // محاولة تحليل التاريخ بعدة صيغ
        try {
          // صيغة عربية: dd/mm/yyyy
          const arabicFormatMatch = dateStr.match(/(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})/);
          if (arabicFormatMatch) {
            date = new Date(
              parseInt(arabicFormatMatch[3]), 
              parseInt(arabicFormatMatch[2]) - 1, 
              parseInt(arabicFormatMatch[1])
            );
          } else {
            // صيغة انجليزية: yyyy-mm-dd
            const englishFormatMatch = dateStr.match(/(\d{4})[\/.-](\d{1,2})[\/.-](\d{1,2})/);
            if (englishFormatMatch) {
              date = new Date(
                parseInt(englishFormatMatch[1]), 
                parseInt(englishFormatMatch[2]) - 1, 
                parseInt(englishFormatMatch[3])
              );
            } else {
              // محاولة استخدام Date.parse
              const parsed = Date.parse(dateStr);
              if (!isNaN(parsed)) {
                date = new Date(parsed);
              }
            }
          }
        } catch (e) {
          console.warn("Failed to parse invoice date:", dateStr);
        }
      }
      
      // استخراج العناصر من الجدول
      let items: PurchaseItem[] = [];
      
      // استخراج جدول العناصر باستخدام التعبيرات المنتظمة
      const tableStart = text.search(config.itemsTableStartRegex || /المنتجات|الصنف|Items|Description/i);
      const tableEnd = text.search(config.itemsTableEndRegex || /الإجمالي|المجموع|Total|Subtotal/i);
      
      if (tableStart > -1 && tableEnd > tableStart) {
        const tableText = text.substring(tableStart, tableEnd);
        
        // محاولة استخراج الأسطر من الجدول
        const lines = tableText.split('\n').filter(line => 
          line.trim() && 
          line.includes('|') && 
          !line.includes('--')
        );
        
        items = lines.map((line, index) => {
          const parts = line.split('|').map(part => part.trim());
          // نفترض أن الجدول له الترتيب: رقم | وصف | كمية | سعر | إجمالي
          const [, description, quantityStr, priceStr, totalStr] = parts;
          
          const quantity = parseFloat(quantityStr || '0');
          const price = parseFloat(priceStr?.replace(/[^\d.-]/g, '') || '0');
          const total = parseFloat(totalStr?.replace(/[^\d.-]/g, '') || '0');
          
          return {
            id: `item-${index}`,
            productId: `prod-${index}`,
            productName: description || `Item ${index + 1}`,
            quantity: isNaN(quantity) ? 1 : quantity,
            price: isNaN(price) ? 0 : price,
            total: isNaN(total) ? (isNaN(price) ? 0 : price * (isNaN(quantity) ? 1 : quantity)) : total,
            unit: 'قطعة',
          };
        });
      }
      
      // استخراج المجموع الفرعي
      let subtotal: number | undefined;
      const subtotalMatch = text.match(new RegExp(`${config.subtotalRegex?.source}\\s*[:\\s]\\s*([\\d,.]+)`, 'i'));
      if (subtotalMatch && subtotalMatch[1]) {
        subtotal = parseFloat(subtotalMatch[1].replace(/[^\d.-]/g, ''));
      }
      
      // استخراج الضريبة
      let tax: number | undefined;
      const taxMatch = text.match(new RegExp(`${config.taxRegex?.source}(?:\\s*\\([^)]*\\))?\\s*[:\\s]\\s*([\\d,.]+)`, 'i'));
      if (taxMatch && taxMatch[1]) {
        tax = parseFloat(taxMatch[1].replace(/[^\d.-]/g, ''));
      }
      
      // استخراج الإجمالي
      let totalAmount: number | undefined;
      const totalMatch = text.match(new RegExp(`${config.totalRegex?.source}\\s*[:\\s]\\s*([\\d,.]+)`, 'i'));
      if (totalMatch && totalMatch[1]) {
        totalAmount = parseFloat(totalMatch[1].replace(/[^\d.-]/g, ''));
      }
      
      // إذا لم يتم العثور على الإجمالي، نحسبه من المجموع الفرعي والضريبة
      if (totalAmount === undefined && subtotal !== undefined) {
        totalAmount = subtotal + (tax || 0);
      }
      
      // إذا لم يتم العثور على المجموع الفرعي، نحسبه من مجموع العناصر
      if (subtotal === undefined && items.length > 0) {
        subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
      }
      
      const result: ParsedInvoice = {
        invoiceNumber,
        date,
        vendor: vendorName,
        vendorTaxId,
        subtotal,
        tax,
        totalAmount,
        items,
      };
      
      setProgress(100);
      setParsedData(result);
      
      return result;
    } catch (error) {
      console.error("Error parsing invoice text:", error);
      setErrorMessage("فشل في تحليل بيانات الفاتورة");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);
  
  // تحليل الفاتورة من ملف PDF
  const parseInvoiceFromPDF = useCallback(async (file: File, config?: ParserConfig): Promise<ParsedInvoice> => {
    try {
      setIsProcessing(true);
      setErrorMessage("");
      setParsedData(null);
      
      const text = await extractTextFromPDF(file);
      const result = parseInvoiceText(text, config || defaultConfig);
      
      toast.success("تم تحليل الفاتورة بنجاح");
      return result;
    } catch (error) {
      console.error("Error parsing invoice from PDF:", error);
      toast.error("فشل في تحليل الفاتورة من ملف PDF");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [extractTextFromPDF, parseInvoiceText]);
  
  // معالجة الفاتورة واستخراج بيانات الحقول من المورد المعروف
  const applyVendorTemplate = useCallback((vendorName: string, text: string): Partial<ParsedInvoice> => {
    // تطبيق قالب خاص بالمورد إن وجد
    const vendorMap = defaultConfig.vendorMap || {};
    const vendorInfo = Object.entries(vendorMap).find(([name]) => 
      name.toLowerCase() === vendorName.toLowerCase()
    );
    
    if (vendorInfo) {
      const [_, info] = vendorInfo;
      
      // تطبيق معالجة خاصة حسب نوع التنسيق
      switch ((info as any).format) {
        case "standardArabic":
          // معالجة خاصة للفواتير العربية القياسية
          return {
            // إعدادات خاصة بتنسيق المورد
          };
        case "othaim":
          // معالجة خاصة لفواتير العثيم
          return {
            // إعدادات خاصة بتنسيق المورد
          };
        default:
          return {};
      }
    }
    
    return {};
  }, []);
  
  return {
    isProcessing,
    progress,
    errorMessage,
    rawText,
    parsedData,
    parseInvoiceFromPDF,
    parseInvoiceText,
    applyVendorTemplate,
    setErrorMessage
  };
};

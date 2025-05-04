
import { useState } from "react";
import { toast } from "sonner";
import { PurchaseItem } from "@/types/purchases";

export const usePDFProcessing = () => {
  const [pdfTextContent, setPdfTextContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Read file as ArrayBuffer
  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Extract text from PDF file
  const extractTextFromPDF = async (buffer: ArrayBuffer): Promise<string> => {
    // In a real implementation, this would use a PDF extraction library
    // This is just a simulation for demo purposes
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (buffer.byteLength < 100) {
      throw new Error("الملف فارغ أو تالف");
    }
    
    // Sample text for demonstration
    const sampleText = `فاتورة مشتريات
رقم الفاتورة: 2023-756
تاريخ: 15/10/2023
المورد: شركة الأمل للتوريدات التجارية
رقم الضريبي: 310159632400003

الأصناف:
1. جهاز كمبيوتر مكتبي HP ProDesk | الكمية: 2 | السعر: 3500 ريال
2. طابعة ليزر Canon LBP223DW | الكمية: 1 | السعر: 1250 ريال
3. شاشة سامسونج 24 بوصة | الكمية: 3 | السعر: 850 ريال
4. لوحة مفاتيح وماوس لوجيتك | الكمية: 5 | السعر: 120 ريال

الإجمالي: 10,750 ريال
الضريبة (15%): 1,612.50 ريال
المجموع النهائي: 12,362.50 ريال

ملاحظات: تم الاستلام بواسطة المخزن المركزي
طريقة الدفع: تحويل بنكي`;
    
    return sampleText;
  };

  // Parse invoice data from text
  const parseInvoiceDataFromText = (text: string) => {
    console.log("تحليل نص PDF:", text);
    
    if (!text || text.trim() === "") {
      throw new Error("النص المستخرج فارغ");
    }
    
    try {
      // Extract invoice number
      const invoiceNumberMatch = text.match(/رقم الفاتورة:?\s*([A-Za-z0-9-]+)/);
      const invoiceNumber = invoiceNumberMatch ? invoiceNumberMatch[1].trim() : "";
      
      // Extract date - supports multiple formats
      let dateMatch = text.match(/تاريخ:?\s*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/);
      if (!dateMatch) {
        dateMatch = text.match(/تاريخ:?\s*(\d{2,4}[/-]\d{1,2}[/-]\d{1,2})/);
      }
      const dateStr = dateMatch ? dateMatch[1].trim() : "";
      
      // Try to convert date to yyyy-MM-dd format
      let date = "";
      if (dateStr) {
        const parts = dateStr.split(/[/-]/);
        if (parts.length === 3) {
          // If format is dd/MM/yyyy
          if (parts[0].length <= 2 && parts[2].length === 4) {
            date = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          } 
          // If format is yyyy/MM/dd
          else if (parts[0].length === 4) {
            date = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
          } else {
            date = new Date().toISOString().split('T')[0];
          }
        } else {
          date = new Date().toISOString().split('T')[0];
        }
      } else {
        date = new Date().toISOString().split('T')[0];
      }
      
      // Extract vendor name
      const vendorMatch = text.match(/المورد:?\s*([^\n]+)/);
      const vendorName = vendorMatch ? vendorMatch[1].trim() : "";
      
      // Extract tax ID
      const taxIdMatch = text.match(/رقم الضريبي:?\s*([^\n]+)/);
      const taxId = taxIdMatch ? taxIdMatch[1].trim() : "";
      
      // Extract payment method
      const paymentMethodMatch = text.match(/طريقة الدفع:?\s*([^\n]+)/);
      const paymentMethod = paymentMethodMatch ? paymentMethodMatch[1].trim() : "";
      
      // Extract items section
      const itemsSection = text.includes('الأصناف:') 
        ? text.split('الأصناف:')[1]?.split(/الإجمالي:|المجموع:/)[0] 
        : "";
      
      if (!itemsSection) {
        throw new Error("لم يتم العثور على قسم الأصناف في الفاتورة");
      }
      
      // Split items into lines
      const itemLines = itemsSection.split('\n')
        .filter(line => line.trim() && /\d+\./.test(line));
      
      if (itemLines.length === 0) {
        throw new Error("لم يتم التعرف على أي أصناف في قسم الأصناف");
      }
      
      // Parse each line to extract item details
      const items = itemLines.map((line, index) => {
        try {
          // Extract item number and name
          const itemNumberMatch = line.match(/(\d+)\.(.+?)\|/);
          const name = itemNumberMatch 
            ? itemNumberMatch[2].trim() 
            : line.split('|')[0].replace(/^\d+\./, '').trim();
          
          // Extract quantity
          const quantityMatch = line.match(/الكمية:?\s*(\d+)/);
          const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
          
          // Extract price
          const priceMatch = line.match(/السعر:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
          const priceText = priceMatch ? priceMatch[1].replace(/,/g, '') : "0";
          const price = parseFloat(priceText);
          
          // Generate unique ID for item
          const id = `pdf-item-${index + 1}`;
          
          // Calculate total
          const total = quantity * price;
          
          // Create item object
          return {
            id: id,
            productId: `pdf-product-${index + 1}`,
            code: `PDF-${index + 100}`,
            name: name,
            manufacturer: "",
            size: "",
            quantity: quantity,
            price: price,
            discount: 0,
            discountType: "percentage" as const,
            tax: 15, // Default VAT in Saudi Arabia
            total: total,
            notes: "تم استيراده من PDF"
          };
        } catch (error) {
          console.error(`Error parsing item line: ${line}`, error);
          return null;
        }
      }).filter(item => item !== null) as PurchaseItem[]; // Filter out null items
      
      if (items.length === 0) {
        throw new Error("فشل في تحليل أي من الأصناف");
      }
      
      // Extract total amount
      const totalAmountMatch = text.match(/المجموع النهائي:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
      const totalAmountText = totalAmountMatch 
        ? totalAmountMatch[1].replace(/,/g, '') 
        : items.reduce((sum, item) => sum + item.total * 1.15, 0).toString();
      const totalAmount = parseFloat(totalAmountText);
      
      // Extract subtotal
      const subtotalMatch = text.match(/الإجمالي:?\s*(\d+(?:,\d+)*(?:\.\d+)?)/);
      const subtotalText = subtotalMatch
        ? subtotalMatch[1].replace(/,/g, '')
        : items.reduce((sum, item) => sum + item.total, 0).toString();
      const subtotal = parseFloat(subtotalText);
      
      // Extract additional info
      const notesMatch = text.match(/ملاحظات:?\s*([^\n]+)/);
      const notes = notesMatch ? notesMatch[1].trim() : "";
      
      // Create invoice data object
      return {
        invoiceNumber,
        vendorId: "",
        vendorName,
        vendorPhone: "",
        vendorAccountNumber: taxId,
        date,
        items,
        subtotal: isNaN(subtotal) ? items.reduce((sum, item) => sum + item.total, 0) : subtotal,
        totalAmount: isNaN(totalAmount) ? items.reduce((sum, item) => sum + item.total * 1.15, 0) : totalAmount,
        tax: 15,
        notes,
        paymentMethod: paymentMethod.includes("نقد") ? "cash" : "credit"
      };
    } catch (error) {
      console.error("Error parsing invoice data:", error);
      throw new Error(`فشل في تحليل بيانات الفاتورة: ${(error as Error).message}`);
    }
  };

  // Process PDF file
  const processPDFFile = async (file: File) => {
    if (!file) {
      toast.error("يرجى اختيار ملف أولاً");
      return null;
    }
    
    setIsProcessing(true);
    setUploadProgress(0);
    setErrorMessage("");
    
    // Simulate progress for better UX
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      // Read file as array buffer
      const fileContent = await readFileAsArrayBuffer(file);
      
      // Extract text from PDF
      let extractedText;
      try {
        extractedText = await extractTextFromPDF(fileContent);
        setPdfTextContent(extractedText);
        
        if (!extractedText || extractedText.trim() === "") {
          throw new Error("لم يتم العثور على نص في الملف");
        }
        
      } catch (error) {
        setErrorMessage("فشل في استخراج النص من PDF. الملف قد يكون مشفرًا أو محميًا.");
        clearInterval(interval);
        setUploadProgress(0);
        setIsProcessing(false);
        return null;
      }
      
      // Parse text to find invoice data
      try {
        const parsedData = parseInvoiceDataFromText(extractedText);
        if (!parsedData.items || parsedData.items.length === 0) {
          setErrorMessage("لم نتمكن من التعرف على أي أصناف في الفاتورة");
          clearInterval(interval);
          setUploadProgress(100);
          setIsProcessing(false);
          return null;
        }
        
        clearInterval(interval);
        setUploadProgress(100);
        setIsProcessing(false);
        toast.success("تمت معالجة الملف بنجاح. يرجى مراجعة البيانات قبل التطبيق.");
        
        return parsedData;
        
      } catch (error) {
        console.error("Error parsing invoice data:", error);
        setErrorMessage("فشل في تحليل بيانات الفاتورة. تنسيق الملف قد يكون غير مدعوم.");
        clearInterval(interval);
        setUploadProgress(100);
        setIsProcessing(false);
        return null;
      }
      
    } catch (error) {
      clearInterval(interval);
      console.error("Error processing PDF:", error);
      toast.error("حدث خطأ أثناء معالجة الفاتورة");
      setErrorMessage("حدث خطأ أثناء معالجة الملف. يرجى المحاولة مرة أخرى أو استخدام ملف آخر.");
      setIsProcessing(false);
      return null;
    }
  };

  return {
    pdfTextContent,
    errorMessage,
    uploadProgress,
    isProcessing,
    processPDFFile,
    setErrorMessage,
    setIsProcessing,
    setUploadProgress
  };
};

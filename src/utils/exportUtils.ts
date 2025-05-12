
import * as XLSX from 'xlsx';

/**
 * يصدر البيانات إلى ملف Excel
 * @param data البيانات للتصدير
 * @param fileName اسم الملف للتنزيل
 * @param sheetName اسم ورقة العمل
 */
export const exportToExcel = <T extends Record<string, any>>(
  data: T[],
  fileName: string = 'exported_data',
  sheetName: string = 'البيانات'
): void => {
  try {
    // إنشاء كتاب عمل جديد
    const workbook = XLSX.utils.book_new();
    
    // إنشاء ورقة عمل من البيانات
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // إضافة الورقة إلى الكتاب
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // تصدير الكتاب وتنزيله
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  } catch (error) {
    console.error('فشل في تصدير البيانات إلى Excel:', error);
  }
};

/**
 * تحويل التاريخ إلى تنسيق مقروء باللغة العربية
 * @param date التاريخ المراد تنسيقه
 */
export const formatDateForExport = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * تنقية البيانات قبل التصدير
 * @param data البيانات المراد تنقيتها
 */
export const sanitizeDataForExport = <T extends Record<string, any>>(data: T[]): Record<string, any>[] => {
  return data.map(item => {
    const sanitizedItem: Record<string, any> = {};
    
    // يمر عبر جميع الحقول في البيانات
    Object.keys(item).forEach(key => {
      let value = item[key];
      
      // تحويل التواريخ إلى صيغة مقروءة
      if (value instanceof Date) {
        value = formatDateForExport(value);
      }
      
      // حذف الحقول غير المرغوبة مثل الوظائف والرموز الخاصة
      if (
        typeof value !== 'function' &&
        typeof value !== 'symbol'
      ) {
        // تعامل مع الكائنات المعقدة
        if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
          if (Array.isArray(value)) {
            // تحويل المصفوفات إلى نص
            sanitizedItem[key] = value.join(', ');
          } else {
            // تحويل الكائنات إلى نص JSON
            try {
              sanitizedItem[key] = JSON.stringify(value);
            } catch (e) {
              sanitizedItem[key] = String(value);
            }
          }
        } else {
          // القيم البسيطة
          sanitizedItem[key] = value;
        }
      }
    });
    
    return sanitizedItem;
  });
};

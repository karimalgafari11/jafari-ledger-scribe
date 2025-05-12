
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

/**
 * طباعة بيانات الجدول
 * @param data البيانات للطباعة
 * @param title عنوان المستند
 * @param columns أسماء الأعمدة للطباعة
 */
export const printTableData = <T extends Record<string, any>>(
  data: T[],
  title: string = 'بيانات الجدول',
  columns?: { key: string; header: string }[]
): void => {
  try {
    // إنشاء نافذة طباعة جديدة
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      throw new Error('فشل في فتح نافذة الطباعة. يرجى التحقق من إعدادات المتصفح.');
    }
    
    // تنقية البيانات للطباعة
    const sanitizedData = sanitizeDataForExport(data);
    
    // بناء HTML للطباعة
    let printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            direction: rtl;
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th, td {
            padding: 8px 12px;
            border: 1px solid #ddd;
            text-align: right;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .print-date {
            text-align: left;
            margin-bottom: 20px;
            font-size: 12px;
            color: #666;
          }
          .print-footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
          }
          @media print {
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align: center; margin-bottom: 20px;">
          <button onclick="window.print();" style="padding: 8px 16px; cursor: pointer;">طباعة الآن</button>
          <button onclick="window.close();" style="padding: 8px 16px; margin-right: 10px; cursor: pointer;">إغلاق</button>
        </div>
        <h1>${title}</h1>
        <div class="print-date">
          تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')} ${new Date().toLocaleTimeString('ar-SA')}
        </div>
        <table>
          <thead>
            <tr>
    `;
    
    // إضافة رؤوس الأعمدة
    if (columns && columns.length > 0) {
      columns.forEach(column => {
        printContent += `<th>${column.header}</th>`;
      });
    } else if (sanitizedData.length > 0) {
      Object.keys(sanitizedData[0]).forEach(key => {
        printContent += `<th>${key}</th>`;
      });
    }
    
    printContent += `
            </tr>
          </thead>
          <tbody>
    `;
    
    // إضافة بيانات الصفوف
    sanitizedData.forEach(row => {
      printContent += `<tr>`;
      
      if (columns && columns.length > 0) {
        columns.forEach(column => {
          printContent += `<td>${row[column.key] !== undefined ? row[column.key] : ''}</td>`;
        });
      } else {
        Object.values(row).forEach(value => {
          printContent += `<td>${value !== undefined ? value : ''}</td>`;
        });
      }
      
      printContent += `</tr>`;
    });
    
    printContent += `
          </tbody>
        </table>
        <div class="print-footer">
          © ${new Date().getFullYear()} نظام إدارة قطع الغيار
        </div>
      </body>
      </html>
    `;
    
    // كتابة المحتوى إلى نافذة الطباعة
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // التركيز على نافذة الطباعة
    printWindow.focus();
    
  } catch (error) {
    console.error('فشل في طباعة البيانات:', error);
    alert('فشل في طباعة البيانات: ' + (error as Error).message);
  }
};

/**
 * تحميل البيانات بتنسيق JSON
 * @param data البيانات للتنزيل
 * @param fileName اسم الملف
 */
export const downloadAsJson = <T extends Record<string, any>>(
  data: T[],
  fileName: string = 'data'
): void => {
  try {
    const sanitizedData = sanitizeDataForExport(data);
    const jsonString = JSON.stringify(sanitizedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('فشل في تنزيل البيانات كملف JSON:', error);
  }
};

/**
 * تحميل البيانات بتنسيق CSV
 * @param data البيانات للتنزيل
 * @param fileName اسم الملف
 */
export const downloadAsCsv = <T extends Record<string, any>>(
  data: T[],
  fileName: string = 'data'
): void => {
  try {
    const sanitizedData = sanitizeDataForExport(data);
    
    if (sanitizedData.length === 0) {
      throw new Error('لا توجد بيانات للتصدير');
    }
    
    // استخراج أسماء الأعمدة من الصف الأول
    const headers = Object.keys(sanitizedData[0]);
    
    // إنشاء محتوى CSV
    let csvContent = headers.join(',') + '\n';
    
    sanitizedData.forEach(row => {
      const values = headers.map(header => {
        const cell = row[header] === null || row[header] === undefined ? '' : row[header];
        // تغليف النصوص التي تحتوي على فواصل أو أقواس مزدوجة
        return typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell;
      });
      csvContent += values.join(',') + '\n';
    });
    
    // تحويل إلى Blob وتنزيل
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.csv`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('فشل في تنزيل البيانات كملف CSV:', error);
  }
};


export type FileValidationRule = {
  maxSize?: number; // الحجم الأقصى للملف بالبايت
  minSize?: number; // الحجم الأدنى للملف بالبايت
  allowedExtensions?: string[]; // الامتدادات المسموح بها (مثل ['jpg', 'png'])
  allowedMimeTypes?: string[]; // أنواع MIME المسموح بها (مثل ['image/jpeg', 'image/png'])
  maxDimensions?: { width: number; height: number }; // الأبعاد القصوى للصورة
  minDimensions?: { width: number; height: number }; // الأبعاد الدنيا للصورة
};

export type FileValidationResult = {
  valid: boolean;
  errors: string[];
};

/**
 * التحقق من صحة ملف وفقًا لقواعد محددة
 * @param file الملف المراد التحقق منه
 * @param rules قواعد التحقق
 * @returns نتيجة التحقق مع قائمة الأخطاء
 */
export async function validateFile(file: File, rules: FileValidationRule): Promise<FileValidationResult> {
  const errors: string[] = [];

  // التحقق من حجم الملف
  if (rules.maxSize && file.size > rules.maxSize) {
    errors.push(`حجم الملف يتجاوز الحد الأقصى المسموح به (${formatFileSize(rules.maxSize)})`);
  }

  if (rules.minSize && file.size < rules.minSize) {
    errors.push(`حجم الملف أصغر من الحد الأدنى المطلوب (${formatFileSize(rules.minSize)})`);
  }

  // التحقق من امتداد الملف
  if (rules.allowedExtensions && rules.allowedExtensions.length > 0) {
    const fileExt = getFileExtension(file.name).toLowerCase();
    if (!rules.allowedExtensions.includes(fileExt.toLowerCase())) {
      errors.push(`نوع الملف غير مسموح به. الأنواع المسموح بها: ${rules.allowedExtensions.join(', ')}`);
    }
  }

  // التحقق من نوع MIME
  if (rules.allowedMimeTypes && rules.allowedMimeTypes.length > 0) {
    if (!rules.allowedMimeTypes.includes(file.type)) {
      errors.push(`نوع الملف غير مسموح به. الأنواع المسموح بها: ${rules.allowedMimeTypes.map(formatMimeType).join(', ')}`);
    }
  }

  // التحقق من أبعاد الصورة (إذا كان الملف صورة)
  if ((rules.maxDimensions || rules.minDimensions) && isImageFile(file)) {
    try {
      const dimensions = await getImageDimensions(file);
      
      if (rules.maxDimensions) {
        if (dimensions.width > rules.maxDimensions.width) {
          errors.push(`عرض الصورة (${dimensions.width}px) يتجاوز الحد الأقصى (${rules.maxDimensions.width}px)`);
        }
        if (dimensions.height > rules.maxDimensions.height) {
          errors.push(`ارتفاع الصورة (${dimensions.height}px) يتجاوز الحد الأقصى (${rules.maxDimensions.height}px)`);
        }
      }
      
      if (rules.minDimensions) {
        if (dimensions.width < rules.minDimensions.width) {
          errors.push(`عرض الصورة (${dimensions.width}px) أقل من الحد الأدنى (${rules.minDimensions.width}px)`);
        }
        if (dimensions.height < rules.minDimensions.height) {
          errors.push(`ارتفاع الصورة (${dimensions.height}px) أقل من الحد الأدنى (${rules.minDimensions.height}px)`);
        }
      }
    } catch (error) {
      errors.push('فشل في قراءة أبعاد الصورة');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * تنسيق حجم الملف بطريقة قابلة للقراءة
 * @param bytes حجم الملف بالبايت
 * @returns حجم الملف بتنسيق قابل للقراءة
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 بايت';
  
  const k = 1024;
  const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت', 'تيرابايت'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * الحصول على امتداد الملف من اسمه
 * @param filename اسم الملف
 * @returns امتداد الملف
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop() || '';
}

/**
 * تنسيق نوع MIME بطريقة قابلة للقراءة
 * @param mimeType نوع MIME
 * @returns نوع MIME بتنسيق قابل للقراءة
 */
function formatMimeType(mimeType: string): string {
  // تحويل أنواع MIME الشائعة إلى تنسيق أسهل للقراءة
  const readableMimeTypes: Record<string, string> = {
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'image/webp': 'WebP',
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'text/plain': 'TXT',
    'text/csv': 'CSV'
  };
  
  return readableMimeTypes[mimeType] || mimeType;
}

/**
 * التحقق مما إذا كان الملف صورة
 * @param file الملف المراد التحقق منه
 * @returns هل الملف صورة أم لا
 */
function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * الحصول على أبعاد الصورة
 * @param file ملف الصورة
 * @returns وعد بأبعاد الصورة
 */
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
      URL.revokeObjectURL(img.src); // تحرير الذاكرة
    };
    img.onerror = () => {
      reject(new Error('فشل في تحميل الصورة'));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}

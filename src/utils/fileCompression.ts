
import imageCompression from 'browser-image-compression';
import { validateFile, FileValidationResult } from './fileValidation';

export interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string; // 'image/jpeg', 'image/png' etc
  quality?: number; // 0.1 - 1.0
  alwaysKeepResolution?: boolean;
  initialQuality?: number;
}

export interface CompressedFile {
  file: File;
  originalFile: File;
  sizeReductionPercent: number;
  validationResult: FileValidationResult;
}

const defaultImageOptions: CompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  quality: 0.8,
  initialQuality: 0.9,
};

const defaultFileOptions = {
  maxSizeMB: 5,
};

/**
 * ضغط وتحسين الصورة تلقائيًا
 * @param imageFile ملف الصورة الأصلي
 * @param options خيارات الضغط
 * @returns ملف الصورة بعد الضغط مع معلومات إضافية
 */
export async function compressImage(
  imageFile: File,
  customOptions?: Partial<CompressionOptions>
): Promise<CompressedFile> {
  try {
    // التحقق من أن الملف هو صورة
    if (!imageFile.type.startsWith('image/')) {
      throw new Error('الملف المحدد ليس صورة');
    }

    // دمج الخيارات الافتراضية مع الخيارات المخصصة
    const options = { ...defaultImageOptions, ...customOptions };
    
    // التحقق من حجم الصورة قبل الضغط - إذا كان أقل من الحجم المطلوب، لا داعي للضغط
    if (imageFile.size / 1024 / 1024 < options.maxSizeMB) {
      options.quality = 1.0; // الحفاظ على الجودة الأصلية
      options.maxWidthOrHeight = undefined; // الحفاظ على الأبعاد الأصلية
    }

    // ضغط الصورة
    console.log(`بدء ضغط الصورة: ${imageFile.name} (${formatFileSize(imageFile.size)})`);
    const compressedFile = await imageCompression(imageFile, options);
    
    // حساب نسبة التقليل في الحجم
    const sizeReduction = 1 - (compressedFile.size / imageFile.size);
    const sizeReductionPercent = Math.round(sizeReduction * 100);
    
    console.log(`ضغط الصورة مكتمل: ${compressedFile.name} (${formatFileSize(compressedFile.size)})`);
    console.log(`تم تقليل الحجم بنسبة ${sizeReductionPercent}%`);
    
    // التحقق من صحة الملف بعد الضغط (حسب القواعد المحددة)
    const validationResult = await validateFile(compressedFile, {
      maxSize: options.maxSizeMB * 1024 * 1024,
    });

    return {
      file: compressedFile,
      originalFile: imageFile,
      sizeReductionPercent,
      validationResult
    };
  } catch (error) {
    console.error('حدث خطأ أثناء ضغط الصورة:', error);
    throw error;
  }
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
 * ضغط وتحسين المستندات (PDF, DOCX) إذا كان حجمها كبير
 * ملاحظة: لضغط PDF بشكل فعال قد تحتاج لاستخدام خدمة في الخادم
 * هنا نقوم فقط بالتحقق من الحجم والصحة
 */
export async function optimizeDocument(
  file: File,
  customOptions?: Partial<CompressionOptions>
): Promise<CompressedFile> {
  try {
    const options = { ...defaultFileOptions, ...customOptions };
    
    // التحقق من صحة الملف
    const validationResult = await validateFile(file, {
      maxSize: options.maxSizeMB * 1024 * 1024,
    });

    return {
      file: file, // نفس الملف لأننا لا نضغط المستندات في الواجهة الأمامية
      originalFile: file,
      sizeReductionPercent: 0,
      validationResult
    };
  } catch (error) {
    console.error('حدث خطأ أثناء التحقق من المستند:', error);
    throw error;
  }
}

/**
 * تحسين أي نوع من الملفات - سيتم اختيار الطريقة المناسبة حسب نوع الملف
 */
export async function optimizeFile(
  file: File,
  customOptions?: Partial<CompressionOptions>
): Promise<CompressedFile> {
  // تحديد نوع الملف واختيار الطريقة المناسبة
  if (file.type.startsWith('image/')) {
    return compressImage(file, customOptions);
  } else if (file.type === 'application/pdf' || file.type.includes('officedocument')) {
    return optimizeDocument(file, customOptions);
  } else {
    // بالنسبة للأنواع الأخرى، نقوم فقط بالتحقق من الصحة
    const validationResult = await validateFile(file, {
      maxSize: (customOptions?.maxSizeMB || 10) * 1024 * 1024,
    });
    
    return {
      file,
      originalFile: file,
      sizeReductionPercent: 0,
      validationResult
    };
  }
}

/**
 * تحسين مجموعة من الملفات
 */
export async function optimizeFiles(
  files: File[],
  customOptions?: Partial<CompressionOptions>
): Promise<CompressedFile[]> {
  const results: CompressedFile[] = [];
  
  for (const file of files) {
    const result = await optimizeFile(file, customOptions);
    results.push(result);
  }
  
  return results;
}


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { decode } from 'https://deno.land/std@0.177.0/encoding/base64.ts';
import Sharp from 'https://esm.sh/sharp@0.32.1';

// تكوين CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // التعامل مع طلبات CORS التمهيدية
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    
    // استخراج البيانات من الطلب
    const requestData = await req.json();
    const { 
      fileData, 
      fileName, 
      fileType,
      quality = 80,
      maxWidth = 1920,
      maxHeight = 1920,
      bucketName = 'uploads',
      outputFormat = 'webp'
    } = requestData;
    
    // التحقق من المدخلات
    if (!fileData || !fileName) {
      return new Response(
        JSON.stringify({ error: 'بيانات الملف أو اسم الملف غير موجود.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // تحويل Base64 إلى Buffer
    const base64Data = fileData.split(';base64,').pop();
    const fileBuffer = decode(base64Data);
    
    // ضغط الصورة باستخدام Sharp
    let sharpInstance = Sharp(fileBuffer);
    
    // تغيير حجم الصورة إذا كانت أكبر من الحد الأقصى
    sharpInstance = sharpInstance.resize({
      width: maxWidth,
      height: maxHeight,
      fit: 'inside',
      withoutEnlargement: true
    });
    
    // تحويل إلى التنسيق المطلوب مع ضبط الجودة
    switch (outputFormat.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({ quality });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ quality });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality });
        break;
      case 'avif':
        sharpInstance = sharpInstance.avif({ quality });
        break;
      default:
        sharpInstance = sharpInstance.webp({ quality });
    }
    
    // الحصول على الصورة المضغوطة كـ Buffer
    const optimizedImageBuffer = await sharpInstance.toBuffer();
    
    // حفظ الصورة المضغوطة في Supabase Storage
    const optimizedFileName = `${fileName.split('.')[0]}_optimized.${outputFormat}`;
    const { data: uploadData, error: uploadError } = await supabaseClient
      .storage
      .from(bucketName)
      .upload(`optimized/${optimizedFileName}`, optimizedImageBuffer, {
        contentType: `image/${outputFormat}`,
        upsert: true
      });
    
    if (uploadError) {
      throw new Error(`فشل رفع الملف: ${uploadError.message}`);
    }
    
    // الحصول على رابط عام للصورة
    const { data: publicUrlData } = supabaseClient
      .storage
      .from(bucketName)
      .getPublicUrl(`optimized/${optimizedFileName}`);
    
    // حساب نسبة الضغط
    const originalSize = fileBuffer.length;
    const optimizedSize = optimizedImageBuffer.length;
    const compressionRate = Math.round((1 - (optimizedSize / originalSize)) * 100);
    
    // إرجاع البيانات
    return new Response(
      JSON.stringify({
        success: true,
        originalSize,
        optimizedSize,
        compressionRate: `${compressionRate}%`,
        url: publicUrlData.publicUrl,
        fileName: optimizedFileName,
        format: outputFormat,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('خطأ في وظيفة تحسين الصور:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { decode } from 'https://deno.land/std@0.177.0/encoding/base64.ts';
import { Image, decode as decodeImage, encode } from 'https://deno.land/x/imagescript@1.2.15/mod.ts';

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
    
    // معالجة الصورة باستخدام ImageScript
    let outputBuffer: Uint8Array;
    let imageWidth: number;
    let imageHeight: number;
    
    try {
      // فك تشفير الصورة
      const image = await decodeImage(fileBuffer);
      imageWidth = image.width;
      imageHeight = image.height;
      
      // حساب أبعاد الصورة الجديدة مع الحفاظ على النسبة
      const aspectRatio = image.width / image.height;
      let newWidth = image.width;
      let newHeight = image.height;
      
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = Math.round(newWidth / aspectRatio);
      }
      
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = Math.round(newHeight * aspectRatio);
      }
      
      // تغيير حجم الصورة إذا لزم الأمر
      if (newWidth !== image.width || newHeight !== image.height) {
        await image.resize(newWidth, newHeight);
      }
      
      // تحويل الجودة من نطاق 0-100 إلى نطاق 0-1 للتوافق مع ImageScript
      const normalizedQuality = quality / 100;
      
      // ضغط الصورة وتحويلها إلى التنسيق المطلوب
      switch (outputFormat.toLowerCase()) {
        case 'jpeg':
        case 'jpg':
          outputBuffer = await image.encodeJPEG(normalizedQuality);
          break;
        case 'png':
          outputBuffer = await image.encodePNG();
          break;
        case 'webp':
          outputBuffer = await encode(image, { format: "webp", quality: normalizedQuality });
          break;
        default:
          // استخدام JPEG كتنسيق افتراضي
          outputBuffer = await image.encodeJPEG(normalizedQuality);
          break;
      }
    } catch (error) {
      console.error('خطأ في معالجة الصورة:', error);
      throw new Error(`فشل معالجة الصورة: ${error.message}`);
    }
    
    // حفظ الصورة المضغوطة في Supabase Storage
    const optimizedFileName = `${fileName.split('.')[0]}_optimized.${outputFormat}`;
    const { data: uploadData, error: uploadError } = await supabaseClient
      .storage
      .from(bucketName)
      .upload(`optimized/${optimizedFileName}`, outputBuffer, {
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
    const optimizedSize = outputBuffer.length;
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
        dimensions: {
          original: {
            width: imageWidth,
            height: imageHeight
          },
          optimized: {
            width: newWidth,
            height: newHeight
          }
        }
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

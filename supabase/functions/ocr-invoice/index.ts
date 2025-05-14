import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import * as ImageScript from 'https://deno.land/x/imagescript@1.2.15/mod.ts'

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handle CORS preflight requests
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Validate request
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get request data
    const formData = await req.formData()
    const imageFile = formData.get('image') as File
    
    if (!imageFile) {
      return new Response(JSON.stringify({ error: 'No image provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Process image for OCR
    const imageBuffer = await imageFile.arrayBuffer()
    
    // Optimize the image for better OCR results
    const optimizedImageData = await optimizeImageForOcr(imageBuffer)
    
    // Call OCR API for text extraction (using a mock for now)
    const extractedText = await extractTextFromImage(optimizedImageData)
    
    // Parse the extracted text to find invoice data
    const invoiceData = parseInvoiceDataFromText(extractedText)

    // Return the extracted data
    return new Response(JSON.stringify({
      success: true,
      data: {
        extractedText,
        invoiceData
      }
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
    
  } catch (error) {
    console.error('Error processing OCR request:', error)
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

// Optimize image for better OCR results
async function optimizeImageForOcr(imageBuffer: ArrayBuffer): Promise<Uint8Array> {
  try {
    // Load image using ImageScript
    const image = await ImageScript.decode(new Uint8Array(imageBuffer))
    
    // Resize if needed (keeping aspect ratio)
    let processedImage = image
    if (image.width > 1200 || image.height > 1200) {
      const scale = Math.min(1200 / image.width, 1200 / image.height)
      processedImage = image.resize(
        Math.floor(image.width * scale),
        Math.floor(image.height * scale)
      )
    }
    
    // Increase contrast to make text more visible
    processedImage = processedImage.contrast(1.2)
    
    // Convert to greyscale for better OCR
    processedImage = processedImage.saturation(0)
    
    // Encode the image (as PNG for best quality)
    return await processedImage.encodeToFormat('png')
  } catch (error) {
    console.error('Error optimizing image:', error)
    // If optimization fails, return original image
    return new Uint8Array(imageBuffer)
  }
}

// Extract text from image (mock implementation)
// In a real implementation, this would call a service like Google Cloud Vision, Azure Computer Vision, or Tesseract
async function extractTextFromImage(imageData: Uint8Array): Promise<string> {
  // This is a mock implementation
  // In production, you would call an actual OCR API here
  
  console.log(`Processing image of size: ${imageData.length} bytes`)
  
  // Mock response for demonstration
  return `فاتورة مشتريات
رقم الفاتورة: 2023-856
تاريخ: 20/11/2023
المورد: شركة الأفق للتقنية
رقم الضريبي: 310159632500004

الأصناف:
1. لابتوب ديل XPS 15 | الكمية: 2 | السعر: 5500 ريال
2. شاشة إل جي 27 بوصة | الكمية: 3 | السعر: 950 ريال
3. لوحة مفاتيح ميكانيكية | الكمية: 5 | السعر: 350 ريال

الإجمالي: 14750 ريال
الضريبة (15%): 2212.50 ريال
المجموع النهائي: 16962.50 ريال

ملاحظات: تم فحص جميع المنتجات قبل الاستلام
طريقة الدفع: شيك`
}

// Parse invoice data from text
function parseInvoiceDataFromText(text: string) {
  // Re-use the same parsing logic from the usePDFProcessing hook
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
    
    // Split items into lines
    const itemLines = itemsSection.split('\n')
      .filter(line => line.trim() && /\d+\./.test(line));
    
    // Parse each line to extract item details
    const items = itemLines.map((line, index) => {
      // Extract item name
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
      const id = `ocr-item-${index + 1}`;
      
      // Calculate total
      const total = quantity * price;
      
      // Return item object
      return {
        id,
        productId: `ocr-product-${index + 1}`,
        code: `OCR-${index + 100}`,
        name,
        quantity,
        price,
        discount: 0,
        discountType: "percentage" as const,
        tax: 15, // Default VAT in Saudi Arabia
        total,
        notes: "تم استيراده عبر التعرف البصري"
      };
    });
    
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
    return {
      invoiceNumber: "",
      vendorName: "",
      date: new Date().toISOString().split('T')[0],
      items: [],
      subtotal: 0,
      totalAmount: 0,
      tax: 15,
      notes: "حدث خطأ أثناء تحليل بيانات الفاتورة",
      paymentMethod: "credit"
    };
  }
}

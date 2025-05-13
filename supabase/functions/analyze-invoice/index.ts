
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the DeepSeek API key from environment variables
    const deepSeekApiKey = Deno.env.get('DEEPSEEK_API_KEY')
    if (!deepSeekApiKey) {
      throw new Error('DeepSeek API key not configured')
    }

    const { pdfText } = await req.json()

    if (!pdfText) {
      throw new Error('No PDF text provided')
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Analyzing invoice with DeepSeek API')

    // Create the prompt for DeepSeek API
    const prompt = `
      هذا نص فاتورة أو سند. استخرج لي المعلومات التالية في صيغة JSON:
      - نوع المستند (شراء / بيع / قبض / صرف)
      - رقم الفاتورة أو السند
      - التاريخ
      - اسم المورد أو العميل
      - البنود (الوصف، الكمية، السعر)
      - المجموع الفرعي
      - الضريبة
      - الإجمالي
      - القيد المحاسبي المقترح (الحساب المدين، الحساب الدائن، القيم)
      
      نص الفاتورة:
      ------------------------
      ${pdfText}
    `

    // Call DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepSeekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'أنت مساعد متخصص في تحليل الفواتير واستخراج البيانات المالية منها وإنشاء قيود محاسبية مناسبة.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 4000,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error('DeepSeek API error:', data)
      throw new Error('فشل في تحليل الفاتورة عبر الذكاء الاصطناعي')
    }

    // Extract content from DeepSeek response
    const content = data.choices?.[0]?.message?.content
    if (!content) {
      throw new Error('لم يتم الحصول على رد من الذكاء الاصطناعي')
    }

    // Try to extract JSON from the response
    let jsonData
    try {
      // Find JSON in the response text (it might be embedded in markdown)
      const jsonMatch = content.match(/```(?:json)?\s*({[\s\S]*?})\s*```/) || 
                        content.match(/{[\s\S]*"[\s\S]*":[\s\S]*}/)
      
      if (jsonMatch && jsonMatch[1]) {
        jsonData = JSON.parse(jsonMatch[1])
      } else {
        jsonData = JSON.parse(content)
      }
    } catch (error) {
      console.error('Failed to parse JSON from DeepSeek response:', error)
      console.log('DeepSeek raw response:', content)
      throw new Error('تعذر تحليل الرد من الذكاء الاصطناعي')
    }

    // Log the result
    console.log('Successfully analyzed invoice:', jsonData)

    // Return the result
    return new Response(JSON.stringify({
      success: true,
      data: jsonData
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.error('Error in analyze-invoice function:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }), {
      status: 400,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
})

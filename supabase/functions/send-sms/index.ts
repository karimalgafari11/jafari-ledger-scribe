
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SMSRequest {
  to: string;
  message: string;
  from?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get SMS provider API keys from environment variables
  const SMS_PROVIDER = Deno.env.get("SMS_PROVIDER") || "twilio";
  const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
  const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
  const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER");
  const VONAGE_API_KEY = Deno.env.get("VONAGE_API_KEY");
  const VONAGE_API_SECRET = Deno.env.get("VONAGE_API_SECRET");

  try {
    // Extract the request body
    const body: SMSRequest = await req.json();
    
    console.log("Sending SMS with payload:", {
      to: body.to,
      provider: SMS_PROVIDER,
    });

    // Send SMS based on the configured provider
    if (SMS_PROVIDER === "twilio") {
      if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
        throw new Error("Twilio credentials not configured");
      }

      const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
      
      const twilioResponse = await fetch(twilioEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
        },
        body: new URLSearchParams({
          To: body.to,
          From: body.from || TWILIO_PHONE_NUMBER || "",
          Body: body.message,
        }),
      });
      
      const twilioData = await twilioResponse.json();
      
      if (!twilioResponse.ok) {
        throw new Error(twilioData.message || "Error sending SMS via Twilio");
      }
      
      return new Response(
        JSON.stringify({ success: true, data: twilioData }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } else if (SMS_PROVIDER === "vonage") {
      if (!VONAGE_API_KEY || !VONAGE_API_SECRET) {
        throw new Error("Vonage credentials not configured");
      }
      
      const vonageEndpoint = "https://rest.nexmo.com/sms/json";
      
      const vonageResponse = await fetch(vonageEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: VONAGE_API_KEY,
          api_secret: VONAGE_API_SECRET,
          to: body.to,
          from: body.from || "ACCOUNTING",
          text: body.message,
        }),
      });
      
      const vonageData = await vonageResponse.json();
      
      if (vonageData.messages?.[0]?.status !== "0") {
        throw new Error(vonageData.messages?.[0]?.error_text || "Error sending SMS via Vonage");
      }
      
      return new Response(
        JSON.stringify({ success: true, data: vonageData }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } else {
      throw new Error(`Unsupported SMS provider: ${SMS_PROVIDER}`);
    }
  } catch (error) {
    console.error("Error in send-sms function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);

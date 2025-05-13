import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  userId: string;
  eventType: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  channels?: string[];
  relatedEntityId?: string;
  relatedEntityType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Initialize Supabase client
  const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Extract the request body
    const body: NotificationRequest = await req.json();
    
    console.log("Processing notification request:", {
      userId: body.userId,
      eventType: body.eventType,
      channels: body.channels,
    });

    // Get user notification settings
    const { data: settings, error: settingsError } = await supabase
      .from("notification_settings")
      .select("*")
      .eq("user_id", body.userId)
      .eq("event_type", body.eventType)
      .single();

    if (settingsError && settingsError.code !== "PGRST116") {
      console.error("Error fetching notification settings:", settingsError);
      return new Response(
        JSON.stringify({ success: false, error: settingsError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // If no settings found or notification is muted, use default channels or specified channels
    const enabledChannels = settings?.muted ? [] : 
      (body.channels || ["in-app"]).filter(channel => {
        // Check if the channel is enabled in the settings
        if (!settings) return true;
        return settings.channels[channel]?.enabled !== false;
      });

    // Create the notification record
    const notificationPromises = enabledChannels.map(async (channel) => {
      // Check if the notification meets the priority threshold
      if (settings?.channels[channel]?.threshold) {
        const priorityLevels = { low: 1, medium: 2, high: 3, critical: 4 };
        const thresholdLevel = priorityLevels[settings.channels[channel].threshold as NotificationRequest['priority']];
        const messagePriorityLevel = priorityLevels[body.priority];

        if (messagePriorityLevel < thresholdLevel) {
          console.log(`Skipping ${channel} notification due to priority threshold`);
          return null;
        }
      }

      // Insert notification into database
      const { data: notification, error: notificationError } = await supabase
        .from("notifications")
        .insert({
          user_id: body.userId,
          title: body.title,
          message: body.message,
          priority: body.priority,
          channel: channel,
          event_type: body.eventType,
          related_entity_id: body.relatedEntityId,
          related_entity_type: body.relatedEntityType,
        })
        .select()
        .single();

      if (notificationError) {
        console.error(`Error creating ${channel} notification:`, notificationError);
        return null;
      }

      // For channels other than in-app, call the appropriate service
      if (channel === "email") {
        // Get user email
        const { data: user } = await supabase
          .from("profiles")
          .select("email")
          .eq("id", body.userId)
          .single();

        if (user?.email) {
          // Call the send-email function using functions.invoke
          const { data: emailResult, error: emailError } = await supabase.functions.invoke("send-email", {
            body: JSON.stringify({
              to: user.email,
              subject: body.title,
              html: `<div dir="rtl">${body.message}</div>`,
            })
          });

          if (emailError) {
            console.error("Error sending email:", emailError);
            
            // Update notification status to failed
            await supabase
              .from("notifications")
              .update({ delivery_status: "failed" })
              .eq("id", notification.id);
          } else {
            // Update notification status to sent
            await supabase
              .from("notifications")
              .update({ delivery_status: "sent" })
              .eq("id", notification.id);
          }
        }
      } else if (channel === "sms") {
        // Get user phone
        const { data: user } = await supabase
          .from("profiles")
          .select("phone")
          .eq("id", body.userId)
          .single();

        if (user?.phone) {
          // Call the send-sms function using functions.invoke
          const { data: smsResult, error: smsError } = await supabase.functions.invoke("send-sms", {
            body: JSON.stringify({
              to: user.phone,
              message: `${body.title}: ${body.message}`,
            })
          });

          if (smsError) {
            console.error("Error sending SMS:", smsError);
            
            // Update notification status to failed
            await supabase
              .from("notifications")
              .update({ delivery_status: "failed" })
              .eq("id", notification.id);
          } else {
            // Update notification status to sent
            await supabase
              .from("notifications")
              .update({ delivery_status: "sent" })
              .eq("id", notification.id);
          }
        }
      } else if (channel === "in-app") {
        // For in-app notifications, we just need to update the status to delivered
        await supabase
          .from("notifications")
          .update({ delivery_status: "delivered" })
          .eq("id", notification.id);
      }

      return notification;
    });

    const notifications = await Promise.all(notificationPromises);
    const validNotifications = notifications.filter(Boolean);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { 
          notifications: validNotifications,
          channels: enabledChannels 
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in send-notification function:", error);
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

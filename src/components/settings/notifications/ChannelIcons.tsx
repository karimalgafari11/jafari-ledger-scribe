
import React from "react";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { NotificationChannel } from "@/types/notifications";

export const channelIcons: Record<NotificationChannel, React.ReactNode> = {
  "email": <Mail size={16} />,
  "sms": <Smartphone size={16} />,
  "in-app": <Bell size={16} />,
  "push": <Bell size={16} />,
  "slack": <MessageSquare size={16} />,
  "webhook": <MessageSquare size={16} />,
};


import React from "react";
import { Bell, Mail, MessageSquare, Smartphone, Webhook, AlertCircle } from "lucide-react";
import { NotificationChannel } from "@/types/notifications";

export const channelIcons: Record<NotificationChannel, React.ReactNode> = {
  "email": <Mail size={16} className="text-purple-600" />,
  "sms": <Smartphone size={16} className="text-amber-600" />,
  "in-app": <Bell size={16} className="text-green-600" />,
  "push": <Bell size={16} className="text-blue-600" />,
  "slack": <MessageSquare size={16} className="text-pink-600" />,
  "webhook": <Webhook size={16} className="text-indigo-600" />,
};

export const getChannelIcon = (channel: NotificationChannel, size: number = 16): React.ReactNode => {
  switch (channel) {
    case "email":
      return <Mail size={size} className="text-purple-600" />;
    case "sms":
      return <Smartphone size={size} className="text-amber-600" />;
    case "in-app":
      return <Bell size={size} className="text-green-600" />;
    case "push":
      return <Bell size={size} className="text-blue-600" />;
    case "slack":
      return <MessageSquare size={size} className="text-pink-600" />;
    case "webhook":
      return <Webhook size={size} className="text-indigo-600" />;
    default:
      return <AlertCircle size={size} className="text-gray-400" />;
  }
};

export const getChannelColor = (channel: NotificationChannel): string => {
  switch (channel) {
    case "email":
      return "bg-purple-100 border-purple-200 text-purple-700";
    case "sms":
      return "bg-amber-100 border-amber-200 text-amber-700";
    case "in-app":
      return "bg-green-100 border-green-200 text-green-700";
    case "push":
      return "bg-blue-100 border-blue-200 text-blue-700";
    case "slack":
      return "bg-pink-100 border-pink-200 text-pink-700";
    case "webhook":
      return "bg-indigo-100 border-indigo-200 text-indigo-700";
    default:
      return "bg-gray-100 border-gray-200 text-gray-700";
  }
};

export const getChannelName = (channel: NotificationChannel): string => {
  switch (channel) {
    case "email":
      return "البريد الإلكتروني";
    case "sms":
      return "الرسائل النصية";
    case "in-app":
      return "داخل التطبيق";
    case "push":
      return "إشعارات الجوال";
    case "slack":
      return "سلاك";
    case "webhook":
      return "ويب هوك";
    default:
      return channel;
  }
};

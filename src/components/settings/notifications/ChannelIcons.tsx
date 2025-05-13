
import React from 'react';
import { Mail, MessageSquare, Bell, Smartphone, MessageCircle, Webhook } from "lucide-react";

export const channelIcons: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  'in-app': <Bell className="h-4 w-4" />,
  push: <Smartphone className="h-4 w-4" />,
  sms: <MessageSquare className="h-4 w-4" />,
  slack: <MessageCircle className="h-4 w-4" />,
  webhook: <Webhook className="h-4 w-4" />
};

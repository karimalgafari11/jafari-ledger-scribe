
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  BookText,
  AlignJustify,
  Target,
  Wallet,
  DollarSign,
  File,
  Bell,
  Gavel,
  Zap,
  Shield,
  Settings,
  FileText
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

export const AccountingSidebar = () => {
  const menuItems = [
    {
      label: "الرئيسية",
      icon: Home,
      path: "/accounting",
    },
    {
      label: "دليل الحسابات",
      icon: BookOpen,
      path: "/accounting/accounts",
    },
    {
      label: "القيود اليومية",
      icon: BookText,
      path: "/accounting/journal-entries",
    },
    {
      label: "دفتر الأستاذ",
      icon: AlignJustify,
      path: "/accounting/ledger",
    },
    {
      label: "تحليل الفواتير PDF",
      icon: FileText,
      path: "/accounting/pdf-invoice-processor",
      tag: "جديد",
    },
    {
      label: "مراكز التكلفة",
      icon: Target,
      path: "/accounting/cost-centers",
    },
    {
      label: "صناديق النقدية",
      icon: Wallet,
      path: "/accounting/cash-registers",
    },
    {
      label: "حركات النقدية",
      icon: DollarSign,
      path: "/accounting/cash-transactions",
    },
    {
      label: "الأوراق التجارية",
      icon: File,
      path: "/accounting/commercial-papers",
    },
    {
      label: "إشعارات الاستحقاق",
      icon: Bell,
      path: "/accounting/due-notifications",
    },
    {
      label: "القواعد المحاسبية",
      icon: Gavel,
      path: "/accounting/accounting-rules",
    },
    {
      label: "القيود التلقائية",
      icon: Zap,
      path: "/accounting/automatic-entries",
    },
    {
      label: "قواعد التحقق",
      icon: Shield,
      path: "/accounting/validation-rules",
    },
    {
      label: "الإعدادات",
      icon: Settings,
      path: "/accounting/settings",
    },
  ];

  return (
    <div className="h-full py-4 overflow-auto">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.tag && (
                <Badge variant="secondary" className="mr-auto text-xs">
                  {item.tag}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AccountingSidebar;

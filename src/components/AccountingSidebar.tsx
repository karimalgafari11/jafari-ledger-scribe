
import React from "react";
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
  FileText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  tag?: string;
}

const AccountingSidebar = () => {
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
    <div className="w-64 flex-shrink-0 border-r bg-secondary py-4">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "group flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
            {item.tag && (
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {item.tag}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AccountingSidebar;

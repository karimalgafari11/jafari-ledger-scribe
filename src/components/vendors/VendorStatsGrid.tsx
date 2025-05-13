
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, CreditCard, AlertTriangle } from "lucide-react";

export const VendorStatsGrid: React.FC = () => {
  // في وضع الإنتاج، ستقوم باستخدام بيانات حقيقية من قاعدة البيانات
  const stats = [
    {
      title: "إجمالي الموردين",
      value: "0",
      change: "+0%",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "إجمالي المشتريات",
      value: "0 ريال",
      change: "+0%",
      icon: <ShoppingBag className="h-8 w-8 text-emerald-600" />,
    },
    {
      title: "الرصيد المستحق",
      value: "0 ريال",
      change: "0%",
      icon: <CreditCard className="h-8 w-8 text-amber-600" />,
    },
    {
      title: "دفعات متأخرة",
      value: "0",
      change: "0%",
      icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="rounded-full p-2 bg-gray-100">{stat.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.change} من الشهر الماضي
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

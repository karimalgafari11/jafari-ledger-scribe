
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, FileEdit, BookOpen } from "lucide-react";

export const AutomaticEntriesModule = () => {
  const automaticEntries = [
    {
      id: 1,
      name: "قيد المبيعات النقدية",
      trigger: "عند إصدار فاتورة مبيعات نقدية",
      accounts: [
        { accountName: "الصندوق", type: "مدين" },
        { accountName: "إيرادات المبيعات", type: "دائن" },
      ],
      isActive: true,
    },
    {
      id: 2,
      name: "قيد المبيعات الآجلة",
      trigger: "عند إصدار فاتورة مبيعات آجلة",
      accounts: [
        { accountName: "العملاء", type: "مدين" },
        { accountName: "إيرادات المبيعات", type: "دائن" },
      ],
      isActive: true,
    },
    {
      id: 3,
      name: "قيد المشتريات النقدية",
      trigger: "عند إصدار فاتورة مشتريات نقدية",
      accounts: [
        { accountName: "المشتريات", type: "مدين" },
        { accountName: "الصندوق", type: "دائن" },
      ],
      isActive: true,
    },
    {
      id: 4,
      name: "قيد المشتريات الآجلة",
      trigger: "عند إصدار فاتورة مشتريات آجلة",
      accounts: [
        { accountName: "المشتريات", type: "مدين" },
        { accountName: "الموردين", type: "دائن" },
      ],
      isActive: true,
    },
    {
      id: 5,
      name: "قيد الرواتب",
      trigger: "عند دفع الرواتب الشهرية",
      accounts: [
        { accountName: "مصروف الرواتب", type: "مدين" },
        { accountName: "البنك", type: "دائن" },
      ],
      isActive: false,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>القيود التلقائية</CardTitle>
          <CardDescription>القيود المحاسبية التي يتم إنشاؤها تلقائياً بناءً على أحداث محددة</CardDescription>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" /> إضافة قيد تلقائي
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">اسم القيد</TableHead>
                <TableHead>الحدث المسبب</TableHead>
                <TableHead>الحسابات المتأثرة</TableHead>
                <TableHead className="w-[100px]">الحالة</TableHead>
                <TableHead className="w-[100px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automaticEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.trigger}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {entry.accounts.map((account, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Badge variant={account.type === "مدين" ? "default" : "secondary"} className="w-16 justify-center">
                            {account.type}
                          </Badge>
                          <span>{account.accountName}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={entry.isActive ? "success" : "destructive"}>
                      {entry.isActive ? "مفعّل" : "معطّل"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

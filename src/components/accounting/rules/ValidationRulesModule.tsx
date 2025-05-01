
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Plus, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const ValidationRulesModule = () => {
  const validationRules = [
    {
      id: 1,
      name: "توازن القيد المحاسبي",
      description: "التحقق من أن مجموع المدين يساوي مجموع الدائن",
      severity: "critical",
      canOverride: false,
      isActive: true,
    },
    {
      id: 2,
      name: "وجود الحساب",
      description: "التحقق من وجود الحسابات المستخدمة في القيد",
      severity: "critical",
      canOverride: false,
      isActive: true,
    },
    {
      id: 3,
      name: "الفترة المحاسبية مفتوحة",
      description: "التحقق من أن الفترة المحاسبية للقيد مفتوحة",
      severity: "critical",
      canOverride: true,
      isActive: true,
    },
    {
      id: 4,
      name: "وصف القيد مطلوب",
      description: "التحقق من وجود وصف للقيد",
      severity: "warning",
      canOverride: true,
      isActive: true,
    },
    {
      id: 5,
      name: "حد أقصى للقيمة",
      description: "التحقق من أن قيمة القيد لا تتجاوز 100,000 ريال",
      severity: "warning",
      canOverride: true,
      isActive: false,
    },
    {
      id: 6,
      name: "تحقق من تكرار القيود",
      description: "منع إدخال قيود متطابقة خلال نفس اليوم",
      severity: "warning",
      canOverride: true,
      isActive: true,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>قواعد التحقق والتدقيق</CardTitle>
          <CardDescription>قواعد التحقق من صحة القيود المحاسبية</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 ml-2" /> إضافة قاعدة
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 ml-2" /> إعدادات
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">اسم القاعدة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead className="w-[100px]">المستوى</TableHead>
                <TableHead className="w-[100px]">يمكن تجاوزه</TableHead>
                <TableHead className="w-[100px]">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validationRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        rule.severity === "critical" ? "destructive" : 
                        rule.severity === "warning" ? "warning" : 
                        "default"
                      }
                    >
                      {rule.severity === "critical" ? "حرج" : 
                       rule.severity === "warning" ? "تحذير" : "معلومات"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {rule.canOverride ? "نعم" : "لا"}
                  </TableCell>
                  <TableCell>
                    <Switch checked={rule.isActive} />
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

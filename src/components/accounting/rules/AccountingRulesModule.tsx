
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const AccountingRulesModule = () => {
  const basicRules = [
    {
      id: 1,
      name: "القيد المزدوج",
      description: "مجموع المدين يساوي مجموع الدائن في كل قيد محاسبي",
      category: "أساسي",
    },
    {
      id: 2,
      name: "الحسابات المدينة والدائنة",
      description: "زيادة الأصول والمصروفات على الجانب المدين، وزيادة الالتزامات والإيرادات وحقوق الملكية على الجانب الدائن",
      category: "أساسي",
    },
    {
      id: 3,
      name: "ترحيل القيود",
      description: "ترحيل القيود من اليومية العامة إلى الحسابات المعنية في الأستاذ العام",
      category: "عمليات",
    },
    {
      id: 4,
      name: "إقفال الفترات المحاسبية",
      description: "إقفال الحسابات المؤقتة (الإيرادات والمصروفات) في نهاية الفترة وترحيل الرصيد إلى الأرباح والخسائر",
      category: "عمليات",
    },
    {
      id: 5,
      name: "ثبات العملة",
      description: "استخدام عملة واحدة ثابتة لجميع القيود المحاسبية مع إمكانية تحويل العملات",
      category: "عمليات",
    },
    {
      id: 6,
      name: "تسلسل المستندات",
      description: "يجب أن تكون جميع المستندات والقيود متسلسلة بشكل منطقي ومتسلسل",
      category: "توثيق",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>قوانين وقواعد المحاسبة الأساسية</CardTitle>
        <CardDescription>القواعد الأساسية المطبقة في النظام المحاسبي</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead className="w-[200px]">القاعدة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead className="w-[100px]">التصنيف</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {basicRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>{rule.id}</TableCell>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.description}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        rule.category === "أساسي" ? "default" : 
                        rule.category === "عمليات" ? "secondary" : 
                        "outline"
                      }
                    >
                      {rule.category}
                    </Badge>
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

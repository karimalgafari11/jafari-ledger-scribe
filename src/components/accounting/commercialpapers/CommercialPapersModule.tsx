
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CommercialPapersModule = () => {
  const [activeTab, setActiveTab] = useState("incoming");

  // Mock data for commercial papers
  const incomingPapers = [
    { id: 1, number: "CP-001", date: "2024-04-15", dueDate: "2024-05-15", amount: 5000, issuer: "شركة الأمل", description: "كمبيالة مبيعات", status: "جاري" },
    { id: 2, number: "CP-002", date: "2024-04-10", dueDate: "2024-06-10", amount: 7500, issuer: "مؤسسة النور", description: "شيك ضمان", status: "مستحق" },
    { id: 3, number: "CP-003", date: "2024-03-22", dueDate: "2024-05-22", amount: 3200, issuer: "شركة الإعمار", description: "سند لأمر", status: "جاري" },
  ];

  const outgoingPapers = [
    { id: 1, number: "OP-001", date: "2024-04-05", dueDate: "2024-05-05", amount: 4200, receiver: "مؤسسة الوفاء", description: "كمبيالة مشتريات", status: "جاري" },
    { id: 2, number: "OP-002", date: "2024-03-15", dueDate: "2024-04-30", amount: 6800, receiver: "شركة التقدم", description: "شيك دفع", status: "مدفوع" },
  ];

  return (
    <Card className="shadow-sm mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">الأوراق التجارية</CardTitle>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              تصفية
            </Button>
            <Button className="bg-teal hover:bg-teal-dark text-white flex items-center gap-2">
              <Plus size={16} />
              إضافة ورقة جديدة
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="incoming">أوراق واردة</TabsTrigger>
            <TabsTrigger value="outgoing">أوراق صادرة</TabsTrigger>
          </TabsList>
          <TabsContent value="incoming">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الورقة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>تاريخ الاستحقاق</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>المصدر</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomingPapers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell>{paper.number}</TableCell>
                    <TableCell>{paper.date}</TableCell>
                    <TableCell>{paper.dueDate}</TableCell>
                    <TableCell>{paper.amount.toLocaleString()}</TableCell>
                    <TableCell>{paper.issuer}</TableCell>
                    <TableCell>{paper.description}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${paper.status === 'مستحق' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                        {paper.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <FileText size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="outgoing">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الورقة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>تاريخ الاستحقاق</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>المستلم</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outgoingPapers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell>{paper.number}</TableCell>
                    <TableCell>{paper.date}</TableCell>
                    <TableCell>{paper.dueDate}</TableCell>
                    <TableCell>{paper.amount.toLocaleString()}</TableCell>
                    <TableCell>{paper.receiver}</TableCell>
                    <TableCell>{paper.description}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${paper.status === 'مدفوع' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {paper.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <FileText size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

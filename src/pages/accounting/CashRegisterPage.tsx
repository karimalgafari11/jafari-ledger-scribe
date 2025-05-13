
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, ArrowUp, ArrowDown } from 'lucide-react';

const CashRegisterPage = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  
  return (
    <Layout>
      <PageContainer title="صندوق النقدية">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">إدارة صندوق النقدية</h1>
            <div className="space-x-2 flex">
              <Button size="sm">
                <ArrowDown className="mr-2 h-4 w-4" />
                تسجيل صرف
              </Button>
              <Button size="sm">
                <ArrowUp className="mr-2 h-4 w-4" />
                تسجيل قبض
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                صندوق جديد
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">الرصيد الحالي</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">15,230.50 ريال</p>
                <p className="text-xs text-muted-foreground">تم تحديثه: اليوم الساعة 10:45 ص</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المقبوضات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">3,750.00 ريال</p>
                <p className="text-xs text-muted-foreground">اليوم</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المصروفات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">1,250.00 ريال</p>
                <p className="text-xs text-muted-foreground">اليوم</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">عدد العمليات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">اليوم</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>سجل العمليات</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم العملية</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead className="text-left">المبلغ</TableHead>
                    <TableHead>الرصيد</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>CR-2023-001</TableCell>
                    <TableCell>2023/06/15 10:30</TableCell>
                    <TableCell className="text-green-600">قبض</TableCell>
                    <TableCell>تحصيل من العميل محمد أحمد</TableCell>
                    <TableCell className="text-left text-green-600">+1,500.00</TableCell>
                    <TableCell>15,230.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CR-2023-002</TableCell>
                    <TableCell>2023/06/15 09:45</TableCell>
                    <TableCell className="text-red-600">صرف</TableCell>
                    <TableCell>دفع مصاريف نثرية</TableCell>
                    <TableCell className="text-left text-red-600">-250.00</TableCell>
                    <TableCell>13,730.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CR-2023-003</TableCell>
                    <TableCell>2023/06/14 15:20</TableCell>
                    <TableCell className="text-green-600">قبض</TableCell>
                    <TableCell>تحصيل من العميل شركة الرياض</TableCell>
                    <TableCell className="text-left text-green-600">+2,250.00</TableCell>
                    <TableCell>13,980.50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default CashRegisterPage;

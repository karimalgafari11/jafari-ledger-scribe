
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Plus, ArrowUpDown, FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Transaction } from "@/types/transactions";

// سنضيف بيانات تجريبية لتمثيل عمليات الصندوق
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date("2023-05-01"),
    type: "payment",
    reference: "PAY-001",
    description: "دفع فاتورة مشتريات",
    debit: 0,
    credit: 2500,
    balance: 7500
  },
  {
    id: "2",
    date: new Date("2023-05-03"),
    type: "invoice",
    reference: "INV-023",
    description: "تحصيل فاتورة مبيعات",
    debit: 1800,
    credit: 0,
    balance: 9300
  },
  {
    id: "3",
    date: new Date("2023-05-05"),
    type: "payment",
    reference: "PAY-002",
    description: "دفع رواتب",
    debit: 0,
    credit: 4500,
    balance: 4800
  },
  {
    id: "4",
    date: new Date("2023-05-10"),
    type: "invoice",
    reference: "INV-025",
    description: "تحصيل فاتورة مبيعات",
    debit: 3200,
    credit: 0,
    balance: 8000
  }
];

export const CashTransactionsModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegister, setSelectedRegister] = useState("1");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.includes(searchTerm) || 
                         transaction.reference.includes(searchTerm);
    
    const matchesDate = !startDate || !endDate || 
                      (transaction.date >= startDate && transaction.date <= endDate);
                      
    return matchesSearch && matchesDate;
  });

  const getTransactionTypeStyle = (type: string) => {
    switch (type) {
      case "invoice":
        return "bg-green-100 text-green-800";
      case "payment":
        return "bg-red-100 text-red-800";
      case "return":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "invoice":
        return "تحصيل";
      case "payment":
        return "صرف";
      case "return":
        return "مرتجع";
      default:
        return type;
    }
  };

  const handleAddTransaction = () => {
    // سيتم تنفيذ هذه الوظيفة عند الضغط على زر إضافة عملية جديدة
    console.log("Add new transaction");
  };

  const handlePrintReport = () => {
    // سيتم تنفيذ هذه الوظيفة عند الضغط على زر طباعة التقرير
    console.log("Print report");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>عمليات الصندوق</CardTitle>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button onClick={handlePrintReport} variant="outline" size="sm">
            <FileText className="ml-2 h-4 w-4" />
            طباعة تقرير
          </Button>
          <Button onClick={handleAddTransaction} size="sm">
            <Plus className="ml-2 h-4 w-4" />
            عملية جديدة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-1 block">الصندوق</label>
            <Select value={selectedRegister} onValueChange={setSelectedRegister}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الصندوق" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">الصندوق الرئيسي</SelectItem>
                <SelectItem value="2">صندوق المشتريات</SelectItem>
                <SelectItem value="3">صندوق المبيعات</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">من تاريخ</label>
            <DatePicker 
              date={startDate} 
              onSelect={setStartDate} 
              locale={ar}
              placeholder="اختر التاريخ"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">إلى تاريخ</label>
            <DatePicker 
              date={endDate} 
              onSelect={setEndDate} 
              locale={ar}
              placeholder="اختر التاريخ"
            />
          </div>
          
          <div className="relative">
            <label className="text-sm font-medium mb-1 block">بحث</label>
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="بحث بالوصف أو المرجع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </div>

        <Separator className="my-4" />
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium">الرصيد الحالي</h3>
            <p className="text-2xl font-bold">٨,٠٠٠ ريال</p>
          </div>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <div className="text-center">
              <p className="text-sm text-gray-500">إجمالي الإيداعات</p>
              <p className="font-medium text-green-600">٥,٠٠٠ ريال</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">إجمالي المسحوبات</p>
              <p className="font-medium text-red-600">٧,٠٠٠ ريال</p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">التاريخ</TableHead>
                <TableHead className="w-[120px]">المرجع</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead className="w-[100px] text-left">النوع</TableHead>
                <TableHead className="w-[120px] text-left">مدين</TableHead>
                <TableHead className="w-[120px] text-left">دائن</TableHead>
                <TableHead className="w-[120px] text-left">الرصيد</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    لا توجد معاملات متطابقة مع معايير البحث
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {format(transaction.date, 'yyyy/MM/dd')}
                    </TableCell>
                    <TableCell>{transaction.reference}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge className={getTransactionTypeStyle(transaction.type)}>
                        {getTransactionTypeLabel(transaction.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      {transaction.debit > 0 ? transaction.debit.toLocaleString() : '-'}
                    </TableCell>
                    <TableCell className="text-left">
                      {transaction.credit > 0 ? transaction.credit.toLocaleString() : '-'}
                    </TableCell>
                    <TableCell className="text-left font-medium">
                      {transaction.balance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

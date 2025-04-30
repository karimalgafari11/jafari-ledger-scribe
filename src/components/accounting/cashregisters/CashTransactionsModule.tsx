
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft, Search, Filter, Plus, FileText } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "deposit" | "withdrawal";
  amount: number;
  register: string;
  description: string;
  reference: string;
  account: string;
}

export const CashTransactionsModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2025-04-29",
      type: "deposit",
      amount: 5000,
      register: "الصندوق الرئيسي",
      description: "إيداع مبيعات نقدية",
      reference: "INV-2025-042",
      account: "المبيعات النقدية"
    },
    {
      id: "2",
      date: "2025-04-28",
      type: "withdrawal",
      amount: 1200,
      register: "الصندوق الرئيسي",
      description: "سحب لدفع فواتير",
      reference: "EXP-2025-118",
      account: "مصاريف تشغيلية"
    },
    {
      id: "3",
      date: "2025-04-27",
      type: "deposit",
      amount: 3500,
      register: "صندوق المعرض",
      description: "إيداع من العميل أحمد",
      reference: "CUST-2025-073",
      account: "حسابات العملاء"
    },
    {
      id: "4",
      date: "2025-04-25",
      type: "withdrawal",
      amount: 800,
      register: "صندوق المعرض",
      description: "مصاريف نثرية",
      reference: "EXP-2025-115",
      account: "مصاريف نثرية"
    },
  ];

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.register.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleAddTransaction = () => {
    // To be implemented: open add transaction dialog
    console.log("Add transaction clicked");
  };

  const handleViewTransaction = (transaction: Transaction) => {
    // To be implemented: open view transaction dialog
    console.log("View transaction:", transaction);
  };

  return (
    <Card className="shadow-sm mt-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">حركات النقدية</CardTitle>
          <div className="flex space-x-2 gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
            <Button 
              className="bg-teal hover:bg-teal-dark text-white flex items-center gap-2"
              onClick={handleAddTransaction}
            >
              <Plus className="h-4 w-4" />
              تسجيل حركة جديدة
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full md:w-1/3 mb-4">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="بحث في الحركات..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pr-10"
          />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الصندوق</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>المرجع</TableHead>
                <TableHead>الحساب</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === "deposit" ? (
                        <>
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                          <span>إيداع</span>
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                          <span>سحب</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        transaction.type === "deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.amount.toLocaleString()} ر.س
                    </span>
                  </TableCell>
                  <TableCell>{transaction.register}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewTransaction(transaction)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CalendarDays, 
  FileText, 
  Search, 
  ArrowDown, 
  ArrowUp,
  Table as TableIcon
} from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAccounts } from "@/hooks/useAccounts";
import { useLedgerEntries } from "@/hooks/useLedgerEntries";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, BarChart } from "@/components/ui/charts";

const LedgerPage = () => {
  const [activeTab, setActiveTab] = useState("accounts");
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("all");
  const [accountId, setAccountId] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { accounts, filteredAccounts, searchAccounts } = useAccounts();
  const { 
    entries, 
    filteredEntries, 
    accountSummary, 
    filterEntriesByAccountId, 
    filterEntriesByPeriod, 
    searchEntries 
  } = useLedgerEntries();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (activeTab === "accounts") {
      searchAccounts(term);
    } else {
      searchEntries(term);
    }
  };

  const handleAccountClick = (id: string) => {
    setAccountId(id);
    setActiveTab("entries");
    filterEntriesByAccountId(id);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    filterEntriesByPeriod(value);
  };

  const accountsChartData = {
    labels: ["أصول", "التزامات", "حقوق ملكية", "إيرادات", "مصروفات"],
    datasets: [
      {
        label: "أرصدة الحسابات",
        data: [250000, 120000, 130000, 70000, 45000],
        backgroundColor: "rgba(54, 162, 235, 0.7)", // Changed from array to string
        borderColor: "rgba(54, 162, 235, 1)"
      }
    ]
  };

  const monthlyActivityData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "حركة مدينة",
        data: [65000, 70000, 80000, 81000, 76000, 75000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)"
      },
      {
        label: "حركة دائنة",
        data: [65000, 70000, 80000, 81000, 76000, 75000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)"
      }
    ]
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">دفتر الأستاذ العام</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center gap-2 ml-2">
            <FileText className="h-4 w-4" />
            تصدير التقرير
          </Button>
          <Button className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            طباعة كشف الحساب
          </Button>
        </div>
      </div>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4 mb-4 rtl">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في الحسابات أو الحركات..."
              className="pl-10 pr-10 rtl"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الفترات</SelectItem>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="this-week">هذا الأسبوع</SelectItem>
              <SelectItem value="this-month">هذا الشهر</SelectItem>
              <SelectItem value="this-quarter">هذا الربع</SelectItem>
              <SelectItem value="this-year">هذا العام</SelectItem>
              <SelectItem value="custom">فترة مخصصة</SelectItem>
            </SelectContent>
          </Select>

          {period === "custom" && (
            <div className="flex gap-2">
              <DatePicker 
                date={startDate} 
                onDateChange={setStartDate} 
                placeholder="تاريخ البداية" 
              />
              <span className="self-center">إلى</span>
              <DatePicker 
                date={endDate} 
                onDateChange={setEndDate} 
                placeholder="تاريخ النهاية" 
              />
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 rtl">
          <TabsTrigger value="accounts" className="flex justify-center gap-2">
            <TableIcon className="h-4 w-4" />
            شجرة الحسابات
          </TabsTrigger>
          <TabsTrigger value="entries" className="flex justify-center gap-2">
            <FileText className="h-4 w-4" />
            حركات الحسابات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>شجرة الحسابات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="col-span-1 md:col-span-2">
                  <CardContent className="pt-6">
                    <Table striped>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/4">رقم الحساب</TableHead>
                          <TableHead className="w-1/3">اسم الحساب</TableHead>
                          <TableHead className="w-1/6">النوع</TableHead>
                          <TableHead className="w-1/4 text-left">الرصيد</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAccounts.slice(0, 10).map((account) => (
                          <TableRow 
                            key={account.id} 
                            className="cursor-pointer hover:bg-muted"
                            onClick={() => handleAccountClick(account.id)}
                          >
                            <TableCell className="font-medium">{account.number}</TableCell>
                            <TableCell>{account.name}</TableCell>
                            <TableCell>
                              <Badge variant={account.type === 'asset' ? "default" : 
                                      account.type === 'liability' ? "destructive" :
                                      account.type === 'equity' ? "secondary" :
                                      account.type === 'revenue' ? "success" : "warning"}>
                                {account.type === 'asset' ? "أصول" : 
                                account.type === 'liability' ? "التزامات" :
                                account.type === 'equity' ? "حقوق ملكية" :
                                account.type === 'revenue' ? "إيرادات" : "مصروفات"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-left">
                              <span className={account.balance >= 0 ? "text-green-600" : "text-red-600"}>
                                {account.balance.toLocaleString()} ريال
                                {account.balance >= 0 ? 
                                  <ArrowUp className="h-4 w-4 inline-block mr-1" /> : 
                                  <ArrowDown className="h-4 w-4 inline-block mr-1" />
                                }
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>توزيع الحسابات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart className="h-72" data={accountsChartData} />
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>الحركة الشهرية للحسابات</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart className="h-80" data={monthlyActivityData} />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entries" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {accountId ? 
                  `حركات الحساب: ${accounts.find(a => a.id === accountId)?.name || ""}` : 
                  "جميع حركات الحسابات"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-blue-600">الرصيد الحالي</p>
                    <p className="text-3xl font-bold mt-2">{accountSummary.balance.toLocaleString()} ريال</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-green-600">إجمالي الحركات المدينة</p>
                    <p className="text-3xl font-bold mt-2">{accountSummary.totalDebit.toLocaleString()} ريال</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-red-600">إجمالي الحركات الدائنة</p>
                    <p className="text-3xl font-bold mt-2">{accountSummary.totalCredit.toLocaleString()} ريال</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-purple-600">عدد الحركات</p>
                    <p className="text-3xl font-bold mt-2">{accountSummary.entriesCount}</p>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>البيان</TableHead>
                    <TableHead>المرجع</TableHead>
                    <TableHead>مدين</TableHead>
                    <TableHead>دائن</TableHead>
                    <TableHead>الرصيد</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {new Date(entry.date).toLocaleDateString('ar-SA')}
                      </TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell className={entry.debit > 0 ? "text-blue-600 font-medium" : ""}>
                        {entry.debit > 0 ? entry.debit.toLocaleString() : "-"}
                      </TableCell>
                      <TableCell className={entry.credit > 0 ? "text-red-600 font-medium" : ""}>
                        {entry.credit > 0 ? entry.credit.toLocaleString() : "-"}
                      </TableCell>
                      <TableCell className={entry.balance >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {entry.balance.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LedgerPage;


import React, { useState, useMemo } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Search, Filter, Download, Share2, WhatsApp, RefreshCw, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useLedgerEntries } from "@/hooks/useLedgerEntries";
import { LedgerAccountsList } from "@/components/accounting/ledger/LedgerAccountsList";
import { TransactionDetails } from "@/components/accounting/ledger/TransactionDetails";
import { AccountSummaryCard } from "@/components/accounting/ledger/AccountSummaryCard";
import { LedgerFilters } from "@/components/accounting/ledger/LedgerFilters";
import { LedgerExportDialog } from "@/components/accounting/ledger/LedgerExportDialog";
import { LedgerShareDialog } from "@/components/accounting/ledger/LedgerShareDialog";
import { LedgerTransactionDialog } from "@/components/accounting/ledger/LedgerTransactionDialog";

const LedgerPage = () => {
  const {
    entries,
    filteredEntries,
    accountSummary,
    searchEntries,
    filterEntriesByAccountId,
    filterEntriesByPeriod,
    getAllAccounts,
    currentAccount
  } = useLedgerEntries();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [transactionMode, setTransactionMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  const accounts = useMemo(() => getAllAccounts(), [getAllAccounts]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    searchEntries(value);
  };

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId);
    filterEntriesByAccountId(accountId);
  };

  const handlePeriodSelect = (period: string) => {
    filterEntriesByPeriod(period);
  };

  const handleAddTransaction = () => {
    setTransactionMode('add');
    setSelectedTransaction(null);
    setIsTransactionDialogOpen(true);
  };

  const handleEditTransaction = (transaction: any) => {
    setTransactionMode('edit');
    setSelectedTransaction(transaction);
    setIsTransactionDialogOpen(true);
  };

  const handleViewTransaction = (transaction: any) => {
    setTransactionMode('view');
    setSelectedTransaction(transaction);
    setIsTransactionDialogOpen(true);
  };

  const handleExportClick = () => {
    setIsExportDialogOpen(true);
  };

  const handleShareClick = () => {
    setIsShareDialogOpen(true);
  };

  return (
    <PageContainer title="دفتر الأستاذ" className="p-0">
      <div className="flex flex-col h-full">
        {/* Header Actions */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportClick}>
              <FileSpreadsheet className="ml-2 h-4 w-4" /> تصدير
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareClick}>
              <Share2 className="ml-2 h-4 w-4" /> مشاركة
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="ml-2 h-4 w-4" /> تحديث
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddTransaction}>
              إضافة حركة جديدة
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-4 p-4 flex-1 overflow-auto">
          {/* Sidebar - Accounts List */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-3">
                <div className="mb-2">
                  <Input
                    placeholder="بحث عن حساب..."
                    className="mb-2"
                  />
                </div>
                <LedgerAccountsList 
                  accounts={accounts} 
                  selectedAccountId={selectedAccountId}
                  onSelectAccount={handleAccountSelect}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="flex flex-col h-full gap-4">
              {/* Filters and Search */}
              <Card>
                <CardContent className="p-4">
                  <LedgerFilters 
                    onSearch={handleSearch} 
                    searchTerm={searchTerm}
                    onPeriodSelect={handlePeriodSelect} 
                  />
                </CardContent>
              </Card>
              
              {/* Account Summary */}
              {currentAccount && (
                <AccountSummaryCard 
                  account={currentAccount} 
                  summary={accountSummary} 
                />
              )}
              
              {/* Transactions */}
              <Card className="flex-1">
                <CardContent className="p-0 h-full">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">حركة الحساب</h3>
                  </div>
                  <div className="overflow-auto max-h-[500px]">
                    <Table stickyHeader hoverable striped>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">التاريخ</TableHead>
                          <TableHead>المرجع</TableHead>
                          <TableHead>البيان</TableHead>
                          <TableHead className="text-left">مدين</TableHead>
                          <TableHead className="text-left">دائن</TableHead>
                          <TableHead className="text-left">الرصيد</TableHead>
                          <TableHead className="text-center">الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEntries.length > 0 ? filteredEntries.map(entry => (
                          <TableRow key={entry.id} onClick={() => handleViewTransaction(entry)}>
                            <TableCell className="font-medium">{new Date(entry.date).toLocaleDateString('ar-SA')}</TableCell>
                            <TableCell>{entry.reference}</TableCell>
                            <TableCell>{entry.description}</TableCell>
                            <TableCell className="text-left font-mono">
                              {entry.debit > 0 ? entry.debit.toLocaleString('ar-SA') : ''}
                            </TableCell>
                            <TableCell className="text-left font-mono">
                              {entry.credit > 0 ? entry.credit.toLocaleString('ar-SA') : ''}
                            </TableCell>
                            <TableCell className="text-left font-mono">
                              {entry.balance.toLocaleString('ar-SA')}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex justify-center gap-1">
                                <Button 
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditTransaction(entry);
                                  }}
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              لا توجد حركات مالية للعرض
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <LedgerExportDialog 
        open={isExportDialogOpen} 
        onOpenChange={setIsExportDialogOpen}
        data={filteredEntries}
        accountName={currentAccount?.name}
      />
      
      <LedgerShareDialog 
        open={isShareDialogOpen} 
        onOpenChange={setIsShareDialogOpen}
        data={filteredEntries}
        accountName={currentAccount?.name}
      />
      
      <LedgerTransactionDialog
        open={isTransactionDialogOpen}
        onOpenChange={setIsTransactionDialogOpen}
        mode={transactionMode}
        transaction={selectedTransaction}
        accountId={selectedAccountId}
      />
    </PageContainer>
  );
};

export default LedgerPage;

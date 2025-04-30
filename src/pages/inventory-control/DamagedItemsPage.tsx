
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Download, FileText, Share2, Settings } from "lucide-react";
import { DataGrid } from "@/components/inventory/DataGrid";
import { useDamagedItems } from "@/hooks/useDamagedItems";
import { PageSettings } from "@/components/inventory-control/PageSettings";
import { DamagedItemDialog } from "@/components/inventory-control/DamagedItemDialog";
import { createDamagedItemColumns } from "@/components/inventory-control/DamagedItemColumns";
import { createDamagedItemActions } from "@/components/inventory-control/DamagedItemActions";

export default function DamagedItemsPage() {
  const {
    items, 
    searchQuery, 
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    deleteItem,
    selectedItems,
    toggleItemSelection,
    clearSelectedItems,
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    calculateTotals
  } = useDamagedItems();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);

  const columns = createDamagedItemColumns({
    formatDate: (date) => new Intl.DateTimeFormat('ar-SA').format(date),
    currency: selectedCurrency
  });

  const actions = createDamagedItemActions({
    onViewDetails: (id) => setEditItemId(id),
    onExportItem: (id) => exportToPdf([items.find(item => item.id === id)]),
    onDelete: (id) => deleteItem(id),
  });

  const handleAddNew = () => {
    setEditItemId(null);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditItemId(null);
  };

  const exportToPdf = (itemsToExport = items) => {
    console.log("Exporting to PDF:", itemsToExport);
    // In a real implementation, we would generate a PDF here
    alert("تم تحويل القائمة إلى PDF");
  };

  const shareToWhatsApp = () => {
    // In a real implementation, we would share to WhatsApp
    console.log("Sharing to WhatsApp");
    alert("تمت مشاركة القائمة عبر واتساب");
  };

  const { totalQuantity, totalValue } = calculateTotals(items);

  return (
    <Layout>
      <div className="container mx-auto p-4 rtl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">تسجيل قطع الغيار التالفة</h1>
          <Button variant="outline" size="icon" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Registration Form */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">إنشاء أمر تسجيل قطع غيار تالفة</h2>
            <div className="text-sm text-gray-500">
              الرقم التسلسلي: {new Date().getTime().toString().substring(6)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">المستودع</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستودع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="w1">المستودع الرئيسي</SelectItem>
                  <SelectItem value="w2">مستودع جدة</SelectItem>
                  <SelectItem value="w3">مستودع الدمام</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">تاريخ التسجيل</label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">العملة</label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر العملة" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.name} ({currency.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">سبب التلف</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر سبب التلف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expired">منتهي الصلاحية</SelectItem>
                <SelectItem value="damaged">تلف أثناء التخزين</SelectItem>
                <SelectItem value="broken">كسر</SelectItem>
                <SelectItem value="quality">مشاكل جودة</SelectItem>
                <SelectItem value="other">أسباب أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ملاحظات</label>
            <Input placeholder="أضف ملاحظات حول سبب التلف" />
          </div>

          <Button onClick={handleAddNew}>إضافة قطعة غيار</Button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="بحث عن قطع الغيار التالفة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select 
                value={filterOptions.reason} 
                onValueChange={(value) => setFilterOptions({...filterOptions, reason: value})}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="سبب التلف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="expired">منتهي الصلاحية</SelectItem>
                  <SelectItem value="damaged">تلف أثناء التخزين</SelectItem>
                  <SelectItem value="broken">كسر</SelectItem>
                  <SelectItem value="quality">مشاكل جودة</SelectItem>
                  <SelectItem value="other">أسباب أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select 
                value={filterOptions.warehouseId} 
                onValueChange={(value) => setFilterOptions({...filterOptions, warehouseId: value})}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="المستودع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="w1">المستودع الرئيسي</SelectItem>
                  <SelectItem value="w2">مستودع جدة</SelectItem>
                  <SelectItem value="w3">مستودع الدمام</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <DataGrid
            data={items}
            columns={columns}
            actions={actions}
            selectable={true}
            selectedRows={selectedItems}
            onToggleSelection={toggleItemSelection}
            onSelectAll={(selected) => {
              if (selected) {
                items.forEach(item => toggleItemSelection(item.id));
              } else {
                clearSelectedItems();
              }
            }}
            idField="id"
            emptyMessage="لا توجد قطع غيار تالفة حالياً"
          />
          
          {/* Totals and Actions */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex gap-4">
                <div>
                  <span className="text-sm font-medium">إجمالي الكمية:</span>{" "}
                  <span className="font-bold">{totalQuantity}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">إجمالي القيمة:</span>{" "}
                  <span className="font-bold">{totalValue.toFixed(2)} {currencies.find(c => c.code === selectedCurrency)?.symbol}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => exportToPdf()}>
                  <Download className="h-4 w-4 ml-1" />
                  <span>تصدير PDF</span>
                </Button>
                <Button variant="outline" size="sm" onClick={shareToWhatsApp}>
                  <Share2 className="h-4 w-4 ml-1" />
                  <span>مشاركة</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {items.some(item => item.quantity <= item.reorderLevel) && (
          <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">تنبيه: قطع غيار بحاجة إلى إعادة طلب</h3>
              <p className="text-sm text-amber-600">
                بعض قطع الغيار قد تحتاج إلى إعادة طلب. يرجى مراجعة صفحة إعادة الطلب.
              </p>
            </div>
          </div>
        )}

        {/* Dialogs */}
        {(isAddDialogOpen || editItemId) && (
          <DamagedItemDialog
            itemId={editItemId}
            onClose={handleCloseDialog}
          />
        )}
        
        {isSettingsOpen && (
          <PageSettings
            onClose={() => setIsSettingsOpen(false)}
            currency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
          />
        )}
      </div>
    </Layout>
  );
}

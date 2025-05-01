
import { Header } from "@/components/Header";
import { TransferForm } from "@/components/inventory-control/TransferForm";
import { TransferHistory } from "@/components/inventory-control/TransferHistory";
import { ItemsTable } from "@/components/inventory-control/ItemsTable";
import { PageSettings } from "@/components/inventory-control/PageSettings";
import { Warehouse, Table2, Settings, Share, FileText, Download } from "lucide-react";
import { useInventoryTransfer } from "@/hooks/useInventoryTransfer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TransferPage() {
  const { transfers } = useInventoryTransfer();
  const [currency, setCurrency] = useState("ر.س");
  const [showSettings, setShowSettings] = useState(false);
  const isMobile = useIsMobile();

  const handleShareWhatsApp = () => {
    toast.info("جاري مشاركة البيانات عبر واتساب");
  };

  const handleDownloadPDF = () => {
    toast.info("جاري تحميل البيانات بصيغة PDF");
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    toast.success(`تم تغيير العملة إلى ${newCurrency}`);
  };

  return (
    <div className="min-h-screen max-h-screen flex flex-col overflow-hidden bg-gray-50 w-full">
      <div className="sticky top-0 z-10 bg-white shadow-sm w-full">
        <Header title="نقل داخلي بين المستودعات" showBack={true} />
        <div className="w-full px-4 md:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm font-medium">
              رقم العملية: #INV-{String(Date.now()).slice(-6)}
            </Badge>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size={isMobile ? "icon" : "sm"}
              onClick={handleShareWhatsApp}
              title="مشاركة عبر واتساب"
            >
              <Share className="h-4 w-4 text-green-600" />
              {!isMobile && <span>مشاركة</span>}
            </Button>
            <Button
              variant="ghost"
              size={isMobile ? "icon" : "sm"}
              onClick={handleDownloadPDF}
              title="تنزيل PDF"
            >
              <FileText className="h-4 w-4 text-blue-600" />
              {!isMobile && <span>PDF</span>}
            </Button>
            <Button
              variant="ghost"
              size={isMobile ? "icon" : "sm"}
              onClick={() => setShowSettings(true)}
              title="إعدادات الصفحة"
            >
              <Settings className="h-4 w-4 text-gray-600" />
              {!isMobile && <span>إعدادات</span>}
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto w-full px-4 md:px-6 py-4 space-y-4 md:space-y-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="bg-blue-50 p-3 rounded-full shrink-0 self-center md:self-auto">
            <Warehouse className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-center md:text-right">نقل بين المستودعات</h2>
            <p className="text-gray-500 text-sm text-center md:text-right">
              قم بنقل الأصناف بين المستودعات المختلفة وتتبع حركة المخزون بسهولة
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-medium mb-3">إنشاء أمر نقل جديد</h2>
          <TransferForm />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <Table2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-medium">جدول المواد</h2>
          </div>
          <div className="overflow-x-auto">
            <ItemsTable currency={currency} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">عمليات النقل الأخيرة</h2>
          <TransferHistory />
        </section>
      </main>
      
      {showSettings && (
        <PageSettings 
          onClose={() => setShowSettings(false)} 
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
        />
      )}
    </div>
  );
}

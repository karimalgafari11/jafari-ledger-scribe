
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

export default function TransferPage() {
  const { transfers } = useInventoryTransfer();
  const [currency, setCurrency] = useState("ر.س");
  const [showSettings, setShowSettings] = useState(false);

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
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="نقل داخلي بين المستودعات" showBack={true} />
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm font-medium">
              رقم العملية: #INV-{String(Date.now()).slice(-6)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareWhatsApp}
              title="مشاركة عبر واتساب"
            >
              <Share className="h-5 w-5 text-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadPDF}
              title="تنزيل PDF"
            >
              <FileText className="h-5 w-5 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              title="إعدادات الصفحة"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center space-x-4 rtl:space-x-reverse">
          <div className="bg-blue-50 p-3 rounded-full">
            <Warehouse className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium">نقل بين المستودعات</h2>
            <p className="text-gray-500 text-sm">
              قم بنقل الأصناف بين المستودعات المختلفة وتتبع حركة المخزون بسهولة
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-medium mb-4">إنشاء أمر نقل جديد</h2>
          <TransferForm />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Table2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-medium">جدول المواد</h2>
          </div>
          <ItemsTable currency={currency} />
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4">عمليات النقل الأخيرة</h2>
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

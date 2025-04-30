
import { Header } from "@/components/Header";
import { TransferForm } from "@/components/inventory-control/TransferForm";
import { TransferHistory } from "@/components/inventory-control/TransferHistory";
import { ItemsTable } from "@/components/inventory-control/ItemsTable";
import { Warehouse, Table2 } from "lucide-react";
import { useInventoryTransfer } from "@/hooks/useInventoryTransfer";

export default function TransferPage() {
  const { transfers } = useInventoryTransfer();

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="نقل داخلي بين المستودعات" showBack={true} />
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
          <div className="flex items-center gap-2 mb-4">
            <Table2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-medium">جدول المواد</h2>
          </div>
          <ItemsTable />
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4">إنشاء أمر نقل جديد</h2>
          <TransferForm />
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4">عمليات النقل الأخيرة</h2>
          <TransferHistory />
        </section>
      </main>
    </div>
  );
}

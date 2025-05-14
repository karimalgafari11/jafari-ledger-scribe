
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CashRegistersModule } from "@/components/accounting/cashregisters/CashRegistersModule";
import { CashTransactionsModule } from "@/components/accounting/cashregisters/CashTransactionsModule";

const CashRegisterPage = () => {
  const [activeTab, setActiveTab] = React.useState("registers");

  return (
    <Layout className="h-screen overflow-hidden">
      <div className="flex flex-col h-screen w-full overflow-hidden rtl">
        <Header title="إدارة صناديق النقدية" showBack={true} />
        
        <div className="flex-1 overflow-auto p-4 pb-16">
          <Tabs defaultValue="registers" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-2">
              <TabsTrigger value="registers">الصناديق</TabsTrigger>
              <TabsTrigger value="transactions">العمليات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="registers" className="mt-2">
              <CashRegistersModule />
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-2">
              <CashTransactionsModule />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CashRegisterPage;

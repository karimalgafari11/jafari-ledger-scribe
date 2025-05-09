
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { CurrenciesModule } from "@/components/definitions/currencies/CurrenciesModule";
import { ExchangeRatesModule } from "@/components/definitions/currencies/ExchangeRatesModule";
import { ExchangeRateDifferencesModule } from "@/components/definitions/currencies/ExchangeRateDifferencesModule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CurrenciesPage = () => {
  const [activeTab, setActiveTab] = useState("currencies");

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full overflow-hidden rtl">
        <Header title="إدارة العملات وأسعار الصرف" showBack={true} />
        
        <div className="flex-1 overflow-auto p-4 pb-16">
          <Tabs defaultValue="currencies" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="currencies">العملات</TabsTrigger>
              <TabsTrigger value="rates">أسعار الصرف</TabsTrigger>
              <TabsTrigger value="differences">فروق العملات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="currencies">
              <CurrenciesModule />
            </TabsContent>
            
            <TabsContent value="rates">
              <ExchangeRatesModule />
            </TabsContent>
            
            <TabsContent value="differences">
              <ExchangeRateDifferencesModule />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CurrenciesPage;

import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { CurrenciesModule } from "@/components/definitions/currencies/CurrenciesModule";
import { ExchangeRatesModule } from "@/components/definitions/currencies/ExchangeRatesModule";
import { ExchangeRateDifferencesModule } from "@/components/definitions/currencies/ExchangeRateDifferencesModule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const CurrenciesPage = () => {
  const [activeTab, setActiveTab] = useState("currencies");
  return <Layout>
      <div className="container mx-auto p-6 rtl py-0 px-[3px]">
        <Header title="إدارة العملات وأسعار الصرف" showBack={true} />
        
        <Tabs defaultValue="currencies" value={activeTab} onValueChange={setActiveTab} className="mt-6">
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
    </Layout>;
};
export default CurrenciesPage;
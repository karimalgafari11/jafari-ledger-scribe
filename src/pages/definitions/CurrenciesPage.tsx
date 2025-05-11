
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { CurrenciesModule } from "@/components/definitions/currencies/CurrenciesModule";
import { ExchangeRatesModule } from "@/components/definitions/currencies/ExchangeRatesModule";
import { ExchangeRateDifferencesModule } from "@/components/definitions/currencies/ExchangeRateDifferencesModule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CurrenciesPage = () => {
  const [activeTab, setActiveTab] = useState("currencies");

  return (
    <PageContainer title="إدارة العملات وأسعار الصرف">
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
    </PageContainer>
  );
};

export default CurrenciesPage;

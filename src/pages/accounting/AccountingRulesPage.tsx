
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountingRulesModule } from "@/components/accounting/rules/AccountingRulesModule";
import { AutomaticEntriesModule } from "@/components/accounting/rules/AutomaticEntriesModule";
import { ValidationRulesModule } from "@/components/accounting/rules/ValidationRulesModule";

const AccountingRulesPage = () => {
  const [activeTab, setActiveTab] = useState("basic-rules");

  return (
    <Layout>
      <div className="container mx-auto p-6 rtl py-0 px-[3px]">
        <Header title="قوانين وأوامر المحاسبة" showBack={true} />
        
        <Tabs defaultValue="basic-rules" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="basic-rules">القواعد الأساسية</TabsTrigger>
            <TabsTrigger value="automatic-entries">القيود التلقائية</TabsTrigger>
            <TabsTrigger value="validation-rules">قواعد التحقق</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic-rules">
            <AccountingRulesModule />
          </TabsContent>
          
          <TabsContent value="automatic-entries">
            <AutomaticEntriesModule />
          </TabsContent>
          
          <TabsContent value="validation-rules">
            <ValidationRulesModule />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AccountingRulesPage;

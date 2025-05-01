
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
      <div className="flex flex-col h-screen w-full overflow-hidden rtl">
        <Header title="قوانين وأوامر المحاسبة" showBack={true} />
        
        <div className="flex-1 overflow-auto p-4 pb-16">
          <Tabs defaultValue="basic-rules" value={activeTab} onValueChange={setActiveTab} className="mt-4">
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
      </div>
    </Layout>
  );
};

export default AccountingRulesPage;


import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccountingSettings } from "@/hooks/useAccountingSettings";
import { GeneralSettings } from "./GeneralSettings";
import { TaxSettings } from "./TaxSettings";
import { ClosingMethodsSettings } from "./ClosingMethodsSettings";
import { AutomationSettings } from "./AutomationSettings";
import { SettingsTabType } from "@/types/accountingSettings";

export const SettingsTabs = () => {
  const { activeTab, setActiveTab } = useAccountingSettings();

  const handleTabChange = (value: string) => {
    setActiveTab(value as SettingsTabType);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="general">الإعدادات العامة</TabsTrigger>
        <TabsTrigger value="tax">إعدادات الضرائب</TabsTrigger>
        <TabsTrigger value="closing">طرق الإقفال</TabsTrigger>
        <TabsTrigger value="automation">الأتمتة</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralSettings />
      </TabsContent>

      <TabsContent value="tax">
        <TaxSettings />
      </TabsContent>

      <TabsContent value="closing">
        <ClosingMethodsSettings />
      </TabsContent>

      <TabsContent value="automation">
        <AutomationSettings />
      </TabsContent>
    </Tabs>
  );
};

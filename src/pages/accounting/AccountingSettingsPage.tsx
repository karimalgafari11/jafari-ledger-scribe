
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { SettingsTabs } from "@/components/accounting/settings/SettingsTabs";
import { AccountingSettings } from "@/types/accountingSettings";
import { AccountDialogsProvider } from "@/components/accounting/AccountDialogsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccountingSettings } from "@/hooks/useAccountingSettings";

const AccountingSettingsPage = () => {
  const { settings, resetToDefaults, isLoading } = useAccountingSettings();

  return (
    <Layout className="h-screen overflow-hidden">
      <div className="flex flex-col h-full w-full">
        <Header title="الإعدادات المحاسبية" showBack={true} />
        <div className="flex-1 overflow-auto p-6">
          <AccountDialogsProvider>
            <div className="max-w-6xl mx-auto">
              <Card className="mb-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>إعدادات النظام المحاسبي</CardTitle>
                      <CardDescription>
                        تخصيص الإعدادات والقواعد المحاسبية للنظام المالي الخاص بك
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button variant="outline" onClick={resetToDefaults} disabled={isLoading}>
                        <RefreshCw className="ml-2 h-4 w-4" />
                        إعادة تعيين
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <SettingsTabs />
                </CardContent>
              </Card>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="ml-4 flex-shrink-0 mt-1">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-blue-600" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-blue-900">هل تعلم؟</h3>
                    <p className="mt-1 text-sm text-blue-700">
                      تؤثر الإعدادات المحاسبية على طريقة عمل النظام المالي بأكمله. 
                      يفضل مراجعة هذه الإعدادات مع المحاسب القانوني أو المستشار المالي قبل تغييرها.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccountDialogsProvider>
        </div>
      </div>
    </Layout>
  );
};

export default AccountingSettingsPage;

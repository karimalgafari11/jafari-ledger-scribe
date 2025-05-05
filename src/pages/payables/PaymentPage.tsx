
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentForm } from "@/components/payables/PaymentForm";
import { PaymentHistory } from "@/components/payables/PaymentHistory";
import { PaymentStats } from "@/components/payables/PaymentStats";
import { usePaymentPage } from "@/hooks/usePaymentPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentPage = () => {
  const {
    vendorData,
    paymentStats,
    paymentHistory,
    handlePaymentSubmit,
    isLoading
  } = usePaymentPage();
  
  const [activeTab, setActiveTab] = useState("payment");

  return (
    <Layout>
      <div className="container p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-6">سداد المستحقات</h1>
        
        <PaymentStats stats={paymentStats} />
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>إدارة عمليات السداد</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="rtl">
              <TabsList className="mb-6">
                <TabsTrigger value="payment">تسجيل عملية سداد</TabsTrigger>
                <TabsTrigger value="history">سجل المدفوعات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="payment">
                <PaymentForm 
                  vendors={vendorData}
                  onSubmit={handlePaymentSubmit}
                  isLoading={isLoading}
                />
              </TabsContent>
              
              <TabsContent value="history">
                <PaymentHistory payments={paymentHistory} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentPage;

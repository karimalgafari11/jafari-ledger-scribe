
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentForm } from "@/components/payables/PaymentForm";
import { PaymentHistory } from "@/components/payables/PaymentHistory";
import { PaymentStats } from "@/components/payables/PaymentStats";
import { usePaymentPage } from "@/hooks/usePaymentPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Receipt, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const {
    vendorData,
    invoiceData,
    bankAccountsData,
    cashRegistersData,
    paymentStats,
    paymentHistory,
    handlePaymentSubmit,
    isLoading
  } = usePaymentPage();
  
  const [activeTab, setActiveTab] = useState("payment");

  const handleBack = () => {
    navigate("/payables");
  };

  return (
    <Layout>
      <div className="container p-4 md:p-6 mx-auto">
        {/* رأس الصفحة */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="h-8 w-8"
              >
                <ArrowLeft size={18} />
              </Button>
              <h1 className="text-2xl font-bold">سداد المستحقات</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              إدارة عمليات سداد مستحقات الموردين وتسجيل الدفعات
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/payables/accounts")}
              className="flex items-center gap-2"
            >
              <Receipt size={16} />
              <span>كشوف حساب</span>
            </Button>
            <Button
              onClick={() => {
                setActiveTab("payment");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              <span>دفعة جديدة</span>
            </Button>
          </div>
        </div>
        
        {/* إحصائيات المدفوعات */}
        <PaymentStats stats={paymentStats} />
        
        {/* التبويبات الرئيسية */}
        <Card className="mb-6 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-3">
            <CardTitle>إدارة عمليات السداد</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full rtl">
              <div className="px-6 pt-6">
                <TabsList className="mb-2 w-full sm:w-auto grid grid-cols-2 sm:inline-flex h-auto p-1">
                  <TabsTrigger value="payment" className="rounded py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    تسجيل عملية سداد
                  </TabsTrigger>
                  <TabsTrigger value="history" className="rounded py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    سجل المدفوعات
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <Separator className="mt-2" />
              
              <div className="p-6">
                <TabsContent value="payment" className="mt-0">
                  <PaymentForm 
                    vendors={vendorData}
                    invoices={invoiceData}
                    bankAccounts={bankAccountsData}
                    cashRegisters={cashRegistersData}
                    onSubmit={handlePaymentSubmit}
                    isLoading={isLoading}
                  />
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <PaymentHistory payments={paymentHistory} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentPage;

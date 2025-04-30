
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BranchesModule } from "@/components/definitions/branches/BranchesModule";
import { WarehousesModule } from "@/components/definitions/warehouses/WarehousesModule";
import { CostCentersTab } from "@/components/definitions/costcenters/CostCentersTab";
import { BanksModule } from "@/components/definitions/banks/BanksModule";
import { CurrenciesModule } from "@/components/definitions/currencies/CurrenciesModule";
import { AccountingPeriodsModule } from "@/components/definitions/periods/AccountingPeriodsModule";
import { VoucherTypesModule } from "@/components/definitions/vouchertypes/VoucherTypesModule";
import { PaymentMethodsModule } from "@/components/definitions/paymentmethods/PaymentMethodsModule";
import { SalesRepsModule } from "@/components/definitions/salesreps/SalesRepsModule";
import { 
  Building, 
  Database, 
  Tag, 
  Calendar, 
  Currency, 
  FileText, 
  Banknote, 
  Users, 
  ListCheck 
} from "lucide-react";

const BasicDefinitionsPage = () => {
  const [activeTab, setActiveTab] = useState("branches");

  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <Header title="التعاريف الأساسية" showBack={true} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="branches" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>الفروع</span>
            </TabsTrigger>
            <TabsTrigger value="warehouses" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>المستودعات</span>
            </TabsTrigger>
            <TabsTrigger value="costcenters" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>مراكز الكلفة</span>
            </TabsTrigger>
            <TabsTrigger value="banks" className="flex items-center gap-2">
              <Banknote className="h-4 w-4" />
              <span>البنوك</span>
            </TabsTrigger>
            <TabsTrigger value="currencies" className="flex items-center gap-2">
              <Currency className="h-4 w-4" />
              <span>العملات</span>
            </TabsTrigger>
            <TabsTrigger value="periods" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>الفترات المحاسبية</span>
            </TabsTrigger>
            <TabsTrigger value="voucher-types" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>أنواع القيود</span>
            </TabsTrigger>
            <TabsTrigger value="payment-methods" className="flex items-center gap-2">
              <ListCheck className="h-4 w-4" />
              <span>طرق الدفع</span>
            </TabsTrigger>
            <TabsTrigger value="sales-reps" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>مندوبي المبيعات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="branches">
            <BranchesModule />
          </TabsContent>
          <TabsContent value="warehouses">
            <WarehousesModule />
          </TabsContent>
          <TabsContent value="costcenters">
            <CostCentersTab />
          </TabsContent>
          <TabsContent value="banks">
            <BanksModule />
          </TabsContent>
          <TabsContent value="currencies">
            <CurrenciesModule />
          </TabsContent>
          <TabsContent value="periods">
            <AccountingPeriodsModule />
          </TabsContent>
          <TabsContent value="voucher-types">
            <VoucherTypesModule />
          </TabsContent>
          <TabsContent value="payment-methods">
            <PaymentMethodsModule />
          </TabsContent>
          <TabsContent value="sales-reps">
            <SalesRepsModule />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BasicDefinitionsPage;


import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { CashRegistersModule } from "@/components/definitions/cashregisters/CashRegistersModule";

const CashRegistersPage = () => {
  return (
    <PageContainer title="إدارة الصناديق النقدية">
      <div className="p-6">
        <CashRegistersModule />
      </div>
    </PageContainer>
  );
};

export default CashRegistersPage;

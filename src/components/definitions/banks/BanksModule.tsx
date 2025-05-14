
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BanksTable } from "./BanksTable";
import { BanksToolbar } from "./BanksToolbar";
import { useBanks } from "@/hooks/useBanks";

export const BanksModule = () => {
  const {
    filteredBanks,
    isLoading,
    searchTerm,
    setSearchTerm,
    createBank,
    updateBank,
    deleteBank,
    toggleBankStatus,
  } = useBanks();

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة البنوك</CardTitle>
      </CardHeader>
      <CardContent>
        <BanksToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddBank={() => console.log("إضافة بنك جديد")}
        />

        <BanksTable
          banks={filteredBanks}
          isLoading={isLoading}
          onEdit={(bank) => console.log("تعديل البنك", bank)}
          onDelete={(bank) => console.log("حذف البنك", bank)}
          onToggleStatus={(id) => toggleBankStatus(id)}
        />
      </CardContent>
    </Card>
  );
};

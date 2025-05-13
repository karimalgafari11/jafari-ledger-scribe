
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  // بيانات وهمية للمصروفات
  const expenses = [
    { id: 1, date: "2023-11-01", category: "إيجار", amount: 5000, description: "إيجار المكتب الشهري" },
    { id: 2, date: "2023-11-05", category: "مرافق", amount: 750, description: "فواتير الكهرباء والماء" },
    { id: 3, date: "2023-11-10", category: "رواتب", amount: 12000, description: "رواتب الموظفين" },
    { id: 4, date: "2023-11-15", category: "مستلزمات", amount: 1200, description: "مستلزمات مكتبية" }
  ];
  
  return (
    <PageContainer title={t("expenses")}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("expenses")}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/expenses/categories")}>
              <FileText className="mr-2 h-4 w-4" /> {t("filter")}
            </Button>
            <Button onClick={() => navigate("/expenses/new")}>
              <Plus className="mr-2 h-4 w-4" /> {t("add")}
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("overview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600">{t("totalSales")}</p>
                <p className="text-2xl font-bold text-green-700">18,950 {t("transactions")}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">{t("today")}</p>
                <p className="text-2xl font-bold text-blue-700">0 {t("transactions")}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">{t("thisMonth")}</p>
                <p className="text-2xl font-bold text-purple-700">4 {t("transactions")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t("expenses")}</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> {t("filter")}
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">{t("loading")}</div>
            ) : expenses.length === 0 ? (
              <div className="text-center py-8">{t("noData")}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-right font-medium">{t("date")}</th>
                      <th className="py-2 px-4 text-right font-medium">{t("filter")}</th>
                      <th className="py-2 px-4 text-right font-medium">{t("totalSales")}</th>
                      <th className="py-2 px-4 text-right font-medium">الوصف</th>
                      <th className="py-2 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{expense.date}</td>
                        <td className="py-3 px-4">{expense.category}</td>
                        <td className="py-3 px-4">{expense.amount} ريال</td>
                        <td className="py-3 px-4">{expense.description}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">{t("edit")}</Button>
                            <Button variant="ghost" size="sm" className="text-red-600">{t("delete")}</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ExpensesPage;

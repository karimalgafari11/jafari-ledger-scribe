
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { ExchangeRateDialog } from "./ExchangeRateDialog";
import { useCurrencies } from "@/hooks/useCurrencies";
import { ExchangeRate } from "@/types/definitions";
import { Edit, Trash2, RefreshCw, Calendar } from "lucide-react";
import { format } from "date-fns";

export const ExchangeRatesModule = () => {
  const {
    exchangeRates,
    isLoading,
    selectedRate,
    setSelectedRate,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    createExchangeRate,
    updateExchangeRate,
    deleteExchangeRate,
    updateExchangeRatesAutomatically,
  } = useExchangeRates();
  
  const { currencies } = useCurrencies();
  
  const handleCreateRate = () => {
    setIsCreateDialogOpen(true);
  };
  
  const handleEditRate = (rate: ExchangeRate) => {
    setSelectedRate(rate);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteRate = (rate: ExchangeRate) => {
    if (confirm("هل أنت متأكد من حذف سعر الصرف؟")) {
      deleteExchangeRate(rate.id);
    }
  };
  
  const getCurrencyName = (id: string) => {
    return currencies.find((c) => c.id === id)?.name || id;
  };
  
  const getCurrencyCode = (id: string) => {
    return currencies.find((c) => c.id === id)?.code || id;
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>أسعار الصرف</CardTitle>
        <div className="flex gap-2">
          <Button onClick={handleCreateRate}>
            إضافة سعر صرف جديد
          </Button>
          <Button 
            variant="outline" 
            onClick={updateExchangeRatesAutomatically}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            تحديث تلقائي
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead>من</TableHead>
                <TableHead>إلى</TableHead>
                <TableHead>سعر الصرف</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead className="text-center">إدارة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    جاري التحميل...
                  </TableCell>
                </TableRow>
              ) : exchangeRates.length > 0 ? (
                exchangeRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">{getCurrencyCode(rate.sourceCurrencyId)}</span>
                        <span className="text-sm text-muted-foreground">{getCurrencyName(rate.sourceCurrencyId)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold">{getCurrencyCode(rate.targetCurrencyId)}</span>
                        <span className="text-sm text-muted-foreground">{getCurrencyName(rate.targetCurrencyId)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{rate.rate.toFixed(4)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{format(new Date(rate.date), "yyyy-MM-dd")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={rate.isManual ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}
                      >
                        {rate.isManual ? "يدوي" : "تلقائي"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditRate(rate)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRate(rate)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    لا توجد أسعار صرف مسجلة
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Dialog for creating new exchange rates */}
      <ExchangeRateDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => {
          // Ensure all required fields are provided
          const newRate: Omit<ExchangeRate, "id"> = {
            sourceCurrencyId: data.sourceCurrencyId,
            targetCurrencyId: data.targetCurrencyId,
            rate: data.rate,
            isManual: true,
            date: new Date().toISOString()
          };
          createExchangeRate(newRate);
          setIsCreateDialogOpen(false);
        }}
        currencies={currencies}
      />

      {/* Dialog for editing exchange rates */}
      {selectedRate && (
        <ExchangeRateDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={(data) => {
            if (selectedRate) {
              updateExchangeRate(selectedRate.id, {
                sourceCurrencyId: data.sourceCurrencyId,
                targetCurrencyId: data.targetCurrencyId,
                rate: data.rate,
              });
              setIsEditDialogOpen(false);
            }
          }}
          currencies={currencies}
          initialData={selectedRate}
          title="تعديل سعر الصرف"
        />
      )}
    </Card>
  );
};

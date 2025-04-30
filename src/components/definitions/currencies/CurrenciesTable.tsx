
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Currency } from "@/types/definitions";
import { Edit, Trash2, CheckCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CurrenciesTableProps {
  currencies: Currency[];
  isLoading: boolean;
  onEdit: (currency: Currency) => void;
  onDelete: (currency: Currency) => void;
  onToggleStatus: (id: string) => void;
}

export const CurrenciesTable = ({
  currencies,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}: CurrenciesTableProps) => {
  return (
    <div>
      <div className="rounded-md border">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead>الرمز</TableHead>
              <TableHead>الاسم</TableHead>
              <TableHead>الدولة</TableHead>
              <TableHead>الرمز المختصر</TableHead>
              <TableHead>العملة الأساسية</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-center">إدارة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  جاري التحميل...
                </TableCell>
              </TableRow>
            ) : currencies.length > 0 ? (
              currencies.map((currency) => (
                <TableRow key={currency.id}>
                  <TableCell>{currency.code}</TableCell>
                  <TableCell>{currency.name}</TableCell>
                  <TableCell>{currency.country}</TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <TableCell>
                    {currency.isDefault && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={currency.isActive}
                        onCheckedChange={() => onToggleStatus(currency.id)}
                      />
                      <Badge 
                        variant={currency.isActive ? "outline" : "secondary"}
                        className={currency.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {currency.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(currency)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(currency)}
                        className="text-red-500 hover:text-red-700"
                        disabled={currency.isDefault}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  لا توجد عملات مسجلة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

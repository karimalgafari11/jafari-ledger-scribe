
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bank } from "@/types/definitions";
import { Edit, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BanksTableProps {
  banks: Bank[];
  isLoading: boolean;
  onEdit: (bank: Bank) => void;
  onDelete: (bank: Bank) => void;
  onToggleStatus: (id: string) => void;
}

export const BanksTable = ({
  banks,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}: BanksTableProps) => {
  return (
    <div>
      <div className="rounded-md border">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead>اسم البنك</TableHead>
              <TableHead>الفرع</TableHead>
              <TableHead>رقم الحساب</TableHead>
              <TableHead>العملة</TableHead>
              <TableHead>IBAN</TableHead>
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
            ) : banks.length > 0 ? (
              banks.map((bank) => (
                <TableRow key={bank.id}>
                  <TableCell>{bank.name}</TableCell>
                  <TableCell>{bank.branch || "-"}</TableCell>
                  <TableCell dir="ltr">{bank.accountNumber || "-"}</TableCell>
                  <TableCell>{bank.currency || "-"}</TableCell>
                  <TableCell dir="ltr">{bank.iban || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={bank.isActive}
                        onCheckedChange={() => onToggleStatus(bank.id)}
                      />
                      <Badge 
                        variant={bank.isActive ? "outline" : "secondary"}
                        className={bank.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {bank.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(bank)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(bank)}
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
                <TableCell colSpan={7} className="text-center py-8">
                  لا توجد بنوك مسجلة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

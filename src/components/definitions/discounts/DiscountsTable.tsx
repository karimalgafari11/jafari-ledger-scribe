
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Edit, MoreHorizontal, X } from "lucide-react";
import { Discount } from "@/types/definitions";
import { format, isValid } from "date-fns";
import { ar } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

interface DiscountsTableProps {
  discounts: Discount[];
  isLoading: boolean;
  onEdit: (discount: Discount) => void;
  onDelete: (discount: Discount) => void;
  onToggleStatus: (id: string) => void;
}

export const DiscountsTable: React.FC<DiscountsTableProps> = ({
  discounts,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const formatDate = (date: Date) => {
    return isValid(date) ? format(date, "dd/MM/yyyy", { locale: ar }) : "—";
  };

  const renderDiscountValue = (discount: Discount) => {
    if (discount.type === "percentage") {
      return `${discount.value}%`;
    } else {
      return `${discount.value.toLocaleString()} ريال`;
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الرمز</TableHead>
            <TableHead>الاسم</TableHead>
            <TableHead>النوع</TableHead>
            <TableHead>القيمة</TableHead>
            <TableHead>تاريخ البداية</TableHead>
            <TableHead>تاريخ الانتهاء</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discounts.length > 0 ? (
            discounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell className="font-medium">{discount.code}</TableCell>
                <TableCell>{discount.name}</TableCell>
                <TableCell>
                  {discount.type === "percentage" ? "نسبة مئوية" : "قيمة ثابتة"}
                </TableCell>
                <TableCell>{renderDiscountValue(discount)}</TableCell>
                <TableCell>{formatDate(discount.startDate)}</TableCell>
                <TableCell>
                  {discount.endDate ? formatDate(discount.endDate) : "غير محدد"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`px-2 py-0.5 ${
                      discount.isActive
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}
                  >
                    {discount.isActive ? "فعال" : "غير فعال"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">القائمة</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(discount)}>
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onToggleStatus(discount.id)}>
                        {discount.isActive ? (
                          <>
                            <X className="h-4 w-4 ml-2" />
                            تعطيل
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 ml-2" />
                            تفعيل
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => onDelete(discount)}
                      >
                        <X className="h-4 w-4 ml-2" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                لا توجد خصومات للعرض. قم بإضافة خصم جديد.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-2">
    <div className="flex items-center space-x-4 space-x-reverse">
      <Skeleton className="h-8 w-full" />
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center space-x-4 space-x-reverse">
        <Skeleton className="h-12 w-full" />
      </div>
    ))}
  </div>
);

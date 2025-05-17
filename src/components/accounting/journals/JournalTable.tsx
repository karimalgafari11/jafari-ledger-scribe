
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { JournalStatusBadge } from "./JournalStatusBadge";
import { JournalRowActions } from "./JournalRowActions";
import { JournalEntry, JournalStatus } from "@/types/journal";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

interface JournalTableProps {
  entries: JournalEntry[];
  selectedEntries: string[];
  onToggleSelection: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  isLoading?: boolean;
}

export const JournalTable: React.FC<JournalTableProps> = ({
  entries,
  selectedEntries,
  onToggleSelection,
  onSelectAll,
  onDelete,
  onView,
  onEdit,
  isLoading = false,
}) => {
  const areAllSelected =
    entries.length > 0 && selectedEntries.length === entries.length;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy", { locale: arSA });
    } catch (error) {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getRowClass = (status: JournalStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/20";
      case "canceled":
        return "bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20";
      case "pending":
        return "bg-yellow-50/50 dark:bg-yellow-900/10 hover:bg-yellow-50 dark:hover:bg-yellow-900/20";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
          <span className="mr-2 text-gray-500 dark:text-gray-400">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300 dark:text-gray-600"
        >
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
        <p className="mt-4 text-gray-500 dark:text-gray-400">لا توجد قيود محاسبية</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
            <TableRow>
              <TableHead className="w-12 rtl:text-right">
                <Checkbox
                  checked={areAllSelected}
                  onCheckedChange={onSelectAll}
                  aria-label="تحديد الكل"
                />
              </TableHead>
              <TableHead className="w-32 rtl:text-right">رقم القيد</TableHead>
              <TableHead className="w-32 rtl:text-right">التاريخ</TableHead>
              <TableHead className="rtl:text-right">الوصف</TableHead>
              <TableHead className="rtl:text-right">المدين</TableHead>
              <TableHead className="rtl:text-right">الدائن</TableHead>
              <TableHead className="w-32 rtl:text-right">الحالة</TableHead>
              <TableHead className="w-36 rtl:text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => {
              const isSelected = selectedEntries.includes(entry.id);
              return (
                <TableRow 
                  key={entry.id} 
                  className={`${getRowClass(entry.status)} hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        onToggleSelection(entry.id, !!checked)
                      }
                      aria-label={`تحديد القيد ${entry.entryNumber}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{entry.entryNumber}</TableCell>
                  <TableCell>{formatDate(entry.date)}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {entry.description}
                  </TableCell>
                  <TableCell className="text-green-600 dark:text-green-400 tabular-nums">
                    {formatCurrency(entry.totalDebit)}
                  </TableCell>
                  <TableCell className="text-red-600 dark:text-red-400 tabular-nums">
                    {formatCurrency(entry.totalCredit)}
                  </TableCell>
                  <TableCell>
                    <JournalStatusBadge status={entry.status} />
                  </TableCell>
                  <TableCell>
                    <JournalRowActions
                      id={entry.id}
                      status={entry.status}
                      onView={onView}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

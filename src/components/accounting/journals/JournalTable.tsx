
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { JournalEntry } from "@/types/journal";
import { JournalStatusBadge } from "./JournalStatusBadge";
import { JournalRowActions } from "./JournalRowActions";
import { formatDate, formatNumber } from "@/utils/formatters";

interface JournalTableProps {
  entries: JournalEntry[];
  isLoading: boolean;
  selectedEntries: string[];
  onToggleSelection: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const JournalTable: React.FC<JournalTableProps> = ({
  entries,
  isLoading,
  selectedEntries,
  onToggleSelection,
  onSelectAll,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-10 text-center">
                <input 
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={entries.length > 0 && selectedEntries.length === entries.length}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </TableHead>
              <TableHead className="text-center">رقم القيد</TableHead>
              <TableHead className="text-center">تاريخ القيد</TableHead>
              <TableHead className="text-center">الوصف</TableHead>
              <TableHead className="text-center">مجموع المدين</TableHead>
              <TableHead className="text-center">مجموع الدائن</TableHead>
              <TableHead className="text-center">الحالة</TableHead>
              <TableHead className="text-center">المستخدم</TableHead>
              <TableHead className="text-center w-[100px]">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  جاري التحميل...
                </TableCell>
              </TableRow>
            ) : entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  لا توجد قيود لعرضها
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-gray-50/50">
                  <TableCell className="text-center">
                    <input 
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedEntries.includes(entry.id)}
                      onChange={(e) => onToggleSelection(entry.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {entry.entryNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(entry.date)}
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    {entry.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(entry.totalDebit)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(entry.totalCredit)}
                  </TableCell>
                  <TableCell className="text-center">
                    <JournalStatusBadge status={entry.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.createdBy}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

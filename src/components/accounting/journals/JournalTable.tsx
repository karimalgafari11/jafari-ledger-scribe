
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { JournalEntry } from "@/types/journal";
import { Badge } from "@/components/ui/badge";

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'approved':
        return "bg-green-100 text-green-800 border-green-200";
      case 'canceled':
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft':
        return "مسودة";
      case 'approved':
        return "معتمد";
      case 'canceled':
        return "ملغي";
      default:
        return status;
    }
  };

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
                    <Badge className={`${getStatusColor(entry.status)} whitespace-nowrap`}>
                      {getStatusText(entry.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.createdBy}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onView(entry.id)}
                        title="عرض"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {entry.status !== 'approved' && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(entry.id)}
                          title="تعديل"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            title="المزيد من الخيارات"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView(entry.id)}>
                            <Eye className="ml-2 h-4 w-4" /> عرض التفاصيل
                          </DropdownMenuItem>
                          {entry.status !== 'approved' && (
                            <DropdownMenuItem onClick={() => onEdit(entry.id)}>
                              <Edit className="ml-2 h-4 w-4" /> تعديل
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => onDelete(entry.id)}
                            className="text-red-600 focus:bg-red-50"
                          >
                            <Trash2 className="ml-2 h-4 w-4" /> حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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

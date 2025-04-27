
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { JournalStatus } from "@/types/journal";

interface JournalRowActionsProps {
  id: string;
  status: JournalStatus;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const JournalRowActions: React.FC<JournalRowActionsProps> = ({
  id,
  status,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onView(id)}
        title="عرض"
      >
        <Eye className="h-4 w-4" />
      </Button>
      {status !== 'approved' && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(id)}
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
          <DropdownMenuItem onClick={() => onView(id)}>
            <Eye className="ml-2 h-4 w-4" /> عرض التفاصيل
          </DropdownMenuItem>
          {status !== 'approved' && (
            <DropdownMenuItem onClick={() => onEdit(id)}>
              <Edit className="ml-2 h-4 w-4" /> تعديل
            </DropdownMenuItem>
          )}
          <DropdownMenuItem 
            onClick={() => onDelete(id)}
            className="text-red-600 focus:bg-red-50"
          >
            <Trash2 className="ml-2 h-4 w-4" /> حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

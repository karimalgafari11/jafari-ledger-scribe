
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface NotesCellProps {
  notes?: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
}

export const NotesCell: React.FC<NotesCellProps> = ({
  notes,
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirectEdit(index, 'notes', e.target.value);
  };

  return (
    <TableCell>
      {isEditing ? (
        <Input
          value={notes || ''}
          onChange={handleChange}
          className="w-full h-full border-none p-0 focus:ring-2 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div 
          className="w-full h-full min-h-[24px] cursor-pointer flex items-center"
          onClick={() => handleCellClick(index, 'notes')}
        >
          {notes || ''}
        </div>
      )}
    </TableCell>
  );
};


import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Branch } from "@/types/definitions";
import { Edit, Trash2, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BranchesTableProps {
  branches: Branch[];
  isLoading: boolean;
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
  onToggleStatus: (id: string) => void;
}

export const BranchesTable = ({
  branches,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}: BranchesTableProps) => {
  return (
    <div>
      <div className="rounded-md border">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">الكود</TableHead>
              <TableHead className="min-w-[150px]">الاسم</TableHead>
              <TableHead className="min-w-[200px]">العنوان</TableHead>
              <TableHead>مدير الفرع</TableHead>
              <TableHead>رقم الهاتف</TableHead>
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
            ) : branches.length > 0 ? (
              branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-1">
                      {branch.code}
                      {branch.isMainBranch && (
                        <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.address}</TableCell>
                  <TableCell>{branch.manager}</TableCell>
                  <TableCell dir="ltr">{branch.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={branch.isActive}
                        onCheckedChange={() => onToggleStatus(branch.id)}
                      />
                      <Badge 
                        variant={branch.isActive ? "outline" : "secondary"}
                        className={branch.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {branch.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(branch)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(branch)}
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
                  لا توجد فروع مسجلة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

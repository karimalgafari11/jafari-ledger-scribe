
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/types/project-management";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { ChevronDown, ChevronUp, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectTableProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
  onSort?: (field: keyof Project, direction: 'asc' | 'desc') => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onSelectProject,
  onSort
}) => {
  const [sortField, setSortField] = React.useState<keyof Project>('startDate');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Project) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    if (onSort) {
      onSort(field, newDirection);
    }
  };
  
  const renderSortIcon = (field: keyof Project) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planning':
        return <Badge variant="secondary">تخطيط</Badge>;
      case 'active':
        return <Badge variant="default">نشط</Badge>;
      case 'onHold':
        return <Badge variant="outline">متوقف</Badge>;
      case 'completed':
        return <Badge variant="success" className="bg-green-100 text-green-800">مكتمل</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">منخفض</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">متوسط</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">عالي</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">حرج</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="w-[250px] cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-1">
                اسم المشروع {renderSortIcon('name')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center gap-1">
                الحالة {renderSortIcon('status')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('priority')}
            >
              <div className="flex items-center gap-1">
                الأولوية {renderSortIcon('priority')}
              </div>
            </TableHead>
            <TableHead>التقدم</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('startDate')}
            >
              <div className="flex items-center gap-1">
                تاريخ البدء {renderSortIcon('startDate')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('endDate')}
            >
              <div className="flex items-center gap-1">
                تاريخ الانتهاء {renderSortIcon('endDate')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('budget')}
            >
              <div className="flex items-center gap-1">
                الميزانية {renderSortIcon('budget')}
              </div>
            </TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                لا توجد مشاريع متاحة
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  {project.name}
                </TableCell>
                <TableCell>{getStatusBadge(project.status)}</TableCell>
                <TableCell>{getPriorityBadge(project.priority)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-9">
                      {project.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(project.startDate.toISOString())}</TableCell>
                <TableCell>
                  {project.endDate ? formatDate(project.endDate.toISOString()) : "-"}
                </TableCell>
                <TableCell>{formatCurrency(project.budget)} ر.س</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSelectProject(project.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSelectProject(project.id)}>
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuItem>إدارة الميزانية</DropdownMenuItem>
                        <DropdownMenuItem>إدارة الموارد</DropdownMenuItem>
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
  );
};

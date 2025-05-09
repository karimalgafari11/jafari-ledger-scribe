
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
import { Employee } from "@/types/hr";
import { Edit, MoreHorizontal, Trash, UserCheck, UserX, Mail } from "lucide-react";
import EmployeeStatusBadge from "../EmployeeStatusBadge";

interface EmployeesTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onViewDetails: (employee: Employee) => void;
  onChangeStatus: (employee: Employee, status: Employee["status"]) => void;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
  onEdit,
  onDelete,
  onViewDetails,
  onChangeStatus,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ar-SA");
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
    }).format(salary);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Table hoverable>
        <TableHeader>
          <TableRow>
            <TableHead>رقم الموظف</TableHead>
            <TableHead>الاسم</TableHead>
            <TableHead>القسم</TableHead>
            <TableHead>المنصب</TableHead>
            <TableHead>تاريخ التعيين</TableHead>
            <TableHead>الراتب</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                لا يوجد موظفين لعرضهم
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee.id} onClick={() => onViewDetails(employee)} className="cursor-pointer">
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{formatDate(employee.joinDate)}</TableCell>
                <TableCell>{formatSalary(employee.salary)}</TableCell>
                <TableCell>
                  <EmployeeStatusBadge status={employee.status} />
                </TableCell>
                <TableCell className="text-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onEdit(employee);
                      }}>
                        <Edit className="ml-2 h-4 w-4" />
                        <span>تعديل</span>
                      </DropdownMenuItem>
                      {employee.status !== "active" && (
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onChangeStatus(employee, "active");
                        }}>
                          <UserCheck className="ml-2 h-4 w-4" />
                          <span>تحديث الحالة إلى نشط</span>
                        </DropdownMenuItem>
                      )}
                      {employee.status === "active" && (
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onChangeStatus(employee, "vacation");
                        }}>
                          <UserX className="ml-2 h-4 w-4" />
                          <span>تحديث الحالة إلى إجازة</span>
                        </DropdownMenuItem>
                      )}
                      {employee.email && (
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${employee.email}`;
                        }}>
                          <Mail className="ml-2 h-4 w-4" />
                          <span>إرسال بريد إلكتروني</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(employee);
                        }}
                        className="text-red-600 focus:text-red-600">
                        <Trash className="ml-2 h-4 w-4" />
                        <span>حذف</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesTable;

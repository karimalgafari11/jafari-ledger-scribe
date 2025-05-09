
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/hr";
import EmployeeStatusBadge from "../EmployeeStatusBadge";
import { Phone, Mail, MapPin, Calendar, CreditCard, User } from "lucide-react";

interface EmployeeDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  employee: Employee;
  onEdit: () => void;
}

const EmployeeDetailsDialog: React.FC<EmployeeDetailsDialogProps> = ({
  open,
  setOpen,
  employee,
  onEdit,
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rtl sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>بيانات الموظف</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 flex flex-col items-center justify-start">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <User size={48} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.position}</p>
            <div className="mt-2">
              <EmployeeStatusBadge status={employee.status} />
            </div>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">الرقم الوظيفي</h4>
                <p>{employee.employeeId}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">القسم</h4>
                <p>{employee.department}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">تاريخ التعيين</h4>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-500 ml-1" />
                  <p>{formatDate(employee.joinDate)}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">الراتب</h4>
                <div className="flex items-center">
                  <CreditCard size={16} className="text-gray-500 ml-1" />
                  <p>{formatSalary(employee.salary)}</p>
                </div>
              </div>

              {employee.email && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">البريد الإلكتروني</h4>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 ml-1" />
                    <p>{employee.email}</p>
                  </div>
                </div>
              )}

              {employee.phone && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">رقم الهاتف</h4>
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 ml-1" />
                    <p>{employee.phone}</p>
                  </div>
                </div>
              )}

              {employee.nationalId && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">رقم الهوية</h4>
                  <p>{employee.nationalId}</p>
                </div>
              )}

              {employee.address && (
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">العنوان</h4>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-500 ml-1" />
                    <p>{employee.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            إغلاق
          </Button>
          <Button onClick={onEdit}>
            تعديل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;

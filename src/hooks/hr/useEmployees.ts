
import { useState } from "react";
import { Employee } from "@/types/hr";
import { toast } from "sonner";

// بيانات وهمية للموظفين للعرض التجريبي
const initialEmployees: Employee[] = [
  {
    id: "emp-001",
    name: "أحمد محمد علي",
    employeeId: "EMP001",
    position: "مدير تطوير البرمجيات",
    department: "تقنية المعلومات",
    joinDate: new Date("2020-03-15"),
    salary: 20000,
    status: "active",
    email: "ahmed@example.com",
    phone: "0501234567",
    address: "الرياض، حي النزهة",
    nationalId: "1234567890",
  },
  {
    id: "emp-002",
    name: "سارة عبدالله الخالدي",
    employeeId: "EMP002",
    position: "مسؤول موارد بشرية",
    department: "الموارد البشرية",
    joinDate: new Date("2021-06-10"),
    salary: 15000,
    status: "active",
    email: "sarah@example.com",
    phone: "0512345678",
    address: "جدة، حي الروضة",
    nationalId: "0987654321",
  },
  {
    id: "emp-003",
    name: "محمد عبدالرحمن السعيد",
    employeeId: "EMP003",
    position: "محاسب رئيسي",
    department: "المالية",
    joinDate: new Date("2019-01-05"),
    salary: 18000,
    status: "vacation",
    email: "mohammed@example.com",
    phone: "0523456789",
    address: "الدمام، حي الفيصلية",
    nationalId: "1122334455",
  },
  {
    id: "emp-004",
    name: "فاطمة يوسف العمري",
    employeeId: "EMP004",
    position: "مدير تسويق",
    department: "التسويق",
    joinDate: new Date("2022-02-20"),
    salary: 17000,
    status: "active",
    email: "fatima@example.com",
    phone: "0534567890",
    address: "الرياض، حي الملقا",
    nationalId: "5566778899",
  },
  {
    id: "emp-005",
    name: "خالد سعد الدوسري",
    employeeId: "EMP005",
    position: "مهندس شبكات",
    department: "تقنية المعلومات",
    joinDate: new Date("2020-11-15"),
    salary: 19000,
    status: "sick-leave",
    email: "khaled@example.com",
    phone: "0545678901",
    address: "جدة، حي الصفا",
    nationalId: "6677889900",
  },
];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // قائمة الأقسام الفريدة المستخرجة من بيانات الموظفين
  const departments = Array.from(new Set(employees.map((emp) => emp.department)));
  
  // قائمة المناصب الفريدة المستخرجة من بيانات الموظفين
  const positions = Array.from(new Set(employees.map((emp) => emp.position)));

  // إحصائيات الموظفين
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter((e) => e.status === "active").length,
    onLeaveEmployees: employees.filter((e) => e.status === "vacation" || e.status === "sick-leave").length,
    newHires: employees.filter((e) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return e.joinDate > thirtyDaysAgo;
    }).length,
  };

  // إضافة موظف جديد
  const addEmployee = (employeeData: Omit<Employee, "id">) => {
    // معالجة المهارات: إذا كانت نصية تحول إلى مصفوفة
    let skillsArray: string[] = [];
    
    if (employeeData.skills) {
      if (typeof employeeData.skills === 'string') {
        skillsArray = employeeData.skills.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        skillsArray = employeeData.skills;
      }
    }
      
    const newEmployee = {
      ...employeeData,
      id: `emp-${String(employees.length + 1).padStart(3, "0")}`,
      skills: skillsArray
    } as Employee;
    
    setEmployees([...employees, newEmployee]);
    toast.success("تمت إضافة الموظف بنجاح");
  };

  // تحديث بيانات موظف
  const updateEmployee = (updatedEmployeeData: Employee) => {
    // معالجة المهارات: إذا كانت نصية تحول إلى مصفوفة
    let skillsArray: string[] = [];
    
    if (updatedEmployeeData.skills) {
      if (typeof updatedEmployeeData.skills === 'string') {
        skillsArray = updatedEmployeeData.skills.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        skillsArray = updatedEmployeeData.skills;
      }
    }
    
    const updatedEmployee = {
      ...updatedEmployeeData,
      skills: skillsArray
    };
    
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    toast.success("تم تحديث بيانات الموظف بنجاح");
  };

  // حذف موظف
  const deleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter((emp) => emp.id !== employeeId));
    toast.success("تم حذف الموظف بنجاح");
  };

  // تغيير حالة الموظف
  const changeEmployeeStatus = (employeeId: string, newStatus: Employee["status"]) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === employeeId ? { ...emp, status: newStatus } : emp
      )
    );
    toast.success("تم تحديث حالة الموظف بنجاح");
  };

  return {
    employees,
    selectedEmployee,
    setSelectedEmployee,
    isDialogOpen,
    setIsDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    departments,
    positions,
    stats,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    changeEmployeeStatus,
  };
};

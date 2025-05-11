
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { UserPlus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmployees } from "@/hooks/hr/useEmployees";
import { Employee } from "@/types/hr";
import EmployeesTable from "@/components/hr/employees/EmployeesTable";
import EmployeeDialog from "@/components/hr/employees/EmployeeDialog";
import EmployeeDeleteDialog from "@/components/hr/employees/EmployeeDeleteDialog";
import EmployeeDetailsDialog from "@/components/hr/employees/EmployeeDetailsDialog";
import EmployeeFilters from "@/components/hr/employees/EmployeeFilters";
import HRPageHeader from "@/components/hr/HRPageHeader";
import HRStatsCards from "@/components/hr/HRStatsCards";

const EmployeesPage = () => {
  const {
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
  } = useEmployees();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const handleAddNewClick = () => {
    setSelectedEmployee(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const handleDialogSubmit = (data: any) => {
    if (selectedEmployee) {
      // إذا كان هناك موظف محدد، قم بتحديث بياناته
      updateEmployee({
        ...selectedEmployee,
        ...data,
        joinDate: new Date(data.joinDate),
      });
    } else {
      // إذا لم يكن هناك موظف محدد، أضف موظفًا جديدًا
      addEmployee({
        ...data,
        joinDate: new Date(data.joinDate),
      });
    }
  };

  const handleChangeStatus = (employee: Employee, status: Employee["status"]) => {
    changeEmployeeStatus(employee.id, status);
  };

  // تصفية الموظفين حسب البحث والحالة والقسم
  const filteredEmployees = employees.filter((employee) => {
    // تصفية حسب النص المدخل في البحث
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());

    // تصفية حسب الحالة المحددة
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;

    // تصفية حسب القسم المحدد
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <PageContainer title="إدارة الموظفين">
      <div className="p-6">
        {/* رأس الصفحة */}
        <HRPageHeader
          title="إدارة الموظفين"
          description="إدارة بيانات الموظفين وملفاتهم الشخصية"
          onAddNew={handleAddNewClick}
          addButtonLabel="إضافة موظف جديد"
        />

        {/* بطاقات الإحصائيات */}
        <HRStatsCards stats={stats} />

        {/* تصفية الموظفين */}
        <EmployeeFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          departments={departments}
        />

        {/* جدول الموظفين */}
        <EmployeesTable
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
          onChangeStatus={handleChangeStatus}
        />

        {/* حوار إضافة/تعديل موظف */}
        <EmployeeDialog
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          onSubmit={handleDialogSubmit}
          employee={selectedEmployee || undefined}
          departments={departments}
          positions={positions}
        />

        {/* حوار حذف موظف */}
        {selectedEmployee && (
          <EmployeeDeleteDialog
            open={isDeleteDialogOpen}
            setOpen={setIsDeleteDialogOpen}
            employee={selectedEmployee}
            onConfirm={() => {
              deleteEmployee(selectedEmployee.id);
              setIsDeleteDialogOpen(false);
            }}
          />
        )}

        {/* حوار عرض تفاصيل الموظف */}
        {selectedEmployee && (
          <EmployeeDetailsDialog
            open={isViewDialogOpen}
            setOpen={setIsViewDialogOpen}
            employee={selectedEmployee}
            onEdit={() => {
              setIsViewDialogOpen(false);
              setIsDialogOpen(true);
            }}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default EmployeesPage;

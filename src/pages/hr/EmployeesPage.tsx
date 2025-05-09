
import React, { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import HRPageHeader from "@/components/hr/HRPageHeader";
import HRStatsCards from "@/components/hr/HRStatsCards";
import EmployeeFilters from "@/components/hr/employees/EmployeeFilters";
import EmployeesTable from "@/components/hr/employees/EmployeesTable";
import EmployeeDialog from "@/components/hr/employees/EmployeeDialog";
import EmployeeDetailsDialog from "@/components/hr/employees/EmployeeDetailsDialog";
import EmployeeDeleteDialog from "@/components/hr/employees/EmployeeDeleteDialog";
import { useEmployees } from "@/hooks/hr/useEmployees";
import { Employee } from "@/types/hr";

const EmployeesPage: React.FC = () => {
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

  const filteredEmployees = employees.filter((employee) => {
    // تطبيق فلتر البحث
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    
    // تطبيق فلتر الحالة
    const matchesStatus = statusFilter === "all" ? true : employee.status === statusFilter;
    
    // تطبيق فلتر القسم
    const matchesDepartment = departmentFilter === "all" ? true : employee.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (selectedEmployee) {
      updateEmployee({ ...selectedEmployee, ...data });
    } else {
      addEmployee(data);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleChangeStatus = (employee: Employee, status: Employee["status"]) => {
    changeEmployeeStatus(employee.id, status);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 rtl">
        <HRPageHeader
          title="إدارة الموظفين"
          description="عرض وإدارة بيانات الموظفين وملفاتهم الشخصية"
          onAddNew={handleAddClick}
          addButtonLabel="إضافة موظف جديد"
        />

        <HRStatsCards stats={stats} />

        <EmployeeFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          departments={departments}
        />

        <EmployeesTable
          employees={filteredEmployees}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onViewDetails={handleViewDetails}
          onChangeStatus={handleChangeStatus}
        />

        {/* إضافة / تعديل موظف */}
        <EmployeeDialog
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          onSubmit={handleFormSubmit}
          employee={selectedEmployee as Employee}
          departments={departments}
          positions={positions}
        />

        {/* حذف موظف */}
        <EmployeeDeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          employee={selectedEmployee}
          onConfirm={handleDeleteConfirm}
        />

        {/* عرض تفاصيل موظف */}
        {selectedEmployee && (
          <EmployeeDetailsDialog
            open={isViewDialogOpen}
            setOpen={setIsViewDialogOpen}
            employee={selectedEmployee}
            onEdit={() => {
              setIsViewDialogOpen(false);
              setTimeout(() => {
                setIsDialogOpen(true);
              }, 100);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default EmployeesPage;

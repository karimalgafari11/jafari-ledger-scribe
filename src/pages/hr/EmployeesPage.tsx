
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { UserPlus, FileText, Filter, Download, Upload, Printer } from "lucide-react";
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
  const [filtersVisible, setFiltersVisible] = useState(false);

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
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      });
    } else {
      // إذا لم يكن هناك موظف محدد، أضف موظفًا جديدًا
      addEmployee({
        ...data,
        joinDate: new Date(data.joinDate),
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
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

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

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

        {/* شريط الأدوات والإجراءات */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddNewClick}
              className="flex items-center gap-1"
            >
              <UserPlus className="h-4 w-4" />
              إضافة موظف
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleFilters}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              {filtersVisible ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              تصدير البيانات
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Upload className="h-4 w-4" />
              استيراد البيانات
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Printer className="h-4 w-4" />
              طباعة
            </Button>
          </div>
        </div>

        {/* تصفية الموظفين */}
        {filtersVisible && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100 shadow-sm">
            <EmployeeFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              departments={departments}
            />
          </div>
        )}

        {/* جدول الموظفين */}
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
          <EmployeesTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
            onChangeStatus={handleChangeStatus}
          />
        </div>

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

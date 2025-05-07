import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { CustomersToolbar } from "@/components/customers/CustomersToolbar";
import { CustomerDialog } from "@/components/customers/CustomerDialog";
import { DeleteCustomerDialog } from "@/components/customers/DeleteCustomerDialog";
import { Customer } from "@/types/customers";
import { mockCustomers } from "@/data/mockCustomers";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerFilters } from "@/types/customers";
import { Users, UserPlus, Download, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CustomersManagePage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<CustomerFilters>({
    search: "",
    status: "",
    type: "",
    balanceRange: null,
  });
  const navigate = useNavigate();

  // تحميل بيانات العملاء
  useEffect(() => {
    setCustomers(mockCustomers);
  }, []);

  // تطبيق الفلترة على بيانات العملاء
  useEffect(() => {
    let result = [...customers];

    // فلترة حسب البحث
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.phone.toLowerCase().includes(searchLower)
      );
    }

    // فلترة حسب الحالة
    if (filters.status) {
      result = result.filter((customer) => customer.status === filters.status);
    }

    // فلترة حسب النوع
    if (filters.type) {
      result = result.filter((customer) => customer.type === filters.type);
    }

    // فلترة حسب نطاق الرصيد
    if (filters.balanceRange) {
      const [min, max] = filters.balanceRange;
      result = result.filter(
        (customer) => customer.balance >= min && customer.balance <= max
      );
    }

    setFilteredCustomers(result);
  }, [customers, filters]);

  const handleAddCustomer = () => {
    setSelectedCustomer(undefined);
    setIsAddDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsAddDialogOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleViewStatement = (customer: Customer) => {
    navigate(`/customers/statement/${customer.id}`);
    toast.info(`جاري فتح كشف حساب العميل ${customer.name}`);
  };

  const handleSaveCustomer = (customer: Customer) => {
    if (selectedCustomer) {
      // تحديث بيانات العميل الحالي
      setCustomers((prev) =>
        prev.map((c) => (c.id === customer.id ? customer : c))
      );
      toast.success(`تم تحديث بيانات العميل ${customer.name} بنجاح`);
    } else {
      // إضافة عميل جديد
      setCustomers((prev) => [...prev, customer]);
      toast.success(`تم إضافة العميل ${customer.name} بنجاح`);
    }
    setIsAddDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedCustomer) return;
    
    setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
    toast.success(`تم حذف العميل ${selectedCustomer.name} بنجاح`);
    setIsDeleteDialogOpen(false);
  };

  const handleFilterChange = (newFilters: CustomerFilters) => {
    setFilters(newFilters);
  };

  const handleExportData = () => {
    toast.success("جاري تصدير بيانات العملاء");
    // إضافة منطق تصدير البيانات هنا
  };

  const handleImportData = () => {
    toast.info("جاري فتح نافذة استيراد البيانات");
    // إضافة منطق استيراد البيانات هنا
  };

  const handleBackToModule = () => {
    navigate("/customers/module");
  };

  return (
    <Layout>
      <Header 
        title="إدارة العملاء" 
        showBack={true}
        onBackClick={handleBackToModule}
      >
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-300">قائمة العملاء</span>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        {/* إحصائيات العملاء */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">إجمالي العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{customers.length}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">العملاء النشطين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {customers.filter(c => c.status === 'active').length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">العملاء غير النشطين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {customers.filter(c => c.status === 'inactive').length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">إجمالي الأرصدة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {customers.reduce((sum, c) => sum + c.balance, 0).toLocaleString()} ر.س
              </p>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button onClick={handleAddCustomer} className="bg-primary hover:bg-primary/90">
            <UserPlus className="mr-2 h-4 w-4" /> عميل جديد
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" /> تصدير البيانات
          </Button>
          <Button variant="outline" onClick={handleImportData}>
            <FileUp className="mr-2 h-4 w-4" /> استيراد البيانات
          </Button>
        </div>

        <CustomersToolbar
          onCreateCustomer={handleAddCustomer}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <Card>
          <CardContent className="p-0">
            <CustomersTable
              customers={filteredCustomers}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
              onViewStatement={handleViewStatement}
            />
          </CardContent>
        </Card>

        {/* نافذة إضافة/تعديل العميل */}
        <CustomerDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={handleSaveCustomer}
          customer={selectedCustomer}
        />

        {/* نافذة تأكيد الحذف */}
        {selectedCustomer && (
          <DeleteCustomerDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}
            customerName={selectedCustomer.name}
          />
        )}
      </div>
    </Layout>
  );
};

export default CustomersManagePage;

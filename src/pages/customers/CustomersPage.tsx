
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { CustomersToolbar } from "@/components/customers/CustomersToolbar";
import { CustomerDialog } from "@/components/customers/CustomerDialog";
import { DeleteCustomerDialog } from "@/components/customers/DeleteCustomerDialog";
import { Customer } from "@/types/customers";
import { mockCustomers } from "@/data/mockCustomers";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerFilters } from "@/types/customers";

const CustomersPage = () => {
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

  const handleSaveCustomer = (customer: Customer) => {
    if (selectedCustomer) {
      // تحديث بيانات العميل الحالي
      setCustomers((prev) =>
        prev.map((c) => (c.id === customer.id ? customer : c))
      );
    } else {
      // إضافة عميل جديد
      setCustomers((prev) => [...prev, customer]);
    }
    setIsAddDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedCustomer) return;
    
    setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
    toast.success(`تم حذف العميل ${selectedCustomer.name} بنجاح`);
    setIsDeleteDialogOpen(false);
  };

  const handleViewStatement = (customer: Customer) => {
    toast.info(`سيتم عرض كشف حساب العميل ${customer.name} قريباً`);
  };

  const handleFilterChange = (newFilters: CustomerFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="إدارة العملاء" showBack={true} />
      </div>

      <main className="container mx-auto p-6">
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
      </main>
    </div>
  );
};

export default CustomersPage;


import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customers";
import { mockCustomers } from "@/data/mockCustomers";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const CustomerStatementListPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load customer data
    setCustomers(mockCustomers);
  }, []);
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewStatement = (customerId: string) => {
    navigate(`/customers/statement/${customerId}`);
  };
  
  const handleBack = () => {
    navigate('/customers/manage');
  };
  
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50" dir="rtl">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="كشف حساب العملاء" showBack={true} onBackClick={handleBack} />
      </div>
      
      <main className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">البحث عن عميل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث بالاسم أو رقم الحساب أو رقم الجوال..."
                className="pr-10 text-right"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="font-medium">{customer.name}</h3>
                      <div className="text-sm text-gray-500 space-y-1">
                        {customer.accountNumber && <p>رقم الحساب: {customer.accountNumber}</p>}
                        <p>الرصيد: {customer.balance.toLocaleString()} ريال</p>
                        <p>الجوال: {customer.phone}</p>
                      </div>
                    </div>
                    <Button onClick={() => handleViewStatement(customer.id)}>
                      عرض كشف الحساب
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">لا يوجد عملاء مطابقين لبحثك</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CustomerStatementListPage;

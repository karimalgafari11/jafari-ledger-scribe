
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Customer } from "@/types/customers";
import { Search, Phone, Mail, User, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// بيانات العملاء الوهمية للعرض
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "شركة الرياض للتجارة",
    type: "company",
    phone: "0555555555",
    email: "info@riyadh-trading.com",
    balance: 5000,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "عبدالله محمد",
    type: "individual",
    phone: "0599999999",
    email: "abdullah@example.com",
    balance: 1200,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "شركة المدينة للمقاولات",
    type: "company",
    phone: "0544444444",
    email: "info@madina-construction.com",
    balance: 15000,
    vatNumber: "300000000000",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "سارة أحمد",
    type: "individual",
    phone: "0566666666",
    email: "sara@example.com",
    balance: 500,
    status: "inactive",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    name: "مؤسسة الشمال",
    type: "company",
    phone: "0577777777",
    email: "contact@north-est.com",
    balance: 8000,
    vatNumber: "310000000000",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

interface CustomerSelectorProps {
  onSelect: (customer: Customer) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  onSelect,
  onClose,
  isOpen
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  
  // فلترة العملاء حسب كلمة البحث
  useEffect(() => {
    if (searchTerm) {
      const filteredCustomers = mockCustomers.filter(
        customer => 
          customer.name.includes(searchTerm) || 
          customer.phone.includes(searchTerm) ||
          (customer.email && customer.email.includes(searchTerm)) ||
          (customer.vatNumber && customer.vatNumber.includes(searchTerm))
      );
      setCustomers(filteredCustomers);
    } else {
      setCustomers(mockCustomers);
    }
  }, [searchTerm]);
  
  // معالجة اختيار العميل
  const handleSelectCustomer = (customer: Customer) => {
    onSelect(customer);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-bold">اختيار العميل</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center border rounded-md px-3 mb-4">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="ابحث عن عميل (بالاسم، رقم الهاتف، البريد الإلكتروني...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-right"
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchTerm("")}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table className="min-w-full border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right bg-gray-50 px-4 py-2 font-semibold text-gray-600">العميل</TableHead>
                <TableHead className="text-right bg-gray-50 px-4 py-2 font-semibold text-gray-600">النوع</TableHead>
                <TableHead className="text-right bg-gray-50 px-4 py-2 font-semibold text-gray-600">رقم الهاتف</TableHead>
                <TableHead className="text-right bg-gray-50 px-4 py-2 font-semibold text-gray-600">الرصيد</TableHead>
                <TableHead className="text-right bg-gray-50 px-4 py-2 font-semibold text-gray-600">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                    لا توجد نتائج مطابقة لبحثك
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow 
                    key={customer.id}
                    className="hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    <TableCell className="flex items-start gap-2 py-3">
                      <div className="bg-blue-100 text-blue-700 rounded-full h-8 w-8 flex items-center justify-center">
                        {customer.type === "company" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="9" width="18" height="12" rx="1" />
                            <path d="M7 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
                          </svg>
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{customer.name}</span>
                        {customer.email && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.type === "company" ? "شركة" : "فرد"}
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-gray-500" />
                      {customer.phone}
                    </TableCell>
                    <TableCell className="font-medium text-right">
                      {customer.balance.toLocaleString()} ر.س
                    </TableCell>
                    <TableCell>
                      {customer.status === "active" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0">نشط</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-0">غير نشط</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={() => {/* إضافة عميل جديد */}}>إضافة عميل جديد</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

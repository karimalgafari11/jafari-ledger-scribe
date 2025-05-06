
import { Customer } from "@/types/customers";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

interface CustomerInfoProps {
  customer: Customer;
}

export const CustomerInfo = ({ customer }: CustomerInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">{customer.name}</h2>
            <div className="space-y-2 text-sm">
              {customer.address && <p className="text-gray-600">{customer.address}</p>}
              {customer.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">الهاتف: </span>
                  {customer.phone}
                </p>
              )}
              {customer.email && (
                <p className="text-gray-600">
                  <span className="font-medium">البريد الإلكتروني: </span>
                  {customer.email}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">معلومات إضافية</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">رقم الحساب: </span>
                {customer.accountNumber || "-"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">نوع العميل: </span>
                {customer.type === 'individual' ? 'فرد' : 'شركة'}
              </p>
              {customer.vatNumber && (
                <p className="text-gray-600">
                  <span className="font-medium">الرقم الضريبي: </span>
                  {customer.vatNumber}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-start">
            <div className="bg-gray-100 rounded-lg p-4 w-full">
              <h3 className="font-semibold mb-2 text-gray-700">ملخص الحساب</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">الرصيد الحالي</span>
                <span className={`text-lg font-bold ${customer.balance > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {formatCurrency(customer.balance)}
                </span>
              </div>
              {customer.creditLimit && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">حد الائتمان</span>
                  <span className="font-medium">{formatCurrency(customer.creditLimit)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

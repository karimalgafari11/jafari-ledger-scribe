
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/types/customers";
import { formatCurrency } from "@/utils/formatters";

interface CustomerInfoProps {
  customer: Customer;
}

export const CustomerInfo = ({ customer }: CustomerInfoProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="rtl">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">معلومات العميل</CardTitle>
            <h2 className="text-2xl font-bold">{customer.name}</h2>
          </div>
          <div className="text-left">
            <p className="text-gray-500">رقم العميل: {customer.id.substring(0, 8)}</p>
            {customer.vatNumber && <p className="text-gray-500">الرقم الضريبي: {customer.vatNumber}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="mb-1"><strong>رقم الهاتف:</strong> {customer.phone}</p>
            <p className="mb-1"><strong>البريد الإلكتروني:</strong> {customer.email || 'غير متوفر'}</p>
            <p className="mb-1"><strong>العنوان:</strong> {customer.address || 'غير متوفر'}</p>
          </div>
          <div>
            <p className="mb-1"><strong>نوع العميل:</strong> {customer.type === 'company' ? 'شركة' : 'فرد'}</p>
            <p className="mb-1"><strong>الرصيد الحالي:</strong> <span className="text-red-600 font-bold">{formatCurrency(customer.balance)}</span></p>
            <p className="mb-1"><strong>حد الائتمان:</strong> {formatCurrency(customer.creditLimit || 0)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

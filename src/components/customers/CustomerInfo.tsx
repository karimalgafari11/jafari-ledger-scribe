
import { Customer } from "@/types/customers";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";
import { User, Phone, Mail, MapPin, Hash, Building, CreditCard, AlertCircle, CheckCircle } from "lucide-react";

interface CustomerInfoProps {
  customer: Customer;
}

export const CustomerInfo = ({ customer }: CustomerInfoProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {customer.type === 'company' ? 
                <Building className="h-5 w-5 text-gray-500" /> :
                <User className="h-5 w-5 text-gray-500" />
              }
              <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
            </div>
            <div className="space-y-2 text-sm">
              {customer.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">{customer.address}</p>
                </div>
              )}
              {customer.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">{customer.phone}</p>
                </div>
              )}
              {customer.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">{customer.email}</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 flex items-center gap-1">
              <Hash className="h-4 w-4 text-gray-500" />
              معلومات إضافية
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">رقم الحساب</span>
                <span className="font-medium">{customer.accountNumber || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">نوع العميل</span>
                <span className="font-medium">{customer.type === 'individual' ? 'فرد' : 'شركة'}</span>
              </div>
              {customer.vatNumber && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">الرقم الضريبي</span>
                  <span className="font-medium">{customer.vatNumber}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-start gap-3">
            <div className="bg-gray-50 rounded-lg p-4 w-full">
              <h3 className="font-semibold mb-2 text-gray-700 flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-gray-500" />
                ملخص الحساب
              </h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">الرصيد الحالي</span>
                <span className={`text-lg font-bold ${customer.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
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
            
            <div className={`w-full rounded-lg p-3 ${
              customer.balance > 0 ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'
            }`}>
              <div className="flex items-start gap-2">
                {customer.balance > 0 ? (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">مستحق السداد</p>
                      <p className="text-xs text-red-600 mt-0.5">يرجى متابعة تحصيل المبلغ المستحق</p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">الحساب متزن</p>
                      <p className="text-xs text-green-600 mt-0.5">لا توجد مستحقات على العميل</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

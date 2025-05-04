
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseInvoice, PurchaseItem } from "@/types/purchases";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface SimplePurchaseInvoiceProps {
  invoice: PurchaseInvoice;
}

export const SimplePurchaseInvoice: React.FC<SimplePurchaseInvoiceProps> = ({ invoice }) => {
  // Calculate totals
  const subtotal = invoice.subtotal || 0;
  const discount = invoice.discount || 0;
  const discountAmount = invoice.discountType === 'percentage' 
    ? subtotal * (discount / 100) 
    : discount;
  const tax = invoice.tax || 0;
  const taxAmount = (subtotal - discountAmount) * (tax / 100);
  const totalAmount = invoice.totalAmount || subtotal - discountAmount + taxAmount;
  
  return (
    <div className="max-w-4xl mx-auto p-2 print:p-0">
      <Card className="border-2 border-gray-300 shadow-none print:shadow-none">
        <CardContent className="p-0">
          {/* Invoice Header */}
          <div className="bg-blue-200 text-center py-2 border-b-2 border-gray-300 mb-2">
            <h1 className="text-xl font-bold">فاتورة مبيعات</h1>
          </div>

          {/* Invoice Information */}
          <div className="grid grid-cols-2 gap-0 mb-2">
            <div className="flex border-2 border-gray-300">
              <div className="w-1/2 bg-blue-100 p-2 text-center font-bold border-l-2 border-gray-300">
                رقم الفاتورة
              </div>
              <div className="w-1/2 p-2 text-center">
                #{invoice.invoiceNumber || '0001'}
              </div>
            </div>
            
            <div className="flex border-2 border-gray-300">
              <div className="w-1/2 bg-blue-100 p-2 text-center font-bold border-l-2 border-gray-300">
                اسم العميل
              </div>
              <div className="w-1/2 p-2 text-center">
                {invoice.vendorName || 'محمود عمر'}
              </div>
            </div>
            
            <div className="flex border-2 border-gray-300 mt-[-2px]">
              <div className="w-1/2 bg-blue-100 p-2 text-center font-bold border-l-2 border-gray-300">
                طريقة الدفع
              </div>
              <div className="w-1/2 p-2 text-center">
                {invoice.paymentMethod === 'cash' ? 'نقدي' : 'آجل'}
              </div>
            </div>
            
            <div className="flex border-2 border-gray-300 mt-[-2px]">
              <div className="w-1/2 bg-blue-100 p-2 text-center font-bold border-l-2 border-gray-300">
                تاريخ الفاتورة
              </div>
              <div className="w-1/2 p-2 text-center">
                {format(new Date(invoice.date), 'dd/MM/yyyy')}
              </div>
            </div>
          </div>

          {/* Invoice Items Table */}
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead className="border-2 border-gray-300 p-2 text-center w-12">م</TableHead>
                <TableHead className="border-2 border-gray-300 p-2 text-center">اسم الصنف</TableHead>
                <TableHead className="border-2 border-gray-300 p-2 text-center">الكمية</TableHead>
                <TableHead className="border-2 border-gray-300 p-2 text-center">السعر</TableHead>
                <TableHead className="border-2 border-gray-300 p-2 text-center">الإجمالي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">{index + 1}</TableCell>
                  <TableCell className="border-2 border-gray-300 p-2">{item.name}</TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">{item.quantity}</TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">{item.price.toFixed(2)}</TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">{item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {/* Add empty rows if needed to match the design */}
              {invoice.items.length < 6 && Array(6 - invoice.items.length).fill(0).map((_, i) => (
                <TableRow key={`empty-${i}`}>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">{invoice.items.length + i + 1}</TableCell>
                  <TableCell className="border-2 border-gray-300 p-2">صنف</TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">-</TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">-</TableCell>
                  <TableCell className="border-2 border-gray-300 p-2 text-center">-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Invoice Summary */}
          <div className="grid grid-cols-2 mt-[-2px]">
            <div className="flex justify-between">
              <div className="w-1/2 text-center p-3">
                <p className="font-bold">المستلم</p>
              </div>
              <div className="w-1/2 text-center p-3">
                <p className="font-bold">التوقيع</p>
              </div>
            </div>
            
            <div className="flex flex-col border-2 border-gray-300">
              <div className="flex">
                <div className="w-1/2 bg-blue-100 p-2 text-center font-bold border-l-2 border-gray-300">
                  الإجمالي
                </div>
                <div className="w-1/2 p-2 text-center">
                  {subtotal.toFixed(2)}
                </div>
              </div>
              
              <div className="flex border-t-2 border-gray-300">
                <div className="w-1/2 bg-blue-100 p-2 text-center font-bold border-l-2 border-gray-300">
                  الخصم
                </div>
                <div className="w-1/2 p-2 text-center">
                  {discountAmount.toFixed(2)}
                </div>
              </div>
              
              <div className="flex border-t-2 border-gray-300">
                <div className="w-1/2 bg-blue-100 p-2 text-center font-bold border-l-2 border-gray-300">
                  الضريبة
                </div>
                <div className="w-1/2 p-2 text-center">
                  {taxAmount.toFixed(2)}
                </div>
              </div>
              
              <div className="flex border-t-2 border-gray-300">
                <div className="w-1/2 bg-blue-100 p-2 text-center font-bold border-l-2 border-gray-300">
                  الصافي
                </div>
                <div className="w-1/2 p-2 text-center font-bold">
                  {totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

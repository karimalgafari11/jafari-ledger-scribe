
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PurchaseOrderForm } from "@/components/purchases/orders/PurchaseOrderForm";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { PurchaseOrder } from "@/types/purchases";

const NewPurchaseOrderPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Initial purchase order data
  const initialOrder: PurchaseOrder = {
    id: uuidv4(),
    orderNumber: `PO-${format(new Date(), 'yyyy')}-${Math.floor(1000 + Math.random() * 9000)}`,
    vendorId: "",
    vendorName: "",
    date: format(new Date(), "yyyy-MM-dd"),
    items: [],
    subtotal: 0,
    totalAmount: 0,
    status: "draft",
    createdBy: "المستخدم الحالي", // In a real app, this would come from authentication
    createdAt: format(new Date(), "yyyy-MM-dd")
  };

  const handleSave = (orderData: PurchaseOrder) => {
    setIsLoading(true);
    
    // Here we would typically send the data to an API
    // For now, we'll simulate an API call with a timeout
    setTimeout(() => {
      console.log("Saving order:", orderData);
      toast.success("تم حفظ أمر الشراء بنجاح");
      setIsLoading(false);
      navigate("/purchases/orders");
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/purchases/orders");
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">أمر شراء جديد</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>بيانات أمر الشراء</CardTitle>
        </CardHeader>
        <CardContent>
          <PurchaseOrderForm 
            initialOrder={initialOrder}
            onSave={handleSave}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPurchaseOrderPage;


import { useState, useEffect } from "react";
import { InvoiceItem } from "@/types/invoices";
import { v4 as uuid } from "uuid";
import { mockProducts } from "@/data/mockProducts";

export const useItemFormState = (item?: InvoiceItem) => {
  const [formData, setFormData] = useState<Partial<InvoiceItem>>({
    id: item?.id || uuid(),
    productId: item?.productId || "",
    code: item?.code || "",
    name: item?.name || "",
    description: item?.description || "",
    quantity: item?.quantity || 1,
    price: item?.price || 0,
    discount: item?.discount || 0,
    discountType: item?.discountType || "percentage",
    tax: item?.tax || 15,
    total: item?.total || 0,
    notes: item?.notes || ""
  });

  useEffect(() => {
    calculateTotal();
  }, [formData.quantity, formData.price, formData.discount, formData.discountType, formData.tax]);

  const handleChange = (field: keyof InvoiceItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectProduct = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    
    if (product) {
      setFormData((prev) => ({
        ...prev,
        productId,
        code: product.code,
        name: product.name,
        description: "",
        price: product.price,
      }));
    }
  };

  const calculateTotal = () => {
    const quantity = formData.quantity || 0;
    const price = formData.price || 0;
    const discount = formData.discount || 0;
    const tax = formData.tax || 0;
    
    let subtotal = quantity * price;
    
    // Apply discount
    if (formData.discountType === "percentage") {
      subtotal = subtotal * (1 - discount / 100);
    } else {
      subtotal = subtotal - discount;
    }
    
    // Apply tax
    const total = subtotal * (1 + tax / 100);
    
    setFormData((prev) => ({
      ...prev,
      total,
    }));
  };

  return {
    formData,
    handleChange,
    handleSelectProduct
  };
};


export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerAccountNumber?: string;
  date: string;
  dueDate?: string;
  items: InvoiceItem[];
  subtotal?: number;
  totalAmount: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  notes?: string;
  paymentTerms?: string;
  paymentMethod: 'cash' | 'credit';
  paymentInstructions?: string;
  amountPaid?: number;
  warehouseId?: string;
  warehouseName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  code: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  discount: number;
  discountType: 'percentage' | 'fixed';
  tax: number;
  total: number;
  notes?: string;
}

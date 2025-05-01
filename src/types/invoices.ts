
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
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
  paymentInstructions?: string;
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
}

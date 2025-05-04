
export interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  vendorId: string;
  vendorName: string;
  vendorPhone?: string;
  vendorAccountNumber?: string;
  date: string;
  dueDate?: string;
  items: PurchaseItem[];
  subtotal: number;
  totalAmount: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  expenses?: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  notes?: string;
  paymentTerms?: string;
  paymentMethod: 'cash' | 'credit';
  amountPaid?: number;
  warehouseId?: string;
  warehouseName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  code: string;
  name: string;
  manufacturer?: string;
  size?: string;
  description?: string;
  quantity: number;
  price: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  total: number;
  notes?: string;
}

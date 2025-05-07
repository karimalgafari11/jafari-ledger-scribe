

export const MOCK_EXPENSES = [
  {
    id: "1",
    description: "طلبية مستلزمات مكتبية",
    amount: 1200,
    date: new Date('2023-07-15'),
    category: "مستلزمات مكتبية",
    paymentMethod: "cash" as const,
    vendor: "شركة المستلزمات المكتبية",
    vendorId: "1"
  },
  {
    id: "2",
    description: "معدات إلكترونية",
    amount: 3500,
    date: new Date('2023-08-20'),
    category: "معدات إلكترونية",
    paymentMethod: "bank" as const,
    vendor: "مؤسسة الإمداد التجارية",
    vendorId: "2"
  },
  {
    id: "3",
    description: "أثاث مكتبي",
    amount: 5000,
    date: new Date('2023-09-05'),
    category: "أثاث مكتبي",
    paymentMethod: "credit" as const,
    vendor: "مؤسسة نور للتجهيزات",
    vendorId: "3"
  },
  {
    id: "4",
    description: "أجهزة حاسب آلي",
    amount: 7500,
    date: new Date('2023-09-15'),
    category: "أجهزة وتقنية",
    paymentMethod: "bank" as const,
    vendor: "شركة تقنيات المستقبل",
    vendorId: "4"
  },
  {
    id: "5",
    description: "منتجات ورقية",
    amount: 750,
    date: new Date('2023-09-25'),
    category: "منتجات ورقية",
    paymentMethod: "cash" as const,
    vendor: "مصنع الجودة للمنتجات الورقية",
    vendorId: "5"
  }
];


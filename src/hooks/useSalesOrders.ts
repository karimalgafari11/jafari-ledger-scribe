
import { useState } from "react";
import { SalesOrder } from "@/components/sales-orders/SalesOrdersTable";

// بيانات تجريبية لأوامر البيع
const mockSalesOrders = [
  {
    id: "SO-001",
    date: new Date(2023, 3, 5),
    customer: "مؤسسة الفيصل للسيارات",
    total: 8750.00,
    status: "pending",
    items: 12,
    expectedDelivery: new Date(2023, 3, 15),
  },
  {
    id: "SO-002",
    date: new Date(2023, 3, 8),
    customer: "شركة النخبة للخدمات",
    total: 3450.75,
    status: "processing",
    items: 5,
    expectedDelivery: new Date(2023, 3, 18),
  },
  {
    id: "SO-003",
    date: new Date(2023, 3, 10),
    customer: "مؤسسة الصقر للسيارات",
    total: 17850.50,
    status: "shipped",
    items: 20,
    expectedDelivery: new Date(2023, 3, 20),
  },
  {
    id: "SO-004",
    date: new Date(2023, 3, 15),
    customer: "شركة الرياض للصيانة",
    total: 5600.25,
    status: "completed",
    items: 8,
    expectedDelivery: new Date(2023, 3, 25),
  },
  {
    id: "SO-005",
    date: new Date(2023, 3, 18),
    customer: "مجموعة الجزيرة للتجارة",
    total: 9200.00,
    status: "cancelled",
    items: 15,
    expectedDelivery: new Date(2023, 3, 28),
  },
  {
    id: "SO-006",
    date: new Date(2023, 4, 1),
    customer: "شركة المدينة للتجارة",
    total: 12750.50,
    status: "pending",
    items: 18,
    expectedDelivery: new Date(2023, 4, 10),
  },
  {
    id: "SO-007",
    date: new Date(2023, 4, 5),
    customer: "مؤسسة الخليج للخدمات",
    total: 6250.75,
    status: "processing",
    items: 9,
    expectedDelivery: new Date(2023, 4, 15),
  },
];

export const useSalesOrders = () => {
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>(mockSalesOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // إحصائيات أوامر البيع
  const salesOrderStats = [
    { label: "إجمالي أوامر البيع", value: salesOrders.length, color: "bg-blue-100 text-blue-800" },
    { label: "قيد الانتظار", value: salesOrders.filter(order => order.status === "pending").length, color: "bg-amber-100 text-amber-800" },
    { label: "قيد التجهيز", value: salesOrders.filter(order => order.status === "processing").length, color: "bg-purple-100 text-purple-800" },
    { label: "المشحونة", value: salesOrders.filter(order => order.status === "shipped").length, color: "bg-indigo-100 text-indigo-800" },
    { label: "المكتملة", value: salesOrders.filter(order => order.status === "completed").length, color: "bg-green-100 text-green-800" },
  ];

  const filteredSalesOrders = salesOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleProcessOrder = (id: string) => {
    setSalesOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: "processing" } : order
      )
    );
  };

  const handleShipOrder = (id: string) => {
    setSalesOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: "shipped" } : order
      )
    );
  };

  const handleCompleteOrder = (id: string) => {
    setSalesOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: "completed" } : order
      )
    );
  };

  return {
    salesOrders,
    filteredSalesOrders,
    salesOrderStats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleProcessOrder,
    handleShipOrder,
    handleCompleteOrder,
  };
};

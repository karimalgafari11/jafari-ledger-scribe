
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, Filter, Search, Trash2 } from "lucide-react";
import { PurchaseOrdersTable } from "@/components/purchases/orders/PurchaseOrdersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { mockPurchaseOrders } from "@/data/mockPurchaseOrders";

const PurchasesOrdersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = mockPurchaseOrders.filter((order) => {
    // Filter based on search term
    const matchesSearch = !searchTerm || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter based on active tab
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "draft" && order.status === "draft") ||
      (activeTab === "pending" && order.status === "pending") ||
      (activeTab === "approved" && order.status === "approved") ||
      (activeTab === "completed" && order.status === "completed") ||
      (activeTab === "cancelled" && order.status === "cancelled");
    
    return matchesSearch && matchesTab;
  });

  const handleCreateNew = () => {
    navigate("/purchases/orders/new");
    // For now, we'll show a toast since the new order page doesn't exist yet
    toast.info("صفحة إنشاء أمر شراء جديد قيد التطوير");
  };

  const handleExport = () => {
    toast.success("تم تصدير أوامر الشراء بنجاح");
  };

  const handleDeleteSelected = () => {
    if (selectedOrders.length === 0) {
      toast.error("يرجى تحديد أمر شراء واحد على الأقل للحذف");
      return;
    }
    
    // In a real application, you would call an API to delete the selected orders
    toast.success(`تم حذف ${selectedOrders.length} من أوامر الشراء بنجاح`);
    setSelectedOrders([]);
  };

  const handleToggleSelection = (id: string) => {
    setSelectedOrders(prev => 
      prev.includes(id) 
        ? prev.filter(orderId => orderId !== id) 
        : [...prev, id]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusCount = (status: string) => {
    return mockPurchaseOrders.filter(order => order.status === status).length;
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">أوامر الشراء</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileDown className="ml-2 h-4 w-4" />
            تصدير
          </Button>
          <Button onClick={handleCreateNew}>
            <Plus className="ml-2 h-4 w-4" />
            أمر شراء جديد
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>إدارة أوامر الشراء</CardTitle>
            <div className="flex items-center gap-2">
              {selectedOrders.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="ml-2 h-4 w-4" />
                  حذف المحدد ({selectedOrders.length})
                </Button>
              )}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-64 pl-2 pr-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                الكل
                <Badge variant="secondary" className="mr-2 ml-0">
                  {mockPurchaseOrders.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="draft">
                مسودة
                <Badge variant="secondary" className="mr-2 ml-0">
                  {getStatusCount("draft")}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                قيد الانتظار
                <Badge variant="secondary" className="mr-2 ml-0">
                  {getStatusCount("pending")}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">
                معتمد
                <Badge variant="secondary" className="mr-2 ml-0">
                  {getStatusCount("approved")}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                مكتمل
                <Badge variant="secondary" className="mr-2 ml-0">
                  {getStatusCount("completed")}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                ملغي
                <Badge variant="secondary" className="mr-2 ml-0">
                  {getStatusCount("cancelled")}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <PurchaseOrdersTable 
                orders={filteredOrders}
                selectedOrders={selectedOrders}
                onToggleSelection={handleToggleSelection}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchasesOrdersPage;


import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Search, Printer, Receipt, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Combobox } from "@/components/ui/combobox"; // Now this import should work
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InvoiceItem } from "@/types/invoices";
import { v4 as uuidv4 } from 'uuid';

// Sample data for invoices (in a real app this would come from an API)
const sampleInvoices = [
  {
    id: "inv001",
    invoiceNumber: "INV-20230501-1001",
    customerName: "مؤسسة الفيصل للسيارات",
    date: "2023-05-01",
    totalAmount: 5760.50
  },
  {
    id: "inv002",
    invoiceNumber: "INV-20230505-1002",
    customerName: "شركة النخبة للخدمات",
    date: "2023-05-05",
    totalAmount: 3250.75
  },
  {
    id: "inv003",
    invoiceNumber: "INV-20230510-1003",
    customerName: "مؤسسة الصقر للسيارات",
    date: "2023-05-10",
    totalAmount: 8450.00
  }
];

// Sample data for invoice items
const sampleInvoiceItems = {
  "inv001": [
    {
      id: "item001",
      productId: "p001",
      code: "SKU1001",
      name: "بطارية سيارة إنرجايزر 60 أمبير",
      description: "بطارية سيارة عالية الجودة",
      quantity: 2,
      price: 450,
      discount: 0,
      discountType: "percentage",
      tax: 15,
      total: 1035
    },
    {
      id: "item002",
      productId: "p002",
      code: "SKU1002",
      name: "زيت محرك شل هيلكس 5 لتر",
      description: "زيت محرك اصطناعي 5W-30",
      quantity: 5,
      price: 120,
      discount: 5,
      discountType: "percentage",
      tax: 15,
      total: 651.75
    },
    {
      id: "item003",
      productId: "p003",
      code: "SKU1003",
      name: "فلتر زيت تويوتا",
      description: "فلتر زيت أصلي لسيارات تويوتا",
      quantity: 10,
      price: 45,
      discount: 0,
      discountType: "percentage",
      tax: 15,
      total: 517.50
    }
  ],
  "inv002": [
    {
      id: "item004",
      productId: "p004",
      code: "SKU2001",
      name: "كمبيوتر HP ProBook",
      description: "كمبيوتر محمول HP ProBook 450 G8",
      quantity: 1,
      price: 3250.75,
      discount: 0,
      discountType: "percentage",
      tax: 15,
      total: 3250.75
    }
  ],
  "inv003": [
    {
      id: "item005",
      productId: "p005",
      code: "SKU3001",
      name: "إطار ميشلان",
      description: "إطار ميشلان 215/55R17",
      quantity: 4,
      price: 850,
      discount: 10,
      discountType: "percentage",
      tax: 15,
      total: 3519
    },
    {
      id: "item006",
      productId: "p006",
      code: "SKU3002",
      name: "جنوط ألمنيوم 17 بوصة",
      description: "جنوط ألمنيوم خفيفة الوزن",
      quantity: 4,
      price: 1200,
      discount: 0,
      discountType: "percentage",
      tax: 15,
      total: 5520
    }
  ]
};

interface ReturnItem extends InvoiceItem {
  returnQuantity: number;
  returnReason?: string;
  originalQuantity: number;
  approved?: boolean;
}

const SalesReturnFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<ReturnItem[]>([]);
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);
  const [returnNote, setReturnNote] = useState("");
  const [returnReason, setReturnReason] = useState("عيب في المنتج");

  useEffect(() => {
    if (selectedInvoice) {
      // In a real app, this would be an API call to get invoice items
      const items = sampleInvoiceItems[selectedInvoice as keyof typeof sampleInvoiceItems] || [];
      
      // Fix the type issue by explicitly typing the discountType as "percentage" | "fixed"
      setInvoiceItems(items.map(item => ({
        ...item,
        returnQuantity: 0,
        originalQuantity: item.quantity,
        returnReason: "",
        discountType: item.discountType as "percentage" | "fixed" // Ensure correct type
      })));

      setReturnItems([]);
    }
  }, [selectedInvoice]);

  const handleAddToReturn = (item: ReturnItem) => {
    if (item.returnQuantity <= 0 || item.returnQuantity > item.originalQuantity) {
      toast.error("كمية الإرجاع يجب أن تكون أكبر من 0 وأقل من أو تساوي الكمية الأصلية");
      return;
    }
    
    const updatedItem: ReturnItem = {
      ...item,
      id: uuidv4(), // Generate a new ID for the return item
      quantity: item.returnQuantity,
      total: (item.returnQuantity * item.price) * (1 - (item.discount / 100)) * (1 + (item.tax / 100))
    };
    
    setReturnItems(prev => [...prev, updatedItem]);
    
    // Update the original item's available quantity for return
    setInvoiceItems(prev => 
      prev.map(i => i.id === item.id ? {
        ...i,
        originalQuantity: i.originalQuantity - item.returnQuantity,
        returnQuantity: 0
      } : i)
    );
    
    toast.success("تمت إضافة العنصر إلى المرتجع");
  };
  
  const handleRemoveReturnItem = (itemId: string) => {
    const itemToRemove = returnItems.find(item => item.id === itemId);
    
    if (itemToRemove) {
      // Find the original item to restore its quantity
      const originalItemId = itemToRemove.productId;
      
      setInvoiceItems(prev => 
        prev.map(item => {
          if (item.productId === originalItemId) {
            return {
              ...item,
              originalQuantity: item.originalQuantity + itemToRemove.quantity
            };
          }
          return item;
        })
      );
      
      // Remove the item from returns
      setReturnItems(prev => prev.filter(item => item.id !== itemId));
      toast.success("تم إزالة العنصر من المرتجع");
    }
  };
  
  const handleUpdateReturnQuantity = (itemId: string, quantity: number) => {
    setInvoiceItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, returnQuantity: quantity } : item
      )
    );
  };

  const handleUpdateReturnReason = (itemId: string, reason: string) => {
    setReturnItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, returnReason: reason } : item
      )
    );
  };
  
  const calculateReturnTotal = () => {
    return returnItems.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };
  
  const handleSaveReturn = async () => {
    if (returnItems.length === 0) {
      toast.error("لا يمكن حفظ مرتجع بدون أصناف");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("تم حفظ المرتجع بنجاح");
      navigate("/invoices/returns");
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ المرتجع");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  const invoiceOptions = sampleInvoices.map(inv => ({
    value: inv.id,
    label: `${inv.invoiceNumber} - ${inv.customerName}`
  }));
  
  const selectedInvoiceDetails = selectedInvoice 
    ? sampleInvoices.find(inv => inv.id === selectedInvoice)
    : null;

  return (
    <Layout>
      <div className="h-full w-full flex flex-col overflow-hidden print:overflow-visible">
        <Header title="إنشاء مرتجع مبيعات" showBack={true} onBackClick={handleBack} />

        <div className="flex-1 overflow-auto print:overflow-visible py-4 px-6 bg-gray-50">
          {/* Top action bar */}
          <div className="flex justify-between items-center mb-4 print-hide">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">إنشاء مرتجع مبيعات جديد</h2>
              <p className="text-sm text-muted-foreground">قم باختيار الفاتورة وإضافة الأصناف المرتجعة</p>
            </div>
            
            <div className="space-x-2 rtl:space-x-reverse flex">
              <Button
                variant="outline"
                className="print-hide"
                onClick={handlePrint}
              >
                <Printer className="ml-1 h-4 w-4" />
                طباعة
              </Button>
              
              <Button
                variant="outline"
                className="print-hide"
                onClick={handleBack}
              >
                <ArrowLeft className="ml-1 h-4 w-4" />
                رجوع
              </Button>
              
              <Button
                onClick={handleSaveReturn}
                className="print-hide bg-green-600 hover:bg-green-700"
                disabled={returnItems.length === 0 || isLoading}
              >
                {isLoading ? (
                  <>جاري الحفظ...</>
                ) : (
                  <>
                    <Save className="ml-1 h-4 w-4" />
                    حفظ المرتجع
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Invoice selection */}
          <Card className="mb-6 print-hide">
            <CardHeader>
              <CardTitle>اختيار الفاتورة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="flex flex-col space-y-2 w-full">
                    <Label htmlFor="invoice-select">اختر الفاتورة</Label>
                    <Combobox
                      items={invoiceOptions}
                      value={selectedInvoice || ""}
                      onChange={setSelectedInvoice}
                      placeholder="اختر الفاتورة"
                    />
                  </div>
                </div>
                {selectedInvoiceDetails && (
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <h3 className="font-semibold text-blue-900">تفاصيل الفاتورة</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div>
                        <span className="text-blue-700">رقم الفاتورة:</span>
                        <p className="font-medium">{selectedInvoiceDetails.invoiceNumber}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">العميل:</span>
                        <p className="font-medium">{selectedInvoiceDetails.customerName}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">التاريخ:</span>
                        <p className="font-medium">{selectedInvoiceDetails.date}</p>
                      </div>
                      <div>
                        <span className="text-blue-700">المبلغ الإجمالي:</span>
                        <p className="font-medium">{selectedInvoiceDetails.totalAmount.toFixed(2)} ريال</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Available items */}
          {selectedInvoice && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="flex items-center">
                      <span>أصناف الفاتورة المتاحة للإرجاع</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>الرمز</TableHead>
                            <TableHead>الصنف</TableHead>
                            <TableHead className="text-center">الكمية المتاحة</TableHead>
                            <TableHead className="text-center">كمية الإرجاع</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoiceItems.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                لا توجد أصناف متاحة للإرجاع
                              </TableCell>
                            </TableRow>
                          ) : (
                            invoiceItems
                              .filter(item => item.originalQuantity > 0)
                              .map(item => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.code}</TableCell>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell className="text-center">{item.originalQuantity}</TableCell>
                                  <TableCell className="w-28 text-center">
                                    <Input
                                      type="number"
                                      min={1}
                                      max={item.originalQuantity}
                                      value={item.returnQuantity || ""}
                                      onChange={(e) => handleUpdateReturnQuantity(item.id, parseInt(e.target.value) || 0)}
                                      className="text-center"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleAddToReturn(item)}
                                      disabled={item.returnQuantity <= 0 || item.returnQuantity > item.originalQuantity}
                                    >
                                      <ArrowDown className="h-4 w-4 ml-1" />
                                      إضافة للمرتجع
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Return reason and notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>سبب الإرجاع والملاحظات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="return-reason">سبب الإرجاع العام</Label>
                          <select
                            id="return-reason"
                            value={returnReason}
                            onChange={(e) => setReturnReason(e.target.value)}
                            className="w-full border border-input rounded-md px-3 py-2 mt-1"
                          >
                            <option value="عيب في المنتج">عيب في المنتج</option>
                            <option value="خطأ في الطلبية">خطأ في الطلبية</option>
                            <option value="غير مطابق للمواصفات">غير مطابق للمواصفات</option>
                            <option value="تغيير رأي العميل">تغيير رأي العميل</option>
                            <option value="تلف أثناء الشحن">تلف أثناء الشحن</option>
                            <option value="أخرى">أخرى</option>
                          </select>
                        </div>
                        <div className="print-hide">
                          <Label htmlFor="return-policy">سياسة الإرجاع</Label>
                          <div className="p-2 border rounded-md mt-1 text-xs text-muted-foreground">
                            يمكن إرجاع المنتجات خلال 14 يومًا من تاريخ الشراء مع احتفاظ العميل بالفاتورة الأصلية.
                            يجب أن تكون المنتجات في حالتها الأصلية وضمن العبوة الأصلية.
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="return-notes">ملاحظات إضافية</Label>
                        <Textarea
                          id="return-notes"
                          value={returnNote}
                          onChange={(e) => setReturnNote(e.target.value)}
                          placeholder="أدخل أي ملاحظات إضافية هنا..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Return items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="bg-amber-50 border-b border-amber-100">
                    <CardTitle className="text-amber-800">المرتجعات المختارة</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {returnItems.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>لم يتم إضافة أي أصناف للإرجاع بعد</p>
                        <p className="text-sm mt-2">قم باختيار الأصناف من القائمة على اليمين</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {returnItems.map((item) => (
                          <div key={item.id} className="border rounded-md p-3 bg-white">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.code}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 h-6 w-6 p-0"
                                onClick={() => handleRemoveReturnItem(item.id)}
                              >
                                &times;
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 mt-2 text-sm gap-2">
                              <div>
                                <span className="text-muted-foreground">الكمية:</span>
                                <span className="font-medium mr-1">{item.quantity}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">السعر:</span>
                                <span className="font-medium mr-1">{item.price.toFixed(2)} ريال</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Label htmlFor={`reason-${item.id}`} className="text-xs">سبب الإرجاع</Label>
                              <select
                                id={`reason-${item.id}`}
                                value={item.returnReason || returnReason}
                                onChange={(e) => handleUpdateReturnReason(item.id, e.target.value)}
                                className="w-full border border-input rounded-md px-2 py-1 mt-1 text-sm"
                              >
                                <option value="عيب في المنتج">عيب في المنتج</option>
                                <option value="خطأ في الطلبية">خطأ في الطلبية</option>
                                <option value="غير مطابق للمواصفات">غير مطابق للمواصفات</option>
                                <option value="تغيير رأي العميل">تغيير رأي العميل</option>
                                <option value="تلف أثناء الشحن">تلف أثناء الشحن</option>
                                <option value="أخرى">أخرى</option>
                              </select>
                            </div>
                          </div>
                        ))}
                        
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between font-medium">
                            <span>إجمالي قيمة المرتجع:</span>
                            <span>{calculateReturnTotal()} ريال</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {!selectedInvoice && (
            <div className="bg-amber-50 p-6 rounded-md border border-amber-200 text-center">
              <h3 className="text-amber-800 font-semibold text-lg mb-2">الرجاء اختيار فاتورة</h3>
              <p className="text-amber-700">
                قم باختيار فاتورة من القائمة أعلاه لعرض الأصناف المتاحة للإرجاع
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Print styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-section, .print-section * {
              visibility: visible;
            }
            .print-hide {
              display: none !important;
            }
            .print-section {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default SalesReturnFormPage;

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { useExpenses } from "@/hooks/useExpenses";
import { Expense } from "@/types/expenses";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "sonner";
import { FileText, Trash, Edit, Calendar as CalendarIcon, Save, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
const NewExpensePage: React.FC = () => {
  const {
    expenses,
    categories,
    selectedExpense,
    setSelectedExpense,
    isEditing,
    setIsEditing,
    addExpense,
    updateExpense,
    deleteExpense
  } = useExpenses();
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "credit" | "bank">("cash");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");

  // تحديث النموذج عند اختيار مصروف للتعديل
  useEffect(() => {
    if (selectedExpense && isEditing) {
      setDate(selectedExpense.date);
      setCategory(selectedExpense.category);
      setAmount(selectedExpense.amount.toString());
      setDescription(selectedExpense.description);
      setPaymentMethod(selectedExpense.paymentMethod);
      setAttachments(selectedExpense.attachments || []);
      setNotes(selectedExpense.notes || "");
      setStatus(selectedExpense.status);
    }
  }, [selectedExpense, isEditing]);
  const handleReset = () => {
    setDate(new Date());
    setCategory("");
    setAmount("");
    setDescription("");
    setPaymentMethod("cash");
    setAttachments([]);
    setNotes("");
    setStatus("pending");
    setSelectedExpense(null);
    setIsEditing(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !description) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }
    const expenseData = {
      date,
      category,
      amount: parseFloat(amount),
      description,
      paymentMethod,
      status,
      attachments,
      notes
    };
    if (isEditing && selectedExpense) {
      updateExpense({
        id: selectedExpense.id,
        ...expenseData
      });
    } else {
      addExpense(expenseData);
    }
    handleReset();
  };
  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditing(true);
  };
  const handleDelete = (id: string) => {
    deleteExpense(id);
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // في تطبيق حقيقي، هنا سنقوم برفع الملفات إلى الخادم
      // لكن في هذا المثال، سنضيف فقط أسماء الملفات
      const newAttachments = [...attachments];
      for (let i = 0; i < files.length; i++) {
        newAttachments.push(files[i].name);
      }
      setAttachments(newAttachments);
      toast.success("تم رفع الملفات بنجاح");
    }
  };
  return <div className="container mx-auto p-6 rtl px-0 py-[2px] bg-cyan-100">
      <Header title="تسجيل مصروف جديد" showBack={true} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* نموذج المصروفات */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">تاريخ المصروف</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-right">
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy", {
                        locale: ar
                      }) : "اختر التاريخ"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar mode="single" selected={date} onSelect={date => date && setDate(date)} className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="category">التصنيف</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">المبلغ</Label>
                  <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="أدخل المبلغ" />
                </div>

                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="أدخل وصف المصروف" className="resize-none" />
                </div>

                <div>
                  <Label htmlFor="paymentMethod">طريقة الدفع</Label>
                  <Select value={paymentMethod} onValueChange={value => setPaymentMethod(value as "cash" | "credit" | "bank")}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر طريقة الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">نقداً</SelectItem>
                      <SelectItem value="credit">بطاقة ائتمان</SelectItem>
                      <SelectItem value="bank">تحويل بنكي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">الحالة</Label>
                  <Select value={status} onValueChange={value => setStatus(value as "pending" | "approved" | "rejected")}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">قيد الانتظار</SelectItem>
                      <SelectItem value="approved">مقبول</SelectItem>
                      <SelectItem value="rejected">مرفوض</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="أدخل ملاحظات إضافية (اختياري)" className="resize-none" />
                </div>

                <div>
                  <Label htmlFor="file">المرفقات</Label>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" className="w-full" onClick={() => document.getElementById("file-upload")?.click()}>
                      <Upload className="ml-2 h-4 w-4" />
                      إضافة مرفقات
                    </Button>
                    <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />
                  </div>
                  {attachments.length > 0 && <div className="mt-2 space-y-1">
                      {attachments.map((file, index) => <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex items-center">
                            <FileText size={16} className="ml-2 text-gray-500" />
                            <span className="text-sm truncate">{file}</span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => {
                      const newAttachments = [...attachments];
                      newAttachments.splice(index, 1);
                      setAttachments(newAttachments);
                    }}>
                            <Trash size={14} />
                          </Button>
                        </div>)}
                    </div>}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="w-full">
                    <Save className="ml-2 h-4 w-4" />
                    {isEditing ? "تحديث" : "حفظ"} المصروف
                  </Button>
                  {isEditing && <Button type="button" variant="outline" onClick={handleReset} className="flex-shrink-0">
                      إلغاء
                    </Button>}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* قائمة المصروفات */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="mb-4 text-red-600 font-extrabold text-3xl">آخر المصروفات</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>التصنيف</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>طريقة الدفع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.slice(0, 10).map(expense => <TableRow key={expense.id}>
                      <TableCell>
                        {format(expense.date, "dd/MM/yyyy", {
                      locale: ar
                    })}
                      </TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.amount.toLocaleString("ar-SA")} ريال</TableCell>
                      <TableCell>
                        {expense.paymentMethod === "cash" ? "نقداً" : expense.paymentMethod === "credit" ? "بطاقة ائتمان" : "تحويل بنكي"}
                      </TableCell>
                      <TableCell>
                        <span className={cn("px-2 py-1 rounded-full text-xs", expense.status === "approved" ? "bg-green-100 text-green-800" : expense.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800")}>
                          {expense.status === "approved" ? "مقبول" : expense.status === "rejected" ? "مرفوض" : "قيد الانتظار"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(expense)}>
                            <Edit size={16} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                                <AlertDialogDescription>
                                  سيتم حذف هذا المصروف بشكل نهائي. هذا الإجراء لا يمكن التراجع عنه.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(expense.id)}>
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default NewExpensePage;
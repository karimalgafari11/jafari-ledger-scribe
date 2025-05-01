
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseCategory } from "@/types/expenses";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trash, Edit, Save, Plus } from "lucide-react";
import InteractiveLayout from "@/components/interactive/InteractiveLayout";
import { ZoomProvider } from "@/components/interactive/ZoomControl";
import ZoomControl from "@/components/interactive/ZoomControl";

const ExpenseCategoriesPage: React.FC = () => {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory
  } = useExpenses();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [budgetLimit, setBudgetLimit] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [interactiveMode, setInteractiveMode] = useState(false);

  const handleReset = () => {
    setName("");
    setDescription("");
    setBudgetLimit("");
    setIsActive(true);
    setIsEditing(false);
    setEditingCategoryId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("الرجاء إدخال اسم التصنيف");
      return;
    }
    const categoryData: Omit<ExpenseCategory, "id"> = {
      name,
      description: description || undefined,
      budgetLimit: budgetLimit ? parseFloat(budgetLimit) : undefined,
      isActive
    };
    if (isEditing && editingCategoryId) {
      updateCategory({
        id: editingCategoryId,
        ...categoryData
      });
    } else {
      addCategory(categoryData);
    }
    handleReset();
    setDialogOpen(false);
  };

  const handleEdit = (category: ExpenseCategory) => {
    setName(category.name);
    setDescription(category.description || "");
    setBudgetLimit(category.budgetLimit?.toString() || "");
    setIsActive(category.isActive);
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const result = deleteCategory(id);
    if (result) {
      handleReset();
    }
  };

  const filteredCategories = categories.filter(category => 
    category.name.includes(searchQuery) || 
    category.description && category.description.includes(searchQuery)
  );

  const categoriesTable = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>اسم التصنيف</TableHead>
          <TableHead>الوصف</TableHead>
          <TableHead>حد الميزانية</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCategories.map(category => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description || "-"}</TableCell>
            <TableCell>
              {category.budgetLimit ? `${category.budgetLimit.toLocaleString("ar-SA")} ريال` : "-"}
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {category.isActive ? "نشط" : "غير نشط"}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
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
                        سيتم حذف هذا التصنيف بشكل نهائي. لا يمكن حذف التصنيفات المرتبطة بمصروفات.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(category.id)}>
                        حذف
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto p-6 rtl px-0 py-[2px] bg-cyan-100 rounded-lg">
      <Header title="تصنيفات المصروفات" showBack={true}>
        <Button 
          variant="outline" 
          onClick={() => setInteractiveMode(!interactiveMode)}
          className="ml-2"
        >
          {interactiveMode ? "العرض العادي" : "العرض التفاعلي"}
        </Button>
        
        {interactiveMode && (
          <ZoomControl compact />
        )}
      </Header>

      <div className="flex justify-between items-center mb-6">
        <div className="w-72">
          <Input placeholder="بحث عن تصنيف..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleReset}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة تصنيف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditing ? "تعديل التصنيف" : "إضافة تصنيف جديد"}</DialogTitle>
              <DialogDescription>
                أدخل معلومات التصنيف أدناه. يمكنك تحديد الميزانية المخصصة (اختياري).
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">اسم التصنيف</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="أدخل اسم التصنيف" />
                </div>

                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="أدخل وصف التصنيف (اختياري)" className="resize-none" />
                </div>

                <div>
                  <Label htmlFor="budgetLimit">حد الميزانية</Label>
                  <Input id="budgetLimit" type="number" value={budgetLimit} onChange={e => setBudgetLimit(e.target.value)} placeholder="أدخل حد الميزانية (اختياري)" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
                  <Label htmlFor="isActive" className="mr-2">نشط</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">
                  <Save className="ml-2 h-4 w-4" />
                  {isEditing ? "تحديث" : "حفظ"} التصنيف
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {interactiveMode ? (
        <ZoomProvider>
          <InteractiveLayout>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {categoriesTable}
              </CardContent>
            </Card>
          </InteractiveLayout>
        </ZoomProvider>
      ) : (
        <Card>
          <CardContent className="p-6">
            {categoriesTable}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseCategoriesPage;

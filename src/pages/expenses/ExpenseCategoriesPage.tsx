
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FilePen, Trash2, FolderTree, Search } from "lucide-react";
import { ExpenseCategoriesTable } from "@/components/expenses/ExpenseCategoriesTable";
import { ExpenseCategoryDialog } from "@/components/expenses/ExpenseCategoryDialog";
import { DeleteConfirmDialog } from "@/components/expenses/DeleteCategoryDialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseCategory } from "@/types/expenses";

const ExpenseCategoriesPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useExpenses();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddNew = () => {
    setSelectedCategory(null);
    setIsDialogOpen(true);
  };
  
  const handleEdit = (category: ExpenseCategory) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (category: ExpenseCategory) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSaveCategory = (category: ExpenseCategory | Omit<ExpenseCategory, "id">) => {
    if ('id' in category) {
      updateCategory(category as ExpenseCategory);
    } else {
      addCategory(category);
    }
    setIsDialogOpen(false);
  };
  
  const confirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const activeCategoriesCount = categories.filter(cat => cat.isActive).length;
  
  return (
    <PageContainer title="فئات المصروفات">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة فئات المصروفات</h1>
          <Button onClick={handleAddNew}>
            <Plus className="ml-2 h-4 w-4" /> فئة جديدة
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>إحصائيات الفئات</CardTitle>
            <FolderTree className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <p className="text-muted-foreground mb-2">إجمالي الفئات</p>
                <p className="text-3xl font-semibold">{categories.length}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <p className="text-muted-foreground mb-2">الفئات النشطة</p>
                <p className="text-3xl font-semibold">{activeCategoriesCount}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <p className="text-muted-foreground mb-2">الفئات غير النشطة</p>
                <p className="text-3xl font-semibold">{categories.length - activeCategoriesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>قائمة فئات المصروفات</CardTitle>
            <div className="relative w-64">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="بحث..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-9" 
              />
            </div>
          </CardHeader>
          <CardContent>
            <ExpenseCategoriesTable 
              categories={filteredCategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
      
      <ExpenseCategoryDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveCategory}
        category={selectedCategory}
      />
      
      <DeleteConfirmDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        categoryName={selectedCategory?.name || ""}
      />
    </PageContainer>
  );
};

export default ExpenseCategoriesPage;


import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

const NewExpensePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleSave = () => {
    toast.success("تم حفظ المصروف بنجاح");
    navigate("/expenses");
  };

  return (
    <PageContainer title={t("add") + " " + t("expenses")}>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("add") + " " + t("expenses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">{t("totalSales")}</Label>
                  <Input id="amount" type="number" placeholder={t("totalSales")} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">{t("date")}</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">{t("filter")}</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder={t("filter")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">إيجار</SelectItem>
                      <SelectItem value="utilities">مرافق</SelectItem>
                      <SelectItem value="salaries">رواتب</SelectItem>
                      <SelectItem value="supplies">مستلزمات</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment">طريقة الدفع</Label>
                  <Select>
                    <SelectTrigger id="payment">
                      <SelectValue placeholder="اختر طريقة الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">نقدي</SelectItem>
                      <SelectItem value="bank">تحويل بنكي</SelectItem>
                      <SelectItem value="card">بطاقة ائتمانية</SelectItem>
                      <SelectItem value="check">شيك</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">التفاصيل</Label>
                <Textarea id="description" placeholder="أدخل تفاصيل المصروف" />
              </div>
              
              <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
                <Button variant="outline" onClick={() => navigate("/expenses")}>{t("cancel")}</Button>
                <Button type="button" onClick={handleSave}>{t("save")}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default NewExpensePage;

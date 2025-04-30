
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { CostCenter } from '@/hooks/useCostCenters';

const costCenterSchema = z.object({
  code: z.string().min(2, { message: 'يجب أن يكون الرمز على الأقل حرفين' }),
  name: z.string().min(2, { message: 'يجب أن يكون الاسم على الأقل حرفين' }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  parentId: z.string().nullable().optional()
});

type CostCenterFormValues = z.infer<typeof costCenterSchema>;

interface CostCenterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CostCenterFormValues) => void;
  defaultValues?: Partial<CostCenterFormValues>;
  title: string;
  description?: string;
  isCreating: boolean;
}

export const CostCenterDialog: React.FC<CostCenterDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {
    code: '',
    name: '',
    description: '',
    isActive: true,
    parentId: null
  },
  title,
  description,
  isCreating
}) => {
  const form = useForm<CostCenterFormValues>({
    resolver: zodResolver(costCenterSchema),
    defaultValues
  });

  React.useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, form, defaultValues]);

  const handleSubmit = (data: CostCenterFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rtl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرمز</FormLabel>
                    <FormControl>
                      <Input placeholder="CC-001" {...field} />
                    </FormControl>
                    <FormDescription>
                      رمز مركز الكلفة (يجب أن يكون فريداً)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم</FormLabel>
                    <FormControl>
                      <Input placeholder="المبيعات" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="وصف مركز الكلفة..." 
                      className="resize-none" 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      نشط
                    </FormLabel>
                    <FormDescription>
                      هل مركز الكلفة نشط ويمكن استخدامه؟
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                إلغاء
              </Button>
              <Button type="submit">
                {isCreating ? 'إنشاء' : 'تحديث'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

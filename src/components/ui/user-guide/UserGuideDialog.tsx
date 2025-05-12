
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { UserGuideContent, GuideCategory } from './UserGuideContent';

interface UserGuideDialogProps {
  title?: string;
  description?: string;
  categories: GuideCategory[];
  trigger?: React.ReactNode;
  defaultCategory?: string;
}

export function UserGuideDialog({
  title = 'دليل المستخدم',
  description = 'تعرف على كيفية استخدام التطبيق بكفاءة',
  categories,
  trigger,
  defaultCategory
}: UserGuideDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-1">
            <HelpCircle className="h-4 w-4" />
            <span>المساعدة</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <UserGuideContent categories={categories} defaultCategory={defaultCategory} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

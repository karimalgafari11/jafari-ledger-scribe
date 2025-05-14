
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCheck, Archive, Trash, Eye, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface NotificationBulkActionsProps {
  selectedCount: number;
  onDeselectAll: () => void;
  onMarkAsRead: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

const NotificationBulkActions = ({ 
  selectedCount, 
  onDeselectAll, 
  onMarkAsRead, 
  onDelete, 
  isLoading 
}: NotificationBulkActionsProps) => {
  if (selectedCount === 0) return null;
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-muted/30 p-3 border-b rounded-t-md shadow-sm animate-fade-in">
      <div className="flex items-center mb-2 md:mb-0">
        <CheckCheck className="h-4 w-4 ml-2 text-primary" />
        <Badge variant="outline" className="bg-primary/10 text-primary font-medium">
          {selectedCount}
        </Badge>
        <span className="mr-2">إشعارات محددة</span>
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onDeselectAll}
                className="text-xs"
              >
                <Filter className="h-3.5 w-3.5 ml-1.5" />
                إلغاء التحديد
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>إلغاء تحديد جميع الإشعارات</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onMarkAsRead}
                disabled={isLoading}
                className="text-xs"
              >
                <Eye className="h-3.5 w-3.5 ml-1.5" />
                تعيين كمقروءة
                {isLoading && <span className="loading loading-spinner loading-xs mr-2"></span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>تعيين الإشعارات المحددة كمقروءة</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                className="text-xs border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700"
                disabled={isLoading}
              >
                <Archive className="h-3.5 w-3.5 ml-1.5" />
                أرشفة
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>أرشفة الإشعارات المحددة</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onDelete}
                disabled={isLoading}
                className="text-xs"
              >
                <Trash className="h-3.5 w-3.5 ml-1.5" />
                حذف
                {isLoading && <span className="loading loading-spinner loading-xs mr-2"></span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>حذف الإشعارات المحددة</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default NotificationBulkActions;


import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FinancialDecision } from '@/types/ai-finance';
import FinancialDecisionDetails from './FinancialDecisionDetails';
import { CheckCircle, XCircle, ThumbsUp } from 'lucide-react';

interface FinancialDecisionReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  decision: FinancialDecision | null;
  onImplement: (id: string) => void;
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
  isLoading: boolean;
}

const FinancialDecisionReviewModal: React.FC<FinancialDecisionReviewModalProps> = ({
  open,
  onOpenChange,
  decision,
  onImplement,
  onAccept,
  onDismiss,
  isLoading
}) => {
  if (!decision) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">مراجعة القرار المالي</DialogTitle>
          <DialogDescription>
            يمكنك مراجعة تفاصيل هذا القرار المالي واتخاذ الإجراءات المناسبة
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 overflow-y-auto px-1">
          <div className="py-2">
            <FinancialDecisionDetails decision={decision} />
          </div>
        </ScrollArea>
        
        <DialogFooter className="sm:justify-end mt-4 gap-2">
          {decision.status === 'suggested' && (
            <>
              <Button 
                variant="outline" 
                onClick={() => onDismiss(decision.id)}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <XCircle className="h-4 w-4" /> تجاهل
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onAccept(decision.id)}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <ThumbsUp className="h-4 w-4" /> قبول
              </Button>
              <Button 
                variant="default" 
                onClick={() => onImplement(decision.id)}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4" /> تنفيذ
              </Button>
            </>
          )}
          {decision.status === 'accepted' && (
            <Button 
              variant="default" 
              onClick={() => onImplement(decision.id)}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <CheckCircle className="h-4 w-4" /> تنفيذ
            </Button>
          )}
          {(decision.status === 'implemented' || decision.status === 'rejected') && (
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-1"
            >
              إغلاق
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialDecisionReviewModal;

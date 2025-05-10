
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import Draggable, { DraggableEventHandler } from "react-draggable"

import { cn } from "@/lib/utils"
import { AlertDialogOverlay, AlertDialogPortal } from "./alert-dialog-primitives"

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & {
    disableDrag?: boolean;
  }
>(({ className, disableDrag = false, ...props }, ref) => {
  const [defaultPosition, setDefaultPosition] = React.useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  
  // تأثير خاص بجانب العميل فقط
  React.useEffect(() => {
    const handleMount = () => {
      if (typeof window !== 'undefined') {
        setIsMounted(true);
        setDefaultPosition({
          x: Math.max(0, (window.innerWidth / 2) - 225),
          y: Math.max(0, (window.innerHeight / 2) - 150)
        });
      }
    };
    
    // تأخير قصير للتأكد من تحميل DOM بالكامل
    const timer = setTimeout(handleMount, 50);
    
    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, []);
  
  const innerContent = (
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full dark:bg-gray-900",
        disableDrag ? "" : "cursor-move",
        className
      )}
      style={{ 
        transform: disableDrag ? 'translate(-50%, -50%)' : 'none',
        left: disableDrag ? '50%' : undefined,
        top: disableDrag ? '50%' : undefined,
      }}
      {...props}
    />
  )

  // استخدام موضع ثابت أثناء SSR أو قبل تحميل جانب العميل
  if (!isMounted || typeof window === 'undefined') {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <div className="fixed z-50 left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
          {innerContent}
        </div>
      </AlertDialogPortal>
    );
  }

  // استخدام موضع ثابت إذا كان السحب معطلاً
  if (disableDrag) {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        {innerContent}
      </AlertDialogPortal>
    )
  }

  // في حالة أخرى، استخدام Draggable
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Draggable
        nodeRef={nodeRef}
        handle=".drag-handle"
        bounds="body"
        defaultPosition={defaultPosition}
        onStart={(e) => {
          // منع السحب عند النقر على العناصر التفاعلية
          const target = e.target as HTMLElement;
          if (target.closest('button') || target.closest('input') || target.closest('select')) {
            return false;
          }
        }}
      >
        <div ref={nodeRef} className="fixed z-50">
          <div className="drag-handle absolute inset-x-0 top-0 h-8 cursor-move" />
          {innerContent}
        </div>
      </Draggable>
    </AlertDialogPortal>
  )
})
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

export { AlertDialogContent }

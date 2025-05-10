
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import Draggable from "react-draggable"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

interface PopoverContentProps 
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  disableDrag?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, disableDrag = false, ...props }, ref) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  
  // تأثير خاص بجانب العميل فقط
  React.useEffect(() => {
    const handleMount = () => {
      if (typeof window !== 'undefined') {
        setIsMounted(true);
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
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-white p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-gray-900",
        disableDrag ? "" : "cursor-move",
        className
      )}
      {...props}
    />
  );

  // استخدام موضع ثابت أثناء SSR، قبل التحميل على جانب العميل، أو عندما يكون السحب معطلاً
  if (!isMounted || typeof window === 'undefined' || disableDrag) {
    return (
      <PopoverPrimitive.Portal>
        {innerContent}
      </PopoverPrimitive.Portal>
    );
  }

  // في حالة أخرى، استخدام Draggable
  return (
    <PopoverPrimitive.Portal>
      <Draggable
        nodeRef={nodeRef}
        handle=".drag-handle"
        bounds="body"
        defaultPosition={{ x: 0, y: 0 }}
        positionOffset={{ x: 0, y: -32 }}
        onStart={(e) => {
          // منع السحب عند النقر على العناصر التفاعلية
          const target = e.target as HTMLElement;
          if (target.closest('button') || target.closest('input') || target.closest('select')) {
            return false;
          }
        }}
      >
        <div ref={nodeRef}>
          <div className="drag-handle absolute inset-x-0 top-0 h-6 cursor-move rounded-t-md" />
          {innerContent}
        </div>
      </Draggable>
    </PopoverPrimitive.Portal>
  );
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

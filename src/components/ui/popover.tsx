
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
  const nodeRef = React.useRef(null);
  
  // Use useEffect to handle client-side mounting
  React.useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
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

  // If not mounted yet or dragging is disabled, render content directly
  if (!isMounted || disableDrag) {
    return (
      <PopoverPrimitive.Portal>
        {innerContent}
      </PopoverPrimitive.Portal>
    );
  }

  // Otherwise, wrap in Draggable with client-side only rendering to avoid DOM mismatch
  return (
    <PopoverPrimitive.Portal>
      <Draggable
        nodeRef={nodeRef}
        handle=".drag-handle"
        bounds="body"
        positionOffset={{ x: 0, y: -32 }}
        defaultPosition={{ x: 0, y: 0 }}
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

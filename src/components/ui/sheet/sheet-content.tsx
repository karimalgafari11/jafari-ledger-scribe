
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"
import Draggable, { DraggableEventHandler } from "react-draggable"

import { cn } from "@/lib/utils"
import { SheetClose, SheetOverlay, SheetPortal } from "./sheet-primitives"

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-gray-900",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> {
    disableDrag?: boolean;
  }

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, disableDrag = false, ...props }, ref) => {
  const [initialY, setInitialY] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  
  // Client-side effect only
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        setIsMounted(true);
        setInitialY(Math.max(0, (window.innerHeight / 2) - 200));
      }
    }, 100); // Increased timeout to ensure DOM is fully ready
    
    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, []);
  
  const innerContent = (
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className, disableDrag ? "" : "cursor-move")}
      {...props}
    >
      {children}
      <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-5 w-5" />
        <span className="sr-only">إغلاق</span>
      </SheetClose>
    </SheetPrimitive.Content>
  );

  // Use fixed positioning during SSR or before client-side loading
  if (!isMounted || typeof window === 'undefined') {
    return (
      <SheetPortal>
        <SheetOverlay />
        {innerContent}
      </SheetPortal>
    );
  }

  // Top and bottom sides should not be draggable
  if (disableDrag || side === "top" || side === "bottom") {
    return (
      <SheetPortal>
        <SheetOverlay />
        {innerContent}
      </SheetPortal>
    );
  }

  // For left and right sides, make them draggable vertically only
  const handleDragStart: DraggableEventHandler = (e) => {
    // Prevent dragging when clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select')) {
      return false;
    }
    // Don't return anything explicitly (undefined is compatible with void)
  };

  return (
    <SheetPortal>
      <SheetOverlay />
      <Draggable
        nodeRef={nodeRef}
        handle=".drag-handle"
        bounds={{ left: 0, right: 0 }} // Restrict horizontal movement
        defaultPosition={{ x: 0, y: initialY }}
        axis="y" // Allow vertical dragging only
        onStart={handleDragStart}
      >
        <div ref={nodeRef} className="fixed" style={{ 
          [side === "left" ? "left" : "right"]: 0
        }}>
          <div className="drag-handle absolute inset-x-0 top-0 h-8 cursor-move" />
          {innerContent}
        </div>
      </Draggable>
    </SheetPortal>
  );
})
SheetContent.displayName = SheetPrimitive.Content.displayName

export { SheetContent, sheetVariants }

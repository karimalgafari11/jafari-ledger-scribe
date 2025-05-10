"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import Draggable, { DraggableEventHandler } from "react-draggable"
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "./resizable"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    disableDrag?: boolean;
    disableResize?: boolean;
  }
>(({ className, children, disableDrag = false, disableResize = false, ...props }, ref) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  // Default position for dialog
  const [defaultPosition, setDefaultPosition] = React.useState({ x: 0, y: 0 });
  
  // Client-side effect only
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        setIsMounted(true);
        // Set default position in the center
        setDefaultPosition({
          x: Math.max(0, (window.innerWidth / 2) - 225),
          y: Math.max(0, (window.innerHeight / 2) - 150)
        });
      }
    }, 100); // Increased timeout to ensure DOM is fully ready
    
    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, []);

  // Inner dialog content
  const innerContent = (
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:bg-gray-900",
        disableDrag ? "" : "cursor-move",
        disableResize ? "" : "resize",
        className
      )}
      style={{ 
        transform: disableDrag ? 'translate(-50%, -50%)' : 'none',
        left: disableDrag ? '50%' : undefined,
        top: disableDrag ? '50%' : undefined,
      }}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-5 w-5" />
        <span className="sr-only">إغلاق</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  );

  // Use fixed positioning during SSR or before client-side loading
  if (!isMounted || typeof window === 'undefined') {
    return (
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed z-50 left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
          {innerContent}
        </div>
      </DialogPortal>
    );
  }

  // Use fixed positioning when dragging is disabled
  if (disableDrag) {
    return (
      <DialogPortal>
        <DialogOverlay />
        {innerContent}
      </DialogPortal>
    );
  }

  const handleDragStart: DraggableEventHandler = (e) => {
    // Prevent dragging when clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select')) {
      return false;
    }
    // Don't return anything explicitly (undefined is compatible with void)
  };

  // Otherwise, use Draggable
  return (
    <DialogPortal>
      <DialogOverlay />
      <Draggable
        nodeRef={nodeRef}
        handle=".drag-handle"
        bounds="body"
        defaultPosition={defaultPosition}
        onStart={handleDragStart}
      >
        <div ref={nodeRef} className="fixed z-50">
          {/* Drag handle area at the top of dialog */}
          <div className="drag-handle absolute inset-x-0 top-0 h-8 cursor-move" />
          {innerContent}
        </div>
      </Draggable>
    </DialogPortal>
  );
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left text-lg",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-x-reverse",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-base text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

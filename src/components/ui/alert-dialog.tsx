
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import Draggable from "react-draggable"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = ({
  ...props
}: AlertDialogPrimitive.AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal {...props} />
)
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & {
    disableDrag?: boolean;
  }
>(({ className, disableDrag = false, ...props }, ref) => {
  const [defaultPosition, setDefaultPosition] = React.useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  
  // Client-side only effect
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      setDefaultPosition({
        x: Math.max(0, (window.innerWidth / 2) - 225),
        y: Math.max(0, (window.innerHeight / 2) - 150)
      });
    }
    
    return () => {
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

  // Use static positioning during SSR or before client-side hydration
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

  // Use static positioning if dragging is disabled
  if (disableDrag) {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        {innerContent}
      </AlertDialogPortal>
    )
  }

  // Otherwise, wrap in Draggable
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Draggable
        nodeRef={nodeRef}
        handle=".drag-handle"
        bounds="body"
        defaultPosition={defaultPosition}
        positionOffset={{ x: 0, y: 0 }}
        onStart={(e) => {
          // Prevent dragging when clicking on interactive elements
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

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-right text-lg",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
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
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-xl font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-base text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), "text-base", className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0 text-base",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

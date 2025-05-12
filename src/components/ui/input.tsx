
import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  isSearchInput?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, isSearchInput, onClear, type, ...props }, ref) => {
    if (isSearchInput) {
      return (
        <div className={cn("relative flex items-center w-full", wrapperClassName)}>
          <div className="absolute left-3 flex items-center text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              props.value && "pr-8",
              className
            )}
            ref={ref}
            {...props}
          />
          {props.value && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      );
    }
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

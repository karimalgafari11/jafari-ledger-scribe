
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({ placeholder = "بحث..." }: { placeholder?: string }) {
  return (
    <div className="relative rtl">
      <Input
        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200"
        placeholder={placeholder}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-1 top-1/2 -translate-y-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-500"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </Button>
    </div>
  );
}

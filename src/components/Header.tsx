
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { ArrowLeft } from "lucide-react";
import { useSidebarNavigation } from "@/hooks/useSidebarNavigation";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  children?: React.ReactNode; // Added children prop
}

export function Header({ title, showBack = false, children }: HeaderProps) {
  const { handleItemClick } = useSidebarNavigation();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between rtl">
      <div className="flex items-center gap-4">
        {showBack && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleItemClick("/")}
            className="ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-2xl font-bold text-teal">{title}</h1>
      </div>
      
      {children ? (
        children
      ) : (
        <div className="flex items-center gap-4">
          <div className="w-64">
            <SearchBar placeholder="بحث..." />
          </div>
          
          <Button
            variant="outline"
            className="border-teal text-teal hover:bg-teal hover:text-white"
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
              className="ml-2"
            >
              <path d="M4 12h8" />
              <path d="M4 18V6" />
              <path d="M12 6v12" />
              <path d="M16 12h4" />
              <path d="M16 6v12" />
            </svg>
            تصفية
          </Button>
          
          <Button className="bg-teal hover:bg-teal-dark text-white">
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
              className="ml-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            تقرير جديد
          </Button>
        </div>
      )}
    </header>
  );
}

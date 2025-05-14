
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";

export const useSidebarNavigation = () => {
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleItemClick = (path?: string) => {
    if (path) {
      // Ensure path is properly formatted
      navigate(path);
      
      // Close mobile sidebar if needed
      if (isMobile) {
        setOpenMobile(false);
      }
    }
  };

  return { handleItemClick };
};

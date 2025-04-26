
import { useNavigate } from "react-router-dom";

export const useSidebarNavigation = () => {
  const navigate = useNavigate();

  const handleItemClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return { handleItemClick };
};

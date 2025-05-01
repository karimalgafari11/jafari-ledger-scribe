
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dir-rtl">
      <div className="text-center p-6">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
        </div>
        <h2 className="text-2xl font-medium mb-4">الصفحة غير موجودة</h2>
        <p className="text-lg text-gray-600 mb-6">الصفحة التي تبحث عنها غير متوفرة</p>
        <Link to="/">
          <Button className="bg-teal hover:bg-teal-dark flex items-center gap-2">
            <Home className="h-5 w-5" />
            العودة إلى الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

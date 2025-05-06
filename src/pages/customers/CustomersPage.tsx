
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CustomersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // توجيه المستخدم مباشرة إلى صفحة إدارة العملاء
    navigate("/customers/manage");
  }, [navigate]);

  return null; // لا نحتاج لعرض أي شيء، لأننا سننتقل مباشرة
};

export default CustomersPage;

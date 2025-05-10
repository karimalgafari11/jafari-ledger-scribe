
import React from "react";

interface DashboardWelcomeBannerProps {
  className?: string;
}

const DashboardWelcomeBanner: React.FC<DashboardWelcomeBannerProps> = ({ className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="card-container">
        <h2 className="text-2xl font-semibold mb-2">نظرة عامة</h2>
        <p className="text-gray-600">
          مرحباً بك في لوحة التحكم الخاصة بك. يمكنك هنا الاطلاع على أهم
          المؤشرات والبيانات الخاصة بعملك.
        </p>
      </div>
    </div>
  );
};

export default DashboardWelcomeBanner;

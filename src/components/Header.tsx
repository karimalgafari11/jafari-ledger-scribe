import React from 'react';
import NotificationsDropdown from './notifications/NotificationsDropdown';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">نظام إدارة الأعمال</h1>
      </div>
      
      <div className="flex items-center">
        <NotificationsDropdown />
        {/* Other header components like user profile, search, etc. */}
      </div>
    </header>
  );
};

export default Header;


import { useState, useEffect } from 'react';
import { SystemAlert } from '@/types/ai';

// Mock alerts data for demonstration purposes
const mockSystemAlerts: SystemAlert[] = [
  {
    id: "alert1",
    title: "مخزون منخفض",
    message: "انخفاض مستوى المخزون لـ 5 منتجات عن الحد الأدنى",
    type: "inventory",
    severity: "medium",
    priority: "high",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    data: {
      items: ["sku123", "sku456", "sku789", "sku012", "sku345"]
    }
  },
  {
    id: "alert2",
    title: "فواتير متأخرة",
    message: "هناك 3 فواتير متأخرة السداد تتجاوز 30 يوماً",
    type: "invoices",
    severity: "high",
    priority: "high",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    data: {
      invoiceIds: ["inv-2023-0123", "inv-2023-0145", "inv-2023-0167"]
    }
  },
  {
    id: "alert3",
    title: "تحديث النظام",
    message: "تم تحديث النظام إلى الإصدار 2.5.0",
    type: "system",
    severity: "low",
    priority: "low",
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    read: false
  }
];

export const useSystemAlerts = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>(mockSystemAlerts);
  const [loading, setLoading] = useState(false);

  // Mark alert as read
  const markAsRead = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  // Mark all alerts as read
  const markAllAsRead = () => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => ({ ...alert, read: true }))
    );
  };

  // Dismiss alert
  const dismissAlert = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.filter(alert => alert.id !== alertId)
    );
  };

  // Filter alerts by type
  const filterAlertsByType = (type: SystemAlert['type']) => {
    return alerts.filter(alert => alert.type === type);
  };

  // Get unread alerts count
  const getUnreadCount = () => {
    return alerts.filter(alert => !alert.read).length;
  };

  return {
    alerts,
    loading,
    markAsRead,
    markAllAsRead,
    dismissAlert,
    filterAlertsByType,
    getUnreadCount
  };
};

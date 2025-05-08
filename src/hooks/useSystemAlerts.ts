
import { useState, useEffect } from 'react';
import { SystemAlert } from '@/types/ai';
import { useAiAssistant } from './useAiAssistant';

export const useSystemAlerts = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const { getSystemAlerts } = useAiAssistant();

  useEffect(() => {
    // Fetch alerts when the component mounts
    setAlerts(getSystemAlerts());
    
    // Set up interval to periodically refresh alerts
    const intervalId = setInterval(() => {
      setAlerts(getSystemAlerts());
    }, 60000); // Refresh every minute
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [getSystemAlerts]);

  // Mark an alert as read
  const markAlertAsRead = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, read: true } 
          : alert
      )
    );
  };

  // Mark all alerts as read
  const markAllAlertsAsRead = () => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => ({ ...alert, read: true }))
    );
  };

  // Filter alerts by type
  const filterAlertsByType = (type: SystemAlert['type']) => {
    return alerts.filter(alert => alert.type === type);
  };

  // Filter alerts by priority
  const filterAlertsByPriority = (priority: SystemAlert['priority']) => {
    return alerts.filter(alert => alert.priority === priority);
  };

  return {
    alerts,
    markAlertAsRead,
    markAllAlertsAsRead,
    filterAlertsByType,
    filterAlertsByPriority
  };
};

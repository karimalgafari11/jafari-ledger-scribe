
import { useMemo } from 'react';

export const useVendorChartData = () => {
  const pieChartData = useMemo(() => {
    return {
      labels: ['مستلزمات مكتبية', 'معدات إلكترونية', 'أثاث مكتبي', 'أجهزة وتقنية', 'منتجات ورقية'],
      datasets: [
        {
          label: 'قيمة المشتريات',
          data: [1200, 3500, 5000, 7500, 750],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
        }
      ]
    };
  }, []);

  const barChartData = useMemo(() => {
    return {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'مشتريات 2023',
          data: [4500, 5900, 8000, 8100, 5600, 5500],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
        {
          label: 'مشتريات 2022',
          data: [3800, 4200, 6800, 7200, 4700, 4800],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
        }
      ]
    };
  }, []);

  const lineChartData = useMemo(() => {
    return {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'عدد طلبات الشراء',
          data: [12, 19, 15, 18, 22, 14],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
        {
          label: 'عدد المشتريات المستلمة',
          data: [9, 15, 12, 17, 19, 11],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
        }
      ]
    };
  }, []);

  return {
    pieChartData,
    barChartData,
    lineChartData
  };
};


import { ChartData } from "@/types/custom-reports";

// Helper function to transform raw data arrays into Chart Data format
export const transformSalesData = (data: { name: string; sales: number; target: number; expenses: number }[]): ChartData => {
  return {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Sales',
        data: data.map(item => item.sales),
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      },
      {
        label: 'Target',
        data: data.map(item => item.target),
        backgroundColor: 'rgba(153, 102, 255, 0.7)'
      },
      {
        label: 'Expenses',
        data: data.map(item => item.expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.7)'
      }
    ]
  };
};

export const transformProfitData = (data: { name: string; profit: number; profitMargin: string }[]): ChartData => {
  return {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Profit',
        data: data.map(item => item.profit),
        backgroundColor: 'rgba(75, 192, 192, 0.7)'
      }
    ]
  };
};

export const transformCategoryData = (data: { name: string; value: number; percentage: number }[]): ChartData => {
  return {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Value',
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ]
      }
    ]
  };
};

export const transformDailySalesData = (data: { day: string; sales: number }[]): ChartData => {
  return {
    labels: data.map(item => item.day),
    datasets: [
      {
        label: 'Sales',
        data: data.map(item => item.sales),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  };
};

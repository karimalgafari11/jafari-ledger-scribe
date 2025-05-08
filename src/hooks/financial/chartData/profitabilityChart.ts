
// Create profitability data chart
export function createProfitabilityChart() {
  return {
    labels: ['منتج أ', 'منتج ب', 'منتج ج', 'منتج د', 'منتج هـ'],
    datasets: [
      {
        label: 'الربحية',
        data: [25, 18, 22, 17, 23],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ]
      }
    ]
  };
}

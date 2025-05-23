
// مخطط الإيرادات حسب المصدر
export function createRevenueBySourceChart() {
  return {
    labels: ['المبيعات المباشرة', 'التجارة الإلكترونية', 'قنوات التوزيع', 'المشتريات الكبيرة', 'أخرى'],
    datasets: [
      {
        label: 'الإيرادات',
        data: [350000, 280000, 160000, 90000, 65000],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)'
        ]
      }
    ]
  };
}

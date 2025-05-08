
// مخطط المبيعات وهامش الربح
export function createSalesAndMarginChart() {
  return {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات',
        data: [840000, 870000, 920000, 910000, 930000, 945000],
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderColor: 'rgba(37, 99, 235, 1)'
      },
      {
        label: 'هامش الربح',
        data: [24, 24.5, 25.2, 25.8, 26.3, 27],
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 1)'
      }
    ]
  };
}

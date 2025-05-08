
// Create cashflow data chart
export function createCashflowChart() {
  return {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'التدفقات الداخلة',
        data: [450000, 480000, 520000, 490000, 540000, 580000],
        backgroundColor: 'rgba(16, 185, 129, 0.7)'
      },
      {
        label: 'التدفقات الخارجة',
        data: [380000, 410000, 450000, 420000, 460000, 490000],
        backgroundColor: 'rgba(239, 68, 68, 0.7)'
      }
    ]
  };
}

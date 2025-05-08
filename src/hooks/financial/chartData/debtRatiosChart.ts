
// Create debt ratios data chart
export function createDebtRatiosChart() {
  return {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'نسبة الديون',
        data: [0.4, 0.39, 0.37, 0.36, 0.35, 0.35],
        borderColor: 'rgba(239, 68, 68, 1)'
      }
    ]
  };
}

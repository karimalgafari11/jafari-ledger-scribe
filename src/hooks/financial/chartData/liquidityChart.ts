
// Create liquidity data chart
export function createLiquidityChart() {
  return {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'نسبة التداول',
        data: [2.1, 2.2, 2.3, 2.4, 2.5, 2.5],
        borderColor: 'rgba(37, 99, 235, 1)'
      }
    ]
  };
}

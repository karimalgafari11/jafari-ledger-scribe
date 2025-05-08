
// Create profitability ratio charts
export function createProfitabilityRatiosCharts() {
  return {
    grossMargin: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'هامش الربح الإجمالي',
        data: [35, 36, 36.5, 37, 37.5, 38],
        borderColor: 'rgba(37, 99, 235, 1)'
      }]
    },
    operatingMargin: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'هامش الربح التشغيلي',
        data: [22, 22.5, 23, 24, 25, 26],
        borderColor: 'rgba(16, 185, 129, 1)'
      }]
    },
    netMargin: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'هامش صافي الربح',
        data: [15, 16, 16.5, 17, 18, 19],
        borderColor: 'rgba(245, 158, 11, 1)'
      }]
    },
    roa: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'العائد على الأصول',
        data: [8, 8.5, 9, 9.5, 10, 10.5],
        borderColor: 'rgba(139, 92, 246, 1)'
      }]
    }
  };
}


// Create efficiency ratio charts
export function createEfficiencyRatiosCharts() {
  return {
    inventoryTurnover: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'معدل دوران المخزون',
        data: [10.5, 11.2, 11.8, 12.1, 12.4, 12.4],
        borderColor: 'rgba(37, 99, 235, 1)'
      }]
    },
    receivablesTurnover: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'معدل دوران الذمم المدينة',
        data: [8.2, 8.4, 8.6, 8.9, 9.1, 9.3],
        borderColor: 'rgba(16, 185, 129, 1)'
      }]
    },
    assetTurnover: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'معدل دوران الأصول',
        data: [1.2, 1.3, 1.3, 1.4, 1.4, 1.5],
        borderColor: 'rgba(245, 158, 11, 1)'
      }]
    },
    cashConversionCycle: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'دورة التحويل النقدي',
        data: [45, 43, 40, 38, 36, 35],
        borderColor: 'rgba(139, 92, 246, 1)'
      }]
    }
  };
}

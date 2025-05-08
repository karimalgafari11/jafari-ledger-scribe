
// مخطط التوقعات
export function createForecastChart() {
  return {
    labels: ['يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'المبيعات المتوقعة',
        data: [980000, 1025000, 1090000, 1180000, 1350000, 1450000],
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderColor: 'rgba(37, 99, 235, 1)'
      },
      {
        label: 'الحد الأدنى (نطاق الثقة)',
        data: [930000, 970000, 1010000, 1100000, 1250000, 1350000],
        backgroundColor: 'rgba(37, 99, 235, 0)',
        borderColor: 'rgba(37, 99, 235, 0.3)',
        borderDash: [5, 5]
      },
      {
        label: 'الحد الأقصى (نطاق الثقة)',
        data: [1030000, 1080000, 1170000, 1260000, 1450000, 1550000],
        backgroundColor: 'rgba(37, 99, 235, 0)',
        borderColor: 'rgba(37, 99, 235, 0.3)',
        borderDash: [5, 5]
      }
    ]
  };
}

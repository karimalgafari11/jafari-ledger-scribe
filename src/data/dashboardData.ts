
// بيانات تمثيلية - في التطبيق الحقيقي ستأتي من API
export const salesData = [
  {
    name: "يناير",
    sales: 52470,
    target: 45000,
    expenses: 32500
  }, {
    name: "فبراير",
    sales: 43820,
    target: 45000,
    expenses: 28600
  }, {
    name: "مارس",
    sales: 65500,
    target: 60000,
    expenses: 42800
  }, {
    name: "أبريل",
    sales: 74600,
    target: 70000,
    expenses: 35900
  }, {
    name: "مايو",
    sales: 84200,
    target: 80000,
    expenses: 38400
  }, {
    name: "يونيو",
    sales: 95800,
    target: 90000,
    expenses: 47200
  }
];

export const profitData = salesData.map(item => ({
  name: item.name,
  profit: item.sales - item.expenses,
  profitMargin: ((item.sales - item.expenses) / item.sales * 100).toFixed(1)
}));

export const customerDebtData = [
  {
    name: "شركة الأفق",
    value: 48500,
    percentage: 28
  }, {
    name: "مؤسسة النور",
    value: 35200,
    percentage: 21
  }, {
    name: "شركة الإبداع",
    value: 29800,
    percentage: 17
  }, {
    name: "مؤسسة التقدم",
    value: 24500,
    percentage: 14
  }, {
    name: "أخرى",
    value: 34000,
    percentage: 20
  }
];

export const supplierCreditData = [
  {
    name: "شركة المستقبل",
    value: 67200,
    percentage: 32
  }, {
    name: "مؤسسة الريادة",
    value: 54000,
    percentage: 25
  }, {
    name: "شركة التطوير",
    value: 38900,
    percentage: 19
  }, {
    name: "مؤسسة البناء",
    value: 31500,
    percentage: 15
  }, {
    name: "أخرى",
    value: 19400,
    percentage: 9
  }
];

export const dailySalesData = [
  {
    day: "السبت",
    sales: 12500
  }, {
    day: "الأحد",
    sales: 14800
  }, {
    day: "الاثنين",
    sales: 16200
  }, {
    day: "الثلاثاء",
    sales: 15700
  }, {
    day: "الأربعاء",
    sales: 18900
  }, {
    day: "الخميس",
    sales: 21300
  }, {
    day: "الجمعة",
    sales: 9800
  }
];

export const costCenterData = [
  {
    name: "المبيعات",
    value: 145000,
    percentage: 48
  }, {
    name: "التسويق",
    value: 87500,
    percentage: 29
  }, {
    name: "الإدارة",
    value: 42500,
    percentage: 14
  }, {
    name: "تقنية المعلومات",
    value: 27000,
    percentage: 9
  }
];


export const getPieChartColors = () => {
  const pieColors = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(255, 159, 64, 0.7)",
  ];

  const pieChartBorderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  return { pieColors, pieChartBorderColors };
};

export const prepareChartData = (filteredExpenses: Expense[]) => {
  const expensesByCategory: Record<string, number> = {};
  filteredExpenses.forEach((expense) => {
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = 0;
    }
    expensesByCategory[expense.category] += expense.amount;
  });

  const categoryLabels = Object.keys(expensesByCategory);
  const categoryData = Object.values(expensesByCategory);

  const expensesByPaymentMethod: Record<string, number> = {
    cash: 0,
    credit: 0,
    bank: 0,
  };
  filteredExpenses.forEach((expense) => {
    expensesByPaymentMethod[expense.paymentMethod] += expense.amount;
  });

  const { pieColors, pieChartBorderColors } = getPieChartColors();

  return {
    pieChartData: {
      labels: categoryLabels,
      datasets: [
        {
          label: "المصروفات",
          data: categoryData,
          backgroundColor: pieColors[0],
          borderColor: pieChartBorderColors[0],
        },
      ],
    },
    barChartData: {
      labels: ["نقداً", "بطاقة ائتمان", "تحويل بنكي"],
      datasets: [
        {
          label: "المصروفات حسب طريقة الدفع",
          data: [
            expensesByPaymentMethod.cash,
            expensesByPaymentMethod.credit,
            expensesByPaymentMethod.bank,
          ],
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
        },
      ],
    },
  };
};

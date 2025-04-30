
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA');
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ar-SA').format(num);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2
  }).format(amount);
};

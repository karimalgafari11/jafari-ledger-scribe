
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA');
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ar-SA').format(num);
};

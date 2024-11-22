export const currencyFormatter = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat("vi-VN").format(amount);
  return formattedAmount;
};

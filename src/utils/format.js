export const formatPrice = (price) => {
  if (price === null || price === undefined || price === 0 || price === '') return 'Price on Request';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

export const availabilityLabel = (value) => {
  const map = { in_stock: 'In Stock', made_to_order: 'Made to Order', out_of_stock: 'Out of Stock' };
  return map[value] || 'Made to Order';
};

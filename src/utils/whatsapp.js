import { WHATSAPP_NUMBER } from '../data/catalog';

const buildUrl = (message) => {
  if (!WHATSAPP_NUMBER) return '';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const generalEnquiry = () =>
  buildUrl('Hello Sri Subham Return Gifts, I would like to enquire about your return gift collections.');

export const productEnquiry = (productName) =>
  buildUrl(`Hello Sri Subham Return Gifts, I am interested in ${productName}. Please share the price, available designs, and bulk order details.`);

export const bulkEnquiry = () =>
  buildUrl('Hello Sri Subham Return Gifts, I would like to enquire about bulk return gift orders for an upcoming celebration.');

export const hasWhatsAppNumber = () => Boolean(WHATSAPP_NUMBER);

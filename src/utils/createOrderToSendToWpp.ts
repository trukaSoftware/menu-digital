import { DeliveryData } from '@/yup/front/develiveryFormSchema';

import { priceToBrazilCurrency } from './priceToBrazilCurrency';

interface CreateOrderToSendToWppProps {
  id: string;
  companyData: {
    deliveryPhoneNumber: string;
    name: string;
    deliveryTax: string;
    deliveryTime: string;
    address: string;
  };
  products: {
    name: string;
    complements: string[];
  }[];
  totalPrice: number;
  values?: DeliveryData;
  table?: string;
}

interface CreateOrder {
  id: string;
  companyData: {
    deliveryPhoneNumber: string;
    name: string;
    deliveryTax: string;
    deliveryTime: string;
    address: string;
  };
  products: {
    name: string;
    complements: string[];
  }[];
  values?: DeliveryData;
  table: string | undefined;
}

export const createOrder = ({
  table,
  id,
  companyData,
  products,
  values,
}: CreateOrder) => {
  if (table) {
    return {
      orderNumber: id.slice(0, 8),
      menuName: companyData.name,
      table,
      products,
    };
  }
  return {
    orderNumber: id.slice(0, 8),
    menuName: companyData.name,
    clientName: values?.clientName,
    clientPhoneNumber: values?.clientPhoneNumber,
    paymentMethod: values?.paymentMethod,
    deliveryType: values?.deliveryType,
    deliveryTime: companyData.deliveryTime,
    deliveryAddress: values?.deliveryAddress || ``,
    products,
  };
};

export const createOrderToSendToWpp = ({
  id,
  companyData,
  products,
  totalPrice,
  values,
  table,
}: CreateOrderToSendToWppProps) => {
  const order = createOrder({
    id,
    companyData,
    products,
    table,
    values,
  });

  let textOrderSummary = `\nRESUMO DO PEDIDO:\n`;

  order.products.forEach((product) => {
    if (product.complements.length > 0) {
      textOrderSummary += `\n${product.name}\n\nComplementos do Pedido:\n\n`;
      product.complements.forEach((complemento) => {
        textOrderSummary += `${complemento}\n`;
      });

      textOrderSummary += `\n>>>\n`;

      return;
    }
    textOrderSummary += `\n${product.name}\n\n>>>\n`;
  });

  if (table) {
    return `https://wa.me/55${
      companyData.deliveryPhoneNumber
    }?text=${encodeURIComponent(
      `Número do Pedido: ${order.orderNumber}\n` +
        `Mesa: ${order.table}\n` +
        `${textOrderSummary}\n` +
        `TOTAL: ${priceToBrazilCurrency(totalPrice)}`
    )}`;
  }

  const whatsappURLDelivery = `https://wa.me/55${
    companyData.deliveryPhoneNumber
  }?text=${encodeURIComponent(
    `Número do Pedido: ${order.orderNumber}\n` +
      `Nome Cardápio: ${order.menuName}\n` +
      `Nome do cliente: ${order.clientName}\n` +
      `Número do telefone: ${order.clientPhoneNumber}\n` +
      `Forma de pagamento: ${order.paymentMethod}\n` +
      `Tipo de entrega: ${order.deliveryType}\n` +
      `Tempo estimado de entrega: ${order.deliveryTime}\n` +
      `Endereço para entrega: ${order.deliveryAddress}\n` +
      `${textOrderSummary}\n` +
      `Taxa de entrega: ${priceToBrazilCurrency(
        Number(companyData.deliveryTax)
      )}\n` +
      `TOTAL: ${priceToBrazilCurrency(
        totalPrice + Number(companyData.deliveryTax)
      )}`
  )}`;

  return whatsappURLDelivery;
};

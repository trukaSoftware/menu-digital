import { priceToBrazilCurrency } from './priceToBrazilCurrency';

interface createOrderToSendToWppProps {
  id: string;
  companyData: {
    deliveryPhoneNumber: string;
    name: string;
  };
  products: {
    name: string;
    complements: string[];
  }[];
  totalPrice: number;
}

export const createOrderToSendToWpp = ({
  id,
  companyData,
  products,
  totalPrice,
}: createOrderToSendToWppProps) => {
  const order = {
    orderNumber: id.slice(0, 8),
    menuName: companyData.name,
    // clientName: `Mock nome`,
    // clientPhoneNumber: `Mock client phone number`,
    // paymentMethod: `Mock paymentMethod`,
    // deliveryType: `Mock deliveryType`,
    // deliveryTime: `Entre 35 e 45 minutos`,
    // deliveryAddress: `Rua 19, próximo a oficina de pitoco, tem um renault kwid da frente`,
    table: `1`, // table is a dinamic prop, but was not implemented yet
    products,
  };

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

  const whatsappURL = `https://wa.me/55${
    companyData.deliveryPhoneNumber
  }?text=${encodeURIComponent(
    `Número do Pedido: ${order.orderNumber}\n` +
      `Mesa: ${order.table}\n` +
      // `Nome Cardápio: ${order.menuName}\n` +
      // `Nome do cliente: ${order.clientName}\n` +
      // `Número do telefone: ${order.clientPhoneNumber}\n` +
      // `Forma de pagamento: ${order.paymentMethod}\n` +
      // `Tipo de entrega: ${order.deliveryType}\n` +
      // `Tempo estimado de entrega: ${order.deliveryTime}\n` +
      // `Endereço para entrega: ${order.deliveryAddress}\n` +
      `${textOrderSummary}\n` +
      // `Taxa de entrega: R$ 3,00\n` +
      `TOTAL: ${priceToBrazilCurrency(totalPrice)}` // here the delivery tax has to be added
  )}`;

  return whatsappURL;
};

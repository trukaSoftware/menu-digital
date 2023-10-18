import { useEffect, useState } from 'react';
import { FaRegEdit, FaShoppingBag } from 'react-icons/fa';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Image from 'next/image';

import axios from 'axios';

import { CartItemProps } from '@/components/FoodCardDialog';
import ModalDefaultHeader from '@/components/ModalDefaultHeader';

import { priceToBrazilCurrency } from '@/utils/priceToBrazilCurrency';

import { setCartItens } from '@/redux/features/cartItem-slice';
import { useUser } from '@clerk/nextjs';
import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export interface ShoppingCartPortalProps {
  setShowDialog: (value: boolean) => void;
  cartItens: CartItemProps[];
  companyData: {
    deliveryPhoneNumber: string;
    name: string;
  };
}

export default function ShoppingCartPortal({
  setShowDialog,
  cartItens,
  companyData,
}: ShoppingCartPortalProps) {
  const [generatingOrder, setGeneratingOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    const total = cartItens.reduce(
      (acc, current) => acc + current.totalValue,
      0
    );

    setTotalPrice(total);
  }, [cartItens]);

  const handleClearCartItems = () => {
    localStorage.setItem(`md-food-cart-items`, `[]`);
    dispatch(setCartItens([]));
  };

  const removeCartProductAmount = (cartItem: CartItemProps) => {
    const newAmount = cartItem.amount - 1;
    const updatedCartItens = cartItens
      .map((item) =>
        item.id === cartItem.id
          ? {
              ...item,
              amount: newAmount,
              totalValue: item.originalValue * newAmount,
            }
          : item
      )
      .filter((item) => item.amount > 0);

    localStorage.setItem(
      `md-food-cart-items`,
      JSON.stringify(updatedCartItens)
    );
    dispatch(setCartItens(updatedCartItens));
  };

  const addCartProductAmount = (cartItem: CartItemProps) => {
    const newAmount = cartItem.amount + 1;
    const updatedCartItens = cartItens.map((item) =>
      item.id === cartItem.id
        ? {
            ...item,
            amount: newAmount,
            totalValue: item.originalValue * newAmount,
          }
        : item
    );

    localStorage.setItem(
      `md-food-cart-items`,
      JSON.stringify(updatedCartItens)
    );
    dispatch(setCartItens(updatedCartItens));
  };

  const handleClientRequest = async () => {
    setGeneratingOrder(true);

    const products = cartItens.map((item) => ({
      name: `${item.amount}x ${item.productName}`,
      complements: item.allSelectedComplements.flatMap((complement) =>
        complement.items.map(
          (complementItem) =>
            `- ${complementItem.amount}x ${
              complementItem.name
            } ${priceToBrazilCurrency(complementItem.price)}`
        )
      ),
    }));

    try {
      const response = await axios.post(`/api/requests/createRequest`, {
        products: JSON.stringify(products),
        companyId: user?.id,
        status: `CLOSE`, // for delivery requests status should be close, for presential requests status should be OPEN
        table: null, // when the qrcode logic was implemented, we get the table number from url
        totalValue: totalPrice,
      });

      const { request } = response.data;

      const order = {
        orderNumber: request.id.slice(0, 8),
        menuName: companyData.name,
        clientName: `Mock nome`,
        clientPhoneNumber: `Mock client phone number`,
        paymentMethod: `Mock paymentMethod`,
        deliveryType: `Mock deliveryType`,
        deliveryTime: `Entre 35 e 45 minutos`,
        deliveryAddress: `Rua 19, próximo a oficina de pitoco, tem um renault kwid da frente`,
        products,
      };

      let resumoPedidoTexto = `\nRESUMO DO PEDIDO:\n`;

      order.products.forEach((product) => {
        if (product.complements.length > 0) {
          resumoPedidoTexto += `\n${product.name}\n\nComplementos do Pedido:\n\n`;
          product.complements.forEach((complemento) => {
            resumoPedidoTexto += `${complemento}\n`;
          });

          resumoPedidoTexto += `\n>>>\n`;

          return;
        }
        resumoPedidoTexto += `\n${product.name}\n\n>>>\n`;
      });

      const whatsappURL = `https://wa.me/55${
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
          `${resumoPedidoTexto}\n` +
          `Taxa de entrega: R$ 3,00\n` +
          `TOTAL: ${priceToBrazilCurrency(totalPrice)}` // here the delivery tax has to be added
      )}`;

      window.location.href = whatsappURL;
    } catch (error) {
      toast.error(`Houve um problema em registrar seu Pedido, tente novamente`);
    } finally {
      setGeneratingOrder(false);
    }
  };

  return (
    <Portal>
      <Overlay className={styles.shoppingCartOverlay} />
      <Content className={styles.shoppingCartContent}>
        <ModalDefaultHeader
          icon={<FaShoppingBag size={24} fill="#EF4444" />}
          title="Sacola"
        />
        <div className={styles.shoppingCartContainerContentAndFooter}>
          <div className={styles.shoppingCartContainerCartInformation}>
            <div className={styles.shoppingCartContainerHeadLineInformation}>
              <p className={styles.shoppingCartText}>Pedido</p>
              <button
                type="button"
                className={styles.shoppingCartClearCartButton}
                onClick={handleClearCartItems}
              >
                Limpar
              </button>
            </div>

            <div className={styles.shoppingCartContainerProducts}>
              {cartItens.length > 0 ? (
                cartItens.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className={styles.shoppingCartContainerProduct}
                  >
                    <div className={styles.shoppingCartContainerProductImage}>
                      <Image
                        src={cartItem?.productImage}
                        alt={`Foto do produto ${cartItem.productName}`}
                        fill
                      />
                    </div>
                    <div
                      className={styles.shoppingCartContainerProductInformation}
                    >
                      <div
                        className={
                          styles.shoppingCartContainerProductTitleAndEditIcon
                        }
                      >
                        <p className={styles.shoppingCartBoldTexts}>
                          {cartItem.productName}
                        </p>
                        <FaRegEdit size={16} />
                      </div>
                      <div className={styles.shoppingCartContainerComplements}>
                        {cartItem.allSelectedComplements.flatMap(
                          (selectedComplement) =>
                            selectedComplement.items.map((item) => (
                              <p
                                key={item.id}
                                className={styles.shoppingCartComplementsTexts}
                              >
                                {`${item.amount} ${item.name}`}
                              </p>
                            ))
                        )}
                      </div>

                      <div className={styles.shoppingContainerPriceAndQuantity}>
                        <p className={styles.shoppingCartBoldTexts}>
                          {`${priceToBrazilCurrency(cartItem.totalValue)}`}
                        </p>
                        <div className={styles.addMoreToCart}>
                          <button
                            type="button"
                            onClick={() => {
                              removeCartProductAmount(cartItem);
                            }}
                            aria-label="Remover item do carrinho"
                          >
                            <FaMinus size={14} color="#EF4444" />
                          </button>
                          <p>{cartItem.amount}</p>
                          <button
                            type="button"
                            onClick={() => addCartProductAmount(cartItem)}
                            aria-label="Adicionar item ao carrinho"
                          >
                            <FaPlus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Não existem produtos no carrinho</p>
              )}
            </div>
            <button
              type="button"
              className={styles.shoppingCartAddMoreItensButton}
              onClick={() => setShowDialog(false)}
            >
              Adicionar mais itens
            </button>
          </div>
          <footer className={styles.shoppingCartFooter}>
            <div className={styles.shoppingCartContainerTotalValue}>
              <p className={styles.shoppingCartTotalValue}>Total</p>
              <p className={styles.shoppingCartTotalValue}>
                {priceToBrazilCurrency(totalPrice)}
              </p>
            </div>
            <button
              type="button"
              className={styles.shoppingCartConfirmButton}
              onClick={handleClientRequest}
              disabled={cartItens.length === 0}
            >
              {generatingOrder
                ? `Processando seu Pedido...`
                : `Confirmar Pedido`}
            </button>
          </footer>
        </div>
      </Content>
    </Portal>
  );
}

import { useEffect, useState } from 'react';
import { FaRegEdit, FaShoppingBag } from 'react-icons/fa';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import Image from 'next/image';

import { CartItemProps } from '@/components/FoodCardDialog';
import ModalDefaultHeader from '@/components/ModalDefaultHeader';

import { priceToBrazilCurrency } from '@/utils/priceToBrazilCurrency';

import { setCartItens } from '@/redux/features/cartItem-slice';
import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export interface ShoppingCartPortalProps {
  setShowDialog: (value: boolean) => void;
  cartItens: CartItemProps[];
}

export default function ShoppingCartPortal({
  setShowDialog,
  cartItens,
}: ShoppingCartPortalProps) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dispatch = useDispatch();

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
                      {cartItem.allSelectedComplements.map(
                        (selectedComplement) =>
                          selectedComplement.items.map((item) => (
                            <div
                              key={item.id}
                              className={
                                styles.shoppingCartContainerComplements
                              }
                            >
                              <p
                                className={styles.shoppingCartComplementsTexts}
                              >
                                {`${item.amount} ${item.name}`}
                              </p>
                            </div>
                          ))
                      )}
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
                <p>Não exitem produtos no carrinho</p>
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
            <button type="button" className={styles.shoppingCartConfirmButton}>
              Confirmar Pedido
            </button>
          </footer>
        </div>
      </Content>
    </Portal>
  );
}

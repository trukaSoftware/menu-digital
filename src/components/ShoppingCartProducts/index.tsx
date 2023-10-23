import { FaRegEdit } from 'react-icons/fa';
import { FaMinus, FaPlus } from 'react-icons/fa6';

import Image from 'next/image';

import { priceToBrazilCurrency } from '@/utils/priceToBrazilCurrency';

import { CartItemProps } from '../FoodCardDialog';
import styles from './styles.module.css';

interface ShoppingCartProductsProps {
  cartItens: CartItemProps[];
  removeCartProductAmount: (cartItem: CartItemProps) => void;
  addCartProductAmount: (cartItem: CartItemProps) => void;
}

export default function ShoppingCartProducts({
  cartItens,
  removeCartProductAmount,
  addCartProductAmount,
}: ShoppingCartProductsProps) {
  return (
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
            <div className={styles.shoppingCartContainerProductInformation}>
              <div
                className={styles.shoppingCartContainerProductTitleAndEditIcon}
              >
                <p className={styles.shoppingCartBoldTexts}>
                  {cartItem.productName}
                </p>
                <FaRegEdit size={16} />
              </div>
              <div className={styles.shoppingCartContainerComplements}>
                {cartItem.allSelectedComplements.flatMap((selectedComplement) =>
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
  );
}

import { FaRegEdit, FaShoppingBag } from 'react-icons/fa';

import Image from 'next/image';

import ModalDefaultHeader from '@/components/ModalDefaultHeader';

import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import styles from './styles.module.css';

export interface ShoppingCartPortalProps {
  setShowDialog: (value: boolean) => void;
}

export default function ShoppingCartPortal({
  setShowDialog,
}: ShoppingCartPortalProps) {
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
              >
                Limpar
              </button>
            </div>
            <div className={styles.shoppingCartContainerProducts}>
              <div className={styles.shoppingCartContainerProduct}>
                <div className={styles.shoppingCartContainerProductImage}>
                  <Image src="/images/icon_x72.png" alt="productImage" fill />
                </div>
                <div className={styles.shoppingCartContainerProductInformation}>
                  <div
                    className={
                      styles.shoppingCartContainerProductTitleAndEditIcon
                    }
                  >
                    <p className={styles.shoppingCartBoldTexts}>Hamburguer</p>
                    <FaRegEdit size={16} />
                  </div>
                  <div className={styles.shoppingCartContainerComplements}>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                  </div>
                  <div className={styles.shoppingContainerPriceAndQuantity}>
                    <p className={styles.shoppingCartBoldTexts}>R$ 24,00</p>
                    <p>- 1 +</p>
                  </div>
                </div>
              </div>
              <div className={styles.shoppingCartContainerProduct}>
                <div className={styles.shoppingCartContainerProductImage}>
                  <Image src="/images/icon_x72.png" alt="productImage" fill />
                </div>
                <div className={styles.shoppingCartContainerProductInformation}>
                  <div
                    className={
                      styles.shoppingCartContainerProductTitleAndEditIcon
                    }
                  >
                    <p className={styles.shoppingCartBoldTexts}>Hamburguer</p>
                    <FaRegEdit size={16} />
                  </div>
                  <div className={styles.shoppingCartContainerComplements}>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                  </div>
                  <div className={styles.shoppingContainerPriceAndQuantity}>
                    <p className={styles.shoppingCartBoldTexts}>R$ 24,00</p>
                    <p>- 1 +</p>
                  </div>
                </div>
              </div>
              <div className={styles.shoppingCartContainerProduct}>
                <div className={styles.shoppingCartContainerProductImage}>
                  <Image src="/images/icon_x72.png" alt="productImage" fill />
                </div>
                <div className={styles.shoppingCartContainerProductInformation}>
                  <div
                    className={
                      styles.shoppingCartContainerProductTitleAndEditIcon
                    }
                  >
                    <p className={styles.shoppingCartBoldTexts}>Hamburguer</p>
                    <FaRegEdit size={16} />
                  </div>
                  <div className={styles.shoppingCartContainerComplements}>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                  </div>
                  <div className={styles.shoppingContainerPriceAndQuantity}>
                    <p className={styles.shoppingCartBoldTexts}>R$ 24,00</p>
                    <p>- 1 +</p>
                  </div>
                </div>
              </div>
              <div className={styles.shoppingCartContainerProduct}>
                <div className={styles.shoppingCartContainerProductImage}>
                  <Image src="/images/icon_x72.png" alt="productImage" fill />
                </div>
                <div className={styles.shoppingCartContainerProductInformation}>
                  <div
                    className={
                      styles.shoppingCartContainerProductTitleAndEditIcon
                    }
                  >
                    <p className={styles.shoppingCartBoldTexts}>Hamburguer</p>
                    <FaRegEdit size={16} />
                  </div>
                  <div className={styles.shoppingCartContainerComplements}>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                    <p className={styles.shoppingCartComplementsTexts}>
                      1 Coca-cola
                    </p>
                  </div>
                  <div className={styles.shoppingContainerPriceAndQuantity}>
                    <p className={styles.shoppingCartBoldTexts}>R$ 24,00</p>
                    <p>- 1 +</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className={styles.shoppingCartAddMoreItensButton}
            >
              Adicionar mais itens
            </button>
          </div>
          <footer className={styles.shoppingCartFooter}>
            <div className={styles.shoppingCartContainerTotalValue}>
              <p className={styles.shoppingCartTotalValue}>Total</p>
              <p className={styles.shoppingCartTotalValue}>R$ 120,00</p>
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

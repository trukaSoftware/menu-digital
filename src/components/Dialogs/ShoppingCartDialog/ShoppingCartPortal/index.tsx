import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { usePathname } from 'next/navigation';

import axios from 'axios';

import { CartItemProps } from '@/components/FoodCardDialog';
import ModalDefaultHeader from '@/components/ModalDefaultHeader';
import ShoppingCartProducts from '@/components/ShoppingCartProducts';

import { createOrderToSendToWpp } from '@/utils/createOrderToSendToWpp';
import { priceToBrazilCurrency } from '@/utils/priceToBrazilCurrency';

import { setCartItens } from '@/redux/features/cartItem-slice';
import { deliverySchema, DeliveryData } from '@/yup/front/develiveryForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import DeliveryInfo from '../DeliveryInfo';
import TypeOfDelivery from '../TypeOfDelivery';
import styles from './styles.module.css';
import { getHeaderTitleAndIcon } from './utils';

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
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setError,
  } = useForm<DeliveryData>({
    resolver: yupResolver(deliverySchema),
    mode: `onChange`,
  });

  const [generatingOrder, setGeneratingOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState<number>(0);
  const dispatch = useDispatch();
  const pathnames = usePathname();

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
        companyId: pathnames.split(`/`)?.[3],
        status: `CLOSE`, // for delivery requests status should be close, for presential requests status should be OPEN
        table: null, // when the qrcode logic was implemented, we get the table number from url
        totalValue: totalPrice,
      });

      const { request } = response.data;

      const whatsappURL = createOrderToSendToWpp({
        id: request.id,
        companyData,
        products,
        totalPrice,
      });

      window.location.href = whatsappURL;
    } catch (error) {
      toast.error(`Houve um problema em registrar seu Pedido, tente novamente`);
    } finally {
      handleClearCartItems();
      setGeneratingOrder(false);
    }
  };

  // const isDelivery = true;
  // const submitButtonText = isDelivery ? `Continuar` : `Confirmar pedido`;

  const modalHeaderInfo = getHeaderTitleAndIcon(step);

  return (
    <Portal>
      <Overlay className={styles.shoppingCartOverlay} />
      <Content className={styles.shoppingCartContent}>
        <ModalDefaultHeader
          icon={<modalHeaderInfo.Icon size={24} fill="#EF4444" />}
          title={modalHeaderInfo?.title}
          GoBackBtn={
            step ? (
              <button type="button" onClick={() => setStep(step - 1)}>
                <IoIosArrowBack size={32} color="#EF4444" />
              </button>
            ) : undefined
          }
        />
        <div className={styles.shoppingCartContainerContentAndFooter}>
          {step === 0 && (
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

              <ShoppingCartProducts
                cartItens={cartItens}
                removeCartProductAmount={removeCartProductAmount}
                addCartProductAmount={addCartProductAmount}
              />

              <button
                type="button"
                className={styles.shoppingCartAddMoreItensButton}
                onClick={() => setShowDialog(false)}
              >
                Adicionar mais itens
              </button>
            </div>
          )}
          {step === 1 && (
            <DeliveryInfo
              nameRegister={register(`clientName`)}
              phoneRegister={register(`clientPhoneNumber`)}
              error={errors.clientName?.message}
              labelClassName={styles.deliveryDefaultLabel}
            />
          )}
          {step === 2 && <TypeOfDelivery />}
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
              onClick={step < 5 ? () => setStep(step + 1) : () => {}}
              disabled={cartItens.length === 0}
            >
              Continuar
            </button>
          </footer>
        </div>
      </Content>
    </Portal>
  );
}

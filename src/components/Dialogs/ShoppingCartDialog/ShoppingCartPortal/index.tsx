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
import { deliverySchema, DeliveryData } from '@/yup/front/develiveryFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import DeliveryAdress from '../DeliveryAdress';
import DeliveryInfo from '../DeliveryInfo';
import OrderInfo from '../OrderInfo';
import PaymentInfo from '../PaymentInfo';
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
    getValues,
    handleSubmit,
    register,
    control,
    formState: { errors },
    setError,
  } = useForm<DeliveryData>({
    resolver: yupResolver(deliverySchema),
    mode: `onChange`,
    defaultValues: {
      deliveryType: `Entrega`,
      paymentMethod: `pix`,
    },
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

  const onSubmit = async (values: DeliveryData) => {
    console.log(`>>>> `, values);
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

  const handleStepFoward = () => {
    const { deliveryType } = getValues();

    if (step === 5) {
      return;
    }

    if (step === 2) {
      if (deliveryType === `Retirada`) {
        setStep(4);
        return;
      }
    }

    setStep(step + 1);
  };

  const handleStepBack = () => {
    const { deliveryType } = getValues();

    if (step === 4) {
      if (deliveryType === `Retirada`) {
        setStep(2);
        return;
      }
    }

    setStep(step - 1);
  };

  return (
    <Portal>
      <Overlay className={styles.shoppingCartOverlay} />
      <Content className={styles.shoppingCartContent}>
        <ModalDefaultHeader
          icon={<modalHeaderInfo.Icon size={24} fill="#EF4444" />}
          title={modalHeaderInfo?.title}
          GoBackBtn={
            step ? (
              <button type="button" onClick={handleStepBack}>
                <IoIosArrowBack size={32} color="#EF4444" />
              </button>
            ) : undefined
          }
        />
        <form
          className={styles.shoppingCartContainerContentAndFooter}
          onSubmit={handleSubmit(onSubmit)}
        >
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
              nameError={errors.clientName?.message}
              phoneError={errors.clientPhoneNumber?.message}
              labelClassName={styles.deliveryDefaultLabel}
            />
          )}
          {step === 2 && <TypeOfDelivery register={register(`deliveryType`)} />}
          {step === 3 && (
            <DeliveryAdress
              error={errors.deliveryAddress?.message}
              register={register(`deliveryAddress`)}
              labelClassName={styles.deliveryDefaultLabel}
            />
          )}
          {step === 4 && <PaymentInfo register={register(`paymentMethod`)} />}
          {step === 5 && <OrderInfo />}
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
              onClick={handleStepFoward}
              disabled={cartItens.length === 0}
            >
              {step === 5 ? `Finalizar pedido` : `Continuar`}
            </button>
            <button type="submit">teste</button>
          </footer>
        </form>
      </Content>
    </Portal>
  );
}

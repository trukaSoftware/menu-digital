import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { usePathname, useSearchParams } from 'next/navigation';

import axios from 'axios';

import ButtonSubmit from '@/components/ButtonSubmit';
import { CartItemProps } from '@/components/FoodCardDialog';
import ModalDefaultHeader from '@/components/ModalDefaultHeader';
import ShoppingCartProducts from '@/components/ShoppingCartProducts';

import { createOrderToSendToWpp } from '@/utils/createOrderToSendToWpp';
import { priceToBrazilCurrency } from '@/utils/priceToBrazilCurrency';

import { setCartItens } from '@/redux/features/cartItem-slice';
import { deliverySchema, DeliveryData } from '@/yup/front/develiveryFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Portal, Overlay, Content } from '@radix-ui/react-dialog';

import DeliveryAddress from '../DeliveryAddress';
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
    deliveryTax: string;
    deliveryTime: string;
    address: string;
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
    setError,
    formState: { errors },
    setValue,
  } = useForm<DeliveryData>({
    resolver: yupResolver(deliverySchema),
    mode: `onChange`,
    defaultValues: {
      deliveryType: `Entrega`,
      paymentMethod: `Pix`,
    },
  });
  const [generatingOrder, setGeneratingOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState<number>(0);
  const dispatch = useDispatch();
  const pathnames = usePathname();

  const searchParams = useSearchParams();
  const tableNumber = searchParams.get(`table`);

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

  const handleClientRequest = async (values?: DeliveryData) => {
    setGeneratingOrder(true);

    const products = cartItens.map((item) => ({
      name: `${item.amount}x ${item.productName} - ${priceToBrazilCurrency(
        item.totalValue
      )}`,
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
        status: tableNumber ? `OPEN` : `CLOSE`,
        table: tableNumber || null,
        totalValue: totalPrice,
      });

      const { request } = response.data;

      const whatsappURL = createOrderToSendToWpp({
        id: request.id,
        companyData,
        products,
        totalPrice,
        values,
        table: tableNumber || undefined,
      });

      window.location.href = whatsappURL;
    } catch (error) {
      toast.error(`Houve um problema em registrar seu Pedido, tente novamente`);
    } finally {
      handleClearCartItems();
      setGeneratingOrder(false);
      setShowDialog(false);
    }
  };

  const onSubmit = async (values: DeliveryData) => {
    handleClientRequest(values);
  };

  const modalHeaderInfo = getHeaderTitleAndIcon(step);

  const handleStepFoward = () => {
    const { deliveryType, clientName, clientPhoneNumber, deliveryAddress } =
      getValues();

    if (step === 1) {
      if (!clientName) {
        setError(`clientName`, {
          type: `manual`,
          message: `Insira seu telefone de contato`,
        });
      }

      if (!clientPhoneNumber) {
        setError(`clientPhoneNumber`, {
          type: `manual`,
          message: `Insira seu telefone de contato`,
        });
      }
      if (
        errors.clientName?.message ||
        errors.clientPhoneNumber?.message ||
        !clientPhoneNumber ||
        !clientName
      ) {
        return;
      }
    }

    if (step === 2) {
      if (deliveryType === `Retirada`) {
        setValue(`deliveryAddress`, companyData.address);
        setStep(4);
        return;
      }
    }

    if (step === 3 && !deliveryAddress) {
      setError(`deliveryAddress`, {
        type: `manual`,
        message: `Insira seu endereço de entrega`,
      });
      return;
    }

    if (step === 5) {
      return;
    }

    setStep(step + 1);
  };

  const handleStepBack = () => {
    const { deliveryType } = getValues();

    if (step === 4) {
      if (deliveryType === `Retirada`) {
        setValue(`deliveryAddress`, ``);
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
        <form className={styles.shoppingCartContainerContentAndFooter}>
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
            <DeliveryAddress
              error={errors.deliveryAddress?.message}
              register={register(`deliveryAddress`)}
              labelClassName={styles.deliveryDefaultLabel}
            />
          )}
          {step === 4 && <PaymentInfo register={register(`paymentMethod`)} />}
          {step === 5 && (
            <OrderInfo
              clientName={getValues().clientName}
              clientPhone={getValues().clientPhoneNumber}
              address={getValues().deliveryAddress}
              paymentMethod={getValues().paymentMethod}
              deliveryTax={priceToBrazilCurrency(
                Number(companyData.deliveryTax)
              )}
              deliveryTime={companyData.deliveryTime}
              cartItens={cartItens}
            />
          )}
          <footer className={styles.shoppingCartFooter}>
            <div className={styles.shoppingCartContainerTotalValue}>
              <p className={styles.shoppingCartTotalValue}>Total</p>
              <p className={styles.shoppingCartTotalValue}>
                {priceToBrazilCurrency(totalPrice)}
              </p>
            </div>
            {step === 5 || tableNumber ? (
              <ButtonSubmit
                type="button"
                onClick={
                  tableNumber
                    ? () => handleClientRequest()
                    : handleSubmit(onSubmit)
                }
                className={styles.shoppingCartConfirmButton}
                isSubmiting={generatingOrder}
                text="Finalizar pedido"
              />
            ) : (
              <button
                type="button"
                className={styles.shoppingCartConfirmButton}
                onClick={handleStepFoward}
                disabled={cartItens.length === 0}
              >
                Continuar
              </button>
            )}
          </footer>
        </form>
      </Content>
    </Portal>
  );
}

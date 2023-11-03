import {
  BsFillCreditCard2BackFill,
  BsFillCreditCardFill,
} from 'react-icons/bs';
import { FaMoneyBill } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';

export const getPaymentMethodIcon = (paymentMethod: string) => {
  if (paymentMethod === `Pix`) {
    return FaPix;
  }

  if (paymentMethod === `Cartão de crédito`) {
    return BsFillCreditCard2BackFill;
  }

  if (paymentMethod === `Dinheiro`) {
    return FaMoneyBill;
  }

  return BsFillCreditCardFill;
};

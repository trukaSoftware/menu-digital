import { UseFormRegisterReturn } from 'react-hook-form';
import {
  BsFillCreditCard2BackFill,
  BsFillCreditCardFill,
} from 'react-icons/bs';
import { FaMoneyBill } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';

import DefaultRadioInput from '@/components/DefaultRadioInput';

import styles from './styles.module.css';

export interface PaymentInfoProps {
  register: UseFormRegisterReturn;
}

export default function PaymentInfo({ register }: PaymentInfoProps) {
  return (
    <div className={styles.paymentInfoWrapper}>
      <h2>Escolha a forma de pagamento</h2>
      <div className={styles.paymentInfoRadios}>
        <DefaultRadioInput
          id="pix"
          value="Pix"
          inputText="Pix"
          register={register}
          labelClassName={styles.paymentInfoRadio}
          Icon={<FaPix size={22} />}
        />
        <DefaultRadioInput
          id="credit"
          inputText="Cartão de crédito"
          value="Cartão de crédito"
          labelClassName={styles.paymentInfoRadio}
          register={register}
          Icon={<BsFillCreditCard2BackFill size={22} />}
        />
        <DefaultRadioInput
          id="money"
          value="Dinheiro"
          inputText="Dinheiro"
          register={register}
          labelClassName={styles.paymentInfoRadio}
          Icon={<FaMoneyBill size={22} />}
        />
        <DefaultRadioInput
          id="debt"
          inputText="Cartão de débito"
          value="Cartão de débito"
          labelClassName={styles.paymentInfoRadio}
          register={register}
          Icon={<BsFillCreditCardFill size={22} />}
        />
      </div>
    </div>
  );
}

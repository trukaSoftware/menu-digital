import { BsFillClockFill } from 'react-icons/bs';
import { FaMoneyBill, FaMotorcycle } from 'react-icons/fa';

import styles from './styles.module.css';

export default function OrderInfo() {
  return (
    <div className={styles.orderInfoWrapper}>
      <div className={styles.orderInfoContent}>
        <p>Pedido</p>
        <div className={styles.orderInfoItems} />
      </div>
      <div className={styles.orderInfoContactWrapper}>
        <p>Informações de contato</p>
        <div className={styles.orderInfoContacts}>
          <div className={styles.orderInfoContact}>
            <p>Nome</p>
            <p>Nome da pessoa</p>
          </div>
          <div className={styles.orderInfoContact}>
            <p>Telefone</p>
            <p>21 98928-0209</p>
          </div>
        </div>
      </div>
      <div className={styles.orderInfoDeliveryWrapper}>
        <p>Informações da entrega</p>
        <div>
          <p>Endereço</p>
          <p>Rua carlinhos, Miguel couto, 128</p>
          <p>Complemento</p>
          <p>Perto do mecânico manuel</p>
        </div>
      </div>
      <div className={styles.orderInfoCompanyDelivery}>
        <div>
          <p>Taxa de entrega</p>
          <div>
            <FaMotorcycle size={24} />
            <p>R$ 3,50</p>
          </div>
        </div>
        <div>
          <p>Tempo de espera</p>
          <div>
            <BsFillClockFill size={20} />
            <p>40-50min</p>
          </div>
        </div>
      </div>
      <div className={styles.orderInfoPaymentMethod}>
        <p>Forma de pagamento</p>
        <div>
          <FaMoneyBill size={24} />
          <p>Dinheiro</p>
        </div>
      </div>
    </div>
  );
}

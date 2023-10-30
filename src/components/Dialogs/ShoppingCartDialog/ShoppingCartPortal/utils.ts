import { BsListCheck } from 'react-icons/bs';
import {
  FaPhoneAlt,
  FaMotorcycle,
  FaMapMarkedAlt,
  FaDollarSign,
  FaShoppingBag,
} from 'react-icons/fa';

export const getHeaderTitleAndIcon = (step: number) => {
  if (step === 0) return { title: `Sacola`, Icon: FaShoppingBag };
  if (step === 1) return { title: `Contato`, Icon: FaPhoneAlt };
  if (step === 2) return { title: `Entrega`, Icon: FaMotorcycle };
  if (step === 3) return { title: `Endereço`, Icon: FaMapMarkedAlt };
  if (step === 4) return { title: `Pagamento`, Icon: FaDollarSign };
  return { title: `Resumo do pedido`, Icon: BsListCheck };
};

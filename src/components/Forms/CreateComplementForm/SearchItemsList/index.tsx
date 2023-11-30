import { UseFormRegisterReturn } from 'react-hook-form';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import { MdOutlineSearchOff } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useParams } from 'next/navigation';

import CheckboxInput from '@/components/CheckboxInput';
import Spinner from '@/components/Spinner';

import { ItemReturn, editItemPayload } from '@/types/item';

import { editItem } from '@/utils/api/editItem';
import { getItems } from '@/utils/api/getItems';
import { priceToBrazilCurrency } from '@/utils/priceToBrazilCurrency';

import { setItems } from '@/redux/features/items-slice';

import styles from './styles.module.css';

export interface SearchItemsListProps {
  filteredItems: ItemReturn[];
  register: UseFormRegisterReturn;
  gettingProducts: boolean;
}

export default function SearchItemsList({
  filteredItems,
  register,
  gettingProducts,
}: SearchItemsListProps) {
  const params = useParams();
  const dispatch = useDispatch();

  const handleVisible = async (item: editItemPayload) => {
    const { visible } = item;
    try {
      const editedItem = {
        ...item,
        visible: !visible,
      };
      await editItem(editedItem);
    } catch (error) {
      toast.error(`Erro ao editar o item, tente novamente em instantes!`);
    } finally {
      const newItems = await getItems(params.companyId);
      dispatch(setItems(newItems.items));
    }
  };

  return (
    <div className={styles.searchItemsList}>
      {gettingProducts ? (
        <div className={styles.searchingItems}>
          <p>Buscando itens</p>
          <Spinner size={32} color="#000" />
        </div>
      ) : null}

      {!gettingProducts &&
        (filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className={styles.teste}>
              <CheckboxInput
                text={`${item.name} - ${priceToBrazilCurrency(
                  Number(item.price)
                )}`}
                id={item.id}
                register={register}
                key={`${item.id}-label`}
              />
              <label
                htmlFor={`${item.id}-visible`}
                className={styles.eyeCheckboxInputLabel}
              >
                <input
                  type="checkbox"
                  id={`${item.id}-visible`}
                  onChange={() => handleVisible(item)}
                  className={styles.eyeCheckboxInput}
                />
                {item.visible ? (
                  <LiaEyeSolid size={24} color="red" />
                ) : (
                  <LiaEyeSlashSolid size={24} color="gray" />
                )}
              </label>
            </div>
          ))
        ) : (
          <div className={styles.noProductsFound}>
            <MdOutlineSearchOff size={28} />
            <p>Nenhum item encontrado</p>
          </div>
        ))}
    </div>
  );
}

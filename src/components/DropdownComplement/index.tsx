import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { InferType } from 'yup';

import { Complement } from '@/types/complement';
import { ItemReturn } from '@/types/item';

import { createItem } from '@/utils/api/createItem';

import { editComplementFormSchema } from '@/yup/front/editComplementFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonSubmit from '../ButtonSubmit';
import EditableComplementTitle from '../EditableComplement';
import SearchComplementsList from '../Forms/CreateComplementForm/SearchItemsList';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

type EditComplementFormData = InferType<typeof editComplementFormSchema>;

export interface DropdownComplementProps {
  complements: Complement;
  filteredItems: ItemReturn[];
  currentComplementIndex: number;
  gettingProducts: boolean;
  showDropdown: null | number;
  search: string;
  setSearch: (value: string) => void;
  toggleDropdown: (value: number) => void;
}

export default function DropdownComplement({
  complements,
  filteredItems,
  currentComplementIndex,
  gettingProducts,
  showDropdown,
  search,
  setSearch,
  toggleDropdown,
}: DropdownComplementProps) {
  const [registredWithSucess, setRegistredWithSucess] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [requestError, setRequestError] = useState(false);

  const itemsIds = complements?.items?.map((item) => item.id);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(editComplementFormSchema),
    mode: `onChange`,
    defaultValues: {
      complementName: complements?.name,
      itemsIds,
    },
  });

  useEffect(() => {
    reset({
      complementName: complements?.name,
      itemsIds,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complements]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value.toLocaleLowerCase());
  };

  const onSubmit = async (data: EditComplementFormData) => {
    setIsSubmiting(true);
    const itemsToRemoveId =
      itemsIds?.filter((id) => !data.itemsIds?.includes(id)) || [];
    const itemsToAddId =
      data.itemsIds?.filter((id) => !itemsIds?.includes(id as string)) || [];

    if (itemsToAddId.length > 0) {
      const completeItemsToAdd = filteredItems
        .filter((item) => itemsToAddId.includes(item.id))
        .map((item) => ({
          name: item.name,
          price: item.price,
        }));

      const newItems = {
        complementId: complements.id,
        items: completeItemsToAdd,
      };

      await createItem(newItems);
    }

    console.log(itemsToRemoveId);

    // const fullObjectsToAdd = fullItems?.filter((item) =>
    //   itemsToAddId?.includes(item.id)
    // );

    try {
      // if (!!itemsToAddId && itemsToAddId.length > 0) {
      //   const itemsPayload = {
      //     complementId: complements.id,
      //     items: itemsToAddId,
      //   };
      //   await createItem(itemsPayload);
      // }
    } catch {
      setRequestError(true);
    } finally {
      setIsSubmiting(false);
    }

    setRegistredWithSucess(true);
    setIsSubmiting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.dropdownForm}>
      <div className={styles.dropdownWrapper}>
        <label htmlFor={complements.name}>
          <input
            type="checkbox"
            id={complements.name}
            className={styles.dropdownCheckbox}
            onClick={() => toggleDropdown(currentComplementIndex)}
          />
          <div className={styles.dropdownComplementImageWrapper}>
            <div className={styles.dropdownComplementImage}>
              {showDropdown === currentComplementIndex ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>
            <EditableComplementTitle
              complementName={complements.name}
              complementId={complements.id}
            />
          </div>
        </label>
        <div
          className={
            showDropdown === currentComplementIndex
              ? styles.dropdownComplementContent
              : styles.dropdownComplementContentHidden
          }
        >
          <SearchInput
            id={String(currentComplementIndex)}
            placeholder="Pesquisar item por nome..."
            onChange={handleSearch}
            value={search}
          />
          {showDropdown === currentComplementIndex && (
            <SearchComplementsList
              filteredItems={
                search
                  ? filteredItems.filter((product) =>
                      product.name.toLocaleLowerCase().includes(search)
                    )
                  : filteredItems
              }
              gettingProducts={gettingProducts}
              register={register(`itemsIds`)}
            />
          )}
          <ButtonSubmit
            isSubmiting={isSubmiting}
            text={
              registredWithSucess
                ? `Adicional editado com sucesso ✔️`
                : `Editar Adicional`
            }
            submitError={requestError}
            className={styles.dropdownSubmitButton}
          />
        </div>
      </div>
    </form>
  );
}

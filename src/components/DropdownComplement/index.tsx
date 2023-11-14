import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { useParams } from 'next/navigation';

import { InferType } from 'yup';

import { Complement } from '@/types/complement';
import { ItemReturn } from '@/types/item';

import { createItem } from '@/utils/api/createItem';
import { editItem } from '@/utils/api/editItem';
import { getItems } from '@/utils/api/getItems';

import { setItems } from '@/redux/features/items-slice';
import { editComplementFormSchema } from '@/yup/front/editComplementFormSchema';
import { useUser } from '@clerk/nextjs';
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
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useUser();

  const itemsIds = filteredItems
    ?.filter((item) => item.complementId === complements.id)
    .map((item) => item.id);

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
  }, [dispatch, complements, filteredItems]);

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

    try {
      if (itemsToAddId.length > 0) {
        const allItemsToAdd = filteredItems.filter((item) =>
          itemsToAddId.includes(item.id)
        );
        const itemWithoutComplement = allItemsToAdd.filter(
          (item) => item.complementId === null
        );
        const itemWithComplement = allItemsToAdd.filter(
          (item) => item.complementId !== null
        );

        if (itemWithoutComplement.length > 0) {
          const itemWithoutComplementIds = itemWithoutComplement.map(
            (item) => item.id
          );
          const itemsToBeRemovedFromRedux = filteredItems.filter(
            (item) => !itemWithoutComplementIds.includes(item.id)
          );

          const newItemstoAdd = await Promise.all(
            itemWithoutComplement.map(async (item) =>
              editItem({
                id: item.id,
                name: item.name,
                price: item.price,
                complementId: complements.id,
              })
            )
          );
          itemsToBeRemovedFromRedux.push(...newItemstoAdd);
          dispatch(setItems(itemsToBeRemovedFromRedux));
        }

        if (itemWithComplement.length > 0) {
          const itemsToCreate = {
            complementId: complements.id,
            items: itemWithComplement.map((item) => ({
              name: item.name,
              price: item.price,
            })),
            companyId: `${user?.id}`,
          };
          await createItem(itemsToCreate);
          const allItems = await getItems(params.companyId);
          dispatch(setItems(allItems.items));
        }
      }

      if (itemsToRemoveId.length > 0) {
        const itemsToBeRemovedFromRedux = filteredItems.filter(
          (item) => !itemsToRemoveId.includes(item.id)
        );
        const itemsWithoutComplementId = filteredItems
          .filter((item) => itemsToRemoveId.includes(item.id))
          .map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            complementId: null,
          }));
        const completeItemsToRemove = await Promise.all(
          itemsWithoutComplementId.map(async (item) => editItem(item))
        );
        itemsToBeRemovedFromRedux.push(...completeItemsToRemove);
        dispatch(setItems(itemsToBeRemovedFromRedux));
      }
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
                ? `Adicional atualizado com sucesso ✔️`
                : `Atualizar Adicional`
            }
            submitError={requestError}
            className={styles.dropdownSubmitButton}
          />
        </div>
      </div>
    </form>
  );
}

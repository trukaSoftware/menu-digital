import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { InferType } from 'yup';

import { Complement, ComplementItemProp } from '@/types/complement';

import { editComplementFormSchema } from '@/yup/front/editComplementFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonSubmit from '../ButtonSubmit';
import EditableCategoryTitle from '../EditableCategoryTitle';
import SearchComplementsList from '../Forms/CreateComplementForm/SearchItemsList';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

type EditComplementFormData = InferType<typeof editComplementFormSchema>;

export interface DropdownComplementProps {
  complements: Complement;
  filteredItems: ComplementItemProp[];
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
    try {
      setIsSubmiting(true);
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
            <EditableCategoryTitle
              categoryName={complements.name}
              categoryId={complements.id}
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

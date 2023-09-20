import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { InferType } from 'yup';

import { GetCategoryReturn } from '@/types/category';
import { Product } from '@/types/product';

import { editManyProductsCategory } from '@/utils/api/editManyProductsCategory';
import { EditManyProductsCategoryData } from '@/utils/types';

import { setCategories } from '@/redux/features/categories-slice';
import { createCategoryFormSchema } from '@/yup/front/createCategoryFormSchema';
import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonSubmit from '../ButtonSubmit';
import EditableCategoryTitle from '../EditableCategoryTitle';
import SearchProductsList from '../Forms/CreateCategoryForm/SearchProductsList';
import SearchInput from '../SearchInput';
import styles from './styles.module.css';

type EditCategoryFormData = InferType<typeof createCategoryFormSchema>;

export interface DropdownProps {
  category: GetCategoryReturn;
  filteredProducts: Product[];
  currentCategoryIndex: number;
  gettingProducts: boolean;
  showDropdown: null | number;
  search: string;
  setSearch: (value: string) => void;
  toggleDropdown: (value: number) => void;
}

export default function Dropdown({
  category,
  filteredProducts,
  currentCategoryIndex,
  gettingProducts,
  showDropdown,
  search,
  setSearch,
  toggleDropdown,
}: DropdownProps) {
  const [registredWithSucess, setRegistredWithSucess] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const dispatch = useDispatch();
  const { user } = useUser();

  const productsIds = category?.categoryProducts?.map((product) => product.id);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(createCategoryFormSchema),
    mode: `onChange`,
    defaultValues: {
      categoryName: category?.name,
      productsIds,
    },
  });

  useEffect(() => {
    reset({
      categoryName: category?.name,
      productsIds,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value.toLocaleLowerCase());
  };

  const onSubmit = async (data: EditCategoryFormData) => {
    setIsSubmiting(true);
    const productsToRemoveId =
      productsIds?.filter(
        (productId) => !data.productsIds?.includes(productId)
      ) || [];

    const productsToAddId =
      data.productsIds?.filter(
        (productId) => !productsIds?.includes(productId as string)
      ) || [];

    try {
      const shouldEditCategoryName = data.categoryName !== category?.name;
      const shouldEditProductsCategoryId =
        productsToRemoveId.length > 0 ||
        productsToAddId.length > 0 ||
        shouldEditCategoryName;

      if (shouldEditProductsCategoryId) {
        const editManyProductsCategoryPayload = {
          id: category.id,
          newCategoryName: shouldEditCategoryName ? data.categoryName : ``,
          productsToAddId,
          productsToRemoveId,
        } as EditManyProductsCategoryData;

        const updatedCategories = await editManyProductsCategory(
          editManyProductsCategoryPayload,
          user?.id as string
        );

        dispatch(setCategories(updatedCategories));
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
        <label htmlFor={category.name}>
          <input
            type="checkbox"
            id={category.name}
            className={styles.dropdownCheckbox}
            onClick={() => toggleDropdown(currentCategoryIndex)}
          />
          <div className={styles.dropdownCategoryImageWrapper}>
            <div className={styles.dropdownCategoryImage}>
              {showDropdown === currentCategoryIndex ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>
            <EditableCategoryTitle
              categoryName={category.name}
              categoryId={category.id}
            />
          </div>
        </label>
        <div
          className={
            showDropdown === currentCategoryIndex
              ? styles.dropdownCategoryContent
              : styles.dropdownCategoryContentHidden
          }
        >
          <SearchInput
            id={String(currentCategoryIndex)}
            placeholder="Pesquisar produto por nome..."
            onChange={handleSearch}
            value={search}
          />
          {showDropdown === currentCategoryIndex && (
            <SearchProductsList
              filteredProducts={
                search
                  ? filteredProducts.filter((product) =>
                      product.name.toLocaleLowerCase().includes(search)
                    )
                  : filteredProducts
              }
              gettingProducts={gettingProducts}
              register={register(`productsIds`)}
            />
          )}
          <ButtonSubmit
            isSubmiting={isSubmiting}
            text={
              registredWithSucess
                ? `Categoria editada com sucesso ✔️`
                : `Editar categoria`
            }
            submitError={requestError}
            className={styles.dropdownSubmitButton}
          />
        </div>
      </div>
    </form>
  );
}

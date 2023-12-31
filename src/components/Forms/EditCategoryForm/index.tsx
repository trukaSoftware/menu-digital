import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGripLines, FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { InferType } from 'yup';

import { editManyProductsCategory } from '@/utils/api/editManyProductsCategory';
import { removeAccent } from '@/utils/removeAccent';
import { EditManyProductsCategoryData } from '@/utils/types';

import { useProducts } from '@/hooks/useProducts';
import {
  categoryByIdSelector,
  setCategories,
} from '@/redux/features/categories-slice';
import { useAppSelector } from '@/redux/store';
import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCategoryFormSchema } from '@yup/front/createCategoryFormSchema';

import ButtonSubmit from '../../ButtonSubmit';
import DefaultInput from '../../DefaultInput';
import SearchProductsList from '../CreateCategoryForm/SearchProductsList';
import styles from './styles.module.css';

type EditCategoryFormData = InferType<typeof createCategoryFormSchema>;

export interface EditCategoryFormProps {
  setShowDialog: (value: boolean) => void;
  categoryId: string;
}

export default function EditCategoryForm({
  setShowDialog,
  categoryId,
}: EditCategoryFormProps) {
  const category = useAppSelector((state) =>
    categoryByIdSelector(state, categoryId)
  );
  const productsIds = category?.categoryProducts?.map((product) => product.id);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(createCategoryFormSchema),
    mode: `onChange`,
    defaultValues: {
      categoryName: category?.name,
      productsIds,
    },
  });

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [searchProductName, setSearchProductName] = useState<string>(``);
  const [requestError, setRequestError] = useState(false);
  const [registredWithSucess, setRegistredWithSucess] = useState(false);
  const { user } = useUser();

  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );

  const { products, gettingProducts } = useProducts(user?.id as string);

  const filteredProducts =
    products?.length > 0
      ? products.filter((product) =>
          removeAccent(product?.name?.toLowerCase())?.includes(
            removeAccent(searchProductName?.toLowerCase())
          )
        )
      : [];

  const onSubmit = async (data: EditCategoryFormData) => {
    setIsSubmiting(true);

    const allCategoriesNames = categories
      .filter((cat) => cat.id !== category?.id)
      .map((cat) => cat.name.toLowerCase());

    if (allCategoriesNames.includes(data.categoryName.toLowerCase())) {
      setIsSubmiting(false);
      setError(`categoryName`, {
        message: `Já existe uma categoria com esse nome, coloque um nome diferente!`,
      });
      return;
    }

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
          id: categoryId,
          newCategoryName: shouldEditCategoryName ? data.categoryName : ``,
          productsToAddId,
          productsToRemoveId,
        } as EditManyProductsCategoryData;

        const updatedCategories = await editManyProductsCategory(
          editManyProductsCategoryPayload,
          user?.id as string
        );

        toast.success(`Categoria editada com sucesso!`);
        dispatch(setCategories(updatedCategories));
      }
    } catch {
      setRequestError(true);
      toast.error(`Edição de categoria falhou, tente novamente em instantes!`);
    } finally {
      setShowDialog(false);
      setIsSubmiting(false);
    }

    setRegistredWithSucess(true);
    setIsSubmiting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.editCategoryForm}>
      <div className={styles.editCategoryFormInputs}>
        <DefaultInput
          Icon={
            <FaGripLines size={20} className={styles.editCategoryFormIcon} />
          }
          labelText="Nome da categoria*"
          register={register(`categoryName`)}
          name="categoryName"
          error={errors.categoryName?.message}
          placeholder="Mais vendidos"
        />
        <p className={styles.addProductToCategoryTitle}>
          Adicionar produtos a categoria
        </p>
        <div className={styles.editProductInputWrapper}>
          <div className={styles.editProductIconWrapper}>
            <FaSearch size={20} className={styles.editProductIcon} />
          </div>
          <input
            type="text"
            className={styles.editProductInput}
            onChange={(e) => setSearchProductName(e.target.value)}
            placeholder="Pesquisar produto por nome..."
          />
        </div>
        <SearchProductsList
          filteredProducts={filteredProducts}
          register={register(`productsIds`)}
          gettingProducts={gettingProducts}
        />
      </div>
      <ButtonSubmit
        isSubmiting={isSubmiting}
        text={
          registredWithSucess
            ? `Categoria editada com sucesso ✔️`
            : `Editar categoria`
        }
        submitError={requestError}
        className={styles.editCategorySubmitButton}
      />
    </form>
  );
}

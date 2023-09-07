import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGripLines, FaSearch } from 'react-icons/fa';

import { InferType } from 'yup';

import { createCategory } from '@/utils/api/createCategory';
import { editProduct } from '@/utils/api/editProduct';
import { removeAccent } from '@/utils/removeAccent';

import { useProducts } from '@/hooks/useProducts';
import { categoryByIdSelector } from '@/redux/features/categories-slice';
import { useAppSelector } from '@/redux/store';
import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCategoryFormSchema } from '@yup/front/createCategoryFormSchema';

import ButtonSubmit from '../../ButtonSubmit';
import DefaultInput from '../../DefaultInput';
import SearchProductsList from '../CreateCategoryForm/SearchProductsList';
import styles from './styles.module.css';

type EditCategoryFormData = InferType<typeof createCategoryFormSchema>;

interface EditCategoryProps {
  setShowDialog: (value: boolean) => void;
  categoryId: string;
}

export default function EditCategoryForm({
  setShowDialog,
  categoryId,
}: EditCategoryProps) {
  const category = useAppSelector((state) =>
    categoryByIdSelector(state, categoryId)
  );
  const productsIds = category?.categoryProducts?.map((product) => product.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

    console.log(data);
    console.log(productsIds);

    // try {
    //   const createdCategory = await createCategory({
    //     name: data.categoryName,
    //     companyId: user?.id,
    //   });

    //   if (!createdCategory?.id) {
    //     setIsSubmiting(false);
    //     return setRequestError(true);
    //   }

    //   const newCategoryId = createdCategory.id;

    //   if (data.productsIds) {
    //     data.productsIds.forEach(async (productId) => {
    //       const editedProduct = await editProduct({
    //         id: productId as string,
    //         categoryId: newCategoryId,
    //       });

    //       if (!editedProduct?.id) {
    //         setIsSubmiting(false);
    //         return setRequestError(true);
    //       }
    //     });
    //   }
    // } catch {
    //   setRequestError(true);
    // } finally {
    //   setShowDialog(false);
    //   setIsSubmiting(false);
    // }

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

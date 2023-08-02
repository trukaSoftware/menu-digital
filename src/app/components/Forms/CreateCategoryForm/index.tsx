import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGripLines, FaSearch } from 'react-icons/fa';

import { InferType } from 'yup';

import { createCategory } from '@/app/utils/api/createCategory';
import { editProduct } from '@/app/utils/api/editProduct';
import { removeAccent } from '@/app/utils/removeAccent';
import { useProducts } from '@/hooks/useProducts';
import { createCategoryFormSchema } from '@/yup/createCategoryFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonSubmit from '../../ButtonSubmit';
import DefaultInput from '../../DefaultInput';
import SearchProductsList from './SearchProductsList';
import styles from './styles.module.css';

type CreateCategoryFormData = InferType<typeof createCategoryFormSchema>;

export interface CreateCategoryFormProps {
  companyId: string;
}

export default function CreateCategoryForm({
  companyId,
}: CreateCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCategoryFormSchema),
    mode: `onChange`,
  });

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [searchProductName, setSearchProductName] = useState<string>(``);
  const [requestError, setRequestError] = useState(false);
  const [registredWithSucess, setRegistredWithSucess] = useState(false);

  const { products } = useProducts();
  const filteredProducts = products.filter((product) =>
    removeAccent(product.name.toLowerCase()).includes(
      removeAccent(searchProductName.toLowerCase())
    )
  );

  const onSubmit = async (data: CreateCategoryFormData) => {
    setIsSubmiting(true);

    const createdCategory = await createCategory({
      name: data.categoryName,
      companyId,
    });

    if (!createdCategory?.id) {
      setIsSubmiting(false);
      return setRequestError(true);
    }

    const newCategoryId = createdCategory.id;

    if (data.productsIds) {
      try {
        data.productsIds.forEach(async (productId) => {
          const editedProduct = await editProduct({
            id: productId as string,
            categoryId: newCategoryId,
          });

          if (!editedProduct?.id) {
            setIsSubmiting(false);
            return setRequestError(true);
          }
        });
      } catch {
        setRequestError(true);
      } finally {
        setIsSubmiting(false);
      }
    }
    setRegistredWithSucess(true);
    setIsSubmiting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.createCategoryForm}
    >
      <div className={styles.createCategoryFormInputs}>
        <DefaultInput
          Icon={
            <FaGripLines size={20} className={styles.createCategoryFormIcon} />
          }
          labelText="Nome da categoria*"
          register={register(`categoryName`)}
          name="categoryName"
          error={errors.categoryName?.message}
        />
        <p className={styles.addProductToCategoryTitle}>
          Adicionar produtos a categoria
        </p>
        <div className={styles.searchProductInputWrapper}>
          <div className={styles.searchProductIconWrapper}>
            <FaSearch size={20} className={styles.searchProductIcon} />
          </div>
          <input
            type="text"
            className={styles.searchProductInput}
            onChange={(e) => setSearchProductName(e.target.value)}
            placeholder="Pesquisar produto por nome..."
          />
        </div>
        <SearchProductsList
          filteredProducts={filteredProducts}
          register={register(`productsIds`)}
        />
      </div>
      <ButtonSubmit
        isSubmiting={isSubmiting}
        text={
          registredWithSucess
            ? `Categoria criada com sucesso ✔️`
            : `Criar categoria`
        }
        submitError={requestError}
        className={styles.submitButton}
      />
    </form>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGripLines, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { InferType } from 'yup';

import { createCategory } from '@/utils/api/createCategory';
import { editProduct } from '@/utils/api/editProduct';
import { removeAccent } from '@/utils/removeAccent';

import { useProducts } from '@/hooks/useProducts';
import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCategoryFormSchema } from '@yup/front/createCategoryFormSchema';

import ButtonSubmit from '../../ButtonSubmit';
import DefaultInput from '../../DefaultInput';
import SearchProductsList from './SearchProductsList';
import styles from './styles.module.css';

type CreateCategoryFormData = InferType<typeof createCategoryFormSchema>;

interface CreateCategoryProps {
  setShowDialog: (value: boolean) => void;
}

export default function CreateCategoryForm({
  setShowDialog,
}: CreateCategoryProps) {
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

  const onSubmit = async (data: CreateCategoryFormData) => {
    setIsSubmiting(true);

    try {
      const createdCategory = await createCategory({
        name: data.categoryName,
        companyId: user?.id,
      });

      if (!createdCategory?.id) {
        setIsSubmiting(false);
        return setRequestError(true);
      }

      const newCategoryId = createdCategory.id;

      if (data.productsIds) {
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
      }

      toast.success(`Categoria criada com sucesso!`);
    } catch {
      setRequestError(true);
      toast.error(`Criação de categoria falhou, tente novamente em instantes!`);
    } finally {
      setShowDialog(false);
      setIsSubmiting(false);
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
          placeholder="Mais vendidos"
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
          gettingProducts={gettingProducts}
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

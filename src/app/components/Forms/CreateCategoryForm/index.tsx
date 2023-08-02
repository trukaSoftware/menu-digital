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
import styles from './styles.module.css';

type CreateCategoryFormData = InferType<typeof createCategoryFormSchema>;

export interface CreateCategoryFormProsp {
  companyId: string;
}

export default function CreateCategoryForm({
  companyId,
}: CreateCategoryFormProsp) {
  const formOptions = {
    resolver: yupResolver(createCategoryFormSchema),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>(formOptions);

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [searchProductName, setSearchProductName] = useState<string>(``);
  const [requestError, setRequestError] = useState(false);

  const { products } = useProducts();
  const filteredProducts = products.filter((product) =>
    removeAccent(product.name.toLowerCase()).includes(
      removeAccent(searchProductName.toLowerCase())
    )
  );

  const onSubmit = async (data: CreateCategoryFormData) => {
    setIsSubmiting(true);
    // const createdCategory = await createCategory({
    //   name: data.categoryName,
    //   companyId,
    // });

    const newCategoryId = `957ee80-7ad7-4052-a3f2-2e747a9239`;

    console.log(`ids dos produtos`, data.productsIds);
    try {
      if (data.productsIds) {
        data.productsIds.forEach(async (productId) => {
          const editedProduct = await editProduct({
            id: productId as string,
            categoryId: newCategoryId,
          });

          if (!editedProduct?.id) {
            setRequestError(true);
          }
        });
      }
    } catch {
      console.log(`caiu aqui`);
    }

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
        <div className={styles.searchProductsList}>
          {filteredProducts.map((product) => (
            <label
              htmlFor={product.id}
              className={styles.searchProductItem}
              key={product.id}
            >
              <input
                type="checkbox"
                value={product.id}
                id={product.id}
                className={styles.searchProductItemCheckbox}
                {...register(`productsIds`)}
              />
              <span className={styles.newCheckBox} />
              <span>{product.name}</span>
            </label>
          ))}
        </div>
      </div>
      <ButtonSubmit
        isSubmiting={isSubmiting}
        text="Criar categoria"
        submitError={requestError}
        className={styles.submitButton}
      />
    </form>
  );
}

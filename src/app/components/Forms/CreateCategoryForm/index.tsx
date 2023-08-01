import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { FaGripLines, FaSearch } from 'react-icons/fa';

import { InferType } from 'yup';

import { useProducts } from '@/hooks/useProducts';
import { createCategoryFormSchema } from '@/yup/createCategoryFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import DefaultInput from '../../DefaultInput';
import styles from './styles.module.css';

type CreateCategoryFormData = InferType<typeof createCategoryFormSchema>;

export default function CreateCategoryForm() {
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

  const { products } = useProducts();

  const onSubmit = async (data: CreateCategoryFormData) => {
    setIsSubmiting(true);
    console.log(data);
    setIsSubmiting(false);
  };

  console.log(products);

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
          <label htmlFor="idDoProduto1" className={styles.searchProductItem}>
            <input
              type="checkbox"
              value="idDoProduto1"
              id="idDoProduto1"
              className={styles.searchProductItemCheckbox}
              {...register(`products`)}
            />
            <span className={styles.newCheckBox} />
            <span>Nome do produto</span>
          </label>
        </div>
      </div>
      <button className={styles.submitButton} type="submit">
        {isSubmiting ? (
          <CgSpinner className="text-white animate-spin-fast" size={26} />
        ) : (
          `Criar categoria`
        )}
      </button>
    </form>
  );
}

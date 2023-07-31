import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { FaGripLines } from 'react-icons/fa';

import { InferType } from 'yup';

import { createCategoryFormSchema } from '@/yup/createCategoryFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const onLoginSubmit = (data: CreateCategoryFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className={styles.createCategoryForm}
    >
      <div className={styles.createCategoryFormInputs}>
        <label htmlFor="name" className={styles.createCategoryFormNameLabel}>
          <span className={styles.createCategoryFormNameTitle}>Nome*</span>
          <div className={styles.createCategoryFormInputWrapper}>
            <div className={styles.createCategoryFormIconWrapper}>
              <FaGripLines
                size={20}
                className={styles.createCategoryFormIcon}
              />
            </div>
            <input
              id="name"
              type="text"
              className={styles.createCategoryFormNameInput}
              {...register(`rememberMe`)}
            />
          </div>
        </label>
      </div>
      <button className="border-none " type="submit">
        {isSubmiting ? (
          <CgSpinner className="text-white animate-spin-fast" size={26} />
        ) : (
          `Criar categoria`
        )}
      </button>
    </form>
  );
}

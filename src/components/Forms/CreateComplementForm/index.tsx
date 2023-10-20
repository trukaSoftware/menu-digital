import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaListUl } from 'react-icons/fa';

import { InferType } from 'yup';

import ButtonSubmit from '@/components/ButtonSubmit';
import CheckboxInput from '@/components/CheckboxInput';
import ComplementInput from '@/components/ComplementInput';
import DefaultInput from '@/components/DefaultInput';

import { useProducts } from '@/hooks/useProducts';
import { createComplementFormSchema } from '@/yup/front/createComplementFormSchema';
import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';

import SearchProductsList from '../CreateCategoryForm/SearchProductsList';
import styles from './styles.module.css';

type CreateComplementFormData = InferType<typeof createComplementFormSchema>;

interface CreateComplementProps {
  setShowDialog: (value: boolean) => void;
}

function CreateComplementForm({ setShowDialog }: CreateComplementProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createComplementFormSchema),
    mode: `onChange`,
  });

  const [complements, setComplements] = useState<number[]>([]);
  const { user } = useUser();
  const { products, gettingProducts } = useProducts(user?.id as string);
  const filteredProducts = products;

  const onSubmit = async (data: CreateComplementFormData) => {
    console.log(data);
    // setShowDialog(false);
  };

  const addComplement = () => {
    setComplements([...complements, complements.length + 1]);
  };

  return (
    <div className={styles.createComplementFormContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createComplementFormWrapper}
      >
        <div className={styles.createComplementForm}>
          <DefaultInput
            error=""
            labelText="Nome do adicional:"
            register={register(`name`)}
            name="Nome do adicional*"
            Icon={<FaListUl />}
            placeholder="Ex.: Complementos, bebidas, bordas..."
          />
          <div className={styles.createComplementAmountInputWrapper}>
            <CheckboxInput
              text="Obrigatório"
              id="required"
              register={register(`required`)}
            />
            <label htmlFor="maximun">
              <input
                type="number"
                id="maximun"
                className={styles.createComplementAmountInput}
                placeholder="3"
                {...register(`maxAmount`)}
              />
              <span>Máximo</span>
            </label>
          </div>
          <div>
            <ComplementInput
              itemName="name"
              itemRegister={register(`items.${0}.name`)}
              itemError={errors.items?.[0]?.name?.message}
              priceName="price"
              priceRegister={register(`items.${0}.price`)}
              priceError={errors.items?.[0]?.price?.message}
              index={0}
            />
            {complements.map((complement, index) => (
              <ComplementInput
                key={complement + 1}
                itemName="name"
                itemRegister={register(`items.${index + 1}.name`)}
                itemError={errors.items?.[index + 1]?.name?.message}
                priceName="price"
                priceRegister={register(`items.${index + 1}.price`)}
                priceError={errors.items?.[index + 1]?.price?.message}
                index={index + 1}
              />
            ))}
            <button
              type="button"
              onClick={addComplement}
              className={styles.createComplementAddComplementButton}
            >
              + itens
            </button>
            <SearchProductsList
              filteredProducts={filteredProducts}
              gettingProducts={gettingProducts}
              register={register(`productsIds`)}
            />
          </div>
        </div>
        <ButtonSubmit
          text="Concluir"
          isSubmiting={false}
          className={styles.submitButton}
        />
      </form>
    </div>
  );
}

export default CreateComplementForm;

'use client';

import { ChangeEvent, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { BsFillImageFill } from 'react-icons/bs';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { MdOutlineFastfood } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { createProduct } from '@/utils/api/createProduct';
import { convertFileToBase64 } from '@/utils/convertFileToBase64';
import { ImageProps } from '@/utils/types';

import { setProducts } from '@/redux/features/products-slice';
import { useAppSelector } from '@/redux/store';
import { useUser } from '@clerk/nextjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema, ProductData } from '@yup/front/createProductFormSchema';

import ButtonSubmit from '../../ButtonSubmit';
import DefaultInput from '../../DefaultInput';
import DefaultSelect from '../../DefaultSelect';
import UploadImageInput from '../../UploadImageInput';
import styles from './styles.module.css';

export interface createProductForm {
  setShowDialog: (value: boolean) => void;
}

export default function CreateProductForm({
  setShowDialog,
}: createProductForm) {
  const [requestError, setRequestError] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [registredWithSucess, setRegistredWithSucess] = useState(false);
  const [imagePlaceholder, setImagePlaceholder] = useState<string>(``);
  const [productImage, setProductImage] = useState<ImageProps>(
    {} as unknown as ImageProps
  );
  const [productImageError, setProductImageError] = useState(``);
  const { user } = useUser();
  const dispatch = useDispatch();

  const products = useAppSelector((state) => state.productsReducer.products);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setError,
  } = useForm<ProductData>({
    resolver: yupResolver(productSchema),
    mode: `onChange`,
  });

  const productName = useWatch({
    control,
    name: `name`,
  });

  const onSubmit = async (values: ProductData) => {
    setIsSubmiting(true);

    const allProductsNames = products.map((product) =>
      product.name.toLowerCase()
    );

    if (allProductsNames.includes(values.name.toLowerCase())) {
      setIsSubmiting(false);
      setError(`name`, {
        message: `Já existe um produto com esse nome, coloque um nome diferente!`,
      });
      return;
    }

    const createProductPayload = {
      ...values,
      price: Number(values.price),
      companyId: `${user?.id}`,
      images: [productImage],
    };

    try {
      const createdProduct = await createProduct({
        ...createProductPayload,
      });

      if (!createdProduct?.id) {
        setIsSubmiting(false);
        return setRequestError(true);
      }

      toast.success(`Produto criado com sucesso!`);
      dispatch(setProducts([...products, createdProduct]));
    } catch (error) {
      setRequestError(true);
      toast.error(`Criação de produto falhou, tente novamente em instantes!`);
    } finally {
      setShowDialog(false);
      setIsSubmiting(false);
    }

    setRegistredWithSucess(true);
    setIsSubmiting(false);
  };

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];

      const fileParsetToBase64 = await convertFileToBase64(
        file,
        setProductImageError
      );

      setImagePlaceholder(`${productName}-${Date.now()} ✔️`);

      setProductImage({
        file: `${fileParsetToBase64}`,
        name: `${productName}-${Date.now()}`,
        alt: `Imagem do produto ${productName}`,
      });
    } catch (error) {
      setRequestError(true);
    }
  };

  return (
    <div className={styles.createProductFormContainer}>
      <form
        className={styles.createProductForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.createProductFormcontainerInputs}>
          <DefaultInput
            Icon={<MdOutlineFastfood />}
            name="name"
            placeholder="Hamburguer"
            labelText="Nome*"
            register={register(`name`)}
            error={errors.name?.message}
          />
          <label
            htmlFor="description"
            className={styles.createProductFormlabel}
          >
            <span className={styles.createProductFormTitle}>Descrição*</span>
            <textarea
              className={styles.createProductFormTextArea}
              id="description"
              rows={3}
              placeholder="Pão australiano, 120g de carne, 2 ovos, queijo e presunto"
              {...register(`description`)}
            />
            {errors.description ? (
              <span className={styles.createProductFormErrorMessage}>
                {errors.description?.message}
              </span>
            ) : null}
          </label>
          <DefaultInput
            Icon={<LiaMoneyBillWaveSolid />}
            name="price"
            type="number"
            step="0.01"
            placeholder="25.00"
            labelText="Preço*"
            register={register(`price`)}
            error={errors.price?.message}
          />
          <UploadImageInput
            iconImage={<BsFillImageFill color="#6B7280" />}
            handleFileChange={handleImage}
            title="Imagem"
            id="image"
            imageName={imagePlaceholder}
            labelClassName={
              productImage.file ? styles.hasImageOnInput : undefined
            }
            error={productImageError}
          />
          <Controller
            control={control}
            name="categoryId"
            render={({ field, fieldState: { error } }) => (
              <DefaultSelect field={field} error={error} />
            )}
          />
        </div>
        <ButtonSubmit
          isSubmiting={isSubmiting}
          text={
            registredWithSucess
              ? `Produto criado com sucesso ✔️`
              : `Criar produto`
          }
          submitError={requestError}
          className={styles.createProductFormSubmitButton}
        />
      </form>
    </div>
  );
}

'use client';

import { ChangeEvent, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { BsFillImageFill } from 'react-icons/bs';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { MdOutlineFastfood } from 'react-icons/md';

import { Product } from '@/types/product';

import { editProduct } from '@/utils/api/editProduct';
import { updateProductImage } from '@/utils/api/updateProductImage';
import { ImageProps } from '@/utils/types';
import {
  productSchema,
  ProductData,
} from '@/utils/validations/createProductFormValidation';

import { yupResolver } from '@hookform/resolvers/yup';

import ButtonSubmit from '../../ButtonSubmit';
import DefaultInput from '../../DefaultInput';
import DefaultSelect from '../../DefaultSelect';
import UploadImageInput from '../../UploadImageInput';
import styles from './styles.module.css';

export interface EditProductFormProps {
  setShowDialog: (value: boolean) => void;
  product: Product;
  categoryId: string;
  editProductFromList: (newProduct: Product, categoryId: string) => void;
}

export default function EditProductForm({
  setShowDialog,
  product,
  categoryId,
  editProductFromList,
}: EditProductFormProps) {
  const [requestError, setRequestError] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [registredWithSucess, setRegistredWithSucess] = useState(false);
  const [imagePlaceholder, setImagePlaceholder] = useState<string>(``);
  const [productImage, setProductImage] = useState<ImageProps>(
    {} as unknown as ImageProps
  );
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ProductData>({
    resolver: yupResolver(productSchema),
    mode: `onChange`,
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId,
    },
  });

  const productName = useWatch({
    control,
    name: `name`,
  });

  const onSubmit = async (values: ProductData) => {
    setIsSubmiting(true);

    const editProductPayload = {
      ...values,
      price: Number(values.price),
    };

    try {
      const editedProduct = await editProduct({
        id: product.id,
        ...editProductPayload,
      });

      const updateImage = await updateProductImage(
        product.id,
        product.productsImages[0].id,
        [productImage]
      );

      if (!editedProduct?.id || updateImage.error) {
        setIsSubmiting(false);
        return setRequestError(true);
      }

      const updatedProduct = {
        ...editedProduct,
        productsImages: updateImage.productsImages,
      };

      editProductFromList(updatedProduct, categoryId);
    } catch (error) {
      setIsSubmiting(false);
      setRequestError(true);
    } finally {
      setIsSubmiting(false);
    }

    setRegistredWithSucess(true);
    setTimeout(() => {
      setShowDialog(false);
    }, 2000);
  };

  const toBase64 = (file: File | undefined) =>
    new Promise((resolve, reject) => {
      // vai sair daqui
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      }
    });

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];

      const fileParsetToBase64 = await toBase64(file);

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
            placeholder="25,00"
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
              ? `Produto editado com sucesso ✔️`
              : `Editar produto`
          }
          submitError={requestError}
          className={styles.createProductFormSubmitButton}
        />
      </form>
    </div>
  );
}

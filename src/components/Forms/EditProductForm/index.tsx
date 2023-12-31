'use client';

import { ChangeEvent, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { BsFillImageFill } from 'react-icons/bs';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { MdOutlineFastfood } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Product } from '@/types/product';

import { editProduct } from '@/utils/api/editProduct';
import { updateProductImage } from '@/utils/api/updateProductImage';
import { convertFileToBase64 } from '@/utils/convertFileToBase64';
import { ImageProps } from '@/utils/types';

import { editProductFromCategories } from '@/redux/features/categories-slice';
import { editProductFromList } from '@/redux/features/products-slice';
import { useAppSelector } from '@/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema, ProductData } from '@yup/front/createProductFormSchema';

import ButtonSubmit from '../../ButtonSubmit';
import DefaultInput from '../../DefaultInput';
import DefaultSelect from '../../DefaultSelect';
import UploadImageInput from '../../UploadImageInput';
import styles from './styles.module.css';

export interface EditProductFormProps {
  setShowDialog: (value: boolean) => void;
  product: Product;
  categoryId: string;
}

export default function EditProductForm({
  setShowDialog,
  product,
  categoryId,
}: EditProductFormProps) {
  const dispatch = useDispatch();

  const [requestError, setRequestError] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [registredWithSucess, setRegistredWithSucess] = useState(false);
  const [imagePlaceholder, setImagePlaceholder] = useState<string>(``);
  const [productImage, setProductImage] = useState<ImageProps>(
    {} as unknown as ImageProps
  );
  const [productImageError, setProductImageError] = useState(``);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setError,
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

  const products = useAppSelector((state) => state.productsReducer.products);

  const productName = useWatch({
    control,
    name: `name`,
  });

  const onSubmit = async (values: ProductData) => {
    setIsSubmiting(true);

    const allProductsNames = products
      .filter((prod) => prod.id !== product.id)
      .map((prod) => prod.name.toLowerCase());

    if (allProductsNames.includes(values.name.toLowerCase())) {
      setIsSubmiting(false);
      setError(`name`, {
        message: `Já existe um produto com esse nome, coloque um nome diferente!`,
      });
      return;
    }

    const editProductPayload = {
      ...values,
      price: Number(values.price),
    };

    try {
      const editedProduct = await editProduct({
        id: product.id,
        ...editProductPayload,
      });

      const updateImage = productImage.file
        ? await updateProductImage(product.id, product.productsImages[0].id, [
            productImage,
          ])
        : { error: false, productsImages: product.productsImages };

      if (!editedProduct?.id || updateImage.error) {
        setIsSubmiting(false);
        return setRequestError(true);
      }

      const newProduct: Product = {
        ...editedProduct,
        productsImages: updateImage.productsImages,
      };

      if (window.location.href.includes(`gerenciar-produtos`)) {
        dispatch(editProductFromList({ newProduct }));
      } else {
        dispatch(
          editProductFromCategories({ newProduct, oldCategoryId: categoryId })
        );
      }

      toast.success(`Produto editado com sucesso!`);
    } catch (error) {
      setIsSubmiting(false);
      setRequestError(true);
      toast.error(`Edição de produto falhou, tente novamente em instantes!`);
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
    <div className={styles.editProductFormContainer}>
      <form
        className={styles.editProductForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.editProductFormcontainerInputs}>
          <DefaultInput
            Icon={<MdOutlineFastfood />}
            name="name"
            placeholder="Hamburguer"
            labelText="Nome*"
            register={register(`name`)}
            error={errors.name?.message}
          />
          <label htmlFor="description" className={styles.editProductFormlabel}>
            <span className={styles.editProductFormTitle}>Descrição*</span>
            <textarea
              className={styles.editProductFormTextArea}
              id="description"
              rows={3}
              placeholder="Pão australiano, 120g de carne, 2 ovos, queijo e presunto"
              {...register(`description`)}
            />
            {errors.description ? (
              <span className={styles.editProductFormErrorMessage}>
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
            data-testid="productImageInput"
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
              ? `Produto editado com sucesso ✔️`
              : `Editar produto`
          }
          submitError={requestError}
          className={styles.editProductFormSubmitButton}
        />
      </form>
    </div>
  );
}

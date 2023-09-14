import { object, string, array, number, InferType } from 'yup';

const productSchema = object({
  name: string().required(),
  description: string().required(),
  price: number().min(1).required(),
  categoryId: string(),
  companyId: string().required(),
  complementsId: array(string().required()),
  discount: number(),
  images: array(
    object({
      file: string().required(),
      name: string().required(),
      alt: string().required(),
      width: number(),
      height: number(),
    })
  ),
});

export type ProductData = InferType<typeof productSchema>;

export const validateProductData = (productData: ProductData) =>
  productSchema.validate(productData);

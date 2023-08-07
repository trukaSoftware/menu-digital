import { object, string, InferType } from 'yup';

export const productSchema = object({
  name: string().required(`O nome do produto é obrigatório`),
  description: string().required(`A descrição do produto é obrigatória`),
  price: string().required(`O preço do produto é obrigatório`),
  categoryId: string().required(`Informe uma categoria`),
});

export type ProductData = InferType<typeof productSchema>;

export const validateProductData = (productData: ProductData) =>
  productSchema.validate(productData);

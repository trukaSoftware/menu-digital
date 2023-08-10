import { object, string, InferType } from 'yup';

export const productSchema = object({
  name: string().required(
    `É preciso preencher este campo com o nome do produto.`
  ),
  description: string().required(
    `É preciso preencher este campo com a descrição do produto.`
  ),
  price: string().required(
    `É preciso preencher este campo com o preço do produto.`
  ),
  categoryId: string().required(
    `É preciso selecionar ao menos uma categoria para o produto.`
  ),
});

export type ProductData = InferType<typeof productSchema>;

export const validateProductData = (productData: ProductData) =>
  productSchema.validate(productData);

import { object, string, InferType } from 'yup';

export const deliverySchema = object({
  clientName: string().required(
    `É preciso preencher este campo com o seu nome.`
  ),
  clientPhoneNumber: string()
    .min(10, `O Telefone é obrigatório.`)
    .max(11, `O número de telefone deve ser válido.`)
    .required(),
  deliveryType: string()
    .oneOf([`pickup`, `delivery`])
    .required(`É preciso selecionar ao menos uma categoria para o produto.`),
  paymentMethod: string().required(
    `É preciso preencher este campo com o preço do produto.`
  ),
  deliveryTime: string().required(
    `É preciso selecionar ao menos uma categoria para o produto.`
  ),
  deliveryAddress: string().required(
    `É preciso selecionar ao menos uma categoria para o produto.`
  ),
});

export type DeliveryData = InferType<typeof deliverySchema>;

export const validateDeliveryData = (deliveryData: DeliveryData) =>
  deliverySchema.validate(deliveryData);

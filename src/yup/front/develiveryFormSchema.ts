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
    .oneOf([`Retirada`, `Entrega`])
    .required(`É preciso selecionar ao menos uma categoria para o produto.`),
  paymentMethod: string()
    .oneOf([`pix`, `Cartão de crédito`, `Dinheiro`, `Cartão de débito`])
    .required(`É preciso preencher este campo com o preço do produto.`),
  deliveryAddress: string().required(
    `É preciso preencher o campo de endereço corretamente.`
  ),
});

export type DeliveryData = InferType<typeof deliverySchema>;

export const validateDeliveryData = (deliveryData: DeliveryData) =>
  deliverySchema.validate(deliveryData);

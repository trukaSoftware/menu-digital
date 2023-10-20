import * as Yup from 'yup';

const nameComplementValidation = Yup.string().required(
  `Digite o nome do complemento.`
);

const maxAmountComplementValidation = Yup.number().required();

const requiredComplementValidation = Yup.string().required();

const productsIdsValidation = Yup.array().of(Yup.string());

export const createComplementFormSchema = Yup.object().shape({
  name: nameComplementValidation,
  maxAmount: maxAmountComplementValidation,
  required: requiredComplementValidation,
  productsIds: productsIdsValidation,
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(`Digite o nome do item.`),
      price: Yup.number().required(`Digite o preço`),
    })
  ),
});

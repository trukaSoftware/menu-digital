import * as Yup from 'yup';

const nameComplementValidation = Yup.string().required(
  `Digite o nome do complemento.`
);

const maxAmountComplementValidation = Yup.number()
  .required(`Digite uma quantidade máxima`)
  .transform((value, originalValue) => {
    if (originalValue === ``) {
      return undefined; // Transforma um valor vazio em undefined
    }
    return value;
  })
  .test(`is-valid-number`, `O preço deve ser um número válido.`, (value) => {
    if (value === undefined || !Number.isNaN(value)) {
      return true; // A validação passará se o valor for undefined ou um número válido
    }
    return false; // A validação falhará se o valor não for um número válido
  });

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
      price: Yup.number()
        .required(`Acima de 0`)
        .default(0)
        .transform((value, originalValue) => {
          if (originalValue === ``) {
            return undefined; // Transforma um valor vazio em undefined
          }
          return value;
        })
        .test(
          `is-valid-number`,
          `O preço deve ser um número válido.`,
          (value) => {
            if (value === undefined || !Number.isNaN(value)) {
              return true; // A validação passará se o valor for undefined ou um número válido
            }
            return false; // A validação falhará se o valor não for um número válido
          }
        ),
    })
  ),
});

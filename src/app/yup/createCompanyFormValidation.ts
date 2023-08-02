import * as yup from 'yup';

export const createCompanyFormValidation = yup.object().shape({
  name: yup.string().required(`*Esse campo é obrigatório`),
  cnpj: yup
    .string()
    .test(`len`, `*O CNPJ/CPF deve ser válido`, (value?: string) => {
      if (!value || value.length === 0) {
        return false;
      }
      return value.length === 14 || value.length === 11;
    }),
  phoneNumber: yup
    .string()
    .min(10, `*Esse campo é obrigatório`)
    .max(11, `*O número de telefone deve ser válido`)
    .required(),
  deliveryPhoneNumber: yup
    .string()
    .test(
      `len`,
      `*O número de telefone deve ser válido ou estar vázio`,
      (value?: string) => {
        if (!value || value.length === 0) {
          return true;
        }
        return value.length === 10 || value.length === 11;
      }
    ),
  zipCode: yup
    .string()
    .min(8, `*Esse campo é obrigatório`)
    .max(8, `*Digite um CEP válido`)
    .required(),
  address: yup.string().required(`*Esse campo é obrigatório`),
  fileLogo: yup.string(),
  fileCoverCape: yup.string(),
});

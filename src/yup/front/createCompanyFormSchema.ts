import * as yup from 'yup';

export const createCompanyFormSchema = yup.object().shape({
  name: yup.string().required(`O Nome do restaurante é obrigatório.`),
  cnpj: yup
    .string()
    .test(
      `len`,
      `O CNPJ/CPF é obrigatório e deve ser válido.`,
      (value?: string) => {
        if (!value || value.length === 0) {
          return false;
        }
        return value.length === 14 || value.length === 11;
      }
    )
    .required(),
  phoneNumber: yup
    .string()
    .min(10, `O Telefone é obrigatório.`)
    .max(11, `O número de telefone deve ser válido.`)
    .required(),
  deliveryPhoneNumber: yup
    .string()
    .test(
      `len`,
      `O número de telefone deve ser válido ou estar vázio.`,
      (value?: string) => {
        if (!value || value.length === 0) {
          return true;
        }
        return value.length === 10 || value.length === 11;
      }
    ),
  zipCode: yup
    .string()
    .min(8, `O CEP é obrigatório.`)
    .max(8, `Digite um CEP válido.`)
    .required(),
  address: yup.string().required(`O Endereço é obrigatório.`),
  fileLogo: yup.string(),
  fileCoverCape: yup.string(),
  deliveryTax: yup.number().required(),
  deliveryTime: yup.string().required(),
  openingHours: yup.string().required(),
  instagramUrl: yup.string(),
});

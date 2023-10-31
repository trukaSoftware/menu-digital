import * as yup from 'yup';

export const editCompanyFormSchema = yup.object().shape({
  phoneNumber: yup
    .string()
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
    )
    .required(),
  zipCode: yup.string().max(8, `Digite um CEP válido.`).required(),
  address: yup.string().required(),
  fileLogo: yup.string().required(),
  fileCoverCape: yup.string().required(),
  deliveryTax: yup.number().required(),
  deliveryTime: yup.string().required(),
  openingHours: yup.string().required(),
  instagramUrl: yup.string().required(),
});

export type editCompanyFormType = yup.InferType<typeof editCompanyFormSchema>;

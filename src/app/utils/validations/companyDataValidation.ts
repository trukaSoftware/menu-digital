import { object, string, InferType, number } from 'yup';

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/;

const companySchema = object({
  id: string().required(),
  name: string().required(),
  email: string().email().required(),
  cnpj: string().matches(cnpjRegex, `CNPJ inválido`).required(),
  companyLogo: object({
    file: string().required(),
    width: number(),
    height: number(),
  }).required(),
  companyTheme: object({
    file: string().required(),
    width: number(),
    height: number(),
  }).required(),
  address: string().required(),
  zipCode: string().required(),
  phoneNumber: string().required(),
  deliveryPhoneNumber: string(),
});

export type CompanyData = InferType<typeof companySchema>;

export const validateCompanyData = (companyData: CompanyData) =>
  companySchema.validate(companyData);

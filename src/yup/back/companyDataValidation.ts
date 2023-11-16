import { object, string, InferType, number } from 'yup';

const companySchema = object({
  id: string().required(),
  name: string().required(),
  email: string().email().required(),
  cnpj: string().required(),
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
  deliveryTax: number().required(),
  deliveryTime: string().required(),
  openingHours: string().required(),
  instagramUrl: string(),
});

export type CompanyData = InferType<typeof companySchema>;

export const validateCompanyData = (companyData: CompanyData) =>
  companySchema.validate(companyData);

import { object, string, InferType } from 'yup';

const companySchema = object({
  id: string().required(),
  name: string().required(),
  email: string().email(),
  address: string().required(),
  zipCode: string().required(),
  phoneNumber: string().required(),
  deliveryPhoneNumber: string(),
});

export type CompanyData = InferType<typeof companySchema>;

export const validateCompanyData = (companyData: CompanyData) =>
  companySchema.validate(companyData);

import { CompanyPayload, CreateCompanyResponse } from '@/types/company';

import { post } from './post';

export const createCompany = async ({
  name,
  id,
  address,
  cnpj,
  companyLogo,
  companyTheme,
  deliveryPhoneNumber,
  email,
  phoneNumber,
  zipCode,
}: CompanyPayload) => {
  const company = await post<CreateCompanyResponse, CompanyPayload>(
    `/api/company/createCompany`,
    {
      name,
      id,
      address,
      cnpj,
      companyLogo,
      companyTheme,
      deliveryPhoneNumber,
      email,
      phoneNumber,
      zipCode,
    }
  );

  const createdCompany = company.data;

  return createdCompany;
};

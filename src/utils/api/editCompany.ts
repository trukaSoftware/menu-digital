import { CompanyProps, EditCompanyData } from '../types';
import { put } from './put';

export const editCompany = async ({
  id,
  company,
  companyAddress,
  companyInfo,
}: EditCompanyData) => {
  const companyResponse = await put<CompanyProps, EditCompanyData>(
    `/api/company/editCompany`,
    {
      id,
      company,
      companyAddress,
      companyInfo,
    }
  );

  const createdCompany = companyResponse.data;

  return createdCompany;
};

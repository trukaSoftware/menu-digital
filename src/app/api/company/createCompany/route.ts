import { NextResponse } from 'next/server';

import {
  CompanyData,
  validateCompanyData,
} from '@yup/back/companyDataValidation';

import { createCompanyService } from '../../services/company/createCompanyService';

export async function POST(req: Request) {
  const {
    id,
    name,
    email,
    cnpj,
    address,
    zipCode,
    companyLogo,
    companyTheme,
    phoneNumber,
    deliveryPhoneNumber,
  } = (await req.json()) as CompanyData;

  try {
    await validateCompanyData({
      id,
      name,
      email,
      cnpj,
      address,
      zipCode,
      companyLogo,
      companyTheme,
      phoneNumber,
      deliveryPhoneNumber,
    });

    const companyId = await createCompanyService({
      id,
      name,
      email,
      cnpj,
      address,
      zipCode,
      companyLogo,
      companyTheme,
      phoneNumber,
      deliveryPhoneNumber,
    });

    return NextResponse.json({ companyId });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

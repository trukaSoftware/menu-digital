import { NextResponse } from 'next/server';

import {
  validateCompanyData,
  CompanyData,
} from '../../utils/validations/companyDataValidation';
import { createCompanyService } from '../services/createCompanyService';

export async function POST(req: Request) {
  const {
    id,
    name,
    email,
    cnpj,
    address,
    zipCode,
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
      phoneNumber,
      deliveryPhoneNumber,
    });

    return NextResponse.json({ companyId });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

import { NextResponse } from 'next/server';

import { EditCompanyData } from '@/app/utils/types';

import { editCompanyService } from '../../services/company/editCompanyService';

export async function PUT(req: Request) {
  const { id, company, companyInfo, companyAddress } =
    (await req.json()) as EditCompanyData;

  if (!id)
    throw new Error(
      `Por favor, informe o id do estabelecimento para fazer alterações`
    );

  try {
    const companyData = await editCompanyService({
      id,
      company,
      companyInfo,
      companyAddress,
    });

    return NextResponse.json({ company: companyData });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}

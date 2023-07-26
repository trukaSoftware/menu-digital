import { NextResponse } from 'next/server';

import { getCompanyByIdService } from '../../services/company/getCompanyByIdService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id) throw new Error(`Por favor, adicione o id a ser buscado`);

    const company = await getCompanyByIdService(id);

    return NextResponse.json({ company });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

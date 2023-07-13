import { NextResponse } from 'next/server';

import { getCompanyByIdService } from '../../services/getCompanyByIdService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  if (!id) throw new Error(`Por favor, adicione o id a ser buscado`);

  try {
    const companies = await getCompanyByIdService(id);

    return NextResponse.json({ companies });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

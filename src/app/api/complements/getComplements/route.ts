import { NextResponse } from 'next/server';

import { getComplementsService } from '../../services/complement/getComplementsService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get(`companyId`);

  try {
    if (!companyId) throw new Error(`Por favor, adicione o id a ser buscado`);

    const complements = await getComplementsService(companyId);

    return NextResponse.json({ complements });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

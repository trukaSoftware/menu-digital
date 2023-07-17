import { NextResponse } from 'next/server';

import { getComplementsByIdService } from '../../services/complement/getComplementsByIdService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id) throw new Error(`Por favor, adicione o id a ser buscado`);

    const complements = await getComplementsByIdService(id);

    return NextResponse.json({ complements });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}

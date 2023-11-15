import { NextResponse } from 'next/server';

import { getItemsService } from '../../services/item/getItemsService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get(`companyId`);

  try {
    if (!companyId) throw new Error(`Por favor, adicione o id a ser buscado`);

    const items = await getItemsService(companyId);

    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

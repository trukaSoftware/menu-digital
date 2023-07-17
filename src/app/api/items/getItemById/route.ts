import { NextResponse } from 'next/server';

import { getItemByIdService } from '../../services/item/getItemByIdService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get(`id`);

  try {
    if (!id) throw new Error(`Por favor, adicione o id a ser buscado`);

    const item = await getItemByIdService(id);

    return NextResponse.json({ item });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}

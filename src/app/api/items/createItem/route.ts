import { NextResponse } from 'next/server';

import { ItemData, validateItemData } from '@yup/back/itemDataValidation';

import { createItemService } from '../../services/item/createItemService';

export async function POST(req: Request) {
  const { complementId, itens } = (await req.json()) as ItemData;

  try {
    await validateItemData({
      complementId,
      itens,
    });

    const createdItens = await createItemService({
      complementId,
      itens,
    });

    return NextResponse.json({ itens: createdItens });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

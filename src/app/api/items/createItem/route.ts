import { NextResponse } from 'next/server';

import { ItemData, validateItemData } from '@yup/back/itemDataValidation';

import { createItemService } from '../../services/item/createItemService';

export async function POST(req: Request) {
  const { complementId, items } = (await req.json()) as ItemData;

  try {
    await validateItemData({
      complementId,
      items,
    });

    const createdItems = await createItemService({
      complementId,
      items,
    });

    return NextResponse.json({ items: createdItems });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

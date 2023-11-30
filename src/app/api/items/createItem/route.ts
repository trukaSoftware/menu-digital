import { NextResponse } from 'next/server';

import { ItemData, validateItemData } from '@yup/back/itemDataValidation';

import { createItemService } from '../../services/item/createItemService';

export async function POST(req: Request) {
  const { complementId, items, companyId } = (await req.json()) as ItemData;

  try {
    await validateItemData({
      complementId,
      items,
      companyId,
      visible: true,
    });

    const createdItems = await createItemService({
      complementId,
      items,
      companyId,
      visible: true,
    });

    return NextResponse.json({ items: createdItems });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

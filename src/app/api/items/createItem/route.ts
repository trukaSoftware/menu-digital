import { NextResponse } from 'next/server';

import {
  validateItemData,
  ItemData,
} from '../../../utils/validations/itemDataValidation';
import { createItemService } from '../../services/item/createItemService';

export async function POST(req: Request) {
  const { complementId, name, price } = (await req.json()) as ItemData;

  try {
    await validateItemData({
      complementId,
      name,
      price,
    });

    const item = await createItemService({
      complementId,
      name,
      price,
    });

    return NextResponse.json({ item });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}

import { NextResponse } from 'next/server';

import { getItemsService } from '../../services/item/getItemsService';

export async function GET() {
  try {
    const items = await getItemsService();

    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}

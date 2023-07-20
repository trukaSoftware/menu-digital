import { NextResponse } from 'next/server';

import { getProductsService } from '../../services/product/getProductsService';

export async function GET() {
  try {
    const products = await getProductsService();

    return NextResponse.json({ products });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

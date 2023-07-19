import { NextResponse } from 'next/server';

import { getCategoriesService } from '../../services/category/getCategoriesService';

export async function GET() {
  try {
    const categories = await getCategoriesService();

    return NextResponse.json({ categories });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}

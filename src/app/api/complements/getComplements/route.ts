import { NextResponse } from 'next/server';

import { getComplementsService } from '../../services/complement/getComplementsService';

export async function GET() {
  try {
    const complements = await getComplementsService();

    return NextResponse.json({ complements });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}

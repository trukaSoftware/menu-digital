import { NextResponse } from 'next/server';

import { getCompaniesService } from '../../services/company/getCompaniesService';

export async function GET() {
  try {
    const companies = await getCompaniesService();

    return NextResponse.json({ companies });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }

    return error;
  }
}

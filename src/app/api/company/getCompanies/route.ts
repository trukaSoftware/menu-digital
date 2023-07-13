import { NextResponse } from 'next/server';

import { getCompaniesService } from '../../services/company/getCompaniesService';

export async function GET() {
  try {
    const companies = await getCompaniesService();

    return NextResponse.json({ companies });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

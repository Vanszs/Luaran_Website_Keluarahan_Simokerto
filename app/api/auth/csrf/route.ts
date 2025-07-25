import { NextRequest, NextResponse } from 'next/server';
import { generateCSRFToken } from '../../../../utils/csrfUtils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const csrfToken = generateCSRFToken();
    
    return NextResponse.json({
      csrfToken
    });
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return NextResponse.json(
      { message: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

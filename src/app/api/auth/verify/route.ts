import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth-server';

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { authenticated: false, error: 'No access token provided' },
        { status: 400 }
      );
    }

    const { user, error } = await checkAuth(accessToken);

    if (error) {
      return NextResponse.json(
        { authenticated: false, error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '../../../../utils/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username dan password diperlukan' },
        { status: 400 }
      );
    }

    // Query the database
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT id, username, name, role FROM admin WHERE username = ? AND password = ?',
        [username, password] // Note: In a real application, passwords should be hashed!
      );

      const users = rows as any[];
      if (users.length === 0) {
        return NextResponse.json(
          { message: 'Username atau password salah' },
          { status: 401 }
        );
      }

      const user = users[0];

      // Set session cookie
      cookies().set('admin_session', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      });

      return NextResponse.json({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

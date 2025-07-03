import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../utils/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password, name } = await request.json();

    // Validate input
    if (!username || !password || !name) {
      return NextResponse.json(
        { message: 'Username, password, dan nama diperlukan' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const connection = await pool.getConnection();
    try {
      const [existingUsers] = await connection.execute(
        'SELECT id FROM admin WHERE username = ?',
        [username]
      );

      if ((existingUsers as any[]).length > 0) {
        return NextResponse.json(
          { message: 'Username sudah digunakan' },
          { status: 409 }
        );
      }

      // Insert new admin (with default role as 'admin')
      await connection.execute(
        'INSERT INTO admin (username, password, name, role) VALUES (?, ?, ?, ?)',
        [username, password, name, 'admin']
      );

      return NextResponse.json({ message: 'Pendaftaran berhasil. Menunggu persetujuan.' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

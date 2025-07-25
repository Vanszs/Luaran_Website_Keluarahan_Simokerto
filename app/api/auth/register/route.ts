import { query } from '../../../../utils/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, name, address } = body;
    
    if (!username || !password || !name) {
      return NextResponse.json(
        { message: 'Username, password, dan nama wajib diisi' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password minimal 8 karakter' },
        { status: 400 }
      );
    }
    
    // Check if username already exists
    const existingUser = await query(
      'SELECT id FROM admin WHERE username = ?',
      [username]
    );
    
    if ((existingUser as any[]).length > 0) {
      return NextResponse.json(
        { message: 'Username sudah digunakan' },
        { status: 409 }
      );
    }
    
    // Hash password before storing
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert new admin with hashed password, default role as 'admin1' and pending status as TRUE
    await query(
      'INSERT INTO admin (username, password, name, address, role, pending) VALUES (?, ?, ?, ?, ?, TRUE)',
      [username, hashedPassword, name, address || null, 'admin1']
    );
    
    // Insert notification for superadmin about new pending admin
    await query(
      'INSERT INTO notifications (message, user_role, is_read, created_at) VALUES (?, ?, FALSE, NOW())',
      [`Pendaftaran admin baru: ${name} (${username}) menunggu persetujuan.`, 'superadmin']
    );
    
    return NextResponse.json(
      { message: 'Pendaftaran berhasil. Menunggu persetujuan administrator.' },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat pendaftaran' },
      { status: 500 }
    );
  }
}

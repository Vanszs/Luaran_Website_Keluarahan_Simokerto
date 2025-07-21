import { NextRequest, NextResponse } from 'next/server';
import { query, checkDatabaseConnection } from '../../../../utils/db';

export const dynamic = 'force-dynamic';

// GET - Ambil daftar jenis laporan
export async function GET(req: NextRequest) {
  try {
    // Check if database is available
    const isDatabaseAvailable = await checkDatabaseConnection();
    
    if (!isDatabaseAvailable) {
      // Return mock data if database is unavailable
      return NextResponse.json([
        { id: 1, nama: 'Pencurian' },
        { id: 2, nama: 'Keamanan' },
        { id: 3, nama: 'Kebersihan' },
        { id: 4, nama: 'Infrastruktur' },
      ]);
    }

    const result = await query('SELECT id, nama FROM jenis_laporan_master ORDER BY id ASC');
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error fetching jenis laporan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jenis laporan' },
      { status: 500 }
    );
  }
}

// POST - Tambah jenis laporan baru (hanya superadmin)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { nama } = body;

    if (!nama || typeof nama !== 'string' || nama.trim() === '') {
      return NextResponse.json(
        { error: 'Nama jenis laporan wajib diisi' },
        { status: 400 }
      );
    }

    // Check if database is available
    const isDatabaseAvailable = await checkDatabaseConnection();
    
    if (!isDatabaseAvailable) {
      return NextResponse.json(
        { error: 'Database tidak tersedia' },
        { status: 503 }
      );
    }

    // Kapitalisasi huruf depan
    nama = nama.trim();
    nama = nama.charAt(0).toUpperCase() + nama.slice(1).toLowerCase();

    try {
      await query('INSERT INTO jenis_laporan_master (nama) VALUES (?)', [nama]);
      
      return NextResponse.json({ 
        message: 'Jenis laporan berhasil ditambahkan', 
        nama 
      });
      
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json(
          { error: 'Jenis laporan sudah ada' },
          { status: 400 }
        );
      }
      throw error;
    }
    
  } catch (error) {
    console.error('Error adding jenis laporan:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

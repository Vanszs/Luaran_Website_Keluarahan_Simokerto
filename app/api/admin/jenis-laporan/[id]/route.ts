import { NextRequest, NextResponse } from 'next/server';
import { query, checkDatabaseConnection } from '../../../../../utils/db';

export const dynamic = 'force-dynamic';

// PUT - Update jenis laporan
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID tidak valid' },
        { status: 400 }
      );
    }

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
      const result = await query(
        'UPDATE jenis_laporan_master SET nama = ? WHERE id = ?',
        [nama, id]
      );

      if ((result as any).affectedRows === 0) {
        return NextResponse.json(
          { error: 'Jenis laporan tidak ditemukan' },
          { status: 404 }
        );
      }

      return NextResponse.json({ 
        message: 'Jenis laporan berhasil diperbarui', 
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
    console.error('Error updating jenis laporan:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus jenis laporan
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID tidak valid' },
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

    // Check if jenis laporan is being used in reports
    const usageCheck = await query(
      'SELECT COUNT(*) as count FROM reports WHERE jenis_laporan = (SELECT nama FROM jenis_laporan_master WHERE id = ?)',
      [id]
    );

    if ((usageCheck as any[])[0].count > 0) {
      return NextResponse.json(
        { error: 'Jenis laporan tidak dapat dihapus karena masih digunakan dalam laporan' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM jenis_laporan_master WHERE id = ?',
      [id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Jenis laporan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Jenis laporan berhasil dihapus' 
    });
    
  } catch (error) {
    console.error('Error deleting jenis laporan:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

export interface MockUser {
  id: string;
  nama: string;
  nik: string;
  email: string;
  phone: string;
  rt: string;
  rw: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface MockTemplate {
  id: string;
  kategori: string;
  name: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'USR001',
    nama: 'Ahmad',
    nik: '3578123456789001',
    email: 'ahmad@example.com',
    phone: '081234567890',
    rt: '05',
    rw: '02',
    status: 'Aktif',
  },
  {
    id: 'USR002',
    nama: 'Budi',
    nik: '3578123456789002',
    email: 'budi@example.com',
    phone: '081234567891',
    rt: '03',
    rw: '01',
    status: 'Aktif',
  },
  {
    id: 'USR003',
    nama: 'Citra',
    nik: '3578123456789003',
    email: 'citra@example.com',
    phone: '081234567892',
    rt: '04',
    rw: '03',
    status: 'Nonaktif',
  },
  {
    id: 'USR004',
    nama: 'Dewi',
    nik: '3578123456789004',
    email: 'dewi@example.com',
    phone: '081234567893',
    rt: '06',
    rw: '02',
    status: 'Aktif',
  },
];

export const mockTemplates: MockTemplate[] = [
  { id: 'TMP001', kategori: 'Domisili', name: 'domisili.docx' },
  { id: 'TMP002', kategori: 'Usaha', name: 'usaha.docx' },
  { id: 'TMP003', kategori: 'Kelahiran', name: 'kelahiran.docx' },
  { id: 'TMP004', kategori: 'Kematian', name: 'kematian.docx' },
  { id: 'TMP005', kategori: 'Nikah', name: 'nikah.docx' },
  { id: 'TMP006', kategori: 'Cerai', name: 'cerai.docx' },
];

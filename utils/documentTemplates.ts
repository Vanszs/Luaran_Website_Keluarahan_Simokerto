export interface DocumentField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'datetime-local' | 'select' | 'number' | 'email' | 'tel';
  required: boolean;
  step?: number; // Add missing step field
  pattern?: string;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  default?: string; // Add default field
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'kependudukan' | 'usaha' | 'sosial' | 'kesehatan';
  estimatedTime: string;
  requirements: string[];
  fields: DocumentField[];
  isPopular?: boolean;
  steps?: string[]; // Add steps field
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'surat-keterangan-domisili',
    title: 'Surat Keterangan Domisili',
    description: 'Surat keterangan tempat tinggal warga untuk keperluan administratif',
    icon: 'HomeWork',
    category: 'kependudukan',
    estimatedTime: '2-3 hari kerja',
    requirements: ['KTP Asli', 'Kartu Keluarga', 'Surat RT/RW'],
    isPopular: true,
    steps: ['Informasi Pribadi', 'Detail Domisili', 'Keperluan', 'Preview'],
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true, step: 0 },
      { name: 'nik', label: 'NIK', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, step: 0 },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true, step: 0 },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, step: 0, options: ['Laki-laki', 'Perempuan'] },
      { name: 'agama', label: 'Agama', type: 'select', required: true, step: 0, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
      { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, step: 0 },
      { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true, step: 1 },
      { name: 'rt', label: 'RT', type: 'text', required: true, step: 1 },
      { name: 'rw', label: 'RW', type: 'text', required: true, step: 1 },
      { name: 'kelurahan', label: 'Kelurahan', type: 'text', required: true, step: 1, default: 'Simokerto' },
      { name: 'kecamatan', label: 'Kecamatan', type: 'text', required: true, step: 1, default: 'Simokerto' },
      { name: 'kota', label: 'Kota', type: 'text', required: true, step: 1, default: 'Surabaya' },
      { name: 'keperluan', label: 'Keperluan', type: 'textarea', required: true, step: 2, placeholder: 'Jelaskan keperluan surat ini...' }
    ]
  },
  {
    id: 'surat-keterangan-usaha',
    title: 'Surat Keterangan Usaha',
    description: 'Surat keterangan untuk kegiatan usaha dan perizinan',
    icon: 'Business',
    category: 'usaha',
    estimatedTime: '3-5 hari kerja',
    requirements: ['KTP Asli', 'Kartu Keluarga', 'Foto Tempat Usaha', 'Surat RT/RW'],
    isPopular: true,
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
      { name: 'nik', label: 'NIK', type: 'text', required: true, pattern: '^[0-9]{16}$' },
      { name: 'alamat_pemilik', label: 'Alamat Pemilik', type: 'textarea', required: true },
      { name: 'nama_usaha', label: 'Nama Usaha', type: 'text', required: true },
      { name: 'jenis_usaha', label: 'Jenis Usaha', type: 'select', required: true, 
        options: ['Warung Kelontong', 'Toko', 'Rumah Makan', 'Jasa', 'Bengkel', 'Salon/Barbershop', 'Lainnya'] },
      { name: 'alamat_usaha', label: 'Alamat Usaha', type: 'textarea', required: true },
      { name: 'modal_usaha', label: 'Modal Usaha (Rp)', type: 'number', required: true, min: 0 },
      { name: 'lama_usaha', label: 'Lama Usaha (tahun)', type: 'number', required: true, min: 0 },
      { name: 'jumlah_karyawan', label: 'Jumlah Karyawan', type: 'number', required: true, min: 0 },
      { name: 'keperluan', label: 'Keperluan', type: 'textarea', required: true }
    ]
  },
  {
    id: 'surat-keterangan-kelahiran',
    title: 'Surat Keterangan Kelahiran',
    description: 'Surat keterangan kelahiran anak untuk akta kelahiran',
    icon: 'ChildCare',
    category: 'kependudukan',
    estimatedTime: '1-2 hari kerja',
    requirements: ['KTP Orang Tua', 'Kartu Keluarga', 'Surat Keterangan Lahir dari Bidan/RS', 'Buku Nikah'],
    fields: [
      { name: 'nama_anak', label: 'Nama Anak', type: 'text', required: true },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, options: ['Laki-laki', 'Perempuan'] },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true },
      { name: 'tanggal_lahir', label: 'Tanggal dan Waktu Lahir', type: 'datetime-local', required: true },
      { name: 'berat_badan', label: 'Berat Badan (gram)', type: 'number', required: true, min: 0 },
      { name: 'panjang_badan', label: 'Panjang Badan (cm)', type: 'number', required: true, min: 0 },
      { name: 'nama_ayah', label: 'Nama Ayah', type: 'text', required: true },
      { name: 'nik_ayah', label: 'NIK Ayah', type: 'text', required: true, pattern: '^[0-9]{16}$' },
      { name: 'nama_ibu', label: 'Nama Ibu', type: 'text', required: true },
      { name: 'nik_ibu', label: 'NIK Ibu', type: 'text', required: true, pattern: '^[0-9]{16}$' },
      { name: 'alamat_orang_tua', label: 'Alamat Orang Tua', type: 'textarea', required: true },
      { name: 'penolong_kelahiran', label: 'Penolong Kelahiran', type: 'select', required: true, 
        options: ['Dokter', 'Bidan', 'Dukun', 'Lainnya'] }
    ]
  },
  {
    id: 'surat-keterangan-kematian',
    title: 'Surat Keterangan Kematian',
    description: 'Surat keterangan kematian warga untuk pengurusan akta kematian',
    icon: 'LocalHospital',
    category: 'kependudukan',
    estimatedTime: '1-2 hari kerja',
    requirements: ['KTP Almarhum', 'Kartu Keluarga', 'Surat Keterangan Dokter', 'KTP Pelapor'],
    fields: [
      { name: 'nama_almarhum', label: 'Nama Almarhum', type: 'text', required: true },
      { name: 'nik_almarhum', label: 'NIK Almarhum', type: 'text', required: true, pattern: '^[0-9]{16}$' },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, options: ['Laki-laki', 'Perempuan'] },
      { name: 'umur', label: 'Umur', type: 'number', required: true, min: 0 },
      { name: 'agama', label: 'Agama', type: 'select', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
      { name: 'alamat_almarhum', label: 'Alamat Almarhum', type: 'textarea', required: true },
      { name: 'tanggal_kematian', label: 'Tanggal dan Waktu Kematian', type: 'datetime-local', required: true },
      { name: 'tempat_kematian', label: 'Tempat Kematian', type: 'text', required: true },
      { name: 'sebab_kematian', label: 'Sebab Kematian', type: 'text', required: true },
      { name: 'nama_pelapor', label: 'Nama Pelapor', type: 'text', required: true },
      { name: 'nik_pelapor', label: 'NIK Pelapor', type: 'text', required: true, pattern: '^[0-9]{16}$' },
      { name: 'hubungan_pelapor', label: 'Hubungan dengan Almarhum', type: 'select', required: true,
        options: ['Anak', 'Suami/Istri', 'Orang Tua', 'Saudara', 'Keponakan', 'Lainnya'] }
    ]
  },
  {
    id: 'surat-keterangan-tidak-mampu',
    title: 'Surat Keterangan Tidak Mampu',
    description: 'Surat keterangan kondisi ekonomi tidak mampu untuk bantuan sosial',
    icon: 'VolunteerActivism',
    category: 'sosial',
    estimatedTime: '2-3 hari kerja',
    requirements: ['KTP Asli', 'Kartu Keluarga', 'Surat RT/RW', 'Foto Rumah', 'Slip Gaji (jika ada)'],
    isPopular: true,
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
      { name: 'nik', label: 'NIK', type: 'text', required: true, pattern: '^[0-9]{16}$' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true },
      { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true },
      { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true },
      { name: 'penghasilan', label: 'Penghasilan per Bulan (Rp)', type: 'number', required: true, min: 0 },
      { name: 'jumlah_tanggungan', label: 'Jumlah Tanggungan Keluarga', type: 'number', required: true, min: 0 },
      { name: 'kondisi_rumah', label: 'Kondisi Rumah', type: 'select', required: true,
        options: ['Milik Sendiri (Sederhana)', 'Kontrak', 'Menumpang', 'Rumah Orang Tua', 'Lainnya'] },
      { name: 'keperluan_surat', label: 'Keperluan Surat', type: 'textarea', required: true },
      { name: 'keterangan_tambahan', label: 'Keterangan Tambahan', type: 'textarea' }
    ]
  },
  {
    id: 'surat-pengantar-skck',
    title: 'Surat Pengantar SKCK',
    description: 'Surat pengantar untuk pengurusan SKCK di kepolisian',
    icon: 'Security',
    category: 'kependudukan',
    estimatedTime: '1 hari kerja',
    requirements: ['KTP Asli', 'Kartu Keluarga', 'Pas Foto 4x6'],
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
      { name: 'nik', label: 'NIK', type: 'text', required: true, pattern: '^[0-9]{16}$' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, options: ['Laki-laki', 'Perempuan'] },
      { name: 'agama', label: 'Agama', type: 'select', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
      { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true },
      { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true },
      { name: 'keperluan', label: 'Keperluan SKCK', type: 'select', required: true,
        options: ['Melamar Pekerjaan', 'Visa', 'Melanjutkan Sekolah', 'Pencalonan', 'Lainnya'] },
      { name: 'keterangan_keperluan', label: 'Keterangan Keperluan', type: 'textarea' }
    ]
  }
];

export const getTemplateById = (id: string): DocumentTemplate | undefined => {
  return documentTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): DocumentTemplate[] => {
  if (category === 'semua') return documentTemplates;
  return documentTemplates.filter(template => template.category === category);
};

export const getPopularTemplates = (): DocumentTemplate[] => {
  return documentTemplates.filter(template => template.isPopular);
};

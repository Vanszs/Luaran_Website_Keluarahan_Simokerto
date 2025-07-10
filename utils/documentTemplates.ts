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
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true, step: 0, placeholder: 'Masukkan nama lengkap' },
      { name: 'nik', label: 'NIK', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$', placeholder: '16 digit NIK' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, step: 0, placeholder: 'Masukkan tempat lahir' },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true, step: 0, placeholder: 'Pilih tanggal lahir' },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, step: 0, options: ['Laki-laki', 'Perempuan'], placeholder: 'Pilih jenis kelamin' },
      { name: 'agama', label: 'Agama', type: 'select', required: true, step: 0, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'], placeholder: 'Pilih agama' },
      { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, step: 0, placeholder: 'Masukkan pekerjaan' },
      { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true, step: 1, placeholder: 'Masukkan alamat lengkap' },
      { name: 'rt', label: 'RT', type: 'text', required: true, step: 1, placeholder: 'RT' },
      { name: 'rw', label: 'RW', type: 'text', required: true, step: 1, placeholder: 'RW' },
      { name: 'kelurahan', label: 'Kelurahan', type: 'text', required: true, step: 1, default: 'Simokerto', placeholder: 'Kelurahan' },
      { name: 'kecamatan', label: 'Kecamatan', type: 'text', required: true, step: 1, default: 'Simokerto', placeholder: 'Kecamatan' },
      { name: 'kota', label: 'Kota', type: 'text', required: true, step: 1, default: 'Surabaya', placeholder: 'Kota' },
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
    steps: ['Data Pemilik', 'Detail Usaha', 'Keperluan', 'Preview'],
    fields: [
      { name: 'nama', label: 'Nama Lengkap Pemilik', type: 'text', required: true, step: 0, placeholder: 'Masukkan nama pemilik' },
      { name: 'nik', label: 'NIK', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$', placeholder: '16 digit NIK' },
      { name: 'alamat_pemilik', label: 'Alamat Pemilik', type: 'textarea', required: true, step: 0, placeholder: 'Masukkan alamat pemilik' },
      { name: 'nama_usaha', label: 'Nama Usaha', type: 'text', required: true, step: 1, placeholder: 'Masukkan nama usaha' },
      { name: 'jenis_usaha', label: 'Jenis Usaha', type: 'select', required: true, step: 1, options: ['Warung Kelontong', 'Toko', 'Rumah Makan', 'Jasa', 'Bengkel', 'Salon/Barbershop', 'Lainnya'], placeholder: 'Pilih jenis usaha' },
      { name: 'alamat_usaha', label: 'Alamat Usaha', type: 'textarea', required: true, step: 1, placeholder: 'Masukkan alamat usaha' },
      { name: 'modal_usaha', label: 'Modal Usaha (Rp)', type: 'number', required: true, step: 1, min: 0, placeholder: 'Modal usaha' },
      { name: 'lama_usaha', label: 'Lama Usaha (tahun)', type: 'number', required: true, step: 1, min: 0, placeholder: 'Lama usaha' },
      { name: 'jumlah_karyawan', label: 'Jumlah Karyawan', type: 'number', required: true, step: 1, min: 0, placeholder: 'Jumlah karyawan' },
      { name: 'keperluan', label: 'Keperluan', type: 'textarea', required: true, step: 2, placeholder: 'Jelaskan keperluan surat ini...' }
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
    steps: ['Data Anak', 'Data Orang Tua', 'Keterangan Lahir', 'Preview'],
    fields: [
      { name: 'nama_anak', label: 'Nama Anak', type: 'text', required: true, step: 0, placeholder: 'Masukkan nama anak' },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, step: 0, options: ['Laki-laki', 'Perempuan'], placeholder: 'Pilih jenis kelamin' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, step: 0, placeholder: 'Masukkan tempat lahir' },
      { name: 'tanggal_lahir', label: 'Tanggal dan Waktu Lahir', type: 'datetime-local', required: true, step: 0, placeholder: 'Pilih tanggal dan waktu lahir' },
      { name: 'berat_badan', label: 'Berat Badan (gram)', type: 'number', required: true, step: 0, min: 0, placeholder: 'Berat badan' },
      { name: 'panjang_badan', label: 'Panjang Badan (cm)', type: 'number', required: true, step: 0, min: 0, placeholder: 'Panjang badan' },
      { name: 'nama_ayah', label: 'Nama Ayah', type: 'text', required: true, step: 1, placeholder: 'Masukkan nama ayah' },
      { name: 'nik_ayah', label: 'NIK Ayah', type: 'text', required: true, step: 1, pattern: '^[0-9]{16}$', placeholder: '16 digit NIK ayah' },
      { name: 'nama_ibu', label: 'Nama Ibu', type: 'text', required: true, step: 1, placeholder: 'Masukkan nama ibu' },
      { name: 'nik_ibu', label: 'NIK Ibu', type: 'text', required: true, step: 1, pattern: '^[0-9]{16}$', placeholder: '16 digit NIK ibu' },
      { name: 'alamat_orang_tua', label: 'Alamat Orang Tua', type: 'textarea', required: true, step: 1, placeholder: 'Masukkan alamat orang tua' },
      { name: 'penolong_kelahiran', label: 'Penolong Kelahiran', type: 'select', required: true, step: 2, options: ['Dokter', 'Bidan', 'Dukun', 'Lainnya'], placeholder: 'Pilih penolong kelahiran' }
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
    steps: ['Data Almarhum', 'Keterangan Kematian', 'Data Pelapor', 'Preview'],
    fields: [
      { name: 'nama_almarhum', label: 'Nama Almarhum', type: 'text', required: true, step: 0, placeholder: 'Masukkan nama almarhum' },
      { name: 'nik_almarhum', label: 'NIK Almarhum', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$', placeholder: '16 digit NIK almarhum' },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, step: 0, options: ['Laki-laki', 'Perempuan'], placeholder: 'Pilih jenis kelamin' },
      { name: 'umur', label: 'Umur', type: 'number', required: true, step: 0, min: 0, placeholder: 'Umur' },
      { name: 'agama', label: 'Agama', type: 'select', required: true, step: 0, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'], placeholder: 'Pilih agama' },
      { name: 'alamat_almarhum', label: 'Alamat Almarhum', type: 'textarea', required: true, step: 0, placeholder: 'Masukkan alamat almarhum' },
      { name: 'tanggal_kematian', label: 'Tanggal dan Waktu Kematian', type: 'datetime-local', required: true, step: 1, placeholder: 'Pilih tanggal dan waktu kematian' },
      { name: 'tempat_kematian', label: 'Tempat Kematian', type: 'text', required: true, step: 1, placeholder: 'Tempat kematian' },
      { name: 'sebab_kematian', label: 'Sebab Kematian', type: 'text', required: true, step: 1, placeholder: 'Sebab kematian' },
      { name: 'nama_pelapor', label: 'Nama Pelapor', type: 'text', required: true, step: 2, placeholder: 'Nama pelapor' },
      { name: 'nik_pelapor', label: 'NIK Pelapor', type: 'text', required: true, step: 2, pattern: '^[0-9]{16}$', placeholder: '16 digit NIK pelapor' },
      { name: 'hubungan_pelapor', label: 'Hubungan dengan Almarhum', type: 'select', required: true, step: 2, options: ['Anak', 'Suami/Istri', 'Orang Tua', 'Saudara', 'Keponakan', 'Lainnya'], placeholder: 'Pilih hubungan' }
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
    steps: ['Data Diri', 'Kondisi Ekonomi', 'Keperluan', 'Preview'],
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true, step: 0, placeholder: 'Masukkan nama lengkap' },
      { name: 'nik', label: 'NIK', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$', placeholder: '16 digit NIK' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, step: 0, placeholder: 'Masukkan tempat lahir' },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true, step: 0, placeholder: 'Pilih tanggal lahir' },
      { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true, step: 0, placeholder: 'Masukkan alamat lengkap' },
      { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, step: 1, placeholder: 'Masukkan pekerjaan' },
      { name: 'penghasilan', label: 'Penghasilan per Bulan (Rp)', type: 'number', required: true, step: 1, min: 0, placeholder: 'Penghasilan per bulan' },
      { name: 'jumlah_tanggungan', label: 'Jumlah Tanggungan Keluarga', type: 'number', required: true, step: 1, min: 0, placeholder: 'Jumlah tanggungan' },
      { name: 'kondisi_rumah', label: 'Kondisi Rumah', type: 'select', required: true, step: 1, options: ['Milik Sendiri (Sederhana)', 'Kontrak', 'Menumpang', 'Rumah Orang Tua', 'Lainnya'], placeholder: 'Pilih kondisi rumah' },
      { name: 'keperluan_surat', label: 'Keperluan Surat', type: 'textarea', required: true, step: 2, placeholder: 'Jelaskan keperluan surat ini...' },
      { name: 'keterangan_tambahan', label: 'Keterangan Tambahan', type: 'textarea', required: false, step: 2, placeholder: 'Keterangan tambahan (opsional)' }
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
    steps: ['Data Diri', 'Keperluan', 'Preview'],
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true, step: 0, placeholder: 'Masukkan nama lengkap' },
      { name: 'nik', label: 'NIK', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$', placeholder: '16 digit NIK' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, step: 0, placeholder: 'Masukkan tempat lahir' },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true, step: 0, placeholder: 'Pilih tanggal lahir' },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, step: 0, options: ['Laki-laki', 'Perempuan'], placeholder: 'Pilih jenis kelamin' },
      { name: 'agama', label: 'Agama', type: 'select', required: true, step: 0, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'], placeholder: 'Pilih agama' },
      { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, step: 0, placeholder: 'Masukkan pekerjaan' },
      { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true, step: 0, placeholder: 'Masukkan alamat lengkap' },
      { name: 'keperluan', label: 'Keperluan SKCK', type: 'select', required: true, step: 1, options: ['Melamar Pekerjaan', 'Visa', 'Melanjutkan Sekolah', 'Pencalonan', 'Lainnya'], placeholder: 'Pilih keperluan' },
      { name: 'keterangan_keperluan', label: 'Keterangan Keperluan', type: 'textarea', required: false, step: 1, placeholder: 'Keterangan tambahan (opsional)' }
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

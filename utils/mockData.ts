export interface MockDocument {
  id: string;
  templateId: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  submittedAt: string;
  processedAt?: string;
  submittedBy: string;
  data: Record<string, any>;
  notes?: string;
  documentNumber?: string;
}

export interface MockNotification {
  id: string;
  type: 'approval' | 'rejection' | 'processing' | 'reminder' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  documentId?: string;
}

export const mockDocuments: MockDocument[] = [
  {
    id: 'DOC001',
    templateId: 'surat-keterangan-domisili',
    title: 'Surat Keterangan Domisili - Budi Santoso',
    status: 'approved',
    submittedAt: '2024-06-25T10:30:00Z',
    processedAt: '2024-06-26T14:20:00Z',
    submittedBy: 'Budi Santoso',
    documentNumber: 'DOM/001/VI/2024',
    data: { 
      nama: 'Budi Santoso', 
      nik: '3578123456789012', 
      alamat: 'Jl. Simokerto No. 123, RT 05 RW 02',
      keperluan: 'Pendaftaran sekolah anak'
    },
    notes: 'Dokumen telah diverifikasi dan disetujui. Dapat diambil di kantor kelurahan.'
  },
  {
    id: 'DOC002',
    templateId: 'surat-keterangan-usaha',
    title: 'Surat Keterangan Usaha - Siti Aminah',
    status: 'processing',
    submittedAt: '2024-06-28T09:15:00Z',
    submittedBy: 'Siti Aminah',
    data: { 
      nama: 'Siti Aminah', 
      nama_usaha: 'Warung Siti Barokah', 
      jenis_usaha: 'Warung Kelontong',
      modal_usaha: 5000000
    },
    notes: 'Sedang dalam proses verifikasi lokasi usaha'
  },
  {
    id: 'DOC003',
    templateId: 'surat-keterangan-kelahiran',
    title: 'Surat Keterangan Kelahiran - Ahmad Wijaya',
    status: 'rejected',
    submittedAt: '2024-06-20T16:45:00Z',
    processedAt: '2024-06-21T11:30:00Z',
    submittedBy: 'Andi Wijaya',
    data: { 
      nama_anak: 'Ahmad Wijaya', 
      nama_ayah: 'Andi Wijaya',
      nama_ibu: 'Sari Wijaya'
    },
    notes: 'Dokumen pendukung tidak lengkap. Harap melengkapi surat keterangan dari bidan/rumah sakit.'
  },
  {
    id: 'DOC004',
    templateId: 'surat-keterangan-tidak-mampu',
    title: 'Surat Keterangan Tidak Mampu - Maryam',
    status: 'approved',
    submittedAt: '2024-06-15T08:20:00Z',
    processedAt: '2024-06-17T13:45:00Z',
    submittedBy: 'Maryam',
    documentNumber: 'SKTM/012/VI/2024',
    data: {
      nama: 'Maryam',
      pekerjaan: 'Buruh Cuci',
      penghasilan: 800000,
      jumlah_tanggungan: 3
    },
    notes: 'Dokumen disetujui untuk bantuan sosial'
  },
  {
    id: 'DOC005',
    templateId: 'surat-pengantar-skck',
    title: 'Surat Pengantar SKCK - Rahman',
    status: 'approved',
    submittedAt: '2024-06-22T14:10:00Z',
    processedAt: '2024-06-22T16:30:00Z',
    submittedBy: 'Rahman',
    documentNumber: 'SKCK/008/VI/2024',
    data: {
      nama: 'Rahman',
      keperluan: 'Melamar Pekerjaan',
      keterangan_keperluan: 'Melamar sebagai security di bank'
    },
    notes: 'Surat pengantar telah dikeluarkan'
  },
  {
    id: 'DOC006',
    templateId: 'surat-keterangan-kematian',
    title: 'Surat Keterangan Kematian - Pak Joko',
    status: 'processing',
    submittedAt: '2024-06-29T11:25:00Z',
    submittedBy: 'Ani Joko',
    data: {
      nama_almarhum: 'Joko Susanto',
      nama_pelapor: 'Ani Joko',
      hubungan_pelapor: 'Anak',
      sebab_kematian: 'Sakit'
    },
    notes: 'Menunggu verifikasi dokumen dari rumah sakit'
  },
];

export const mockNotifications: MockNotification[] = [
  {
    id: 'NOT001',
    type: 'approval',
    title: 'Dokumen Disetujui',
    message: 'Surat Keterangan Domisili Anda telah disetujui dan dapat diambil di kantor kelurahan',
    timestamp: '2024-06-26T14:20:00Z',
    read: false,
    documentId: 'DOC001'
  },
  {
    id: 'NOT002',
    type: 'processing',
    title: 'Dokumen Dalam Proses',
    message: 'Surat Keterangan Usaha Anda sedang dalam tahap verifikasi',
    timestamp: '2024-06-28T10:00:00Z',
    read: false,
    documentId: 'DOC002'
  },
  {
    id: 'NOT003',
    type: 'rejection',
    title: 'Dokumen Ditolak',
    message: 'Surat Keterangan Kelahiran ditolak karena dokumen tidak lengkap',
    timestamp: '2024-06-21T11:30:00Z',
    read: true,
    documentId: 'DOC003'
  },
  {
    id: 'NOT004',
    type: 'reminder',
    title: 'Pengingat Pengambilan',
    message: 'Dokumen SKTM Anda sudah dapat diambil sejak 3 hari yang lalu',
    timestamp: '2024-06-20T09:00:00Z',
    read: true
  },
  {
    id: 'NOT005',
    type: 'info',
    title: 'Jam Pelayanan Diperpanjang',
    message: 'Jam pelayanan kelurahan diperpanjang hingga pukul 16:00 mulai hari ini',
    timestamp: '2024-06-18T08:00:00Z',
    read: true
  }
];

// Helper functions
export const getDocumentsByStatus = (status: string) => {
  if (status === 'semua') return mockDocuments;
  return mockDocuments.filter(doc => doc.status === status);
};

export const getDocumentsByDateRange = (startDate: string, endDate: string) => {
  return mockDocuments.filter(doc => {
    const docDate = new Date(doc.submittedAt);
    return docDate >= new Date(startDate) && docDate <= new Date(endDate);
  });
};

export const searchDocuments = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(lowercaseQuery) ||
    doc.id.toLowerCase().includes(lowercaseQuery) ||
    doc.submittedBy.toLowerCase().includes(lowercaseQuery)
  );
};

export const getUnreadNotificationsCount = () => {
  return mockNotifications.filter(notification => !notification.read).length;
};
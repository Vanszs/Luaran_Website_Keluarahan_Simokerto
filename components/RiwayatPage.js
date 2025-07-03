'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  TrendingUp as TrendingUpIcon,
  Cancel as CancelIcon,
  FamilyRestroom as FamilyRestroomIcon,
  HomeWork as HomeWorkIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const documents = [
  {
    id: 1,
    type: 'SKTM',
    fullType: 'Surat Keterangan Tidak Mampu',
    documentNumber: 'SKTM/001/2024',
    date: '2024-01-15',
    status: 'selesai',
    description: 'Keperluan bantuan sosial',
    icon: <FamilyRestroomIcon />,
    processType: 'online'
  },
  {
    id: 2,
    type: 'Domisili',
    fullType: 'Surat Keterangan Domisili',
    documentNumber: 'DOM/045/2024',
    date: '2024-01-20',
    status: 'diproses',
    description: 'Keperluan pendaftaran sekolah',
    icon: <HomeWorkIcon />,
    processType: 'offline'
  },
  {
    id: 3,
    type: 'SKU',
    fullType: 'Surat Keterangan Usaha',
    documentNumber: 'SKU/023/2024',
    date: '2024-01-18',
    status: 'menunggu',
    description: 'Keperluan pengajuan kredit',
    icon: <BusinessIcon />,
    processType: 'online'
  },
  {
    id: 4,
    type: 'SKCK',
    fullType: 'Surat Keterangan Catatan Kepolisian',
    documentNumber: 'SKCK/012/2024',
    date: '2024-01-10',
    status: 'selesai',
    description: 'Keperluan melamar kerja',
    icon: <WorkIcon />,
    processType: 'offline'
  },
  {
    id: 5,
    type: 'SKS',
    fullType: 'Surat Keterangan Sekolah',
    documentNumber: 'SKS/067/2024',
    date: '2024-01-25',
    status: 'ditolak',
    description: 'Data tidak lengkap',
    icon: <SchoolIcon />,
    processType: 'online',
    rejectionReason: 'Dokumen KTP tidak jelas, foto rumah tidak sesuai alamat, dan surat RT/RW belum ada cap resmi'
  },
  {
    id: 6,
    type: 'SKTM',
    fullType: 'Surat Keterangan Tidak Mampu',
    documentNumber: 'SKTM/002/2024',
    date: '2024-01-12',
    status: 'selesai',
    description: 'Keperluan beasiswa anak',
    icon: <FamilyRestroomIcon />,
    processType: 'online'
  },
  {
    id: 7,
    type: 'Domisili',
    fullType: 'Surat Keterangan Domisili',
    documentNumber: 'DOM/046/2024',
    date: '2024-01-22',
    status: 'ditolak',
    description: 'Keperluan buka rekening bank',
    icon: <HomeWorkIcon />,
    processType: 'offline',
    rejectionReason: 'Alamat tidak sesuai dengan KTP, perlu surat keterangan pindah dari kelurahan asal'
  },
  {
    id: 8,
    type: 'SKU',
    fullType: 'Surat Keterangan Usaha',
    documentNumber: 'SKU/024/2024',
    date: '2024-01-28',
    status: 'menunggu',
    description: 'Keperluan perizinan warung',
    icon: <BusinessIcon />,
    processType: 'offline'
  },
  {
    id: 9,
    type: 'SKCK',
    fullType: 'Surat Keterangan Catatan Kepolisian',
    documentNumber: 'SKCK/013/2024',
    date: '2024-02-01',
    status: 'diproses',
    description: 'Keperluan magang',
    icon: <WorkIcon />,
    processType: 'offline'
  },
  {
    id: 10,
    type: 'SKTM',
    fullType: 'Surat Keterangan Tidak Mampu',
    documentNumber: 'SKTM/003/2024',
    date: '2024-02-02',
    status: 'menunggu',
    description: 'Pengajuan bantuan pendidikan',
    icon: <FamilyRestroomIcon />,
    processType: 'online'
  },
  {
    id: 11,
    type: 'SKU',
    fullType: 'Surat Keterangan Usaha',
    documentNumber: 'SKU/025/2024',
    date: '2024-02-03',
    status: 'selesai',
    description: 'Perpanjangan izin usaha',
    icon: <BusinessIcon />,
    processType: 'offline'
  },
  {
    id: 12,
    type: 'SKS',
    fullType: 'Surat Keterangan Sekolah',
    documentNumber: 'SKS/068/2024',
    date: '2024-02-04',
    status: 'diproses',
    description: 'Pindah sekolah',
    icon: <SchoolIcon />,
    processType: 'online'
  }
];

const getStatusConfig = (status, theme) => {
  const configs = {
    selesai: {
      color: 'success',
      icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
      backgroundColor: theme.palette.mode === 'dark' ? '#065f46' : '#d1fae5',
      textColor: theme.palette.mode === 'dark' ? '#34d399' : '#065f46',
      borderColor: theme.palette.mode === 'dark' ? '#34d399' : '#059669',
    },
    menunggu: {
      color: 'warning',
      icon: <PendingIcon sx={{ fontSize: 14 }} />,
      backgroundColor: theme.palette.mode === 'dark' ? '#92400e' : '#fef3c7',
      textColor: theme.palette.mode === 'dark' ? '#fbbf24' : '#92400e',
      borderColor: theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706',
    },
    diproses: {
      color: 'info',
      icon: <TrendingUpIcon sx={{ fontSize: 14 }} />,
      backgroundColor: theme.palette.mode === 'dark' ? '#0e7490' : '#dbeafe',
      textColor: theme.palette.mode === 'dark' ? '#22d3ee' : '#0e7490',
      borderColor: theme.palette.mode === 'dark' ? '#22d3ee' : '#0891b2',
    },
    ditolak: {
      color: 'error',
      icon: <CancelIcon sx={{ fontSize: 14 }} />,
      backgroundColor: theme.palette.mode === 'dark' ? '#991b1b' : '#fee2e2',
      textColor: theme.palette.mode === 'dark' ? '#f87171' : '#991b1b',
      borderColor: theme.palette.mode === 'dark' ? '#f87171' : '#dc2626',
    },
  };
  
  return configs[status] || configs.menunggu;
};

export default function RiwayatPage() {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Riwayat Pengajuan
      </Typography>
      
      <Paper 
        sx={{ 
          p: 2, 
          borderRadius: 2,
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.paper, 0.9),
        }}
      >
        {/* Document list implementation */}
        <Typography variant="body2" color="text.secondary">
          Riwayat pengajuan dokumen akan ditampilkan di sini.
        </Typography>
      </Paper>
    </Box>
  );
}

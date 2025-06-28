'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const DocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 41, 59, 0.5)' 
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'transparent',
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
    '&::before': {
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  },
}));

const HeaderCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)'
    : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  color: 'white',
  borderRadius: '24px',
  border: 'none',
  marginBottom: theme.spacing(4),
}));

const documentTypes = [
  {
    title: 'SKTM',
    fullTitle: 'Surat Keterangan Tidak Mampu',
    description: 'Untuk keperluan bantuan sosial, beasiswa, atau kebutuhan lainnya',
    color: '#3b82f6',
    estimatedTime: '2-3 hari',
    difficulty: 'Mudah',
    icon: <PersonIcon />,
  },
  {
    title: 'Domisili',
    fullTitle: 'Surat Keterangan Domisili',
    description: 'Untuk keperluan administrasi tempat tinggal',
    color: '#10b981',
    estimatedTime: '1-2 hari',
    difficulty: 'Mudah',
    icon: <PersonIcon />,
  },
  {
    title: 'SKU',
    fullTitle: 'Surat Keterangan Usaha',
    description: 'Untuk keperluan izin usaha atau SIUP',
    color: '#f59e0b',
    estimatedTime: '3-5 hari',
    difficulty: 'Sedang',
    icon: <ArticleIcon />,
  },
  {
    title: 'Pengantar',
    fullTitle: 'Surat Pengantar',
    description: 'Untuk keperluan administrasi ke instansi lain',
    color: '#8b5cf6',
    estimatedTime: '1-2 hari',
    difficulty: 'Mudah',
    icon: <ArticleIcon />,
  },
  {
    title: 'Kelahiran',
    fullTitle: 'Surat Keterangan Kelahiran',
    description: 'Untuk keperluan pembuatan akta kelahiran',
    color: '#06b6d4',
    estimatedTime: '2-3 hari',
    difficulty: 'Sedang',
    icon: <PersonIcon />,
  },
  {
    title: 'Kematian',
    fullTitle: 'Surat Keterangan Kematian',
    description: 'Untuk keperluan pembuatan akta kematian',
    color: '#64748b',
    estimatedTime: '2-3 hari',
    difficulty: 'Sedang',
    icon: <PersonIcon />,
  },
  {
    title: 'Pindah',
    fullTitle: 'Surat Keterangan Pindah',
    description: 'Untuk keperluan mutasi alamat',
    color: '#dc2626',
    estimatedTime: '3-4 hari',
    difficulty: 'Sedang',
    icon: <PersonIcon />,
  },
  {
    title: 'Belum Menikah',
    fullTitle: 'Surat Keterangan Belum Menikah',
    description: 'Untuk keperluan administrasi pernikahan',
    color: '#ec4899',
    estimatedTime: '2-3 hari',
    difficulty: 'Mudah',
    icon: <PersonIcon />,
  },
  {
    title: 'Janda/Duda',
    fullTitle: 'Surat Keterangan Janda/Duda',
    description: 'Untuk keperluan administrasi status perkawinan',
    color: '#f97316',
    estimatedTime: '2-3 hari',
    difficulty: 'Mudah',
    icon: <PersonIcon />,
  },
  {
    title: 'Ahli Waris',
    fullTitle: 'Surat Keterangan Ahli Waris',
    description: 'Untuk keperluan warisan dan administrasi hukum',
    color: '#84cc16',
    estimatedTime: '5-7 hari',
    difficulty: 'Sulit',
    icon: <ArticleIcon />,
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Mudah': return 'success';
    case 'Sedang': return 'warning';
    case 'Sulit': return 'error';
    default: return 'default';
  }
};

export default function DocumentSelection({ onDocumentSelect }) {
  return (
    <Box sx={{ py: 1 }}>
      {/* Header */}
      <HeaderCard>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Pilih Jenis Surat
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Pilih jenis surat yang ingin Anda ajukan. Setiap surat memiliki persyaratan dan waktu proses yang berbeda.
          </Typography>
        </CardContent>
      </HeaderCard>
      
      <Grid container spacing={3}>
        {documentTypes.map((doc, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <DocumentCard onClick={() => onDocumentSelect(doc.fullTitle)}>
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                  <IconButton
                    sx={{
                      width: 64,
                      height: 64,
                      backgroundColor: `${doc.color}15`,
                      color: doc.color,
                      '&:hover': {
                        backgroundColor: `${doc.color}25`,
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    }}
                  >
                    {doc.icon}
                  </IconButton>
                  <Chip
                    label={doc.difficulty}
                    color={getDifficultyColor(doc.difficulty)}
                    size="small"
                    variant="filled"
                  />
                </Stack>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: doc.color }}>
                    {doc.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, lineHeight: 1.3 }}>
                    {doc.fullTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {doc.description}
                  </Typography>
                </Box>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {doc.estimatedTime}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </DocumentCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

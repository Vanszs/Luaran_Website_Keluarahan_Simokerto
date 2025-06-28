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
import Avatar from '@mui/material/Avatar';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';

const DocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.2)'
    : '0 4px 20px rgba(148, 163, 184, 0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'transparent',
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 40px rgba(0, 0, 0, 0.3)'
      : '0 12px 40px rgba(148, 163, 184, 0.15)',
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
  borderRadius: '20px',
  border: 'none',
  marginBottom: theme.spacing(4),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(59, 130, 246, 0.3)'
    : '0 8px 32px rgba(59, 130, 246, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(50%, -50%)',
  },
}));

const documentTypes = [
  {
    title: 'SKTM',
    fullTitle: 'Surat Keterangan Tidak Mampu',
    description: 'Untuk keperluan bantuan sosial, beasiswa, atau kebutuhan lainnya',
    estimatedTime: '2-3 hari',
    difficulty: 'Mudah',
    icon: <PersonIcon />,
  },
  {
    title: 'Domisili',
    fullTitle: 'Surat Keterangan Domisili',
    description: 'Untuk keperluan administrasi tempat tinggal',
    estimatedTime: '1-2 hari',
    difficulty: 'Mudah',
    icon: <PersonIcon />,
  },
  {
    title: 'SKU',
    fullTitle: 'Surat Keterangan Usaha',
    description: 'Untuk keperluan izin usaha atau SIUP',
    estimatedTime: '3-5 hari',
    difficulty: 'Sedang',
    icon: <ArticleIcon />,
  },
  {
    title: 'Pengantar',
    fullTitle: 'Surat Pengantar',
    description: 'Untuk keperluan administrasi ke instansi lain',
    estimatedTime: '1-2 hari',
    difficulty: 'Mudah',
    icon: <ArticleIcon />,
  },
  {
    title: 'Kelahiran',
    fullTitle: 'Surat Keterangan Kelahiran',
    description: 'Untuk keperluan pembuatan akta kelahiran',
    estimatedTime: '2-3 hari',
    difficulty: 'Sedang',
    icon: <PersonIcon />,
  },
  {
    title: 'Kematian',
    fullTitle: 'Surat Keterangan Kematian',
    description: 'Untuk keperluan pembuatan akta kematian',
    estimatedTime: '2-3 hari',
    difficulty: 'Sedang',
    icon: <PersonIcon />,
  },
  {
    title: 'Pindah',
    fullTitle: 'Surat Keterangan Pindah',
    description: 'Untuk keperluan mutasi alamat',
    estimatedTime: '3-4 hari',
    difficulty: 'Sedang',
    icon: <PersonIcon />,
  },
  {
    title: 'Belum Menikah',
    fullTitle: 'Surat Keterangan Belum Menikah',
    description: 'Untuk keperluan administrasi pernikahan',
    estimatedTime: '2-3 hari',
    difficulty: 'Mudah',
    icon: <PersonIcon />,
  },
  {
    title: 'Janda/Duda',
    fullTitle: 'Surat Keterangan Janda/Duda',
    description: 'Untuk keperluan administrasi status perkawinan',
    estimatedTime: '2-3 hari',
    difficulty: 'Mudah',
    icon: <PersonIcon />,
  },
  {
    title: 'Ahli Waris',
    fullTitle: 'Surat Keterangan Ahli Waris',
    description: 'Untuk keperluan warisan dan administrasi hukum',
    estimatedTime: '5-7 hari',
    difficulty: 'Kompleks',
    icon: <ArticleIcon />,
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Mudah': return 'success';
    case 'Sedang': return 'warning';
    case 'Kompleks': return 'error';
    default: return 'default';
  }
};

export default function DocumentSelection({ onDocumentSelect }) {
  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <HeaderCard>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                p: 1.5,
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo Kelurahan Simokerto"
                width={32}
                height={32}
                style={{ borderRadius: '6px' }}
              />
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 1 }}>
                Pilih Jenis Surat
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, color: 'white' }}>
                Pilih jenis surat yang ingin Anda ajukan
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </HeaderCard>
      
      <Grid container spacing={4}>
        {documentTypes.map((doc, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <DocumentCard onClick={() => onDocumentSelect(doc.fullTitle)}>
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #667eea15, #764ba225)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {doc.icon}
                  </Box>
                  <Chip
                    label={doc.difficulty}
                    color={getDifficultyColor(doc.difficulty)}
                    size="small"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
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
                  <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {doc.estimatedTime}
                  </Typography>
                </Stack>
              </CardContent>
            </DocumentCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

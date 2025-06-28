'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Stack,
  useTheme,
  alpha,
  Paper
} from '@mui/material';
import {
  FamilyRestroom,
  HomeWork,
  Business,
  Work,
  LocalHospital,
  AccountBox
} from '@mui/icons-material';
import { styled } from '@mui/system';

const documents = [
  {
    id: 'sktm',
    title: 'SKTM',
    subtitle: 'Surat Keterangan Tidak Mampu',
    description: 'Untuk bantuan sosial dan beasiswa',
    icon: <FamilyRestroom />,
    color: '#10b981'
  },
  {
    id: 'domisili',
    title: 'Domisili',
    subtitle: 'Surat Keterangan Domisili',
    description: 'Untuk keperluan tempat tinggal',
    icon: <HomeWork />,
    color: '#3b82f6'
  },
  {
    id: 'sku',
    title: 'SKU',
    subtitle: 'Surat Keterangan Usaha',
    description: 'Untuk keperluan usaha',
    icon: <Business />,
    color: '#8b5cf6'
  },
  {
    id: 'skck',
    title: 'SKCK',
    subtitle: 'Surat Pengantar SKCK',
    description: 'Untuk kepolisian',
    icon: <Work />,
    color: '#f59e0b'
  },
  {
    id: 'kematian',
    title: 'Kematian',
    subtitle: 'Surat Keterangan Kematian',
    description: 'Untuk keperluan administrasi',
    icon: <LocalHospital />,
    color: '#ef4444'
  },
  {
    id: 'kelahiran',
    title: 'Kelahiran',
    subtitle: 'Surat Keterangan Kelahiran',
    description: 'Untuk keperluan administrasi',
    icon: <AccountBox />,
    color: '#06b6d4'
  }
];

const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 1) 50%, rgba(241, 245, 249, 0.98) 100%)',
  backdropFilter: 'blur(30px)',
  borderRadius: '20px',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? `
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 40%)
      `
      : `
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.04) 0%, transparent 40%)
      `,
    animation: 'float 8s ease-in-out infinite',
    pointerEvents: 'none',
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px) scale(1)' },
      '50%': { transform: 'translateY(-5px) scale(1.02)' },
    }
  },
}));

export default function DocumentSelection({ onDocumentSelect }) {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Header in consistent container */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            mb: 1, 
            color: theme.palette.text.primary,
            fontSize: '1.75rem'
          }}>
            Pilih Jenis Surat
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
            Pilih dokumen yang ingin Anda ajukan
          </Typography>
        </CardContent>
      </SectionContainer>

      {/* Document Grid in consistent container */}
      <SectionContainer elevation={0}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={2}>
            {documents.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.id}>
                <Card
                  onClick={() => onDocumentSelect(doc.subtitle)}
                  sx={{
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(15, 23, 42, 0.6)'
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: doc.color,
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(15, 23, 42, 0.8)'
                        : 'rgba(255, 255, 255, 0.95)',
                      boxShadow: `0 8px 24px ${alpha(doc.color, 0.15)}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      {/* Icon and Title Row */}
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: alpha(doc.color, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: doc.color,
                          }}
                        >
                          {React.cloneElement(doc.icon, { sx: { fontSize: 20 } })}
                        </Box>
                        
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 700, 
                            color: theme.palette.text.primary,
                            fontSize: '1rem',
                            mb: 0.25
                          }}>
                            {doc.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}>
                            {doc.subtitle}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Description */}
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        fontSize: '0.85rem',
                        lineHeight: 1.4,
                        pl: 7
                      }}>
                        {doc.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </SectionContainer>
    </Box>
  );
}

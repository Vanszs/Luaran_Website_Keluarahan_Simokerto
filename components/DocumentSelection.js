'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import {
  HomeWork,
  Business,
  VolunteerActivism,
  Security,
  ChildCare,
  LocalHospital,
  Description,
  AccountBox,
} from '@mui/icons-material';

const documents = [
  {
    id: 1,
    title: 'Surat Keterangan Domisili',
    description: 'Verifikasi tempat tinggal untuk administrasi',
    category: 'kependudukan',
    icon: <HomeWork />,
    estimatedTime: '2-3 hari',
    color: '#2563eb',
    requirements: ['KTP', 'KK', 'Surat RT/RW'],
    categoryLabel: 'Kependudukan'
  },
  {
    id: 2,
    title: 'Surat Keterangan Usaha',
    description: 'Legalisasi kegiatan usaha dan perizinan bisnis',
    category: 'usaha',
    icon: <Business />,
    estimatedTime: '3-5 hari',
    color: '#7c3aed',
    requirements: ['KTP', 'KK', 'Foto Usaha'],
    categoryLabel: 'Usaha'
  },
  {
    id: 3,
    title: 'Surat Keterangan Tidak Mampu',
    description: 'Verifikasi kondisi ekonomi untuk bantuan sosial',
    category: 'sosial',
    icon: <VolunteerActivism />,
    estimatedTime: '2-3 hari',
    color: '#059669',
    requirements: ['KTP', 'KK', 'Foto Rumah'],
    categoryLabel: 'Sosial'
  },
  {
    id: 4,
    title: 'Surat Pengantar SKCK',
    description: 'Pengantar untuk pengurusan SKCK di kepolisian',
    category: 'kependudukan',
    icon: <Security />,
    estimatedTime: '1 hari',
    color: '#dc2626',
    requirements: ['KTP', 'KK', 'Pas Foto'],
    categoryLabel: 'Kependudukan'
  },
  {
    id: 5,
    title: 'Surat Keterangan Kelahiran',
    description: 'Keterangan kelahiran untuk akta kelahiran',
    category: 'kependudukan',
    icon: <ChildCare />,
    estimatedTime: '1-2 hari',
    color: '#d97706',
    requirements: ['KTP Ortu', 'KK', 'Surat RS'],
    categoryLabel: 'Kependudukan'
  },
  {
    id: 6,
    title: 'Surat Keterangan Kematian',
    description: 'Keterangan kematian untuk akta kematian',
    category: 'kependudukan',
    icon: <LocalHospital />,
    estimatedTime: '1-2 hari',
    color: '#0891b2',
    requirements: ['KTP', 'Surat Dokter'],
    categoryLabel: 'Kependudukan'
  },
];

const categories = [
  { id: 'semua', label: 'Semua', icon: <Description />, count: documents.length },
  { id: 'kependudukan', label: 'Kependudukan', icon: <AccountBox />, count: documents.filter(d => d.category === 'kependudukan').length },
  { id: 'usaha', label: 'Usaha', icon: <Business />, count: documents.filter(d => d.category === 'usaha').length },
  { id: 'sosial', label: 'Sosial', icon: <VolunteerActivism />, count: documents.filter(d => d.category === 'sosial').length },
];

export default function DocumentSelection() {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Pilih Dokumen
      </Typography>
      
      <Grid container spacing={2}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme => `0 8px 25px ${alpha(doc.color, 0.3)}`,
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      backgroundColor: alpha(doc.color, 0.1),
                      color: doc.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    {doc.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {doc.title}
                    </Typography>
                    <Chip 
                      label={doc.categoryLabel} 
                      size="small" 
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {doc.description}
                </Typography>
                
                <Typography variant="caption" color="text.secondary">
                  Estimasi: {doc.estimatedTime}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

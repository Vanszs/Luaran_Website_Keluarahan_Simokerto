'use client';

import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions,
  Grid,
  Stack,
  useTheme,
  alpha,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
  Button,
  Fade,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  HomeWork,
  Business,
  VolunteerActivism,
  ChildCare,
  Security,
  LocalHospital,
  Description,
  Search,
  AccessTime,
  AccountBox,
  ArrowForward,
} from '@mui/icons-material';

const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : `linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 20%, rgba(224, 242, 254, 0.9) 40%, rgba(241, 245, 249, 0.95) 60%, rgba(231, 229, 228, 0.9) 80%, rgba(254, 247, 205, 0.95) 100%)`,
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: theme.palette.mode === 'dark'
    ? `2px solid rgba(148, 163, 184, 0.25)`
    : `3px solid rgba(37, 99, 235, 0.15)`,
  boxShadow: theme.palette.mode === 'dark'
    ? `0 20px 64px rgba(0, 0, 0, 0.6), 0 12px 32px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.2)`
    : `0 24px 80px rgba(37, 99, 235, 0.1), 0 16px 48px rgba(16, 185, 129, 0.08), 0 8px 24px rgba(124, 58, 237, 0.06), inset 0 2px 0 rgba(255, 255, 255, 0.9), inset 0 -2px 0 rgba(37, 99, 235, 0.05)`,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
  position: 'relative',
  overflow: 'hidden',
}));

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

const MinimalistDocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  border: theme.palette.mode === 'dark'
    ? `1px solid rgba(148, 163, 184, 0.2)`
    : `1px solid rgba(148, 163, 184, 0.15)`,
  background: theme.palette.mode === 'dark'
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.95)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.2)'
    : '0 2px 8px rgba(0, 0, 0, 0.04)',
  color: theme.palette.text.primary,
  transition: 'all 200ms ease-in-out',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: theme.palette.primary.main,
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(59, 130, 246, 0.2)'
      : '0 4px 16px rgba(37, 99, 235, 0.08)',
  },
}));

export default function DocumentSelection({ onDocumentSelect, onBack }) {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = useMemo(() => {
    let filtered = documents;
    
    if (selectedCategory !== 'semua') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleDocumentClick = (doc) => {
    onDocumentSelect(doc.title);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      p: 2,
      background: theme.palette.mode === 'dark'
        ? 'transparent'
        : 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 25%, #f1f5f9 50%, #e7e5e4 75%, #fef7cd 100%)',
      minHeight: '100vh',
      transition: 'background 300ms ease-in-out !important'
    }}>
      <SectionContainer elevation={0} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700, 
              color: theme.palette.text.primary,
              fontSize: '1.25rem',
              textAlign: 'center',
            }}>
              Layanan Dokumen Digital
            </Typography>
            
            <Typography variant="body2" sx={{ 
              color: theme.palette.text.secondary,
              textAlign: 'center',
              fontSize: '0.875rem',
            }}>
              Pilih dokumen yang ingin Anda ajukan
            </Typography>
          </Stack>
        </CardContent>
      </SectionContainer>

      <SectionContainer elevation={0} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <TextField
            fullWidth
            placeholder="Cari dokumen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 20, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                fontSize: '0.875rem',
                height: 48,
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 0.8)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: theme.palette.mode === 'dark'
                  ? '2px solid rgba(148, 163, 184, 0.3)'
                  : '2px solid rgba(148, 163, 184, 0.2)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                  : '0 4px 16px rgba(37, 99, 235, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                transition: 'all 300ms ease-in-out',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover': {
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(96, 165, 250, 0.5)'
                    : 'rgba(37, 99, 235, 0.4)',
                  transform: 'translateY(-1px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 6px 16px rgba(96, 165, 250, 0.2)'
                    : '0 6px 20px rgba(37, 99, 235, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                },
                '&.Mui-focused': {
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 24px rgba(96, 165, 250, 0.3)'
                    : '0 8px 24px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)',
                },
              },
              '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
                fontSize: '0.875rem',
                fontWeight: 500,
                '&::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 0.7,
                },
              },
            }}
          />
        </CardContent>
      </SectionContainer>

      <SectionContainer elevation={0}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={2}>
            {filteredDocuments.length === 0 ? (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Search sx={{ fontSize: 64, color: 'text.secondary', mb: 3 }} />
                  <Typography variant="h6" color="text.primary" sx={{ mb: 1, fontWeight: 600 }}>
                    Tidak ada dokumen ditemukan
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Coba ubah kata kunci pencarian atau pilih kategori lain
                  </Typography>
                  
                  {onBack && (
                    <Button
                      variant="outlined"
                      onClick={onBack}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        height: 40,
                        px: 3,
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      Kembali ke Dashboard
                    </Button>
                  )}
                </Box>
              </Grid>
            ) : (
              filteredDocuments.map((doc, index) => (
                <Grid item xs={12} sm={6} lg={4} key={doc.id}>
                  <Fade in timeout={200 + index * 50}>
                    <MinimalistDocumentCard onClick={() => handleDocumentClick(doc)}>
                      <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
                        <Stack spacing={2}>
                          <Stack direction="row" spacing={1.5} alignItems="flex-start">
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1.5,
                                background: alpha(doc.color, 0.1),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: doc.color,
                                flexShrink: 0,
                              }}
                            >
                              {React.cloneElement(doc.icon, { sx: { fontSize: 18 } })}
                            </Box>
                            
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                mb: 0.5,
                                lineHeight: 1.3,
                                fontSize: '0.9rem',
                                color: 'text.primary'
                              }}>
                                {doc.title}
                              </Typography>
                              
                              <Chip
                                label={doc.categoryLabel}
                                size="small"
                                sx={{ 
                                  fontSize: '0.65rem',
                                  height: 18,
                                  bgcolor: alpha(doc.color, 0.1),
                                  color: doc.color,
                                  fontWeight: 500,
                                }}
                              />
                            </Box>
                          </Stack>

                          <Typography variant="body2" color="text.secondary" sx={{ 
                            lineHeight: 1.4,
                            fontSize: '0.8rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                            {doc.description}
                          </Typography>

                          <Stack spacing={1.5}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <AccessTime sx={{ fontSize: 12, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary" sx={{ 
                                fontSize: '0.7rem',
                                fontWeight: 500,
                              }}>
                                {doc.estimatedTime}
                              </Typography>
                            </Stack>

                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ 
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                display: 'block',
                                mb: 0.5,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                              }}>
                                Persyaratan
                              </Typography>
                              <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                                {doc.requirements.map((req, idx) => (
                                  <Chip
                                    key={idx}
                                    label={req}
                                    size="small"
                                    sx={{ 
                                      fontSize: '0.6rem',
                                      height: 18,
                                      bgcolor: alpha(theme.palette.text.secondary, 0.1),
                                      color: 'text.secondary',
                                      '& .MuiChip-label': { px: 0.5 },
                                    }}
                                  />
                                ))}
                              </Stack>
                            </Box>
                          </Stack>
                        </Stack>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          fullWidth 
                          variant="outlined" 
                          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                          sx={{ 
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: 500,
                            height: 36,
                            fontSize: '0.8rem',
                          }}
                        >
                          Pilih Dokumen
                        </Button>
                      </CardActions>
                    </MinimalistDocumentCard>
                  </Fade>
                </Grid>
              ))
            )}
          </Grid>
        </CardContent>
      </SectionContainer>
    </Box>
  );
}

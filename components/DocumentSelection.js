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
  Container,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
  Button,
  Fade,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FamilyRestroom,
  HomeWork,
  Business,
  Work,
  LocalHospital,
  AccountBox,
  Search,
  AccessTime,
  Star,
  VolunteerActivism,
  ChildCare,
  ArrowForward,
  Security,
  Description,
  FilterList,
} from '@mui/icons-material';

// CONSISTENT 3D SECTION CONTAINER - MATCH OTHER COMPONENTS
const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : `
        linear-gradient(145deg, 
          rgba(255, 255, 255, 0.98) 0%, 
          rgba(248, 250, 252, 0.95) 20%,
          rgba(224, 242, 254, 0.9) 40%,
          rgba(241, 245, 249, 0.95) 60%,
          rgba(231, 229, 228, 0.9) 80%,
          rgba(254, 247, 205, 0.95) 100%
        )
      `,
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: theme.palette.mode === 'dark'
    ? `2px solid rgba(148, 163, 184, 0.25)`
    : `3px solid rgba(37, 99, 235, 0.15)`,
  boxShadow: theme.palette.mode === 'dark'
    ? `
        0 20px 64px rgba(0, 0, 0, 0.6),
        0 12px 32px rgba(0, 0, 0, 0.4),
        inset 0 2px 0 rgba(255, 255, 255, 0.1),
        inset 0 -2px 0 rgba(0, 0, 0, 0.2)
      `
    : `
        0 24px 80px rgba(37, 99, 235, 0.1),
        0 16px 48px rgba(16, 185, 129, 0.08),
        0 8px 24px rgba(124, 58, 237, 0.06),
        inset 0 2px 0 rgba(255, 255, 255, 0.9),
        inset 0 -2px 0 rgba(37, 99, 235, 0.05)
      `,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
  position: 'relative',
  overflow: 'hidden',
  
  '&:hover': {
    transform: theme.palette.mode === 'dark' 
      ? 'translateY(-3px)' 
      : 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark'
      ? `
          0 28px 80px rgba(0, 0, 0, 0.7),
          0 16px 40px rgba(0, 0, 0, 0.5),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 32px 100px rgba(37, 99, 235, 0.14),
          0 20px 60px rgba(16, 185, 129, 0.1),
          0 12px 32px rgba(124, 58, 237, 0.08),
          inset 0 2px 0 rgba(255, 255, 255, 1),
          inset 0 -2px 0 rgba(37, 99, 235, 0.08)
        `,
  },
  
  // STUNNING 3D EFFECTS - CONSISTENT WITH OTHER COMPONENTS
  ...(theme.palette.mode === 'light' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 75%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.6) 0%, 
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0.1) 100%
        )
      `,
      borderRadius: '24px',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 3,
      left: 3,
      right: 3,
      bottom: 3,
      background: `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.4) 0%, 
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.1) 100%
        )
      `,
      borderRadius: '21px',
      pointerEvents: 'none',
      zIndex: 0,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
}));

// MODERN DOCUMENT CARD - SIMPLIFIED & CONSISTENT
const ModernDocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '18px',
  border: theme.palette.mode === 'dark'
    ? `2px solid rgba(148, 163, 184, 0.25)`
    : `3px solid rgba(37, 99, 235, 0.15)`,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)'
    : `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.98) 0%, 
          rgba(248, 250, 252, 0.95) 50%,
          rgba(224, 242, 254, 0.9) 100%
        )
      `,
  boxShadow: theme.palette.mode === 'dark'
    ? `
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 4px 16px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `
    : `
        0 12px 40px rgba(37, 99, 235, 0.08),
        0 6px 20px rgba(16, 185, 129, 0.05),
        0 3px 10px rgba(124, 58, 237, 0.03),
        inset 0 2px 0 rgba(255, 255, 255, 0.7),
        inset 0 -1px 0 rgba(37, 99, 235, 0.02)
      `,
  color: theme.palette.text.primary,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  
  '&:hover': {
    transform: theme.palette.mode === 'dark' 
      ? 'translateY(-4px) scale(1.02)' 
      : 'translateY(-6px) scale(1.03)',
    borderColor: theme.palette.primary.main,
    boxShadow: theme.palette.mode === 'dark'
      ? `
          0 20px 60px rgba(59, 130, 246, 0.3),
          0 10px 30px rgba(59, 130, 246, 0.2),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `
      : `
          0 24px 80px rgba(37, 99, 235, 0.12),
          0 12px 40px rgba(16, 185, 129, 0.08),
          0 6px 20px rgba(124, 58, 237, 0.05),
          inset 0 2px 0 rgba(255, 255, 255, 0.9),
          inset 0 -2px 0 rgba(37, 99, 235, 0.05)
        `,
  },
  
  // BEAUTIFUL HIGHLIGHT FOR LIGHT MODE
  ...(theme.palette.mode === 'light' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '50%',
      background: `
        linear-gradient(180deg, 
          rgba(255, 255, 255, 0.5) 0%, 
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0) 100%
        )
      `,
      borderRadius: '18px 18px 0 0',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
}));

const documents = [
  {
    id: 1,
    title: 'Surat Keterangan Domisili',
    description: 'Surat keterangan tempat tinggal untuk keperluan administratif seperti pendaftaran sekolah, bank, atau pekerjaan',
    icon: <HomeWork />,
    category: 'kependudukan',
    estimatedTime: '2-3 hari kerja',
    color: '#2563eb',
    isPopular: true,
    requirements: ['KTP', 'KK', 'Surat RT/RW']
  },
  {
    id: 2,
    title: 'Surat Keterangan Usaha',
    description: 'Surat keterangan untuk legalitas usaha dan keperluan perizinan bisnis',
    icon: <Business />,
    category: 'usaha',
    estimatedTime: '3-5 hari kerja',
    color: '#7c3aed',
    isPopular: true,
    requirements: ['KTP', 'KK', 'Foto Usaha']
  },
  {
    id: 3,
    title: 'Surat Keterangan Tidak Mampu',
    description: 'Surat keterangan kondisi ekonomi untuk bantuan sosial, beasiswa, atau keringanan biaya',
    icon: <VolunteerActivism />,
    category: 'sosial',
    estimatedTime: '2-3 hari kerja',
    color: '#059669',
    isPopular: true,
    requirements: ['KTP', 'KK', 'Foto Rumah']
  },
  {
    id: 4,
    title: 'Surat Pengantar SKCK',
    description: 'Surat pengantar untuk pengurusan SKCK di kepolisian',
    icon: <Security />,
    category: 'kependudukan',
    estimatedTime: '1 hari kerja',
    color: '#dc2626',
    requirements: ['KTP', 'KK', 'Pas Foto']
  },
  {
    id: 5,
    title: 'Surat Keterangan Kelahiran',
    description: 'Surat keterangan kelahiran untuk pengurusan akta kelahiran',
    icon: <ChildCare />,
    category: 'kependudukan',
    estimatedTime: '1-2 hari kerja',
    color: '#d97706',
    requirements: ['KTP Ortu', 'KK', 'Surat Lahir RS']
  },
  {
    id: 6,
    title: 'Surat Keterangan Kematian',
    description: 'Surat keterangan kematian untuk pengurusan akta kematian',
    icon: <LocalHospital />,
    category: 'kependudukan',
    estimatedTime: '1-2 hari kerja',
    color: '#0891b2',
    requirements: ['KTP Almarhum', 'Surat Dokter']
  },
];

const categories = [
  { id: 'semua', label: 'Semua', icon: <Description />, count: documents.length },
  { id: 'kependudukan', label: 'Kependudukan', icon: <AccountBox />, count: documents.filter(d => d.category === 'kependudukan').length },
  { id: 'usaha', label: 'Usaha', icon: <Business />, count: documents.filter(d => d.category === 'usaha').length },
  { id: 'sosial', label: 'Sosial', icon: <VolunteerActivism />, count: documents.filter(d => d.category === 'sosial').length },
];

export default function DocumentSelection({ onDocumentSelect }) {
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
      // BEAUTIFUL GRADIENT BACKGROUND FOR LIGHT MODE
      background: theme.palette.mode === 'dark'
        ? 'transparent'
        : 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 25%, #f1f5f9 50%, #e7e5e4 75%, #fef7cd 100%)',
      minHeight: '100vh',
      transition: 'background 300ms ease-in-out !important'
    }}>
      {/* ENHANCED HEADER - MATCH WELCOME STYLE */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                        : `linear-gradient(135deg, #2563eb 0%, #059669 50%, #7c3aed 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                        : '0 12px 32px rgba(37, 99, 235, 0.2), 0 6px 16px rgba(16, 185, 129, 0.1)',
                      border: theme.palette.mode === 'dark'
                        ? 'none'
                        : `3px solid rgba(255, 255, 255, 0.8)`,
                    }}
                  >
                    <Description sx={{ fontSize: 28 }} />
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      color: theme.palette.text.primary,
                      fontSize: '1.75rem',
                      textShadow: theme.palette.mode === 'dark' 
                        ? '0 2px 4px rgba(0, 0, 0, 0.3)' 
                        : '0 2px 4px rgba(37, 99, 235, 0.1)',
                    }}>
                      Layanan Dokumen Digital
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                      fontSize: '1rem', 
                      fontWeight: 500,
                      mb: 1.5,
                      color: theme.palette.text.secondary,
                    }}>
                      Pilih dokumen yang ingin Anda ajukan untuk layanan administrasi Kelurahan Simokerto
                    </Typography>
                    
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        label={`${filteredDocuments.length} Layanan`}
                        color="primary"
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          height: 32,
                          px: 2,
                          background: theme.palette.mode === 'dark'
                            ? theme.palette.primary.main
                            : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? 'none'
                            : '0 4px 12px rgba(37, 99, 235, 0.2)',
                        }}
                      />
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.875rem',
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                      }}>
                        Tersedia Online 24/7
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </SectionContainer>

      {/* ENHANCED SEARCH - MATCH RIWAYAT STYLE */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <TextField
            fullWidth
            placeholder="Cari berdasarkan nama dokumen atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ 
                    fontSize: 24, 
                    color: theme.palette.text.secondary 
                  }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                fontSize: '1rem',
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 0.8)'
                  : 'rgba(255, 255, 255, 0.9)',
                border: theme.palette.mode === 'dark'
                  ? '2px solid rgba(148, 163, 184, 0.2)'
                  : '3px solid rgba(51, 65, 85, 0.1)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                  : '0 4px 16px rgba(37, 99, 235, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                transition: 'all 300ms ease-in-out !important',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover': {
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(96, 165, 250, 0.4)'
                    : 'rgba(37, 99, 235, 0.3)',
                  transform: 'translateY(-1px)',
                },
                '&.Mui-focused': {
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 24px rgba(96, 165, 250, 0.2)'
                    : '0 8px 24px rgba(37, 99, 235, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                },
              },
            }}
            size="medium"
          />
        </CardContent>
      </SectionContainer>

      {/* CATEGORY TABS */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <Tabs 
            value={selectedCategory} 
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minHeight: 48,
                fontSize: '0.875rem',
              },
              '& .Mui-selected': {
                color: theme.palette.primary.main,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
                height: 3,
                borderRadius: 2,
              }
            }}
          >
            {categories.map((category) => (
              <Tab 
                key={category.id}
                value={category.id}
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    {React.cloneElement(category.icon, { sx: { fontSize: 20 } })}
                    <span>{category.label}</span>
                    <Chip 
                      label={category.count} 
                      size="small" 
                      sx={{ 
                        height: 20, 
                        fontSize: '0.7rem',
                        background: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }} 
                    />
                  </Stack>
                }
              />
            ))}
          </Tabs>
        </CardContent>
      </SectionContainer>

      {/* ENHANCED DOCUMENT GRID */}
      <SectionContainer elevation={0}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={3}>
            {filteredDocuments.length === 0 ? (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Search sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Tidak ada dokumen ditemukan
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Coba ubah kata kunci pencarian atau pilih kategori lain
                  </Typography>
                </Box>
              </Grid>
            ) : (
              filteredDocuments.map((doc, index) => (
                <Grid item xs={12} sm={6} lg={4} key={doc.id}>
                  <Fade in timeout={300 + index * 100}>
                    <ModernDocumentCard
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <CardContent sx={{ p: 3, flexGrow: 1, position: 'relative', zIndex: 2 }}>
                        <Stack spacing={2}>
                          {/* Header with Icon */}
                          <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                background: theme.palette.mode === 'dark'
                                  ? alpha(doc.color, 0.2)
                                  : `linear-gradient(135deg, ${alpha(doc.color, 0.15)} 0%, ${alpha(doc.color, 0.25)} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: doc.color,
                                border: theme.palette.mode === 'dark'
                                  ? 'none'
                                  : `2px solid ${alpha(doc.color, 0.3)}`,
                                boxShadow: theme.palette.mode === 'dark'
                                  ? 'none'
                                  : `0 4px 12px ${alpha(doc.color, 0.15)}`,
                                flexShrink: 0,
                              }}
                            >
                              {React.cloneElement(doc.icon, { sx: { fontSize: 24 } })}
                            </Box>
                            
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                mb: 0.5,
                                lineHeight: 1.3,
                                fontSize: '1rem',
                                color: 'text.primary'
                              }}>
                                {doc.title}
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Chip
                                  label={doc.category}
                                  size="small"
                                  sx={{ 
                                    textTransform: 'capitalize',
                                    fontSize: '0.7rem',
                                    height: 20,
                                  }}
                                />
                                {doc.isPopular && (
                                  <Chip
                                    icon={<Star sx={{ fontSize: 12 }} />}
                                    label="Populer"
                                    size="small"
                                    sx={{
                                      fontSize: '0.7rem',
                                      height: 20,
                                      backgroundColor: alpha('#f59e0b', 0.1),
                                      color: '#f59e0b',
                                    }}
                                  />
                                )}
                              </Stack>
                            </Box>
                          </Stack>

                          {/* Description */}
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            lineHeight: 1.4,
                            fontSize: '0.875rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            flexGrow: 1
                          }}>
                            {doc.description}
                          </Typography>

                          {/* Footer Info */}
                          <Stack spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {doc.estimatedTime}
                              </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                              {doc.requirements.slice(0, 3).map((req, idx) => (
                                <Chip
                                  key={idx}
                                  label={req}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    fontSize: '0.7rem',
                                    height: 22,
                                  }}
                                />
                              ))}
                              {doc.requirements.length > 3 && (
                                <Chip
                                  label={`+${doc.requirements.length - 3}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    fontSize: '0.7rem',
                                    height: 22,
                                  }}
                                />
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          fullWidth 
                          variant="outlined" 
                          endIcon={<ArrowForward />}
                          sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            borderWidth: 2,
                            fontWeight: 600,
                            height: 40,
                            '&:hover': {
                              borderWidth: 2,
                              transform: 'translateY(-1px)',
                            }
                          }}
                        >
                          Pilih Dokumen
                        </Button>
                      </CardActions>
                    </ModernDocumentCard>
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

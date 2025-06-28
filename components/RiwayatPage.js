'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { useTheme, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

// ENHANCED SECTION CONTAINER - STUNNING 3D EFFECTS
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
  
  // STUNNING 3D EFFECTS
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

const documents = [
  {
    id: 1,
    type: 'SKTM',
    fullType: 'Surat Keterangan Tidak Mampu',
    documentNumber: 'SKTM/001/2024',
    date: '2024-01-15',
    status: 'selesai',
    description: 'Keperluan bantuan sosial',
    icon: <FamilyRestroomIcon />
  },
  {
    id: 2,
    type: 'Domisili',
    fullType: 'Surat Keterangan Domisili',
    documentNumber: 'DOM/045/2024',
    date: '2024-01-20',
    status: 'diproses',
    description: 'Keperluan pendaftaran sekolah',
    icon: <HomeWorkIcon />
  },
  {
    id: 3,
    type: 'SKU',
    fullType: 'Surat Keterangan Usaha',
    documentNumber: 'SKU/023/2024',
    date: '2024-01-18',
    status: 'menunggu',
    description: 'Keperluan pengajuan kredit',
    icon: <BusinessIcon />
  },
  {
    id: 4,
    type: 'SKCK',
    fullType: 'Surat Keterangan Catatan Kepolisian',
    documentNumber: 'SKCK/012/2024',
    date: '2024-01-10',
    status: 'selesai',
    description: 'Keperluan melamar kerja',
    icon: <WorkIcon />
  },
  {
    id: 5,
    type: 'SKS',
    fullType: 'Surat Keterangan Sekolah',
    documentNumber: 'SKS/067/2024',
    date: '2024-01-25',
    status: 'ditolak',
    description: 'Data tidak lengkap',
    icon: <SchoolIcon />
  },
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

const getDocumentIconColor = (type, theme) => {
  const colors = {
    SKTM: theme.palette.mode === 'dark' ? '#34d399' : '#059669',
    Domisili: theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb',
    SKU: theme.palette.mode === 'dark' ? '#a78bfa' : '#7c3aed',
    SKCK: theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706',
    SKS: theme.palette.mode === 'dark' ? '#f87171' : '#dc2626',
  };
  return colors[type] || theme.palette.text.secondary;
};

export default function RiwayatPage() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filterDocuments = () => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.fullType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredDocuments = filterDocuments();

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
      {/* ENHANCED HEADER */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              mb: 0.5, 
              color: theme.palette.text.primary, 
              fontSize: '1.75rem',
              textShadow: theme.palette.mode === 'dark' 
                ? 'none' 
                : '0 2px 4px rgba(37, 99, 235, 0.1)',
            }}>
              Riwayat Pengajuan
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1rem',
              color: theme.palette.text.secondary,
              fontWeight: 500
            }}>
              Lihat semua pengajuan surat yang pernah Anda buat
            </Typography>
          </Stack>
        </CardContent>
      </SectionContainer>

      {/* ENHANCED SEARCH */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <TextField
            fullWidth
            placeholder="Cari berdasarkan jenis surat, nomor, atau keperluan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ 
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

      {/* ENHANCED TABLE CONTAINER */}
      <SectionContainer elevation={0}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: '16px',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.95) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
              border: theme.palette.mode === 'dark'
                ? '2px solid rgba(148, 163, 184, 0.2)'
                : '3px solid rgba(51, 65, 85, 0.08)',
              overflow: 'hidden',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 8px 32px rgba(37, 99, 235, 0.06), inset 0 2px 0 rgba(255, 255, 255, 0.8)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(241, 245, 249, 0.95) 0%, rgba(226, 232, 240, 0.95) 100%)',
                }}>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.text.primary,
                    fontSize: '0.9rem',
                    borderBottom: theme.palette.mode === 'dark'
                      ? '1px solid rgba(148, 163, 184, 0.2)'
                      : '1px solid rgba(148, 163, 184, 0.3)',
                    py: 2,
                  }}>
                    Dokumen
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.text.primary,
                    fontSize: '0.9rem',
                    borderBottom: theme.palette.mode === 'dark'
                      ? '1px solid rgba(148, 163, 184, 0.2)'
                      : '1px solid rgba(148, 163, 184, 0.3)',
                    py: 2,
                  }}>
                    Nomor
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.text.primary,
                    fontSize: '0.9rem',
                    borderBottom: theme.palette.mode === 'dark'
                      ? '1px solid rgba(148, 163, 184, 0.2)'
                      : '1px solid rgba(148, 163, 184, 0.3)',
                    py: 2,
                  }}>
                    Tanggal
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.text.primary,
                    fontSize: '0.9rem',
                    borderBottom: theme.palette.mode === 'dark'
                      ? '1px solid rgba(148, 163, 184, 0.2)'
                      : '1px solid rgba(148, 163, 184, 0.3)',
                    py: 2,
                  }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.text.primary,
                    fontSize: '0.9rem',
                    borderBottom: theme.palette.mode === 'dark'
                      ? '1px solid rgba(148, 163, 184, 0.2)'
                      : '1px solid rgba(148, 163, 184, 0.3)',
                    py: 2,
                  }}>
                    Keterangan
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.text.primary,
                    fontSize: '0.9rem',
                    borderBottom: theme.palette.mode === 'dark'
                      ? '1px solid rgba(148, 163, 184, 0.2)'
                      : '1px solid rgba(148, 163, 184, 0.3)',
                    py: 2,
                  }}>
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDocuments.map((doc) => {
                  const statusConfig = getStatusConfig(doc.status, theme);
                  
                  return (
                    <TableRow 
                      key={doc.id} 
                      hover
                      sx={{
                        borderBottom: theme.palette.mode === 'dark'
                          ? '1px solid rgba(148, 163, 184, 0.15)'
                          : '1px solid rgba(148, 163, 184, 0.1)',
                        transition: 'all 200ms ease-in-out',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(59, 130, 246, 0.08)'
                            : 'rgba(37, 99, 235, 0.04)',
                          transform: 'translateX(4px)',
                        },
                        '&:last-child td': {
                          borderBottom: 'none',
                        }
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '10px',
                              background: alpha(getDocumentIconColor(doc.type, theme), 0.15),
                              color: getDocumentIconColor(doc.type, theme),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: `1px solid ${alpha(getDocumentIconColor(doc.type, theme), 0.3)}`,
                            }}
                          >
                            {React.cloneElement(doc.icon, { sx: { fontSize: 20 } })}
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" sx={{ 
                              fontWeight: 600, 
                              color: theme.palette.text.primary, 
                              fontSize: '0.9rem',
                              lineHeight: 1.3,
                              mb: 0.5,
                            }}>
                              {doc.fullType}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              fontSize: '0.75rem',
                              color: theme.palette.text.secondary,
                              fontWeight: 500,
                            }}>
                              {doc.type}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: 'monospace', 
                          color: theme.palette.text.primary, 
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}>
                          {doc.documentNumber}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ 
                          fontSize: '0.9rem',
                          color: theme.palette.text.primary,
                          fontWeight: 500,
                        }}>
                          {new Date(doc.date).toLocaleDateString('id-ID')}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          icon={statusConfig.icon}
                          label={doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          sx={{ 
                            fontWeight: 700, 
                            fontSize: '0.75rem',
                            height: 32,
                            minWidth: 110,
                            borderRadius: '16px',
                            backgroundColor: statusConfig.backgroundColor,
                            color: statusConfig.textColor,
                            border: `1px solid ${statusConfig.borderColor}`,
                            '& .MuiChip-label': {
                              px: 1,
                              fontWeight: 700,
                            },
                            '& .MuiChip-icon': {
                              color: statusConfig.textColor,
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ 
                          fontSize: '0.9rem',
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                        }}>
                          {doc.description}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Stack direction="row" spacing={1}>
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.primary.main, 
                              width: 36, 
                              height: 36,
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                              }
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.success.main, 
                              width: 36, 
                              height: 36,
                              backgroundColor: alpha(theme.palette.success.main, 0.1),
                              border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.success.main, 0.2),
                              }
                            }}
                          >
                            <DownloadIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.info.main, 
                              width: 36, 
                              height: 36,
                              backgroundColor: alpha(theme.palette.info.main, 0.1),
                              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.info.main, 0.2),
                              }
                            }}
                          >
                            <PrintIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </SectionContainer>
    </Box>
  );
}

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

const getStatusColor = (status) => {
  switch (status) {
    case 'selesai': return 'success';
    case 'menunggu': return 'warning';
    case 'diproses': return 'info';
    case 'ditolak': return 'error';
    default: return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'selesai': return <CheckCircleIcon />;
    case 'menunggu': return <PendingIcon />;
    case 'diproses': return <TrendingUpIcon />;
    case 'ditolak': return <CancelIcon />;
    default: return <DescriptionIcon />;
  }
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

  const getDocumentIconColor = (type) => {
    switch (type) {
      case 'SKTM': return theme.palette.mode === 'dark' ? '#34d399' : '#059669';
      case 'Domisili': return theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb';
      case 'SKU': return theme.palette.mode === 'dark' ? '#a78bfa' : '#7c3aed';
      case 'SKCK': return theme.palette.mode === 'dark' ? '#fbbf24' : '#d97706';
      case 'SKS': return theme.palette.mode === 'dark' ? '#f87171' : '#dc2626';
      default: return theme.palette.text.secondary;
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Header with consistent container */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, color: theme.palette.text.primary, fontSize: '1.25rem' }}>
              Riwayat Pengajuan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Lihat semua pengajuan surat yang pernah Anda buat
            </Typography>
          </Stack>
        </CardContent>
      </SectionContainer>

      {/* Search in consistent container */}
      <SectionContainer elevation={0} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 1 }}>
          <TextField
            fullWidth
            placeholder="Cari berdasarkan jenis surat, nomor, atau keperluan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '0.875rem',
                height: 40,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 0.6)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                '& fieldset': {
                  borderColor: alpha(theme.palette.divider, 0.3),
                },
              },
            }}
            size="small"
          />
        </CardContent>
      </SectionContainer>

      {/* Table in consistent container */}
      <SectionContainer elevation={0}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: 2,
              background: theme.palette.mode === 'dark'
                ? 'rgba(15, 23, 42, 0.6)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem',
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.default, 0.5)
                      : alpha(theme.palette.background.default, 0.8),
                  }}>
                    Dokumen
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem',
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.default, 0.5)
                      : alpha(theme.palette.background.default, 0.8),
                  }}>
                    Nomor
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem',
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.default, 0.5)
                      : alpha(theme.palette.background.default, 0.8),
                  }}>
                    Tanggal
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem',
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.default, 0.5)
                      : alpha(theme.palette.background.default, 0.8),
                  }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem',
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.default, 0.5)
                      : alpha(theme.palette.background.default, 0.8),
                  }}>
                    Keterangan
                  </TableCell>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem',
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.default, 0.5)
                      : alpha(theme.palette.background.default, 0.8),
                  }}>
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow 
                    key={doc.id} 
                    hover
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark'
                          ? alpha(theme.palette.primary.main, 0.08)
                          : alpha(theme.palette.primary.main, 0.04),
                      }
                    }}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            background: alpha(getDocumentIconColor(doc.type), 0.15),
                            color: getDocumentIconColor(doc.type),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {React.cloneElement(doc.icon, { sx: { fontSize: 18 } })}
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: '0.875rem' }}>
                            {doc.fullType}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            {doc.type}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', color: theme.palette.text.primary, fontSize: '0.8rem' }}>
                        {doc.documentNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.875rem' }}>
                        {new Date(doc.date).toLocaleDateString('id-ID')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={React.cloneElement(getStatusIcon(doc.status), { sx: { fontSize: 14 } })}
                        label={doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        color={getStatusColor(doc.status)}
                        size="small"
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: '0.75rem',
                          height: 28,
                          minWidth: 100,
                          borderRadius: '14px',
                          px: 2,
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        {doc.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" sx={{ color: theme.palette.primary.main, width: 32, height: 32 }}>
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: theme.palette.success.main, width: 32, height: 32 }}>
                          <DownloadIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: theme.palette.info.main, width: 32, height: 32 }}>
                          <PrintIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </SectionContainer>
    </Box>
  );
}

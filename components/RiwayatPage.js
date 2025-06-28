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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Image from 'next/image';

const DocumentCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 41, 59, 0.3)' 
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

// Mock data riwayat lengkap
const allDocuments = [
  {
    id: 1,
    type: 'SKTM',
    fullType: 'Surat Keterangan Tidak Mampu',
    status: 'approved',
    date: '2024-01-15',
    progress: 100,
    documentNumber: 'SKTM/001/2024',
    purpose: 'Bantuan pendidikan anak'
  },
  {
    id: 2,
    type: 'Domisili',
    fullType: 'Surat Keterangan Domisili',
    status: 'processing',
    date: '2024-01-20',
    progress: 75,
    documentNumber: 'DOM/045/2024',
    purpose: 'Pendaftaran sekolah'
  },
  {
    id: 3,
    type: 'SKU',
    fullType: 'Surat Keterangan Usaha',
    status: 'pending',
    date: '2024-01-18',
    progress: 30,
    documentNumber: 'SKU/023/2024',
    purpose: 'Perizinan usaha'
  },
  {
    id: 4,
    type: 'Pengantar',
    fullType: 'Surat Pengantar',
    status: 'approved',
    date: '2024-01-10',
    progress: 100,
    documentNumber: 'SP/012/2024',
    purpose: 'Administrasi bank'
  },
  {
    id: 5,
    type: 'Kelahiran',
    fullType: 'Surat Keterangan Kelahiran',
    status: 'rejected',
    date: '2024-01-05',
    progress: 100,
    documentNumber: 'SKL/008/2024',
    purpose: 'Pembuatan akta kelahiran'
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'approved': return 'success';
    case 'pending': return 'warning';
    case 'processing': return 'info';
    case 'rejected': return 'error';
    default: return 'default';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'approved': return 'Selesai';
    case 'pending': return 'Menunggu';
    case 'processing': return 'Diproses';
    case 'rejected': return 'Ditolak';
    default: return 'Unknown';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'approved': return <CheckCircleIcon />;
    case 'pending': return <PendingIcon />;
    case 'processing': return <TrendingUpIcon />;
    case 'rejected': return <CancelIcon />;
    default: return <DescriptionIcon />;
  }
};

export default function RiwayatPage() {
  const [tabValue, setTabValue] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filterDocuments = () => {
    let filtered = allDocuments;
    
    // Filter by status based on tab
    if (tabValue === 1) filtered = filtered.filter(doc => doc.status === 'pending' || doc.status === 'processing');
    if (tabValue === 2) filtered = filtered.filter(doc => doc.status === 'approved');
    if (tabValue === 3) filtered = filtered.filter(doc => doc.status === 'rejected');
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.fullType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredDocuments = filterDocuments();

  return (
    <Box sx={{ p: 2, backgroundColor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Card sx={{ 
        borderRadius: '12px', 
        border: '1px solid', 
        borderColor: 'divider', 
        mb: 3,
        boxShadow: 'none',
      }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 1,
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo Kelurahan Simokerto"
                width={20}
                height={20}
                style={{ borderRadius: '3px' }}
              />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.25 }}>
                Riwayat Pengajuan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lihat semua pengajuan surat yang pernah Anda buat
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card sx={{ 
        borderRadius: '12px', 
        mb: 3, 
        border: '1px solid', 
        borderColor: 'divider',
        boxShadow: 'none',
      }}>
        <CardContent sx={{ p: 2.5 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <TextField
              fullWidth
              placeholder="Cari berdasarkan jenis surat, nomor, atau keperluan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                },
              }}
              size="small"
            />
            <Box sx={{ minWidth: { md: '300px' } }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    minHeight: '36px',
                  },
                  '& .MuiTabs-indicator': {
                    height: '2px',
                  },
                }}
              >
                <Tab label="Semua" />
                <Tab label="Dalam Proses" />
                <Tab label="Selesai" />
                <Tab label="Ditolak" />
              </Tabs>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Grid container spacing={2}>
        {filteredDocuments.length === 0 ? (
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: '12px', 
              textAlign: 'center', 
              py: 6, 
              border: '1px solid', 
              borderColor: 'divider',
              boxShadow: 'none',
            }}>
              <CardContent>
                <DescriptionIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Tidak ada data ditemukan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Coba ubah filter atau kata kunci pencarian
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          filteredDocuments.map((doc) => (
            <Grid item xs={12} key={doc.id}>
              <Card sx={{ 
                borderRadius: '8px', 
                border: '1px solid', 
                borderColor: 'divider',
                boxShadow: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  borderColor: theme => theme.palette.primary.main,
                },
              }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '8px',
                            background: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <DescriptionIcon sx={{ fontSize: 18 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.25 }}>
                            {doc.fullType}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.25, display: 'block' }}>
                            {doc.documentNumber} • {new Date(doc.date).toLocaleDateString('id-ID')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Keperluan: {doc.purpose}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                        <Chip
                          icon={getStatusIcon(doc.status)}
                          label={getStatusText(doc.status)}
                          color={getStatusColor(doc.status)}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                        />
                        {doc.status === 'approved' && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DownloadIcon sx={{ fontSize: 14 }} />}
                            sx={{ 
                              borderRadius: '6px', 
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              minWidth: 'auto',
                              px: 1.5,
                            }}
                          >
                            Unduh
                          </Button>
                        )}
                        <IconButton 
                          size="small" 
                          sx={{ 
                            borderRadius: '6px',
                            width: 32,
                            height: 32,
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

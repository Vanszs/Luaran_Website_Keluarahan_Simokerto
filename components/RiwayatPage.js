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
import LinearProgress from '@mui/material/LinearProgress';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const HeaderCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)'
    : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  color: 'white',
  borderRadius: '24px',
  border: 'none',
  marginBottom: theme.spacing(4),
}));

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
    <Box sx={{ py: 1 }}>
      {/* Header */}
      <HeaderCard>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Riwayat Pengajuan
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Lihat semua pengajuan surat yang pernah Anda buat beserta statusnya
          </Typography>
        </CardContent>
      </HeaderCard>

      {/* Search and Filter */}
      <Card sx={{ borderRadius: '16px', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
            <TextField
              fullWidth
              placeholder="Cari berdasarkan jenis surat, nomor, atau keperluan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
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
                    fontWeight: 600,
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
      <Grid container spacing={3}>
        {filteredDocuments.length === 0 ? (
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '16px', textAlign: 'center', py: 8 }}>
              <CardContent>
                <DescriptionIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
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
              <DocumentCard>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton
                          sx={{
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            width: 56,
                            height: 56,
                          }}
                        >
                          <DescriptionIcon />
                        </IconButton>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {doc.fullType}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            No. {doc.documentNumber} • {new Date(doc.date).toLocaleDateString('id-ID')}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Keperluan: {doc.purpose}
                          </Typography>
                          {(doc.status === 'processing' || doc.status === 'pending') && (
                            <Box sx={{ mt: 2, maxWidth: '300px' }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={doc.progress} 
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                {doc.progress}% selesai
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                        <Chip
                          icon={getStatusIcon(doc.status)}
                          label={getStatusText(doc.status)}
                          color={getStatusColor(doc.status)}
                          variant="filled"
                          sx={{ fontWeight: 600 }}
                        />
                        {doc.status === 'approved' && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DownloadIcon />}
                            sx={{ borderRadius: '8px' }}
                          >
                            Unduh
                          </Button>
                        )}
                        <IconButton size="small" sx={{ borderRadius: '8px' }}>
                          <VisibilityIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </DocumentCard>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

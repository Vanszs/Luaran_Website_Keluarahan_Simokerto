'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  alpha,
  InputAdornment
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';

interface Report {
  id: number;
  user_id: number;
  user: {
    name: string;
  };
  address: string;
  description: string;
  created_at: string;
  status: 'pending' | 'processing' | 'completed';
}

export default function ReportsPage() {
  const theme = useTheme();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  useEffect(() => {
    fetchReports();
  }, []);
  
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data.reports ?? data);
      } else {
        console.error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };
  
  
  // Filter reports based on search term
  const filteredReports = reports.filter(report => 
    report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get reports for current page
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return theme.palette.warning.main;
      case 'processing': return theme.palette.info.main;
      case 'completed': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'processing': return 'Diproses';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Pelapor', flex: 1, minWidth: 120 },
    { field: 'address', headerName: 'Alamat', flex: 1.5, minWidth: 160 },
    { field: 'created_at', headerName: 'Tanggal', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={getStatusLabel(params.value || '')}
          size="small"
          sx={{
            bgcolor: alpha(getStatusColor(params.value || ''), 0.1),
            color: getStatusColor(params.value || ''),
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Aksi',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <IconButton size="small" onClick={() => handleViewReport(params.row.raw)} color="primary">
          <ViewIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const rows = filteredReports.map((report) => ({
    id: report.id,
    name: report.user?.name,
    address: report.address,
    created_at: new Date(report.created_at).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    status: report.status,
    raw: report,
  }));
  
  return (
    <Layout title="Laporan">
      <Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Daftar Laporan
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
          }}
        >
          {/* Enhanced Search Header */}
          <Box sx={{ 
            p: 2, 
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography variant="h6" fontWeight={600}>
              Semua Laporan
            </Typography>

            <TextField
              placeholder="Cari berdasarkan nama, alamat, atau deskripsi..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: '100%', sm: 350 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.05)
                    : alpha(theme.palette.common.black, 0.03),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.common.white, 0.08)
                      : alpha(theme.palette.common.black, 0.05),
                  },
                  '&.Mui-focused': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                    bgcolor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.common.white, 0.1)
                      : alpha(theme.palette.common.black, 0.06),
                  }
                }
              }}
            />
          </Box>
          
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            loading={loading}
            sx={{ border: 'none' }}
          />
        </Paper>
      </Box>
      
      {/* Report Detail Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Detail Laporan #{selectedReport?.id}
        </DialogTitle>
        <DialogContent dividers>
          {selectedReport && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Pelapor
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.user?.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Alamat Kejadian
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Deskripsi
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Waktu Laporan
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {new Date(selectedReport.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={getStatusLabel(selectedReport.status)}
                  sx={{
                    bgcolor: alpha(getStatusColor(selectedReport.status), 0.1),
                    color: getStatusColor(selectedReport.status),
                    fontWeight: 500
                  }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

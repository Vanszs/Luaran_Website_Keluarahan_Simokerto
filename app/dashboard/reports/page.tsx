'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Paper,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
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
import {
  Search as SearchIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';
import ProtectedRoute from '../../../components/ProtectedRoute';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
  
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (_event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(_event.target.value, 10));
    setPage(0);
  };
  
  // Filter reports based on search term
  const filteredReports = reports.filter(report => 
    report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get reports for current page
  const paginatedReports = filteredReports.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );
  
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
  
  return (
    <ProtectedRoute allowedRoles={['admin1']}>
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
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.background.paper, 0.5) 
                  : alpha(theme.palette.background.paper, 0.5) 
                }}>
                  <TableCell sx={{ fontWeight: 600, py: 2 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, py: 2 }}>Pelapor</TableCell>
                  <TableCell sx={{ fontWeight: 600, py: 2 }}>Alamat</TableCell>
                  <TableCell sx={{ fontWeight: 600, py: 2 }}>Tanggal</TableCell>
                  <TableCell sx={{ fontWeight: 600, py: 2 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, py: 2 }} align="right">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : paginatedReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      {searchTerm ? 'Tidak ada hasil yang sesuai dengan pencarian' : 'Tidak ada data laporan'}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedReports.map(report => (
                    <TableRow key={report.id} hover>
                      <TableCell sx={{ fontSize: '0.875rem', py: 2 }}>#{report.id}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', py: 2 }}>{report.user?.name}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', py: 2 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            maxWidth: 200, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap' 
                          }}
                        >
                          {report.address}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', py: 2 }}>
                        {new Date(report.created_at).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip 
                          label={getStatusLabel(report.status)} 
                          size="small"
                          sx={{
                            bgcolor: alpha(getStatusColor(report.status), 0.1),
                            color: getStatusColor(report.status),
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2 }} align="right">
                        <IconButton 
                          size="small" 
                          onClick={() => handleViewReport(report)}
                          color="primary"
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Baris per halaman:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} dari ${count}`}
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
    </ProtectedRoute>
  );
}

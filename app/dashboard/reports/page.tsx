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
  alpha
} from '@mui/material';
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
        // Ensure backward compatibility when the API
        // does not provide a status field
        const normalized = data.map((r: any) => ({
          ...r,
          status: r.status || 'pending'
        }));
        setReports(normalized);
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
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
      case 'pending': return theme.palette.warning;
      case 'processing': return theme.palette.info;
      case 'completed': return theme.palette.success;
      default: return theme.palette.grey;
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
    <Layout title="Laporan">
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight={600}>
            Daftar Laporan
          </Typography>
        </Box>
        
        <TextField
          placeholder="Cari berdasarkan nama, alamat, atau deskripsi"
          variant="outlined"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ mb: 2 }}
        />
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Pelapor</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Aksi</TableCell>
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
                    Tidak ada data laporan
                  </TableCell>
                </TableRow>
              ) : (
                paginatedReports.map(report => (
                  <TableRow key={report.id} hover>
                    <TableCell>#{report.id}</TableCell>
                    <TableCell>{report.user?.name}</TableCell>
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {report.address}
                    </TableCell>
                    <TableCell>
                      {new Date(report.created_at).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(report.status)} 
                        size="small"
                        sx={{ 
                          bgcolor: alpha(getStatusColor(report.status).main, 0.1),
                          color: getStatusColor(report.status).main,
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
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
        />
      </Paper>
      
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
                    bgcolor: alpha(getStatusColor(selectedReport.status).main, 0.1),
                    color: getStatusColor(selectedReport.status).main,
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

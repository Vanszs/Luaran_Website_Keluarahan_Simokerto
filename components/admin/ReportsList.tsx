'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Snackbar,
  Alert,
  alpha,
  useTheme,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface Report {
  id: number;
  user_id: number;
  address: string;
  description: string;
  created_at: string;
  user: {
    name: string;
  };
}

export default function ReportsList() {
  const theme = useTheme();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailDialog, setDetailDialog] = useState({
    open: false,
    report: null as Report | null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info'
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        throw new Error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load reports',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (report: Report) => {
    setDetailDialog({
      open: true,
      report
    });
  };

  const filteredReports = reports.filter(report => 
    report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700}>
          Daftar Laporan
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ 
        p: 2, 
        mb: 3, 
        display: 'flex',
        borderRadius: 3,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <TextField
          fullWidth
          placeholder="Cari berdasarkan nama warga atau alamat..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ maxWidth: 500 }}
        />
      </Paper>

      <TableContainer component={Paper} elevation={0} sx={{ 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <Table>
          <TableHead sx={{ 
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05)
          }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama Warga</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Waktu Laporan</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.user.name}</TableCell>
                  <TableCell>{report.address}</TableCell>
                  <TableCell>
                    {new Date(report.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewDetails(report)}
                      sx={{ borderRadius: 2 }}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                    <WarningIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Tidak ada data laporan
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Report Detail Dialog */}
      <Dialog
        open={detailDialog.open}
        onClose={() => setDetailDialog({ ...detailDialog, open: false })}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detail Laporan #{detailDialog.report?.id}</DialogTitle>
        <DialogContent>
          {detailDialog.report && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  ID Laporan
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {detailDialog.report.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle2" color="text.secondary">
                  Waktu Laporan
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {new Date(detailDialog.report.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Nama Pelapor
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {detailDialog.report.user.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Alamat Kejadian
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {detailDialog.report.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Deskripsi
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {detailDialog.report.description}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialog({ ...detailDialog, open: false })}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

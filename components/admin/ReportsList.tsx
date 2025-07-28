'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
  alpha,
  useTheme,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Chip,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Pagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  Warning as WarningIcon,
  MoreVert as MoreVertIcon,
  HourglassEmpty as PendingIcon,
  Engineering as ProcessingIcon,
  CheckCircle as CompletedIcon,
  Cancel as RejectedIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { getStatusChipStyle, getStatusInIndonesian, standardChipStyles } from '../../utils/statusStyles';
import { useAuth } from '../../contexts/AuthContext';
import responsiveUtils from '../../shared-theme/responsive';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Report {
  id: number;
  user_id: number;
  address: string;
  description: string;
  created_at: string;
  pelapor: string;
  jenis_laporan: string;
  reporter_type: string;
  status: string;
  user: {
    name: string;
    phone: string | null;
  };
}

// --- Skeleton Component ---
const ReportListSkeleton = ({ isMobile }: { isMobile: boolean }) => {
  const theme = useTheme();

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[...Array(3)].map((_, index) => (
          <Paper 
            key={index} 
            elevation={0}
            sx={{ 
              p: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Skeleton variant="text" width={80} height={20} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width={50} height={30} />
              </Box>
              <Skeleton variant="rounded" width={100} height={32} />
            </Box>
            <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
            <Skeleton variant="text" width="70%" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer 
      component={Paper} 
      elevation={0} 
      sx={{ 
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {[...Array(7)].map((_, i) => (
              <TableCell key={i}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(7)].map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


interface ReportsListProps {
  isReadOnly?: boolean;
  limit?: number;
}

export default function ReportsList({ isReadOnly = false, limit }: ReportsListProps) {
  const theme = useTheme();
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reportTypeFilter, setReportTypeFilter] = useState('all');
  const [reporterTypeFilter, setReporterTypeFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  
  // Status update related state
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReportForStatus, setSelectedReportForStatus] = useState<number | null>(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  const [mobilePage, setMobilePage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const url = limit ? `/api/admin/reports?limit=${limit}` : '/api/admin/reports';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReports(data.reports);
    } catch (error) {
      setError(error as Error);
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Check if user can update status
  const canUpdateStatus = () => {
    // Petugas cannot update status, only superadmin, admin1, and admin2 can
    return user?.role !== 'petugas' && !isReadOnly;
  };

  // Status menu handlers
  const handleStatusMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, reportId: number) => {
    setStatusMenuAnchorEl(event.currentTarget);
    setSelectedReportForStatus(reportId);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
    setSelectedReportForStatus(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedReportForStatus) return;
    
    setStatusUpdateLoading(true);
    try {
      const response = await fetch('/api/admin/reports/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId: selectedReportForStatus,
          status: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local reports state with new status
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === selectedReportForStatus ? { ...report, status: newStatus } : report
        )
      );

      setSnackbar({
        open: true,
        message: `Status berhasil diubah menjadi ${getStatusInIndonesian(newStatus)}`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating status:', error);
      setSnackbar({
        open: true,
        message: 'Gagal mengubah status laporan',
        severity: 'error'
      });
    } finally {
      setStatusUpdateLoading(false);
      handleStatusMenuClose();
    }
  };

  // Helper function to get status in Indonesian (now using utility)
  // const getStatusInIndonesian = (status: string): string => {
  //   switch (status) {
  //     case 'pending': return 'Menunggu';
  //     case 'processing': return 'Diproses';
  //     case 'completed': return 'Selesai';
  //     case 'rejected': return 'Ditolak';
  //     default: return status;
  //   }
  // };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <PendingIcon fontSize="small" />;
      case 'processing': return <ProcessingIcon fontSize="small" />;
      case 'completed': return <CompletedIcon fontSize="small" />;
      case 'rejected': return <RejectedIcon fontSize="small" />;
      default: return <PendingIcon fontSize="small" />;
    }
  };

  // Helper function to get status color and style (now using utility)
  // const getStatusChipStyle = (status: string) => {
  //   const normalizedStatus = status?.toLowerCase();
  //   
  //   switch (normalizedStatus) {
  //     case 'completed':
  //     case 'approved':
  //     case 'selesai':
  //       return {
  //         backgroundColor: alpha(theme.palette.success.main, 0.15),
  //         color: theme.palette.success.main,
  //         border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
  //       };
  //     case 'processing':
  //     case 'in progress':
  //     case 'diproses':
  //       return {
  //         backgroundColor: alpha(theme.palette.warning.main, 0.15),
  //         color: theme.palette.warning.main,
  //         border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
  //       };
  //     case 'pending':
  //     case 'menunggu':
  //       return {
  //         backgroundColor: alpha(theme.palette.info.main, 0.15),
  //         color: theme.palette.info.main,
  //         border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
  //       };
  //     case 'rejected':
  //     case 'ditolak':
  //       return {
  //         backgroundColor: alpha(theme.palette.error.main, 0.15),
  //         color: theme.palette.error.main,
  //         border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
  //       };
  //     default:
  //       return {
  //         backgroundColor: alpha(theme.palette.grey[500], 0.15),
  //         color: theme.palette.grey[600],
  //         border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
  //       };
  //   }
  // };

  const handleViewDetails = (report: Report) => {
    setDetailDialogOpen(true);
    setSelectedReport(report);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.pelapor && report.pelapor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.user.name && report.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.jenis_laporan && report.jenis_laporan.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === 'all' || 
      (report.status && report.status.toLowerCase() === statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <ReportListSkeleton isMobile={isMobile} />;
  }

  // Responsive card layout for mobile
  if (isMobile) {
    const pageCount = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
    const paginatedReports = filteredReports.slice(
      (mobilePage - 1) * ITEMS_PER_PAGE,
      mobilePage * ITEMS_PER_PAGE
    );

    return (
      <>
        {/* Header */}
        {!limit && (
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight={700}>
              Daftar Laporan
            </Typography>
          </Box>
        )}

        {/* Search and Filter */}
        {!limit && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
              background: theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.9)
                : alpha(theme.palette.background.paper, 0.9),
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Cari berdasarkan nama warga atau alamat..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: '16px', // Prevents zoom on iOS
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="status-filter-label">Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="all">Semua Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Sedang Diproses</MenuItem>
                    <MenuItem value="completed">Selesai</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Mobile Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {paginatedReports.length > 0 ? (
            paginatedReports.map((report, index) => (
              <Paper 
                key={report.id} 
                elevation={0}
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`
                    : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.7)})`,
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0,0,0,0.3)'
                      : '0 8px 32px rgba(0,0,0,0.12)',
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                  animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Header with ID, Status and Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          mb: 0.5,
                          display: 'block'
                        }}
                      >
                        ID Laporan
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: theme.palette.primary.main 
                        }}
                      >
                        #{report.id}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={getStatusInIndonesian(report.status)}
                        size="small"
                        sx={{
                          ...standardChipStyles,
                          ...getStatusChipStyle(report.status, theme),
                          fontSize: '0.75rem',
                          height: 32,
                          fontWeight: 600,
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Reporter Info */}
                  <Box>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        mb: 0.5,
                        display: 'block'
                      }}
                    >
                      Nama Pelapor
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                        {report.reporter_type === 'admin' 
                          ? (report.pelapor || 'Admin') 
                          : (report.user.name || 'Warga')}
                      </Typography>
                      <Chip 
                        label={report.reporter_type === 'admin' ? 'Admin' : 'Warga'}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          fontSize: '0.65rem',
                          height: 20,
                          borderRadius: 1,
                          color: theme.palette.text.secondary,
                          alignSelf: 'flex-start',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Jenis Laporan */}
                  <Box>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        mb: 0.5,
                        display: 'block'
                      }}
                    >
                      Jenis Laporan
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', color: theme.palette.text.primary }}>
                      {report.jenis_laporan || 'Umum'}
                    </Typography>
                  </Box>

                  {/* Address */}
                  <Box>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        mb: 0.5,
                        display: 'block'
                      }}
                    >
                      Alamat Kejadian
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.9rem',
                        lineHeight: 1.4,
                        color: theme.palette.text.primary
                      }}
                    >
                      {report.address}
                    </Typography>
                  </Box>

                  {/* Date and Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          mb: 0.5,
                          display: 'block'
                        }}
                      >
                        Waktu Laporan
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ fontSize: '0.9rem', color: theme.palette.text.primary }}>
                          {new Date(report.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Lihat Detail">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(report)}
                          sx={{
                            color: theme.palette.primary.main,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            },
                            width: 36,
                            height: 36,
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {canUpdateStatus() && (
                        <Tooltip title="Ubah Status">
                          <IconButton
                            size="small"
                            onClick={(e) => handleStatusMenuOpen(e, report.id)}
                            disabled={statusUpdateLoading}
                            sx={{
                              color: theme.palette.text.secondary,
                              backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.text.secondary, 0.2),
                              },
                              width: 36,
                              height: 36,
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))
          ) : (
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.6)
                  : alpha(theme.palette.background.paper, 0.8),
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box 
                  sx={{ 
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.text.secondary, 0.1)}, ${alpha(theme.palette.text.secondary, 0.05)})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WarningIcon sx={{ fontSize: 32, color: 'text.secondary', opacity: 0.7 }} />
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  Tidak ada data laporan
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>

        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={pageCount}
              page={mobilePage}
              onChange={(e, page) => setMobilePage(page)}
              color="primary"
            />
          </Box>
        )}

        {/* Status Update Menu */}
        <Menu
          anchorEl={statusMenuAnchorEl}
          open={Boolean(statusMenuAnchorEl)}
          onClose={handleStatusMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            onClick={() => handleStatusChange('pending')}
            disabled={Boolean(selectedReportForStatus && reports.find(r => r.id === selectedReportForStatus)?.status === 'pending')}
          >
            <ListItemIcon>
              <PendingIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Tandai Sebagai Pending" />
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusChange('processing')}
            disabled={Boolean(selectedReportForStatus && reports.find(r => r.id === selectedReportForStatus)?.status === 'processing')}
          >
            <ListItemIcon>
              <ProcessingIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Tandai Sedang Diproses" />
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusChange('completed')}
            disabled={Boolean(selectedReportForStatus && reports.find(r => r.id === selectedReportForStatus)?.status === 'completed')}
          >
            <ListItemIcon>
              <CompletedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Tandai Selesai" />
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusChange('rejected')}
            disabled={Boolean(selectedReportForStatus && reports.find(r => r.id === selectedReportForStatus)?.status === 'rejected')}
          >
            <ListItemIcon>
              <RejectedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Tandai Ditolak" />
          </MenuItem>
        </Menu>

        {/* Report Detail Dialog */}
        <Dialog
          open={detailDialogOpen}
          onClose={() => setDetailDialogOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Detail Laporan #{selectedReport?.id}</DialogTitle>
          <DialogContent>
            {selectedReport && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID Laporan
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedReport.id}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
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
                    Nama Pelapor
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedReport.pelapor || selectedReport.user.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tipe Pelapor
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedReport.reporter_type === 'admin' ? 'Admin' : 'Warga'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    No. Telepon
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedReport.user.phone || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Jenis Laporan
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedReport.jenis_laporan || 'Umum'}
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
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailDialogOpen(false)}>
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

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700}>
          Daftar Laporan
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          ...responsiveUtils.card(theme),
          mb: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Cari berdasarkan nama warga atau alamat..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                ...responsiveUtils.formField(theme),
                marginBottom: 0,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  ...responsiveUtils.formField(theme),
                  marginBottom: 0,
                }}
              >
                <MenuItem value="all">Semua Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Sedang Diproses</MenuItem>
                <MenuItem value="completed">Selesai</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          ...responsiveUtils.table(theme),
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0,0,0,0.2)'
            : '0 4px 12px rgba(0,0,0,0.1)',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.paper, 0.8),
        }}
      >
        <Table>
          <TableHead sx={{ 
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05)
          }}>
            <TableRow>
              <TableCell data-label="ID">ID</TableCell>
              <TableCell data-label="Nama Pelapor">Nama Pelapor</TableCell>
              <TableCell data-label="Jenis" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Jenis</TableCell>
              <TableCell data-label="Alamat">Alamat</TableCell>
              <TableCell data-label="Waktu Laporan" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Waktu Laporan</TableCell>
              <TableCell data-label="Status">Status</TableCell>
              <TableCell data-label="Aksi" align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell data-label="ID">{report.id}</TableCell>
                  <TableCell data-label="Nama Pelapor">
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {report.reporter_type === 'admin' 
                          ? (report.pelapor || 'Admin') 
                          : (report.user.name || 'Warga')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {report.reporter_type === 'admin' ? '(Admin)' : '(Warga)'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell data-label="Jenis" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {report.jenis_laporan || 'Umum'}
                  </TableCell>
                  <TableCell data-label="Alamat">
                    <Typography variant="body2" sx={{ 
                      maxWidth: { xs: 150, sm: 200, md: 250 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {report.address}
                    </Typography>
                  </TableCell>
                  <TableCell data-label="Waktu Laporan" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {new Date(report.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell data-label="Status">
                    <Chip
                      label={getStatusInIndonesian(report.status)}
                      size="small"
                      sx={{
                        ...standardChipStyles,
                        ...getStatusChipStyle(report.status, theme),
                        // Mobile responsive chip sizing
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        height: { xs: '24px', sm: '28px' },
                      }}
                    />
                  </TableCell>
                  <TableCell data-label="Aksi" align="right">
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'flex-end', 
                      gap: { xs: 0.5, sm: 1 },
                      flexWrap: 'wrap'
                    }}>
                      <Tooltip title="Lihat Detail">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(report)}
                          sx={{
                            ...responsiveUtils.iconButton(theme),
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {canUpdateStatus() && (
                        <Tooltip title="Ubah Status">
                          <IconButton
                            size="small"
                            onClick={(e) => handleStatusMenuOpen(e, report.id)}
                            disabled={statusUpdateLoading}
                            sx={{
                              ...responsiveUtils.iconButton(theme),
                              color: theme.palette.text.secondary,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                              },
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
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

      {/* Status Update Menu */}
      <Menu
        anchorEl={statusMenuAnchorEl}
        open={Boolean(statusMenuAnchorEl)}
        onClose={handleStatusMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => handleStatusChange('pending')}
          disabled={Boolean(selectedReportForStatus && reports.find(r => r.id === selectedReportForStatus)?.status === 'pending')}
        >
          <ListItemIcon>
            <PendingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tandai Sebagai Pending" />
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange('processing')}
          disabled={Boolean(selectedReportForStatus && reports.find(r => r.id === selectedReportForStatus)?.status === 'processing')}
        >
          <ListItemIcon>
            <ProcessingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tandai Sedang Diproses" />
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange('completed')}
          disabled={Boolean(selectedReportForStatus && reports.find(r => r.id === selectedReportForStatus)?.status === 'completed')}
        >
          <ListItemIcon>
            <CompletedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tandai Selesai" />
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange('rejected')}
          disabled={Boolean(selectedReportForStatus && reports.find(r => r.id === selectedReportForStatus)?.status === 'rejected')}
        >
          <ListItemIcon>
            <RejectedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tandai Ditolak" />
        </MenuItem>
      </Menu>

      {/* Report Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detail Laporan #{selectedReport?.id}</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="text.secondary">
                  ID Laporan
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
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
                  Nama Pelapor
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.pelapor || selectedReport.user.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tipe Pelapor
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.reporter_type === 'admin' ? 'Admin' : 'Warga'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  No. Telepon
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.user.phone || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Jenis Laporan
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedReport.jenis_laporan || 'Umum'}
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
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>
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

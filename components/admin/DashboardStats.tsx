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
  Chip,
  useTheme,
  alpha,
  Alert,
  TablePagination,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useApiData } from '../../hooks/useMockApi';
import { getStatusChipStyle, getStatusInIndonesian, standardChipStyles } from '../../utils/statusStyles';

// Define proper types for our data
interface Report {
  id: number;
  user?: {
    name: string;
  };
  submittedBy?: string;
  address: string;
  description: string;
  created_at: string;
  status?: string;
  type?: string;
}

interface DashboardStatsProps {
  useMockData: boolean;
}

export default function DashboardStats({ useMockData = false }: DashboardStatsProps) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Get reports from API or mock data
  const { data, loading, error } = useApiData<{ reports?: Report[] | Record<string, any> }>({
    endpoint: '/api/admin/reports',
    useMock: useMockData,
  });

  // Ensure recentReports is always an array
  const recentReports = Array.isArray(data?.reports) 
    ? data?.reports 
    : [];
  
  // Log what we received for debugging
  useEffect(() => {
    if (data?.reports && !Array.isArray(data.reports)) {
      console.error('Expected reports to be an array but got:', typeof data.reports, data.reports);
    }
  }, [data]);

  const filteredReports = recentReports;

  // Pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (_event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(_event.target.value, 10));
    setPage(0);
  };

  const paginatedReports = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 0, 
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        p: 3, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h6" fontWeight={600}>
          Laporan Terbaru
        </Typography>
      </Box>
      
      {error && (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            Error loading reports: {error.message}
          </Alert>
        </Box>
      )}

      <TableContainer component={Paper} elevation={0} sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : '0 4px 12px rgba(0,0,0,0.1)',
        padding: 0.5, // Add a small padding to separate container border from table
        background: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha(theme.palette.background.paper, 0.8),
        // Make table horizontally scrollable on small screens
        [theme.breakpoints.down('md')]: {
          overflowX: 'auto',
        },
      }}>
        <Table sx={{ 
          minWidth: { xs: 600, md: 'auto' }, // Set minimum width for horizontal scroll on mobile
        }}>
          <TableHead sx={{
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05)
          }}>
            <TableRow>
              <TableCell sx={{ minWidth: 60 }}>ID</TableCell>
              <TableCell sx={{ minWidth: 120 }}>Pelapor</TableCell>
              <TableCell sx={{ minWidth: 150, display: { xs: 'none', sm: 'table-cell' } }}>Lokasi</TableCell>
              <TableCell sx={{ minWidth: 200, display: { xs: 'none', md: 'table-cell' } }}>Waktu Kejadian</TableCell>
              <TableCell sx={{ minWidth: 120 }}>Tanggal</TableCell>
              <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.length > 0 ? (
              paginatedReports.map((report) => (
                <TableRow 
                  key={report.id}
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row" width={80}>
                    #{report.id}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {report.reporter_type === 'admin' 
                          ? (report.pelapor || report.submittedBy || 'Admin') 
                          : (report.user?.name || 'Warga')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {report.reporter_type === 'admin' ? '(Admin)' : '(Warga)'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Typography variant="body2" sx={{ 
                      maxWidth: 150,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {report.address}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {new Date(report.created_at).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
                    <Chip
                      label={getStatusInIndonesian(report.status || 'Pending')}
                      size="small"
                      sx={{
                        ...standardChipStyles,
                        ...getStatusChipStyle(report.status || 'pending', theme),
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  {loading ? 'Loading reports...' : 'No reports found'}
                </TableCell>
              </TableRow>
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
        sx={{
          '& .MuiTablePagination-toolbar': {
            padding: { xs: 1, sm: 2 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          },
        }}
      />
    </Paper>
  );
}

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
  LinearProgress,
  Alert,
  TablePagination,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useApiData } from '../../hooks/useMockApi';

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
      
      {loading && <LinearProgress />}

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
      }}>
        <Table>
          <TableHead sx={{
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05)
          }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pelapor</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status</TableCell>
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
                    {report.user?.name || report.submittedBy || 'Warga'}
                  </TableCell>
                  <TableCell>
                    {report.address}
                  </TableCell>
                  <TableCell>
                    <Typography noWrap sx={{ maxWidth: 250 }}>
                      {report.description}
                    </Typography>
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
                      label={report.status || 'Pending'}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        backgroundColor:
                          report.status === 'Completed' ? alpha((theme.palette.success as any).main, 0.1) :
                          report.status === 'In Progress' ? alpha((theme.palette.warning as any).main, 0.1) :
                          alpha((theme.palette.info as any).main, 0.1),
                        color:
                          report.status === 'Completed' ? (theme.palette.success as any).main :
                          report.status === 'In Progress' ? (theme.palette.warning as any).main :
                          (theme.palette.info as any).main,
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
      />
    </Paper>
  );
}

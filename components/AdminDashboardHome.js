'use client';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { mockDocuments } from '../utils/mockData';

const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : `linear-gradient(145deg, 
          rgba(255, 255, 255, 0.95) 0%, 
          rgba(248, 250, 252, 0.98) 20%,
          rgba(224, 242, 254, 0.9) 40%,
          rgba(241, 245, 249, 0.95) 60%,
          rgba(231, 229, 228, 0.9) 80%,
          rgba(254, 247, 205, 0.95) 100%
        )`,
  borderRadius: 24,
  border: theme.palette.mode === 'dark'
    ? `2px solid rgba(148, 163, 184, 0.25)`
    : `3px solid rgba(37, 99, 235, 0.15)`,
  boxShadow: theme.palette.mode === 'dark'
    ? `0 20px 64px rgba(0, 0, 0, 0.6)`
    : `0 32px 80px rgba(37, 99, 235, 0.12)`,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
  position: 'relative',
  color: theme.palette.text.primary,
  overflow: 'hidden',
}));

const StatCard = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  background: theme.palette.mode === 'dark'
    ? 'rgba(30,41,59,0.85)'
    : 'rgba(255,255,255,0.96)',
  border: `1.5px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.13 : 0.08)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 16px rgba(30,41,59,0.25)'
    : '0 4px 16px rgba(37,99,235,0.07)',
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  p: 2,
}));

export default function AdminDashboardHome() {
  const theme = useTheme();

  // Stats
  const masuk = mockDocuments.filter(d => d.status === 'pending').length;
  const proses = mockDocuments.filter(d => d.status === 'processing').length;
  const selesai = mockDocuments.filter(d => d.status === 'approved').length;
  const ditolak = mockDocuments.filter(d => d.status === 'rejected').length;

  // Table data
  const latestDocs = [...mockDocuments]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 7);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', p: 2 }}>
      <SectionContainer elevation={0} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                        : `linear-gradient(135deg, #2563eb 0%, #059669 50%, #7c3aed 100%)`,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 6px 16px rgba(0, 0, 0, 0.4)'
                        : '0 8px 24px rgba(37, 99, 235, 0.15), 0 4px 12px rgba(16, 185, 129, 0.1)',
                      border: theme.palette.mode === 'dark'
                        ? 'none'
                        : `2px solid rgba(255, 255, 255, 0.8)`,
                    }}
                  >
                    AD
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      fontSize: '1.25rem',
                    }}>
                      Selamat Datang, Admin!
                    </Typography>
                    <Typography variant="body1" sx={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: theme.palette.text.secondary,
                    }}>
                      Panel pengelolaan dokumen & layanan warga
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </SectionContainer>

      <SectionContainer elevation={0} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <Typography variant="h6" sx={{
            fontWeight: 700,
            mb: 2,
            color: theme.palette.text.primary,
            textAlign: 'center',
            fontSize: '1.125rem',
          }}>
            Ringkasan Permohonan
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <PendingIcon color="warning" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{masuk}</Typography>
                  <Typography variant="body2" color="text.secondary">Permohonan Masuk</Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <TrendingUpIcon color="info" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{proses}</Typography>
                  <Typography variant="body2" color="text.secondary">Permohonan Proses</Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <CheckCircleIcon color="success" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{selesai}</Typography>
                  <Typography variant="body2" color="text.secondary">Permohonan Selesai</Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <CancelIcon color="error" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{ditolak}</Typography>
                  <Typography variant="body2" color="text.secondary">Permohonan Ditolak</Typography>
                </Box>
              </StatCard>
            </Grid>
          </Grid>
        </CardContent>
      </SectionContainer>

      <SectionContainer elevation={0}>
        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          <Typography variant="h6" sx={{
            fontWeight: 700,
            mb: 2,
            color: theme.palette.text.primary,
            textAlign: 'center',
            fontSize: '1.125rem',
          }}>
            Permohonan Terbaru
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Dokumen</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {latestDocs.map((doc, idx) => (
                  <TableRow key={doc.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{doc.submittedBy}</TableCell>
                    <TableCell>{doc.title.split('-')[0].trim()}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          doc.status === 'pending'
                            ? 'Pending'
                            : doc.status === 'processing'
                            ? 'Proses'
                            : doc.status === 'approved'
                            ? 'Selesai'
                            : 'Ditolak'
                        }
                        color={
                          doc.status === 'pending'
                            ? 'warning'
                            : doc.status === 'processing'
                            ? 'info'
                            : doc.status === 'approved'
                            ? 'success'
                            : 'error'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(doc.submittedAt).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Lihat Detail">
                          <IconButton size="small"><VisibilityIcon /></IconButton>
                        </Tooltip>
                        {(doc.status === 'pending' || doc.status === 'processing') && (
                          <>
                            <Tooltip title="Setujui">
                              <IconButton size="small" color="success"><DoneIcon /></IconButton>
                            </Tooltip>
                            <Tooltip title="Tolak">
                              <IconButton size="small" color="error"><CloseIcon /></IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {latestDocs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Tidak ada permohonan terbaru.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </SectionContainer>
    </Box>
  );
}

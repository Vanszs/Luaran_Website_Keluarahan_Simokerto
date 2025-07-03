'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
} from '@mui/material';
import {
  NotificationsActive as NotificationsIcon,
  Settings as SettingsIcon,
  Send as SendIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';

export default function AlertSystemPage() {
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [autoAlert, setAutoAlert] = useState(false);

  const alertHistory = [
    {
      id: 1,
      message: 'Alert: Laporan pencurian di Jl. Melati No. 10',
      timestamp: '2024-01-15 14:30:00',
      status: 'sent'
    },
    {
      id: 2,
      message: 'Alert: Area rawan di sekitar pasar',
      timestamp: '2024-01-14 09:15:00',
      status: 'sent'
    }
  ];

  return (
    <Layout title="Sistem Alert">
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Sistem Alert PINTAR
        </Typography>

        <Grid container spacing={2}>
          {/* Alert Settings */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, border: `1px solid ${theme => theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Pengaturan Alert
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={alertEnabled}
                    onChange={(e) => setAlertEnabled(e.target.checked)}
                  />
                }
                label="Aktifkan Sistem Alert"
                sx={{ mb: 2 }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={autoAlert}
                    onChange={(e) => setAutoAlert(e.target.checked)}
                  />
                }
                label="Alert Otomatis"
                sx={{ mb: 2 }}
              />

              <Divider sx={{ my: 2 }} />

              <Button
                variant="contained"
                startIcon={<SendIcon />}
                fullWidth
                size="small"
                disabled={!alertEnabled}
              >
                Kirim Alert Test
              </Button>
            </Paper>
          </Grid>

          {/* Alert Status */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, border: `1px solid ${theme => theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Status Sistem
              </Typography>
              
              <Alert severity={alertEnabled ? "success" : "warning"} sx={{ mb: 2 }}>
                Sistem Alert {alertEnabled ? 'Aktif' : 'Nonaktif'}
              </Alert>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <NotificationsIcon color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  Perangkat Terhubung: 8
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon color="secondary" sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  Total Alert Terkirim: {alertHistory.length}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Alert History */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, border: `1px solid ${theme => theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Riwayat Alert
              </Typography>
              
              {alertHistory.map((alert) => (
                <Card key={alert.id} sx={{ mb: 1, border: `1px solid ${theme => theme.palette.divider}` }}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {alert.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {alert.timestamp}
                        </Typography>
                      </Box>
                      <Chip 
                        label="Terkirim" 
                        size="small" 
                        color="success"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

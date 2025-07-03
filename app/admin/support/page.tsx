'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Send as SendIcon,
  SupportAgent as SupportIcon,
} from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout title="Dukungan">
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Pusat Dukungan Teknis
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Tiket dukungan berhasil dikirim! Tim kami akan segera menghubungi Anda.
          </Alert>
        )}

        <Grid container spacing={2}>
          {/* Support Form */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, border: `1px solid ${theme => theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Kirim Tiket Dukungan
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Subjek"
                      fullWidth
                      size="small"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Kategori</InputLabel>
                      <Select
                        value={formData.category}
                        label="Kategori"
                        onChange={(e) => handleChange('category', e.target.value)}
                        required
                      >
                        <MenuItem value="technical">Masalah Teknis</MenuItem>
                        <MenuItem value="account">Akun & Login</MenuItem>
                        <MenuItem value="feature">Fitur Baru</MenuItem>
                        <MenuItem value="bug">Laporan Bug</MenuItem>
                        <MenuItem value="other">Lainnya</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Prioritas</InputLabel>
                      <Select
                        value={formData.priority}
                        label="Prioritas"
                        onChange={(e) => handleChange('priority', e.target.value)}
                      >
                        <MenuItem value="low">Rendah</MenuItem>
                        <MenuItem value="medium">Sedang</MenuItem>
                        <MenuItem value="high">Tinggi</MenuItem>
                        <MenuItem value="urgent">Mendesak</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Deskripsi Masalah"
                      fullWidth
                      multiline
                      rows={4}
                      size="small"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SendIcon />}
                      size="small"
                    >
                      Kirim Tiket
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Support Info */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, border: `1px solid ${theme => theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Informasi Dukungan
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SupportIcon color="primary" />
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    Tim Support 24/7
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Siap membantu Anda
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Waktu respon rata-rata:
              </Typography>
              
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                <li>
                  <Typography variant="caption">
                    Mendesak: 1-2 jam
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption">
                    Tinggi: 4-6 jam
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption">
                    Sedang: 12-24 jam
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption">
                    Rendah: 1-2 hari
                  </Typography>
                </li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

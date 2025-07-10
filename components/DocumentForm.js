'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  alpha,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CloudUpload as CloudUploadIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Modernized SectionContainer for dark/light mode
const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
    : 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
  borderRadius: 20,
  border: `1.5px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.08)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(30,41,59,0.5), 0 2px 8px rgba(59,130,246,0.08)'
    : '0 8px 32px rgba(37,99,235,0.08), 0 2px 8px rgba(16,185,129,0.04)',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  '&::before': theme.palette.mode === 'dark'
    ? {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 20%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.07) 0%, transparent 60%)',
        zIndex: 0,
        pointerEvents: 'none',
      }
    : {},
}));

export default function DocumentForm() {
  const theme = useTheme();
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Form Pengajuan Dokumen
        </Typography>
        
        <SectionContainer sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nama Lengkap"
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="NIK"
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Tanggal Lahir"
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Alamat Lengkap"
                fullWidth
                multiline
                rows={3}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{
                  py: 2,
                  borderRadius: 2,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                }}
              >
                Upload Dokumen Pendukung
              </Button>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                size="large"
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 4,
                }}
              >
                Kirim Pengajuan
              </Button>
            </Grid>
          </Grid>
        </SectionContainer>
      </Box>
    </LocalizationProvider>
  );
}

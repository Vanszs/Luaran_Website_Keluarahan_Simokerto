'use client';

import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  height: 40,
}));

const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 1) 50%, rgba(241, 245, 249, 0.98) 100%)',
  backdropFilter: 'blur(30px)',
  borderRadius: '20px',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    : '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? `
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 40%)
      `
      : `
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.04) 0%, transparent 40%)
      `,
    animation: 'float 8s ease-in-out infinite',
    pointerEvents: 'none',
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px) scale(1)' },
      '50%': { transform: 'translateY(-5px) scale(1.02)' },
    }
  },
}));

// Form field configurations for different document types
const formConfigs = {
  'SKTM (Surat Keterangan Tidak Mampu)': [
    { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
    { name: 'nik', label: 'NIK', type: 'text', required: true },
    { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true },
    { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true },
    { name: 'alamat', label: 'Alamat', type: 'textarea', required: true },
    { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true },
    { name: 'penghasilan', label: 'Penghasilan per Bulan', type: 'text', required: true },
    { name: 'keperluan', label: 'Keperluan', type: 'textarea', required: true },
  ],
  'Surat Keterangan Domisili': [
    { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
    { name: 'nik', label: 'NIK', type: 'text', required: true },
    { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true },
    { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true },
    { name: 'alamat_domisili', label: 'Alamat Domisili', type: 'textarea', required: true },
    { name: 'rt_rw', label: 'RT/RW', type: 'text', required: true },
    { name: 'kelurahan', label: 'Kelurahan', type: 'text', required: true },
    { name: 'kecamatan', label: 'Kecamatan', type: 'text', required: true },
    { name: 'keperluan', label: 'Keperluan', type: 'textarea', required: true },
  ],
  'Surat Keterangan Usaha (SKU)': [
    { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
    { name: 'nik', label: 'NIK', type: 'text', required: true },
    { name: 'alamat', label: 'Alamat', type: 'textarea', required: true },
    { name: 'nama_usaha', label: 'Nama Usaha', type: 'text', required: true },
    { name: 'jenis_usaha', label: 'Jenis Usaha', type: 'text', required: true },
    { name: 'alamat_usaha', label: 'Alamat Usaha', type: 'textarea', required: true },
    { name: 'modal_usaha', label: 'Modal Usaha', type: 'text', required: true },
    { name: 'lama_usaha', label: 'Lama Usaha', type: 'text', required: true },
    { name: 'keperluan', label: 'Keperluan', type: 'textarea', required: true },
  ],
  // Add more configurations for other document types...
};

export default function DocumentForm({ selectedDocument, onBack }) {
  const [formData, setFormData] = React.useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { documentType: selectedDocument, data: formData });
    // Handle form submission here
  };

  const config = formConfigs[selectedDocument] || [];

  if (!selectedDocument) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '60vh' 
      }}>
        <Typography variant="h6" color="text.secondary">
          Pilih jenis surat dari menu sebelah kiri
        </Typography>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <StyledButton 
            onClick={onBack}
            startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
            variant="outlined"
            size="small"
          >
            Kembali ke Pilihan Surat
          </StyledButton>
        </Box>
        
        <SectionContainer elevation={0}>
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, fontSize: '1.25rem' }}>
              {selectedDocument}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontSize: '0.875rem' }}>
              Lengkapi formulir di bawah ini untuk mengajukan surat keterangan
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {config.map((field, index) => (
                  <Grid item xs={12} md={field.type === 'textarea' ? 12 : 6} key={index}>
                    {field.type === 'date' ? (
                      <DatePicker
                        label={field.label}
                        value={formData[field.name] || null}
                        onChange={(newValue) => handleInputChange(field.name, newValue)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: field.required,
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                              },
                            }
                          }
                        }}
                      />
                    ) : field.type === 'select' ? (
                      <FormControl fullWidth required={field.required}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          value={formData[field.name] || ''}
                          label={field.label}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          sx={{ borderRadius: '12px' }}
                        >
                          {field.options?.map((option, idx) => (
                            <MenuItem key={idx} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <StyledTextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        required={field.required}
                        multiline={field.type === 'textarea'}
                        rows={field.type === 'textarea' ? 3 : 1}
                        variant="outlined"
                      />
                    )}
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <StyledButton
                  variant="outlined"
                  onClick={() => setFormData({})}
                >
                  Reset
                </StyledButton>
                <StyledButton
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
                    },
                  }}
                >
                  Ajukan Surat
                </StyledButton>
              </Box>
            </Box>
          </CardContent>
        </SectionContainer>
      </Box>
    </LocalizationProvider>
  );
}

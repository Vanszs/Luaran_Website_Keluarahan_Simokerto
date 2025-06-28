'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import DatePicker from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '12px 32px',
  textTransform: 'none',
  fontWeight: 600,
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
      <Box sx={{ mb: 2 }}>
        <Button 
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Kembali ke Pilihan Surat
        </Button>
      </Box>
      
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
            {selectedDocument}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
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
                      renderInput={(params) => (
                        <StyledTextField
                          {...params}
                          fullWidth
                          required={field.required}
                        />
                      )}
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
      </StyledCard>
    </LocalizationProvider>
  );
}

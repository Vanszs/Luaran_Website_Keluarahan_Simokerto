'use client';

import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Alert,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  LinearProgress,
  Snackbar,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Send,
  Preview,
  CheckCircle,
  Warning,
  Info,
  CloudUpload,
  Draft
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

// ENHANCED SEMI-3D SECTION CONTAINER - CONSISTENT WITH OTHER COMPONENTS
const SectionContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.95) 100%)'
    : `
        linear-gradient(145deg, 
          rgba(255, 255, 255, 0.98) 0%, 
          rgba(248, 250, 252, 0.95) 20%,
          rgba(224, 242, 254, 0.9) 40%,
          rgba(241, 245, 249, 0.95) 60%,
          rgba(231, 229, 228, 0.9) 80%,
          rgba(254, 247, 205, 0.95) 100%
        )
      `,
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: theme.palette.mode === 'dark'
    ? `2px solid rgba(148, 163, 184, 0.25)`
    : `3px solid rgba(37, 99, 235, 0.15)`,
  boxShadow: theme.palette.mode === 'dark'
    ? `
        0 20px 64px rgba(0, 0, 0, 0.6),
        0 12px 32px rgba(0, 0, 0, 0.4),
        inset 0 2px 0 rgba(255, 255, 255, 0.1),
        inset 0 -2px 0 rgba(0, 0, 0, 0.2)
      `
    : `
        0 32px 80px rgba(37, 99, 235, 0.12),
        0 20px 48px rgba(16, 185, 129, 0.08),
        0 12px 24px rgba(124, 58, 237, 0.06),
        inset 0 2px 0 rgba(255, 255, 255, 0.9),
        inset 0 -2px 0 rgba(37, 99, 235, 0.05)
      `,
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.text.primary,
  
  // STUNNING 3D EFFECTS
  ...(theme.palette.mode === 'light' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 75%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.6) 0%, 
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0.1) 100%
        )
      `,
      borderRadius: '24px',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 3,
      left: 3,
      right: 3,
      bottom: 3,
      background: `
        linear-gradient(135deg, 
          rgba(255, 255, 255, 0.4) 0%, 
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.1) 100%
        )
      `,
      borderRadius: '21px',
      pointerEvents: 'none',
      zIndex: 0,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important',
    }
  }),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(15, 23, 42, 0.8)'
      : 'rgba(255, 255, 255, 0.9)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(148, 163, 184, 0.2)'
      : '2px solid rgba(51, 65, 85, 0.1)',
    color: theme.palette.text.primary,
    transition: 'all 300ms ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(15, 23, 42, 0.9)'
        : 'rgba(255, 255, 255, 1)',
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(96, 165, 250, 0.4)'
        : 'rgba(37, 99, 235, 0.3)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(15, 23, 42, 1)'
        : 'rgba(255, 255, 255, 1)',
      borderColor: theme.palette.primary.main,
    }
  },
}));

// Document Templates Configuration
const documentTemplates = {
  'Surat Keterangan Domisili': {
    steps: ['Informasi Pribadi', 'Detail Domisili', 'Keperluan', 'Preview'],
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true, step: 0 },
      { name: 'nik', label: 'NIK (16 digit)', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, step: 0 },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true, step: 0 },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', required: true, step: 0, options: ['Laki-laki', 'Perempuan'] },
      { name: 'agama', label: 'Agama', type: 'select', required: true, step: 0, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
      { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, step: 0 },
      { name: 'alamat_lengkap', label: 'Alamat Lengkap', type: 'textarea', required: true, step: 1 },
      { name: 'rt', label: 'RT', type: 'text', required: true, step: 1 },
      { name: 'rw', label: 'RW', type: 'text', required: true, step: 1 },
      { name: 'kelurahan', label: 'Kelurahan', type: 'text', required: true, step: 1, default: 'Simokerto' },
      { name: 'kecamatan', label: 'Kecamatan', type: 'text', required: true, step: 1, default: 'Simokerto' },
      { name: 'kota', label: 'Kota', type: 'text', required: true, step: 1, default: 'Surabaya' },
      { name: 'keperluan', label: 'Keperluan Surat', type: 'textarea', required: true, step: 2, placeholder: 'Jelaskan dengan detail keperluan surat ini...' },
      { name: 'keterangan_tambahan', label: 'Keterangan Tambahan', type: 'textarea', required: false, step: 2 }
    ],
    requirements: ['KTP Asli', 'Kartu Keluarga', 'Surat RT/RW'],
    estimatedTime: '2-3 hari kerja',
    description: 'Surat keterangan tempat tinggal untuk keperluan administratif'
  },
  'SKTM (Surat Keterangan Tidak Mampu)': {
    steps: ['Data Diri', 'Kondisi Ekonomi', 'Keperluan', 'Preview'],
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true, step: 0 },
      { name: 'nik', label: 'NIK (16 digit)', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$' },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, step: 0 },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true, step: 0 },
      { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true, step: 0 },
      { name: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, step: 1 },
      { name: 'penghasilan', label: 'Penghasilan per Bulan (Rp)', type: 'number', required: true, step: 1 },
      { name: 'jumlah_tanggungan', label: 'Jumlah Tanggungan Keluarga', type: 'number', required: true, step: 1 },
      { name: 'kondisi_rumah', label: 'Kondisi Rumah', type: 'select', required: true, step: 1, options: ['Milik Sendiri (Sederhana)', 'Kontrak', 'Menumpang', 'Rumah Orang Tua', 'Lainnya'] },
      { name: 'keperluan_surat', label: 'Keperluan Surat', type: 'textarea', required: true, step: 2 },
      { name: 'keterangan_tambahan', label: 'Keterangan Tambahan', type: 'textarea', required: false, step: 2 }
    ],
    requirements: ['KTP Asli', 'Kartu Keluarga', 'Surat RT/RW', 'Foto Rumah', 'Slip Gaji (jika ada)'],
    estimatedTime: '2-3 hari kerja',
    description: 'Surat keterangan kondisi ekonomi tidak mampu untuk bantuan sosial'
  },
  'Surat Keterangan Usaha (SKU)': {
    steps: ['Data Pemilik', 'Detail Usaha', 'Keperluan', 'Preview'],
    fields: [
      { name: 'nama', label: 'Nama Lengkap Pemilik', type: 'text', required: true, step: 0 },
      { name: 'nik', label: 'NIK (16 digit)', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$' },
      { name: 'alamat_pemilik', label: 'Alamat Pemilik', type: 'textarea', required: true, step: 0 },
      { name: 'nama_usaha', label: 'Nama Usaha', type: 'text', required: true, step: 1 },
      { name: 'jenis_usaha', label: 'Jenis Usaha', type: 'select', required: true, step: 1, options: ['Warung Kelontong', 'Toko', 'Rumah Makan', 'Jasa', 'Bengkel', 'Salon/Barbershop', 'Lainnya'] },
      { name: 'alamat_usaha', label: 'Alamat Usaha', type: 'textarea', required: true, step: 1 },
      { name: 'modal_usaha', label: 'Modal Usaha (Rp)', type: 'number', required: true, step: 1 },
      { name: 'lama_usaha', label: 'Lama Usaha (tahun)', type: 'number', required: true, step: 1 },
      { name: 'jumlah_karyawan', label: 'Jumlah Karyawan', type: 'number', required: true, step: 1 },
      { name: 'keperluan', label: 'Keperluan', type: 'textarea', required: true, step: 2 }
    ],
    requirements: ['KTP Asli', 'Kartu Keluarga', 'Foto Tempat Usaha', 'Surat RT/RW'],
    estimatedTime: '3-5 hari kerja',
    description: 'Surat keterangan untuk kegiatan usaha dan perizinan'
  }
};

export default function DocumentForm({ selectedDocument, onBack }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [documentId, setDocumentId] = useState('');

  const template = documentTemplates[selectedDocument];

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const draftKey = `draft_${selectedDocument}`;
    const interval = setInterval(() => {
      if (Object.keys(formData).length > 0) {
        localStorage.setItem(draftKey, JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          step: currentStep
        }));
        setIsDraft(true);
        setSnackbar({ open: true, message: 'Draft tersimpan otomatis', severity: 'info' });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [formData, selectedDocument, currentStep]);

  // Load draft on component mount
  useEffect(() => {
    const draftKey = `draft_${selectedDocument}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        const { timestamp, step, ...data } = draftData;
        setFormData(data);
        setCurrentStep(step || 0);
        setIsDraft(true);
        setSnackbar({ open: true, message: 'Draft dimuat dari penyimpanan lokal', severity: 'success' });
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }

    // Initialize with default values
    if (template) {
      const initialData = {};
      template.fields.forEach(field => {
        if (field.default) {
          initialData[field.name] = field.default;
        }
      });
      setFormData(prev => ({ ...initialData, ...prev }));
    }
  }, [selectedDocument, template]);

  const validateField = (name, value, field) => {
    let error = '';

    if (field.required && (!value || value.toString().trim() === '')) {
      error = `${field.label} wajib diisi`;
    } else if (value && value.toString().trim() !== '') {
      if (field.pattern && !new RegExp(field.pattern).test(value)) {
        if (field.name === 'nik') {
          error = 'NIK harus 16 digit angka';
        } else {
          error = `Format ${field.label} tidak valid`;
        }
      }
      
      if (field.type === 'number') {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 0) {
          error = `${field.label} harus berupa angka positif`;
        }
      }

      if (field.type === 'text' && value.length < 2) {
        error = `${field.label} minimal 2 karakter`;
      }
    }

    return error;
  };

  const validateCurrentStep = () => {
    const stepFields = template.fields.filter(field => field.step === currentStep);
    const newErrors = {};
    let isValid = true;

    stepFields.forEach(field => {
      const error = validateField(field.name, formData[field.name], field);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < template.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      setSnackbar({ open: true, message: 'Mohon lengkapi semua field yang wajib diisi', severity: 'warning' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      setSnackbar({ open: true, message: 'Mohon periksa kembali data yang diisi', severity: 'error' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate document ID
      const newDocumentId = `DOC${Date.now()}`;
      setDocumentId(newDocumentId);
      
      // Remove draft after successful submission
      const draftKey = `draft_${selectedDocument}`;
      localStorage.removeItem(draftKey);
      setIsDraft(false);
      
      setShowSuccess(true);
      setSnackbar({ open: true, message: 'Dokumen berhasil diajukan!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Terjadi kesalahan saat mengirim dokumen', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    const draftKey = `draft_${selectedDocument}`;
    localStorage.setItem(draftKey, JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString(),
      step: currentStep
    }));
    setIsDraft(true);
    setSnackbar({ open: true, message: 'Draft berhasil disimpan', severity: 'success' });
  };

  const resetForm = () => {
    setFormData({});
    setErrors({});
    setCurrentStep(0);
    const draftKey = `draft_${selectedDocument}`;
    localStorage.removeItem(draftKey);
    setIsDraft(false);
    setSnackbar({ open: true, message: 'Form berhasil direset', severity: 'info' });
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'date':
        return (
          <DatePicker
            label={field.label}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => handleInputChange(field.name, newValue ? newValue.format('YYYY-MM-DD') : '')}
            slotProps={{
              textField: {
                fullWidth: true,
                required: field.required,
                error: !!error,
                helperText: error,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }
              }
            }}
          />
        );

      case 'datetime-local':
        return (
          <DateTimePicker
            label={field.label}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => handleInputChange(field.name, newValue ? newValue.toISOString() : '')}
            slotProps={{
              textField: {
                fullWidth: true,
                required: field.required,
                error: !!error,
                helperText: error,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }
              }
            }}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth required={field.required} error={!!error}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
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
            {error && <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>{error}</Typography>}
          </FormControl>
        );

      case 'number':
        return (
          <StyledTextField
            fullWidth
            label={field.label}
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            error={!!error}
            helperText={error}
            inputProps={{ min: 0 }}
            InputProps={{
              startAdornment: field.name.includes('penghasilan') || field.name.includes('modal') ? (
                <Typography variant="body2" sx={{ mr: 1 }}>Rp</Typography>
              ) : null
            }}
          />
        );

      default:
        return (
          <StyledTextField
            fullWidth
            label={field.label}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            multiline={field.type === 'textarea'}
            rows={field.type === 'textarea' ? 3 : 1}
            error={!!error}
            helperText={error}
            placeholder={field.placeholder}
          />
        );
    }
  };

  const renderStepContent = () => {
    if (currentStep === template.steps.length - 1) {
      // Preview Step
      return (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
            Preview Dokumen
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Silakan periksa kembali data yang telah Anda isi sebelum mengirim dokumen.
          </Alert>

          <Grid container spacing={2}>
            {template.fields.map((field) => {
              const value = formData[field.name];
              if (!value) return null;

              return (
                <Grid item xs={12} sm={6} key={field.name}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="caption" color="text.secondary">
                      {field.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                      {field.type === 'number' && (field.name.includes('penghasilan') || field.name.includes('modal'))
                        ? `Rp ${parseInt(value).toLocaleString('id-ID')}`
                        : value}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }

    // Regular form steps
    const stepFields = template.fields.filter(field => field.step === currentStep);
    
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          {template.steps[currentStep]}
        </Typography>
        
        <Grid container spacing={3}>
          {stepFields.map((field) => (
            <Grid item xs={12} md={field.type === 'textarea' ? 12 : 6} key={field.name}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  if (!template) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Template dokumen tidak ditemukan
        </Typography>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ 
        p: 2,
        // BEAUTIFUL GRADIENT BACKGROUND FOR LIGHT MODE
        background: theme => theme.palette.mode === 'dark'
          ? 'transparent'
          : 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 25%, #f1f5f9 50%, #e7e5e4 75%, #fef7cd 100%)',
        minHeight: '100vh',
      }}>
        {/* ENHANCED HEADER */}
        <SectionContainer elevation={0} sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Box>
                <Button
                  onClick={onBack}
                  startIcon={<ArrowBack />}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                >
                  Kembali
                </Button>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {selectedDocument}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
              </Box>
              
              {isDraft && (
                <Chip
                  icon={<Draft />}
                  label="Draft Tersimpan"
                  color="warning"
                  variant="outlined"
                />
              )}
            </Stack>

            {/* Document Info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="caption" color="text.secondary">
                    Estimasi Waktu
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {template.estimatedTime}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="caption" color="text.secondary">
                    Persyaratan Dokumen
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                    {template.requirements.map((req, idx) => (
                      <Chip key={idx} label={req} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>

            {/* Progress Stepper */}
            <Stepper activeStep={currentStep} sx={{ mb: 3 }}>
              {template.steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Progress Bar */}
            <Box sx={{ mb: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={(currentStep / (template.steps.length - 1)) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Step {currentStep + 1} dari {template.steps.length}
              </Typography>
            </Box>
          </CardContent>
        </SectionContainer>

        {/* ENHANCED FORM CONTENT */}
        <SectionContainer elevation={0}>
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
            {renderStepContent()}

            {/* Form Actions */}
            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 4 }}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<Save />}
                  onClick={saveDraft}
                  disabled={Object.keys(formData).length === 0}
                  sx={{
                    borderRadius: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Simpan Draft
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={resetForm}
                  disabled={Object.keys(formData).length === 0}
                  sx={{
                    borderRadius: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Reset
                </Button>
              </Stack>

              <Stack direction="row" spacing={2}>
                {currentStep > 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    Sebelumnya
                  </Button>
                )}
                
                {currentStep < template.steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      borderRadius: 2,
                      background: theme => theme.palette.mode === 'dark'
                        ? theme.palette.primary.main
                        : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: theme => theme.palette.mode === 'dark'
                          ? '0 8px 24px rgba(96, 165, 250, 0.3)'
                          : '0 8px 24px rgba(37, 99, 235, 0.2)',
                      }
                    }}
                  >
                    Selanjutnya
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <Send />}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    sx={{
                      borderRadius: 2,
                      background: theme => theme.palette.mode === 'dark'
                        ? theme.palette.success.main
                        : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: theme => theme.palette.mode === 'dark'
                          ? '0 8px 24px rgba(52, 211, 153, 0.3)'
                          : '0 8px 24px rgba(5, 150, 105, 0.2)',
                      }
                    }}
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Dokumen'}
                  </Button>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </SectionContainer>

        {/* Success Dialog */}
        <Dialog open={showSuccess} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Dokumen Berhasil Diajukan!
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Dokumen Anda telah berhasil diajukan dengan nomor:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'background.default', mb: 3 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                {documentId}
              </Typography>
            </Paper>
            <Alert severity="info" sx={{ textAlign: 'left' }}>
              Dokumen akan diproses dalam waktu <strong>{template.estimatedTime}</strong>. 
              Anda dapat melihat status pengajuan di menu Riwayat.
            </Alert>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
            <Button
              variant="contained"
              onClick={() => {
                setShowSuccess(false);
                onBack();
              }}
              sx={{ minWidth: 120 }}
            >
              Kembali
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}

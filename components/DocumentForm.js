'use client';

import React, { useState, useEffect } from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
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
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Save from '@mui/icons-material/Save';
import Send from '@mui/icons-material/Send';
import Preview from '@mui/icons-material/Preview';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Warning from '@mui/icons-material/Warning';
import Info from '@mui/icons-material/Info';
import CloudUpload from '@mui/icons-material/CloudUpload';
import Drafts from '@mui/icons-material/Drafts';
import CloudQueue from '@mui/icons-material/CloudQueue';
import Store from '@mui/icons-material/Store';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

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

// Modernized form field style for dark mode
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(30,41,59,0.85)'
      : 'rgba(255,255,255,0.95)',
    color: theme.palette.text.primary,
    border: `1.5px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.18 : 0.08)}`,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(30,41,59,0.95)'
        : 'rgba(255,255,255,1)',
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(30,41,59,1)'
        : 'rgba(255,255,255,1)',
      borderColor: theme.palette.primary.main,
    }
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.error.main,
    fontWeight: 500,
  }
}));

const fileRequirementsKeywords = [
  'ktp', 'kartu keluarga', 'kk', 'foto', 'pas foto', 'surat', 'buku nikah', 'dokumen', 'scan'
];

// Helper untuk deteksi kebutuhan upload file dari requirements
function getFileRequirements(requirements) {
  return requirements.filter(req =>
    fileRequirementsKeywords.some(keyword =>
      req.toLowerCase().includes(keyword)
    )
  );
}

// Document Templates Configuration
const documentTemplates = {
  'Surat Keterangan Domisili': {
    steps: ['Informasi Pribadi', 'Detail Domisili', 'Keperluan', 'Cek ulang data'],
    requirements: ['KTP Asli', 'Kartu Keluarga', 'Surat RT/RW'],
    estimatedTime: '2-3 hari kerja',
    description: 'Surat keterangan tempat tinggal untuk keperluan administratif',
    category: 'Kependudukan',
    color: '#2563eb',
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
    ]
  },
  'Surat Keterangan Usaha': {
    steps: ['Data Pemilik', 'Detail Usaha', 'Keperluan', 'Preview'],
    requirements: ['KTP', 'KK', 'Foto Usaha'],
    estimatedTime: '3-5 hari kerja',
    description: 'Legalisasi kegiatan usaha dan perizinan bisnis',
    category: 'Usaha',
    color: '#7c3aed',
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
    ]
  },
  'Surat Keterangan Tidak Mampu': {
    steps: ['Data Diri', 'Kondisi Ekonomi', 'Keperluan', 'Cek Ulang Data'],
    requirements: ['KTP', 'KK', 'Foto Rumah'],
    estimatedTime: '2-3 hari kerja',
    description: 'Verifikasi kondisi ekonomi untuk bantuan sosial',
    category: 'Sosial',
    color: '#059669',
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
    ]
  },
  'Surat Pengantar SKCK': {
    steps: ['Data Diri', 'Keperluan', 'Preview'],
    requirements: ['KTP', 'KK', 'Pas Foto'],
    estimatedTime: '1 hari kerja',
    description: 'Pengantar untuk pengurusan SKCK di kepolisian',
    category: 'Kependudukan',
    color: '#dc2626',
    fields: [
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true, step: 0 },
      { name: 'nik', label: 'NIK (16 digit)', type: 'text', required: true, step: 0, pattern: '^[0-9]{16}$' },
      { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', required: true, step: 0 },
      { name: 'keperluan', label: 'Keperluan', type: 'textarea', required: true, step: 1 }
    ]
  },
  'Surat Keterangan Kelahiran': {
    steps: ['Data Anak', 'Data Orang Tua', 'Keterangan Lahir', 'Preview'],
    requirements: ['KTP Ortu', 'KK', 'Surat RS'],
    estimatedTime: '1-2 hari kerja',
    description: 'Keterangan kelahiran untuk akta kelahiran',
    category: 'Kependudukan',
    color: '#d97706',
    fields: [
      { name: 'nama_anak', label: 'Nama Anak', type: 'text', required: true, step: 0 },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true, step: 0 },
      { name: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', required: true, step: 0 },
      { name: 'nama_ortu', label: 'Nama Orang Tua', type: 'text', required: true, step: 1 },
      { name: 'alamat_ortu', label: 'Alamat Orang Tua', type: 'textarea', required: true, step: 1 },
      { name: 'keterangan', label: 'Keterangan Tambahan', type: 'textarea', required: false, step: 2 }
    ]
  },
  'Surat Keterangan Kematian': {
    steps: ['Data Almarhum', 'Keterangan Kematian', 'Data Pelapor', 'Preview'],
    requirements: ['KTP', 'Surat Dokter'],
    estimatedTime: '1-2 hari kerja',
    description: 'Keterangan kematian untuk akta kematian',
    category: 'Kependudukan',
    color: '#0891b2',
    fields: [
      { name: 'nama_almarhum', label: 'Nama Almarhum', type: 'text', required: true, step: 0 },
      { name: 'tanggal_kematian', label: 'Tanggal Kematian', type: 'date', required: true, step: 1 },
      { name: 'tempat_kematian', label: 'Tempat Kematian', type: 'text', required: true, step: 1 },
      { name: 'nama_pelapor', label: 'Nama Pelapor', type: 'text', required: true, step: 2 },
      { name: 'hubungan', label: 'Hubungan dengan Almarhum', type: 'text', required: true, step: 2 }
    ]
  }
};

// Modernized Header Section for All Document Types
function renderHeaderSection(template, selectedDocument, currentStep, isDraft, theme) {
  return (
    <SectionContainer elevation={0} sx={{ mb: 4, p: 0 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" sx={{
                fontWeight: 800,
                color: template.color || (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main),
                letterSpacing: 0.2,
                mb: 0.5,
                fontSize: { xs: '1.2rem', sm: '1.4rem' }
              }}>
                {selectedDocument}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{
                fontWeight: 500,
                fontSize: '0.98rem',
                mb: 0.5,
                opacity: 0.85
              }}>
                {template?.description}
              </Typography>
              <Chip
                label={template.category}
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 22,
                  mt: 0.5,
                  bgcolor: alpha(template.color || theme.palette.primary.main, 0.12),
                  color: template.color || theme.palette.primary.main,
                  border: `1px solid ${alpha(template.color || theme.palette.primary.main, 0.22)}`,
                }}
              />
            </Box>
            {isDraft && (
              <Chip
                icon={<Drafts />}
                label="Draft Tersimpan"
                color="warning"
                variant="soft"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  borderRadius: 2,
                  px: 1.5,
                  height: 32,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(251,191,36,0.12)'
                    : 'rgba(251,191,36,0.09)',
                  color: theme.palette.warning.main,
                  border: `1.5px solid ${theme.palette.warning.main}22`,
                }}
              />
            )}
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.success.main, 0.08)
                  : alpha(theme.palette.success.main, 0.06),
                border: `1px solid ${alpha(theme.palette.success.main, 0.13)}`,
                minHeight: 70,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Estimasi Waktu
                </Typography>
                <Typography variant="body1" sx={{
                  fontWeight: 700,
                  color: theme.palette.success.main,
                  fontSize: '1.05rem'
                }}>
                  {template.estimatedTime}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.08)
                  : alpha(theme.palette.primary.main, 0.06),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.13)}`,
                minHeight: 70,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Persyaratan Dokumen
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {template.requirements.map((req, idx) => (
                    <Chip
                      key={idx}
                      label={req}
                      size="small"
                      variant="soft"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        borderRadius: 1.5,
                        bgcolor: theme.palette.mode === 'dark'
                          ? alpha(template.color || theme.palette.primary.main, 0.13)
                          : alpha(template.color || theme.palette.primary.main, 0.09),
                        color: template.color || theme.palette.primary.main,
                        border: `1px solid ${alpha(template.color || theme.palette.primary.main, 0.22)}`,
                        height: 26,
                      }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
          <Stack>
            <Stepper activeStep={currentStep} alternativeLabel>
              {template.steps.map((label, idx) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: theme.palette.text.primary,
                        opacity: 0.95
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        </Stack>
      </CardContent>
    </SectionContainer>
  );
}

export default function DocumentForm({ selectedDocument, onBack }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [documentId, setDocumentId] = useState('');
  const [processType, setProcessType] = useState('online');
  const [uploadedFiles, setUploadedFiles] = useState({});

  const template = documentTemplates[selectedDocument];
  const fileRequirements = template ? getFileRequirements(template.requirements || []) : [];

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

  const handleFileChange = (req, e) => {
    setUploadedFiles(prev => ({
      ...prev,
      [req]: e.target.files[0]
    }));
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
      setSnackbar({ 
        open: true, 
        message: `Dokumen berhasil diajukan untuk proses ${processType}!`, 
        severity: 'success' 
      });
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

    // Perbaiki placeholder agar tidak bertumpuk dengan label
    const inputLabelProps = { shrink: true };

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
                InputLabelProps: inputLabelProps,
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
                InputLabelProps: inputLabelProps,
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
            InputLabelProps={inputLabelProps}
          />
        );

      default:
        return (
          <TextField
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
            InputLabelProps={inputLabelProps}
          />
        );
    }
  };

  const renderStepContent = () => {
    const showUploadSection = fileRequirements.length > 0 && currentStep === 0;
    const stepFields = template.fields.filter(field => field.step === currentStep);

    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          {template.steps[currentStep]}
        </Typography>
        <Grid container spacing={3}>
          {stepFields.map((field, idx) => (
            <Grid
              item
              xs={12}
              md={
                field.name === 'pekerjaan' ? 12 :
                stepFields.length === 3 && idx === 2 ? 12 :
                field.type === 'textarea' ? 12 : 6
              }
              key={field.name}
            >
              {/* Tambahkan pilihan online/offline di bawah field keperluan */}
              {field.name === 'keperluan' || field.name === 'keperluan_surat' ? (
                <>
                  {renderField(field)}
                  {/* Keterangan pemilihan pengambilan dokumen */}
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Pilih Pengambilan Dokumen
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      Pilih cara Anda ingin menerima dokumen setelah selesai diproses.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Box
                        sx={{
                          flex: 1,
                          borderRadius: 2,
                          border: processType === 'online'
                            ? `2px solid ${theme.palette.primary.main}`
                            : `1.5px solid ${theme.palette.divider}`,
                          background: processType === 'online'
                            ? (theme.palette.mode === 'dark'
                              ? 'rgba(59,130,246,0.10)'
                              : 'rgba(224,242,254,0.5)')
                            : (theme.palette.mode === 'dark'
                              ? 'rgba(59,130,246,0.04)'
                              : 'rgba(224,242,254,0.15)'),
                          minHeight: 56,
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          px: 2,
                          py: 1,
                          transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                          boxShadow: processType === 'online'
                            ? (theme.palette.mode === 'dark'
                              ? `0 2px 8px ${theme.palette.primary.main}22`
                              : `0 2px 8px ${theme.palette.primary.main}22`)
                            : 'none',
                          '&:hover': {
                            border: `2px solid ${theme.palette.primary.main}`,
                            background: theme.palette.mode === 'dark'
                              ? 'rgba(59,130,246,0.13)'
                              : 'rgba(224,242,254,0.7)',
                          },
                        }}
                        onClick={() => setProcessType('online')}
                      >
                        <CloudQueue sx={{ mr: 1, color: theme.palette.primary.main }} />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: processType === 'online'
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                            }}
                          >
                            Online
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: '0.85rem',
                            }}
                          >
                            Dokumen akan tersedia untuk diunduh setelah selesai diproses.
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          borderRadius: 2,
                          border: processType === 'offline'
                            ? `2px solid ${theme.palette.warning.main}`
                            : `1.5px solid ${theme.palette.divider}`,
                          background: processType === 'offline'
                            ? (theme.palette.mode === 'dark'
                              ? 'rgba(251,191,36,0.10)'
                              : 'rgba(254,247,205,0.5)')
                            : (theme.palette.mode === 'dark'
                              ? 'rgba(251,191,36,0.04)'
                              : 'rgba(254,247,205,0.15)'),
                          minHeight: 56,
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          px: 2,
                          py: 1,
                          transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                          boxShadow: processType === 'offline'
                            ? (theme.palette.mode === 'dark'
                              ? `0 2px 8px ${theme.palette.warning.main}22`
                              : `0 2px 8px ${theme.palette.warning.main}22`)
                            : 'none',
                          '&:hover': {
                            border: `2px solid ${theme.palette.warning.main}`,
                            background: theme.palette.mode === 'dark'
                              ? 'rgba(251,191,36,0.13)'
                              : 'rgba(254,247,205,0.7)',
                          },
                        }}
                        onClick={() => setProcessType('offline')}
                      >
                        <Store sx={{ mr: 1, color: theme.palette.warning.main }} />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: processType === 'offline'
                                ? theme.palette.warning.main
                                : theme.palette.text.primary,
                            }}
                          >
                            Offline
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: '0.85rem',
                            }}
                          >
                            Dokumen dapat diambil langsung di kantor kelurahan setelah selesai diproses.
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </>
              ) : (
                renderField(field)
              )}
            </Grid>
          ))}
          {showUploadSection && (
            <Grid item xs={12}>
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Upload Dokumen Pendukung
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant={uploadedFiles['KTP Asli'] ? "contained" : "outlined"}
                      component="label"
                      startIcon={<UploadFileIcon />}
                      sx={{
                        borderRadius: 2,
                        width: '100%',
                        justifyContent: 'center',
                        textAlign: 'center',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        mb: 1,
                        py: 1.5,
                      }}
                    >
                      {uploadedFiles['KTP Asli'] ? `Uploaded: ${uploadedFiles['KTP Asli'].name}` : `Upload KTP Asli`}
                      <input
                        type="file"
                        hidden
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('KTP Asli', e)}
                      />
                    </Button>
                    {uploadedFiles['KTP Asli'] && (
                      <Typography variant="caption" color="text.secondary">
                        {uploadedFiles['KTP Asli'].name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant={uploadedFiles['Kartu Keluarga'] ? "contained" : "outlined"}
                      component="label"
                      startIcon={<UploadFileIcon />}
                      sx={{
                        borderRadius: 2,
                        width: '100%',
                        justifyContent: 'center',
                        textAlign: 'center',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        mb: 1,
                        py: 1.5,
                      }}
                    >
                      {uploadedFiles['Kartu Keluarga'] ? `Uploaded: ${uploadedFiles['Kartu Keluarga'].name}` : `Upload Kartu Keluarga`}
                      <input
                        type="file"
                        hidden
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('Kartu Keluarga', e)}
                      />
                    </Button>
                    {uploadedFiles['Kartu Keluarga'] && (
                      <Typography variant="caption" color="text.secondary">
                        {uploadedFiles['Kartu Keluarga'].name}
                      </Typography>
                    )}
                  </Grid>
                  {fileRequirements
                    .filter(req => req !== 'KTP Asli' && req !== 'Kartu Keluarga')
                    .map((req) => (
                      <Grid item xs={12} key={req}>
                        <Button
                          variant={uploadedFiles[req] ? "contained" : "outlined"}
                          component="label"
                          startIcon={<UploadFileIcon />}
                          sx={{
                            borderRadius: 999,
                            width: '100%',
                            justifyContent: 'center',
                            textAlign: 'center',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            mb: 1,
                            py: 1.5,
                          }}
                        >
                          {uploadedFiles[req] ? `Uploaded: ${uploadedFiles[req].name}` : `Upload ${req}`}
                          <input
                            type="file"
                            hidden
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(req, e)}
                          />
                        </Button>
                        {uploadedFiles[req] && (
                          <Typography variant="caption" color="text.secondary">
                            {uploadedFiles[req].name}
                          </Typography>
                        )}
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            color="info"
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, template.steps.length - 1))}
            sx={{ borderRadius: 2, mr: 2 }}
          >
            Next (Debug)
          </Button>
        </Box>
      </Box>
    );
  };

  const getStepContent = () => {
    if (currentStep === template.steps.length - 1) {
      return (
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
            Cek Ulang Data Pengajuan
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            Silakan cek ulang semua data yang telah Anda isi sebelum mengirim dokumen. Pastikan tidak ada kesalahan.
          </Alert>
          <Grid container spacing={2}>
            {template.fields.map((field) => {
              const value = formData[field.name];
              if (value === undefined || value === '') return null;
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
            {fileRequirements.length > 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Dokumen Pendukung
                  </Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                    {fileRequirements.map((req) =>
                      uploadedFiles[req] ? (
                        <Chip
                          key={req}
                          label={uploadedFiles[req].name}
                          color="primary"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      ) : (
                        <Chip
                          key={req}
                          label={`Belum upload ${req}`}
                          color="warning"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      )
                    )}
                  </Stack>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      );
    }
    return renderStepContent();
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
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 25%, #f1f5f9 50%, #e7e5e4 75%, #fef7cd 100%)',
        minHeight: '100vh',
      }}>
        {template && renderHeaderSection(template, selectedDocument, currentStep, isDraft, theme)}
        <SectionContainer elevation={0}>
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
            {getStepContent()}

            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 4 }}>
              <Stack direction="row" spacing={2}>
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
            
            <Paper sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: alpha(theme.palette.info.main, 0.1),
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
            }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                {processType === 'online' ? (
                  <>
                    <CloudQueue sx={{ color: 'info.main' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Proses Online - Dokumen dapat diunduh setelah selesai
                    </Typography>
                  </>
                ) : (
                  <>
                    <Store sx={{ color: 'info.main' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Proses Offline - Dokumen diambil di Kelurahan Simokerto
                    </Typography>
                  </>
                )}
              </Stack>
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

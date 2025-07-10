'use client';

import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  marginTop: theme.spacing(8),
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 12px 36px rgba(0, 0, 0, 0.3)'
    : '0 12px 36px rgba(51, 65, 85, 0.1)',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #f43f5e 0%, #ef4444 100%)',
  boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)',
  marginBottom: theme.spacing(3),
}));

export default function Unauthorized() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <StyledPaper>
        <IconWrapper>
          <ErrorOutlineIcon sx={{ fontSize: 60, color: 'white' }} />
        </IconWrapper>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Akses Ditolak
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Maaf, Anda tidak memiliki izin yang diperlukan untuk mengakses halaman ini.
          Harap hubungi administrator untuk bantuan.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => router.push('/admin')}
          sx={{
            mt: 3,
            py: 1.5,
            px: 4,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              boxShadow: '0 12px 32px rgba(59, 130, 246, 0.4)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Kembali ke Dashboard
        </Button>
      </StyledPaper>
    </Container>
  );
}

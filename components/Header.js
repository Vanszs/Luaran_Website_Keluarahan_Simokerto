'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(103, 58, 183, 0.1) 100%)'
    : 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(103, 58, 183, 0.05) 100%)',
  borderRadius: '20px',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
  },
}));

export default function Header() {
  return (
    <StyledCard sx={{ width: '100%', mb: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Breadcrumbs 
            aria-label="breadcrumb" 
            sx={{ 
              fontSize: '0.875rem',
              '& .MuiBreadcrumbs-separator': {
                mx: 1
              }
            }}
          >
            <Link 
              underline="hover" 
              color="inherit" 
              href="/"
              sx={{ 
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s ease',
                fontWeight: 500
              }}
            >
              Home
            </Link>
            <Typography color="primary.main" sx={{ fontWeight: 600 }}>
              Dashboard
            </Typography>
          </Breadcrumbs>
          
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                color: 'text.primary',
                mb: 2,
                background: theme => theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #90caf9 0%, #e1bee7 100%)'
                  : 'linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Selamat Datang di Dashboard
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                fontSize: '1.1rem',
                fontWeight: 500,
                lineHeight: 1.5
              }}
            >
              Kelola data dan layanan Kelurahan Simokerto dengan mudah dan efisien
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

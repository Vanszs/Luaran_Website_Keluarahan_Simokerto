'use client';

import React from 'react';
import { Box, Typography, Paper, Stack, Button, alpha, useTheme } from '@mui/material';
import { Construction as ConstructionIcon, Home as HomeIcon } from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';
import { useRouter } from 'next/navigation';

export default function DevicesPage() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Layout title="Manajemen Perangkat">
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '70vh' 
      }}>
        <Paper 
          elevation={0} 
          sx={{ 
            textAlign: 'center', 
            p: 4, 
            borderRadius: 2,
            maxWidth: 500 
          }}
        >
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2
            }}
          >
            <ConstructionIcon 
              sx={{ 
                fontSize: 40, 
                color: theme.palette.primary.main 
              }} 
            />
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
            Coming Soon
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
            Fitur manajemen perangkat sedang dalam pengembangan dan akan tersedia segera.
            Terima kasih atas kesabaran Anda.
          </Typography>
          
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => router.push('/dashboard')}
            >
              Kembali ke Dashboard
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Layout>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  alpha,
  Skeleton,
  Grid,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import DateRangeFilter, { DateRange } from './DateRangeFilter';

interface ResponsiveReportsWrapperProps {
  title?: string;
  subtitle?: string;
  children: (props: {
    dateRange: DateRange | null;
    onDateRangeChange: (range: DateRange | null) => void;
    isMobile: boolean;
  }) => React.ReactNode;
  loading?: boolean;
  showDateFilter?: boolean;
  className?: string;
}

/**
 * Wrapper component untuk halaman laporan yang responsive
 * Menyediakan filter tanggal dan layout yang konsisten
 */
const ResponsiveReportsWrapper: React.FC<ResponsiveReportsWrapperProps> = ({
  title = "Daftar Laporan",
  subtitle,
  children,
  loading = false,
  showDateFilter = true,
  className = '',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  if (loading) {
    return (
      <Box className={className}>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 2 }} />
        {subtitle && <Skeleton variant="text" width={500} height={20} sx={{ mb: 3 }} />}
        
        {showDateFilter && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Skeleton variant="rectangular" height={40} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton variant="rectangular" height={40} />
              </Grid>
            </Grid>
          </Paper>
        )}
        
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
            overflow: 'hidden',
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Box key={index} sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid item xs={3}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid item xs={4}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid item xs={2}>
                  <Skeleton variant="rectangular" width={80} height={24} />
                </Grid>
                <Grid item xs={1}>
                  <Skeleton variant="circular" width={32} height={32} />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Paper>
      </Box>
    );
  }

  return (
    <Box className={className}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          sx={{ 
            mb: subtitle ? 1 : 0, 
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              fontSize: isMobile ? '0.9rem' : '1rem',
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Date Filter */}
      {showDateFilter && (
        <Box sx={{ mb: 3 }}>
          <DateRangeFilter 
            onDateRangeChange={setDateRange}
          />
        </Box>
      )}

      {/* Content */}
      {children({
        dateRange,
        onDateRangeChange: setDateRange,
        isMobile,
      })}
    </Box>
  );
};

export default ResponsiveReportsWrapper;

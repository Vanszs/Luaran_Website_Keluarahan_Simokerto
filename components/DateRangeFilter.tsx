'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  useTheme,
  alpha,
  Chip,
  Popover,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { 
  getDateRangePresets, 
  formatDateShortIndonesian, 
  validateDateRange,
  getTodayDate 
} from '../utils/dateUtils';
import '../styles/DateRangeFilter.css';

export interface DateRange {
  startDate: string;
  endDate: string;
}

interface DateRangeFilterProps {
  onDateRangeChange: (dateRange: DateRange | null) => void;
  className?: string;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  onDateRangeChange,
  className = '',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [hasActiveFilter, setHasActiveFilter] = useState(false);
  const [error, setError] = useState<string>('');

  // Quick filter presets using utility functions
  const quickFilters = Object.entries(getDateRangePresets()).map(([key, preset]) => ({
    label: preset.label,
    getValue: () => ({
      start: preset.startDate,
      end: preset.endDate
    })
  }));

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleQuickFilter = (filterFn: () => { start: string; end: string }) => {
    const { start, end } = filterFn();
    setStartDate(start);
    setEndDate(end);
    handlePopoverClose();
  };

  const handleApplyFilter = () => {
    if (startDate && endDate) {
      const validation = validateDateRange(startDate, endDate);
      if (validation.isValid) {
        onDateRangeChange({ startDate, endDate });
        setHasActiveFilter(true);
        setError('');
      } else {
        setError(validation.error || 'Rentang tanggal tidak valid');
      }
    }
  };

  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    onDateRangeChange(null);
    setHasActiveFilter(false);
    setError('');
  };

  // Auto-apply filter when both dates are selected
  useEffect(() => {
    if (startDate && endDate) {
      const validation = validateDateRange(startDate, endDate);
      if (validation.isValid) {
        onDateRangeChange({ startDate, endDate });
        setHasActiveFilter(true);
        setError('');
      } else {
        setError(validation.error || 'Rentang tanggal tidak valid');
        setHasActiveFilter(false);
      }
    }
  }, [startDate, endDate, onDateRangeChange]);

  const formatDateForDisplay = (dateStr: string) => {
    return formatDateShortIndonesian(dateStr);
  };

  const open = Boolean(anchorEl);

  if (isMobile) {
    return (
      <Paper
        elevation={0}
        className={`date-range-filter ${className}`}
        sx={{
          p: 2,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
          transition: theme.transitions.create(['background-color', 'border-color'], {
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Filter Tanggal
          </Typography>
          {hasActiveFilter && (
            <Chip
              label={`${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}`}
              onDelete={handleClearFilter}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                color: theme.palette.primary.main,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                transition: theme.transitions.create(['background-color', 'color', 'border-color'], {
                  duration: theme.transitions.duration.short,
                }),
                '& .MuiChip-deleteIcon': {
                  color: theme.palette.primary.main,
                  '&:hover': {
                    color: theme.palette.primary.dark,
                  },
                },
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.16),
                },
              }}
            />
          )}
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Dari Tanggal"
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: getTodayDate(), // Can't select future dates
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '16px', // Prevents zoom on iOS
                  transition: theme.transitions.create(['border-color', 'box-shadow'], {
                    duration: theme.transitions.duration.short,
                  }),
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Sampai Tanggal"
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: startDate || undefined,
                max: getTodayDate(),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '16px',
                  transition: theme.transitions.create(['border-color', 'box-shadow'], {
                    duration: theme.transitions.duration.short,
                  }),
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Error Message */}
        {error && (
          <Box sx={{ mt: 1 }}>
            <Typography 
              variant="caption" 
              color="error" 
              sx={{ 
                fontSize: '0.75rem',
                transition: theme.transitions.create('color', {
                  duration: theme.transitions.duration.short,
                }),
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* Quick Filters for Mobile */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Filter Cepat:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {quickFilters.map((filter) => (
              <Chip
                key={filter.label}
                label={filter.label}
                size="small"
                variant="outlined"
                onClick={() => handleQuickFilter(filter.getValue)}
                sx={{
                  borderRadius: 2,
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.secondary,
                  backgroundColor: 'transparent',
                  transition: theme.transitions.create(['background-color', 'border-color', 'color'], {
                    duration: theme.transitions.duration.short,
                  }),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                  '&:active': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Paper>
    );
  }

  // Desktop Layout
  return (
    <Box className={`date-range-filter ${className}`} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button
        variant={hasActiveFilter ? "contained" : "outlined"}
        startIcon={<CalendarIcon />}
        endIcon={hasActiveFilter ? <ClearIcon /> : <FilterIcon />}
        onClick={hasActiveFilter ? handleClearFilter : handlePopoverOpen}
        className="date-filter-button"
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          minWidth: hasActiveFilter ? 200 : 140,
          transition: theme.transitions.create(['background-color', 'border-color', 'color', 'box-shadow'], {
            duration: theme.transitions.duration.short,
          }),
          ...(hasActiveFilter ? {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: theme.shadows[4],
            },
          } : {
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
            },
          }),
        }}
      >
        {hasActiveFilter 
          ? `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}`
          : 'Filter Tanggal'
        }
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            p: 3,
            borderRadius: 3,
            minWidth: 400,
            boxShadow: theme.shadows[8],
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create(['background-color', 'border-color'], {
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ 
          mb: 2,
          color: theme.palette.text.primary,
          transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
          }),
        }}>
          Pilih Rentang Tanggal
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Dari Tanggal"
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: getTodayDate(),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: theme.transitions.create(['border-color', 'box-shadow'], {
                    duration: theme.transitions.duration.short,
                  }),
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Sampai Tanggal"
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: startDate || undefined,
                max: getTodayDate(),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: theme.transitions.create(['border-color', 'box-shadow'], {
                    duration: theme.transitions.duration.short,
                  }),
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Error Message for Desktop */}
        {error && (
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="caption" 
              color="error" 
              sx={{ 
                fontSize: '0.75rem',
                transition: theme.transitions.create('color', {
                  duration: theme.transitions.duration.short,
                }),
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        <Divider sx={{ 
          mb: 2,
          borderColor: theme.palette.divider,
          transition: theme.transitions.create('border-color', {
            duration: theme.transitions.duration.short,
          }),
        }} />

        <Typography variant="subtitle2" fontWeight={600} sx={{ 
          mb: 1,
          color: theme.palette.text.primary,
          transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
          }),
        }}>
          Filter Cepat
        </Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {quickFilters.map((filter) => (
            <Grid item xs={6} key={filter.label}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleQuickFilter(filter.getValue)}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.secondary,
                  transition: theme.transitions.create(['background-color', 'border-color', 'color'], {
                    duration: theme.transitions.duration.short,
                  }),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                  '&:active': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              >
                {filter.label}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={handlePopoverClose}
            sx={{ 
              textTransform: 'none', 
              borderRadius: 2,
              borderColor: theme.palette.divider,
              color: theme.palette.text.secondary,
              transition: theme.transitions.create(['background-color', 'border-color', 'color'], {
                duration: theme.transitions.duration.short,
              }),
              '&:hover': {
                backgroundColor: alpha(theme.palette.action.hover, 0.08),
                borderColor: theme.palette.text.secondary,
              },
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleApplyFilter();
              handlePopoverClose();
            }}
            disabled={!startDate || !endDate}
            sx={{ 
              textTransform: 'none', 
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              transition: theme.transitions.create(['background-color', 'box-shadow'], {
                duration: theme.transitions.duration.short,
              }),
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: theme.shadows[4],
              },
              '&:disabled': {
                backgroundColor: theme.palette.action.disabledBackground,
                color: theme.palette.action.disabled,
              },
            }}
          >
            Terapkan Filter
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default DateRangeFilter;

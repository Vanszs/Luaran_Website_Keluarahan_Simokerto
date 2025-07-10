import { alpha, Theme } from '@mui/material/styles';

/**
 * Utility function to get consistent status chip styles across the application
 * @param status - The status value (e.g., 'pending', 'completed', etc.)
 * @param theme - MUI theme object
 * @returns Object with backgroundColor, color, and border properties
 */
export const getStatusChipStyle = (status: string, theme: Theme) => {
  const normalizedStatus = status?.toLowerCase();
  
  switch (normalizedStatus) {
    case 'completed':
    case 'approved':
    case 'selesai':
      return {
        backgroundColor: alpha(theme.palette.success.main, 0.15),
        color: theme.palette.success.main,
        border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
      };
    case 'processing':
    case 'in progress':
    case 'diproses':
      return {
        backgroundColor: alpha(theme.palette.warning.main, 0.15),
        color: theme.palette.warning.main,
        border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
      };
    case 'pending':
    case 'menunggu':
      return {
        backgroundColor: alpha(theme.palette.info.main, 0.15),
        color: theme.palette.info.main,
        border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
      };
    case 'rejected':
    case 'ditolak':
      return {
        backgroundColor: alpha(theme.palette.error.main, 0.15),
        color: theme.palette.error.main,
        border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
      };
    default:
      return {
        backgroundColor: alpha(theme.palette.grey[500], 0.15),
        color: theme.palette.grey[600],
        border: `1px solid ${alpha(theme.palette.grey[500], 0.3)}`,
      };
  }
};

/**
 * Helper function to translate status to Indonesian
 * @param status - The status value
 * @returns Indonesian translation of the status
 */
export const getStatusInIndonesian = (status: string): string => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'Menunggu';
    case 'processing': return 'Diproses';
    case 'completed': return 'Selesai';
    case 'rejected': return 'Ditolak';
    case 'approved': return 'Disetujui';
    case 'in progress': return 'Sedang Diproses';
    case 'menunggu': return 'Menunggu';
    case 'diproses': return 'Diproses';
    case 'selesai': return 'Selesai';
    case 'ditolak': return 'Ditolak';
    case 'disetujui': return 'Disetujui';
    default: return status || 'Tidak Diketahui';
  }
};

/**
 * Standard chip styles for consistent appearance across the app
 */
export const standardChipStyles = {
  fontWeight: 600,
  minWidth: 100, // Consistent width for all status chips
  textAlign: 'center' as const,
  px: 2, // Consistent horizontal padding
  py: 0.5, // Consistent vertical padding
  fontSize: '0.75rem',
  '& .MuiChip-label': {
    px: 1, // Inner label padding
  }
};

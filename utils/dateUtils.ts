/**
 * Date utilities for Indonesian formatting and date range filtering
 */

export interface DateRange {
  startDate: string;
  endDate: string;
}

/**
 * Format date to Indonesian locale
 */
export const formatDateIndonesian = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Format date to short Indonesian format
 */
export const formatDateShortIndonesian = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  return formatDateForInput(new Date());
};

/**
 * Get date N days ago in YYYY-MM-DD format
 */
export const getDateDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDateForInput(date);
};

/**
 * Get first day of current month in YYYY-MM-DD format
 */
export const getFirstDayOfMonth = (): string => {
  const date = new Date();
  return formatDateForInput(new Date(date.getFullYear(), date.getMonth(), 1));
};

/**
 * Get first day of current year in YYYY-MM-DD format
 */
export const getFirstDayOfYear = (): string => {
  const date = new Date();
  return formatDateForInput(new Date(date.getFullYear(), 0, 1));
};

/**
 * Check if a date is within a date range
 */
export const isDateInRange = (dateToCheck: string, dateRange: DateRange): boolean => {
  if (!dateRange || !dateToCheck) return true;
  
  const checkDate = new Date(dateToCheck);
  const startDate = new Date(dateRange.startDate);
  const endDate = new Date(dateRange.endDate);
  
  // Set time to start and end of day for proper comparison
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  
  return checkDate >= startDate && checkDate <= endDate;
};

/**
 * Get preset date ranges for quick filters
 */
export const getDateRangePresets = () => {
  const today = getTodayDate();
  
  return {
    today: {
      label: 'Hari Ini',
      startDate: today,
      endDate: today
    },
    last7Days: {
      label: '7 Hari Terakhir',
      startDate: getDateDaysAgo(7),
      endDate: today
    },
    last30Days: {
      label: '30 Hari Terakhir',
      startDate: getDateDaysAgo(30),
      endDate: today
    },
    thisMonth: {
      label: 'Bulan Ini',
      startDate: getFirstDayOfMonth(),
      endDate: today
    },
    thisYear: {
      label: 'Tahun Ini',
      startDate: getFirstDayOfYear(),
      endDate: today
    }
  };
};

/**
 * Format date range for display
 */
export const formatDateRangeDisplay = (dateRange: DateRange): string => {
  if (!dateRange || !dateRange.startDate || !dateRange.endDate) return '';
  
  if (dateRange.startDate === dateRange.endDate) {
    return formatDateShortIndonesian(dateRange.startDate);
  }
  
  return `${formatDateShortIndonesian(dateRange.startDate)} - ${formatDateShortIndonesian(dateRange.endDate)}`;
};

/**
 * Validate date range
 */
export const validateDateRange = (startDate: string, endDate: string): { isValid: boolean; error?: string } => {
  if (!startDate || !endDate) {
    return { isValid: false, error: 'Tanggal mulai dan akhir harus diisi' };
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  
  if (start > end) {
    return { isValid: false, error: 'Tanggal mulai tidak boleh lebih besar dari tanggal akhir' };
  }
  
  if (start > today) {
    return { isValid: false, error: 'Tanggal mulai tidak boleh di masa depan' };
  }
  
  if (end > today) {
    return { isValid: false, error: 'Tanggal akhir tidak boleh di masa depan' };
  }
  
  // Check if date range is not too wide (e.g., max 1 year)
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff > 365) {
    return { isValid: false, error: 'Rentang tanggal tidak boleh lebih dari 1 tahun' };
  }
  
  return { isValid: true };
};

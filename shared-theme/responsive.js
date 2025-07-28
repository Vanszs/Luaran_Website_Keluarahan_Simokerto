'use client';

// Responsive utilities and breakpoints for consistent responsive design
export const responsiveBreakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Common responsive padding patterns
export const responsivePadding = (theme) => ({
  padding: theme.spacing(1), // Mobile: 8px
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2), // Tablet: 16px
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3), // Desktop: 24px
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(4), // Large: 32px
  },
});

// Responsive margin patterns
export const responsiveMargin = (theme) => ({
  margin: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(3),
  },
});

// Container max widths for different screen sizes
export const responsiveContainer = (theme) => ({
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(0, 2), // Mobile: 16px horizontal
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3), // Tablet: 24px horizontal
    maxWidth: '720px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4), // Desktop: 32px horizontal
    maxWidth: '960px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1200px',
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1400px',
  },
});

// Responsive button sizes
export const responsiveButton = (theme) => ({
  minHeight: '44px', // Minimum touch target for mobile
  padding: theme.spacing(1, 2),
  fontSize: '0.875rem',
  [theme.breakpoints.up('sm')]: {
    minHeight: '40px',
    padding: theme.spacing(1, 3),
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    minHeight: '36px',
    padding: theme.spacing(0.75, 2.5),
    fontSize: '0.875rem',
  },
});

// Responsive card styles
export const responsiveCard = (theme) => ({
  padding: theme.spacing(2), // Mobile: 16px
  borderRadius: theme.spacing(1.5), // 12px
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3), // Tablet: 24px
    borderRadius: theme.spacing(2), // 16px
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4), // Desktop: 32px
  },
});

// Responsive grid spacing
export const responsiveGridSpacing = (theme) => ({
  spacing: 1, // Mobile: 8px
  [theme.breakpoints.up('sm')]: {
    spacing: 2, // Tablet: 16px
  },
  [theme.breakpoints.up('md')]: {
    spacing: 3, // Desktop: 24px
  },
});

// Responsive typography helpers
export const responsiveTypography = {
  h1: (theme) => ({
    fontSize: '2rem', // Mobile
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem', // Tablet
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem', // Desktop
    },
  }),
  h2: (theme) => ({
    fontSize: '1.75rem', // Mobile
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem', // Tablet
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.25rem', // Desktop
    },
  }),
  h3: (theme) => ({
    fontSize: '1.5rem', // Mobile
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.75rem', // Tablet
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem', // Desktop
    },
  }),
  body1: (theme) => ({
    fontSize: '0.875rem', // Mobile: 14px
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9rem', // Tablet: 14.4px
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem', // Desktop: 16px
    },
  }),
};

// Responsive table styles
export const responsiveTable = (theme) => ({
  // Mobile: stack table cells vertically
  [theme.breakpoints.down('md')]: {
    '& .MuiTableHead-root': {
      display: 'none',
    },
    '& .MuiTableRow-root': {
      display: 'block',
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
    },
    '& .MuiTableCell-root': {
      display: 'block',
      border: 'none',
      padding: theme.spacing(0.5, 0),
      textAlign: 'left',
      '&:before': {
        content: 'attr(data-label)',
        fontWeight: 'bold',
        display: 'inline-block',
        minWidth: '120px',
        marginRight: theme.spacing(1),
      },
    },
  },
});

// Mobile-first form field styles
export const responsiveFormField = (theme) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    minHeight: '48px', // Better touch target on mobile
    fontSize: '16px', // Prevents zoom on iOS
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.05)',
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px rgba(${theme.palette.primary.main.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(', ')}, 0.25)`,
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.06)',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '44px',
      fontSize: '14px',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    [theme.breakpoints.up('md')]: {
      fontSize: '13px',
    },
  },
});

// Responsive drawer/sidebar widths
export const responsiveDrawer = {
  mobile: 280,
  tablet: 260,
  desktop: 260,
};

// AppBar height responsive
export const responsiveAppBarHeight = (theme) => ({
  minHeight: '56px', // Mobile
  [theme.breakpoints.up('sm')]: {
    minHeight: '64px', // Tablet and up
  },
});

// Common responsive styles for content areas
export const responsiveContentArea = (theme) => ({
  padding: theme.spacing(1), // Mobile: tight padding
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2), // Tablet: medium padding
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3), // Desktop: comfortable padding
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3, 4), // Large: more horizontal padding
  },
});

// Icon button touch targets for mobile
export const responsiveIconButton = (theme) => ({
  minWidth: '44px',
  minHeight: '44px',
  padding: theme.spacing(1.5),
  [theme.breakpoints.up('md')]: {
    minWidth: '40px',
    minHeight: '40px',
    padding: theme.spacing(1),
  },
});

// Stats cards responsive layout
export const responsiveStatsCard = (theme) => ({
  padding: theme.spacing(2),
  minHeight: '120px',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5),
    minHeight: '140px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
    minHeight: '160px',
  },
});

// Navigation responsive utilities
export const responsiveNavigation = (theme) => ({
  // Mobile: hide text, show only icons
  [theme.breakpoints.down('sm')]: {
    '& .nav-text': {
      display: 'none',
    },
    minWidth: '60px',
  },
  // Tablet and up: show text and icons
  [theme.breakpoints.up('sm')]: {
    '& .nav-text': {
      display: 'block',
    },
  },
});

// Responsive dialog/modal sizes
export const responsiveDialog = (theme) => ({
  '& .MuiDialog-paper': {
    margin: theme.spacing(1), // Mobile: minimal margin
    maxWidth: 'calc(100% - 16px)',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3), // Tablet: more margin
      maxWidth: '600px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '800px',
    },
  },
});

// Export all utilities as default
const responsiveUtils = {
  breakpoints: responsiveBreakpoints,
  padding: responsivePadding,
  margin: responsiveMargin,
  container: responsiveContainer,
  button: responsiveButton,
  card: responsiveCard,
  gridSpacing: responsiveGridSpacing,
  typography: responsiveTypography,
  table: responsiveTable,
  formField: responsiveFormField,
  drawer: responsiveDrawer,
  appBarHeight: responsiveAppBarHeight,
  contentArea: responsiveContentArea,
  iconButton: responsiveIconButton,
  statsCard: responsiveStatsCard,
  navigation: responsiveNavigation,
  dialog: responsiveDialog,
};

export default responsiveUtils;

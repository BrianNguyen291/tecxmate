/**
 * Apple-inspired style constants and utilities
 * Use these throughout your components for consistent styling
 */

// Apple color palette
export const appleColors = {
  // Primary colors
  primary: '#0070c9',
  primaryLight: '#3897fe',
  primaryDark: '#0051a5',
  
  // Success colors
  success: '#30d158',
  successLight: '#64e786',
  successDark: '#2e7d32',
  
  // Error colors
  error: '#d70015',
  errorLight: '#ff3b30',
  errorDark: '#c62828',
  
  // Warning colors
  warning: '#bf4800',
  warningLight: '#ff9500',
  warningDark: '#ff9500',
  
  // Text colors
  textPrimary: '#1d1d1f',
  textSecondary: '#6e6e73',
  textTertiary: '#86868b',
  
  // Background colors
  background: '#fafafa',
  backgroundPaper: '#ffffff',
  
  // Border colors
  borderLight: '#e5e5e7',
  borderMedium: '#d2d2d7',
  borderDark: '#86868b',
  
  // Divider colors
  divider: '#f5f5f7',
};

// Typography styles
export const appleTypography = {
  h1: {
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: appleColors.textPrimary,
  },
  h2: {
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: appleColors.textPrimary,
  },
  h3: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: appleColors.textPrimary,
  },
  h4: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: appleColors.textPrimary,
  },
  body1: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: appleColors.textPrimary,
  },
  body2: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: appleColors.textSecondary,
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: appleColors.textTertiary,
  },
};

// Spacing utilities
export const appleSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
};

// Border radius
export const appleRadius = {
  small: '6px',
  medium: '8px',
  large: '12px',
  xlarge: '16px',
};

// Common component styles
export const appleStyles = {
  // Card styles
  card: {
    backgroundColor: appleColors.backgroundPaper,
    borderRadius: appleRadius.large,
    border: `1px solid ${appleColors.borderLight}`,
    boxShadow: 'none',
    '&:hover': {
      borderColor: appleColors.borderMedium,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
  },
  
  // Button styles
  buttonPrimary: {
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: appleRadius.medium,
    padding: '10px 24px',
    backgroundColor: appleColors.primary,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: appleColors.primaryDark,
    },
  },
  
  buttonOutlined: {
    textTransform: 'none',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: appleRadius.medium,
    padding: '10px 24px',
    borderColor: appleColors.borderMedium,
    color: appleColors.textPrimary,
    '&:hover': {
      borderColor: appleColors.borderDark,
      backgroundColor: appleColors.background,
    },
  },
  
  // Chip styles
  chip: {
    fontSize: '12px',
    height: '24px',
    fontWeight: 500,
    borderRadius: appleRadius.small,
  },
  
  chipSuccess: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    border: '1px solid #81c784',
  },
  
  chipWarning: {
    backgroundColor: '#fff4e6',
    color: '#bf4800',
    border: '1px solid #ffd54f',
  },
  
  chipError: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    border: '1px solid #ef5350',
  },
  
  // Table styles
  tableHead: {
    backgroundColor: appleColors.background,
    '& .MuiTableCell-head': {
      fontSize: '13px',
      fontWeight: 600,
      color: appleColors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      padding: '10px 24px',
      borderBottom: `1px solid ${appleColors.borderLight}`,
    },
  },
  
  tableRow: {
    '&:hover': {
      backgroundColor: appleColors.background,
    },
    '&:last-child .MuiTableCell-body': {
      borderBottom: 'none',
    },
  },
  
  // Dialog styles
  dialog: {
    borderRadius: appleRadius.large,
    border: `1px solid ${appleColors.borderLight}`,
  },
  
  dialogTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: appleColors.textPrimary,
    paddingBottom: '16px',
    borderBottom: `1px solid ${appleColors.divider}`,
  },
  
  // Page container
  pageContainer: {
    padding: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: appleColors.background,
    minHeight: '100vh',
  },
  
  // Section spacing
  sectionSpacing: {
    marginTop: '48px',
    marginBottom: '32px',
  },
};

// Helper function to create consistent sx props
export const createAppleSx = (styles) => {
  return (theme) => ({
    ...styles,
  });
};

// Export all together
export default {
  colors: appleColors,
  typography: appleTypography,
  spacing: appleSpacing,
  radius: appleRadius,
  styles: appleStyles,
};


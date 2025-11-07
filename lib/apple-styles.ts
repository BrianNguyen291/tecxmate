/**
 * Apple-inspired style constants and utilities for Tailwind CSS
 * Use these throughout your components for consistent Apple-style design
 */

// Apple color palette (matching CSS variables)
export const appleColors = {
  // Primary colors - Purple
  primary: '#8c52ff',
  primaryLight: '#a978ff',
  primaryDark: '#6b3fcc',
  
  // Success colors - Apple Green
  success: '#30d158',
  successLight: '#64e786',
  successDark: '#2e7d32',
  
  // Error colors - Apple Red
  error: '#d70015',
  errorLight: '#ff3b30',
  errorDark: '#c62828',
  
  // Warning colors - Apple Orange
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
} as const;

// Typography styles (for reference, use Tailwind classes instead)
export const appleTypography = {
  h1: 'text-[32px] font-semibold leading-[1.2] tracking-[-0.02em] text-text-primary',
  h2: 'text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-text-primary',
  h3: 'text-[24px] font-semibold leading-[1.3] tracking-[-0.01em] text-text-primary',
  h4: 'text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-text-primary',
  h5: 'text-[18px] font-semibold leading-[1.4] text-text-primary',
  h6: 'text-[16px] font-semibold leading-[1.4] text-text-primary',
  body1: 'text-[15px] font-normal leading-[1.5] text-text-primary',
  body2: 'text-[13px] font-normal leading-[1.5] text-text-secondary',
  caption: 'text-[12px] font-normal leading-[1.4] text-text-secondary',
} as const;

// Spacing utilities (use Tailwind classes: apple-xs, apple-sm, etc.)
export const appleSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
} as const;

// Border radius (use Tailwind classes: rounded-sm, rounded-md, rounded-lg, rounded-xl)
export const appleRadius = {
  small: '6px',
  medium: '8px',
  large: '12px',
  xlarge: '16px',
} as const;

// Common component Tailwind class combinations
export const appleStyles = {
  // Card styles
  card: 'bg-card border border-border rounded-lg shadow-none hover:border-border-medium hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
  
  // Button styles
  buttonPrimary: 'text-white bg-primary hover:bg-primary-dark text-[14px] font-medium rounded-md px-6 py-2.5 no-underline',
  buttonOutlined: 'border border-border-medium text-text-primary hover:border-border-dark hover:bg-background text-[14px] font-medium rounded-md px-6 py-2.5',
  buttonText: 'text-primary hover:bg-primary/8 text-[14px] font-medium px-6 py-2.5',
  
  // Chip styles
  chip: 'text-xs h-6 font-medium rounded-sm',
  chipSuccess: 'bg-success/10 text-success-dark border border-success/30',
  chipWarning: 'bg-warning/10 text-warning border border-warning/30',
  chipError: 'bg-destructive/10 text-destructive-dark border border-destructive/30',
  
  // Table styles
  tableHead: 'bg-background [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-text-secondary [&_th]:uppercase [&_th]:tracking-[0.02em] [&_th]:py-2.5 [&_th]:px-6 [&_th]:border-b [&_th]:border-border',
  tableRow: 'hover:bg-background [&_td]:text-[14px] [&_td]:text-text-primary [&_td]:py-2.5 [&_td]:px-6 [&_td]:border-b [&_td]:border-divider last:[&_td]:border-b-0',
  
  // Dialog styles
  dialog: 'rounded-lg border border-border shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
  dialogTitle: 'text-[20px] font-semibold text-text-primary pb-4 border-b border-divider',
  dialogContent: 'pt-6 text-[14px]',
  dialogActions: 'p-5 pt-5 border-t border-divider gap-3',
  
  // Page container
  pageContainer: 'p-8 max-w-[1400px] mx-auto bg-background min-h-screen',
  
  // Section spacing
  sectionSpacing: 'mt-12 mb-8',
} as const;

// Helper function to combine Apple styles with custom styles
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Type-safe Apple color keys
export type AppleColorKey = keyof typeof appleColors;

// Export all together
export default {
  colors: appleColors,
  typography: appleTypography,
  spacing: appleSpacing,
  radius: appleRadius,
  styles: appleStyles,
  cn,
};


import { createTheme } from '@mui/material/styles';

// Apple-inspired color palette
const appleColors = {
  // Primary colors
  primary: {
    main: '#0070c9',
    light: '#3897fe',
    dark: '#0051a5',
    contrastText: '#ffffff',
  },
  // Success colors
  success: {
    main: '#30d158',
    light: '#64e786',
    dark: '#2e7d32',
    contrastText: '#ffffff',
  },
  // Error colors
  error: {
    main: '#d70015',
    light: '#ff3b30',
    dark: '#c62828',
    contrastText: '#ffffff',
  },
  // Warning colors
  warning: {
    main: '#bf4800',
    light: '#ff9500',
    dark: '#ff9500',
    contrastText: '#ffffff',
  },
  // Info colors
  info: {
    main: '#0070c9',
    light: '#3897fe',
    dark: '#0051a5',
    contrastText: '#ffffff',
  },
  // Text colors
  text: {
    primary: '#1d1d1f',
    secondary: '#6e6e73',
    disabled: '#86868b',
  },
  // Background colors
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  // Border colors
  border: {
    light: '#e5e5e7',
    medium: '#d2d2d7',
    dark: '#86868b',
  },
  // Divider colors
  divider: '#f5f5f7',
};

// Create Apple-inspired theme
const appleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: appleColors.primary,
    success: appleColors.success,
    error: appleColors.error,
    warning: appleColors.warning,
    info: appleColors.info,
    text: appleColors.text,
    background: appleColors.background,
    divider: appleColors.divider,
  },
  
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
    
    h1: {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: appleColors.text.primary,
    },
    h2: {
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: appleColors.text.primary,
    },
    h3: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: appleColors.text.primary,
    },
    h4: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: appleColors.text.primary,
    },
    h5: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: appleColors.text.primary,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: appleColors.text.primary,
    },
    body1: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: appleColors.text.primary,
    },
    body2: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: appleColors.text.secondary,
    },
    button: {
      fontSize: '14px',
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      color: appleColors.text.secondary,
    },
    overline: {
      fontSize: '11px',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      color: appleColors.text.secondary,
    },
  },

  shape: {
    borderRadius: 12,
  },

  spacing: 4, // Base spacing unit (4px)

  components: {
    // Button styles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 500,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: appleColors.primary.main,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: appleColors.primary.dark,
          },
        },
        outlined: {
          borderColor: appleColors.border.medium,
          color: appleColors.text.primary,
          '&:hover': {
            borderColor: appleColors.border.dark,
            backgroundColor: appleColors.background.default,
          },
        },
        text: {
          color: appleColors.primary.main,
          '&:hover': {
            backgroundColor: 'rgba(0, 112, 201, 0.08)',
          },
        },
      },
    },

    // Card styles
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: appleColors.background.paper,
          borderRadius: '12px',
          border: `1px solid ${appleColors.border.light}`,
          boxShadow: 'none',
          '&:hover': {
            borderColor: appleColors.border.medium,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },

    // Paper styles
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: appleColors.background.paper,
          borderRadius: '12px',
          border: `1px solid ${appleColors.border.light}`,
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: 'none',
          border: `1px solid ${appleColors.border.light}`,
        },
        elevation2: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
        },
      },
    },

    // TextField styles
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            fontSize: '14px',
            '& fieldset': {
              borderColor: appleColors.border.medium,
            },
            '&:hover fieldset': {
              borderColor: appleColors.border.dark,
            },
            '&.Mui-focused fieldset': {
              borderColor: appleColors.primary.main,
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '14px',
            '&.Mui-focused': {
              color: appleColors.primary.main,
            },
          },
        },
      },
    },

    // Chip styles
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          height: '24px',
          fontWeight: 500,
          borderRadius: '6px',
        },
        outlined: {
          borderColor: appleColors.border.medium,
          color: appleColors.text.secondary,
        },
      },
    },

    // Table styles
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: appleColors.background.default,
          '& .MuiTableCell-head': {
            fontSize: '13px',
            fontWeight: 600,
            color: appleColors.text.secondary,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            padding: '10px 24px',
            borderBottom: `1px solid ${appleColors.border.light}`,
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-body': {
            fontSize: '14px',
            color: appleColors.text.primary,
            padding: '10px 24px',
            borderBottom: `1px solid ${appleColors.divider}`,
          },
          '& .MuiTableRow-root': {
            '&:hover': {
              backgroundColor: appleColors.background.default,
            },
            '&:last-child .MuiTableCell-body': {
              borderBottom: 'none',
            },
          },
        },
      },
    },

    // Dialog styles
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          border: `1px solid ${appleColors.border.light}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '20px',
          fontWeight: 600,
          color: appleColors.text.primary,
          paddingBottom: '16px',
          borderBottom: `1px solid ${appleColors.divider}`,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: '24px',
          fontSize: '14px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
          borderTop: `1px solid ${appleColors.divider}`,
          gap: '12px',
        },
      },
    },

    // Tabs styles
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${appleColors.border.light}`,
        },
        indicator: {
          backgroundColor: appleColors.primary.main,
          height: '2px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '15px',
          fontWeight: 400,
          minHeight: '48px',
          padding: '0 24px',
          color: appleColors.text.secondary,
          '&.Mui-selected': {
            color: appleColors.primary.main,
            fontWeight: 500,
          },
        },
      },
    },

    // Select styles
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: appleColors.border.medium,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: appleColors.border.dark,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: appleColors.primary.main,
          },
        },
      },
    },

    // MenuItem styles
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: appleColors.background.default,
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 112, 201, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(0, 112, 201, 0.12)',
            },
          },
        },
      },
    },

    // Avatar styles
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },

    // Divider styles
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: appleColors.divider,
        },
      },
    },

    // Alert styles
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontSize: '13px',
        },
        standardInfo: {
          backgroundColor: '#e8f4f8',
          border: '1px solid #b3d9e6',
          color: appleColors.text.primary,
          '& .MuiAlert-icon': {
            color: appleColors.primary.main,
          },
        },
      },
    },
  },
});

// Export color constants for use in components
export const appleColorPalette = appleColors;

export default appleTheme;


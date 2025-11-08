import { createTheme, ThemeOptions } from '@mui/material/styles';

// Nexus Cortex Design Tokens
export const designTokens = {
  colors: {
    // Primary Trust Colors
    primary: {
      main: '#2563EB', // Digital Trust Blue
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    // Secondary Sovereignty Colors
    secondary: {
      main: '#7C3AED', // Sovereign Purple
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#FFFFFF',
    },
    // Success & Security
    success: {
      main: '#059669', // Verified Green
      light: '#34D399',
      dark: '#047857',
      contrastText: '#FFFFFF',
    },
    // Warning & Caution
    warning: {
      main: '#D97706', // Attention Amber
      light: '#FCD34D',
      dark: '#B45309',
      contrastText: '#000000',
    },
    // Error & Critical
    error: {
      main: '#DC2626', // Critical Red
      light: '#F87171',
      dark: '#B91C1C',
      contrastText: '#FFFFFF',
    },
    // Neutral Trust Scale
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    fontWeightExtraBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.005em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.45,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02em',
      textTransform: 'none' as const,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 2.66,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    trust: '0 0 0 1px rgb(37 99 235 / 0.1), 0 1px 3px 0 rgb(37 99 235 / 0.1)',
    sovereignty: '0 0 0 1px rgb(124 58 237 / 0.1), 0 1px 3px 0 rgb(124 58 237 / 0.1)',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

// Create MUI Theme
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: designTokens.colors.primary,
    secondary: designTokens.colors.secondary,
    success: designTokens.colors.success,
    warning: designTokens.colors.warning,
    error: designTokens.colors.error,
    grey: designTokens.colors.neutral,
    background: {
      default: designTokens.colors.neutral[50],
      paper: '#FFFFFF',
    },
    text: {
      primary: designTokens.colors.neutral[900],
      secondary: designTokens.colors.neutral[600],
    },
  },
  typography: designTokens.typography,
  spacing: (factor: number) => `${factor * 4}px`,
  shape: {
    borderRadius: designTokens.borderRadius.md,
  },
  shadows: [
    designTokens.shadows.none,
    designTokens.shadows.sm,
    designTokens.shadows.md,
    designTokens.shadows.lg,
    designTokens.shadows.xl,
    designTokens.shadows.trust,
    designTokens.shadows.sovereignty,
    ...Array(17).fill(designTokens.shadows.md), // Fill remaining shadow slots
  ] as any,
  breakpoints: designTokens.breakpoints,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: designTokens.shadows.sm,
          '&:hover': {
            boxShadow: designTokens.shadows.md,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${designTokens.colors.primary.main} 0%, ${designTokens.colors.primary.dark} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${designTokens.colors.primary.dark} 0%, ${designTokens.colors.primary.main} 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.xl,
          boxShadow: designTokens.shadows.sm,
          border: `1px solid ${designTokens.colors.neutral[200]}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: designTokens.shadows.sm,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.borderRadius.lg,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          fontWeight: 500,
        },
      },
    },
  },
};

export const nexusTheme = createTheme(themeOptions);
import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link,
  Fade,
  Slide,
} from '@mui/material';
import { styled, keyframes, alpha } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import NextLink from 'next/link';

// Modern animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Constants
const drawerWidth = 280;

// Modern Layout Container - No margin issues
const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

// Modern AppBar with glassmorphism - Reduced opacity for light theme
const ModernAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(15, 23, 42, 0.75)'
    : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(6px)',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.2)'
    : '0 4px 20px rgba(0, 0, 0, 0.05)',
  zIndex: theme.zIndex.drawer - 1, // Keep navbar below drawer to prevent overlap with logo
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
}));

// Main content area with smooth transitions
const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  paddingTop: '64px',
  [theme.breakpoints.up('md')]: {
    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
  },
}));

// Content wrapper with consistent spacing
const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  animation: `${fadeInUp} 0.6s ease-out both`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'rgba(15, 23, 42, 0.02)'
      : 'rgba(255, 255, 255, 0.02)',
    pointerEvents: 'none',
    borderRadius: '24px 0 0 0',
  },
}));

// Modern breadcrumbs
const ModernBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1.5, 2),
  background: theme.palette.mode === 'dark'
    ? 'rgba(30, 41, 59, 0.6)'
    : 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
  animation: `${slideInRight} 0.6s ease-out both`,
  animationDelay: '0.1s',
}));

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'PINTAR Admin' }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setDrawerOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  const generateBreadcrumbs = () => {
    if (!pathname) return null;

    const paths = pathname.split('/').filter(path => path);
    if (paths.length === 0) return null;

    let breadcrumbPath = '';
    
    return (
      <ModernBreadcrumbs aria-label="breadcrumb">
        <Link 
          component={NextLink} 
          href="/admin" 
          color="inherit" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { 
              textDecoration: 'underline',
              color: 'primary.main',
            },
            transition: 'color 0.3s ease',
          }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Dashboard
        </Link>
        
        {paths.map((path, index) => {
          if (path === 'admin') return null;
          
          breadcrumbPath += `/${path}`;
          const isLast = index === paths.length - 1;
          const displayName = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
          
          return isLast ? (
            <Typography key={path} color="text.primary" sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 600,
            }}>
              {displayName}
            </Typography>
          ) : (
            <Link
              key={path}
              component={NextLink}
              href={breadcrumbPath}
              color="inherit"
              sx={{
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { 
                  textDecoration: 'underline',
                  color: 'primary.main',
                },
                transition: 'color 0.3s ease',
              }}
            >
              {displayName}
            </Link>
          );
        })}
      </ModernBreadcrumbs>
    );
  };

  return (
    <LayoutContainer>
      <ModernAppBar position="fixed" open={drawerOpen}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ 
              mr: 2,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              display: 'flex', // Always visible on all breakpoints
              '&:hover': {
                transform: 'scale(1.05)',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Enhanced logo/title styling */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(59, 130, 246, 0.35)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)',
                  borderRadius: 1.5,
                }
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="PINTAR"
                sx={{
                  width: 24,
                  height: 24,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                  zIndex: 2,
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography 
                variant="h6" 
                noWrap 
                sx={{ 
                  fontWeight: 700,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  letterSpacing: '0.01em',
                  lineHeight: 1.2,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  color: alpha(theme.palette.text.secondary, 0.8),
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.02em',
                  ml: 0.1,
                }}
              >
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ColorModeSelect sx={{
              borderRadius: 2,
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'transparent',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.16)'
                  : 'rgba(0,0,0,0.08)',
              },
            }} />
            
            <Tooltip title="Notifications" arrow>
              <IconButton
                color="inherit"
                onClick={handleNotificationMenuOpen}
                sx={{
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
              backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.08)'
                    : 'transparent',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.16)'
                      : 'rgba(0,0,0,0.08)',
              },
            }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account" arrow>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </ModernAppBar>

      <Sidebar 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        variant={isSmallScreen ? "temporary" : "permanent"} 
      />

      <MainContent open={drawerOpen}>
        <ContentWrapper>
          {generateBreadcrumbs()}
          <Fade in timeout={800}>
            <Box sx={{ flexGrow: 1 }}>
              {children}
            </Box>
          </Fade>
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;

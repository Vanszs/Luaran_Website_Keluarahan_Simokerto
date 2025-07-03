import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  useTheme,
  alpha,
  Collapse,
  Badge,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  NotificationsActive as AlertIcon,
  AdminPanelSettings as AdminIcon,
  Report as ReportIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Warning as WarningIcon,
  Assessment as AssessmentIcon,
  CastConnected as DevicesIcon,
  SupportAgent as SupportIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Constants
const drawerWidth = 280;

// Modern Sidebar with glassmorphism - updated with higher z-index
const ModernDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    borderRight: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: theme.palette.mode === 'dark'
      ? '4px 0 20px rgba(0, 0, 0, 0.3)'
      : '4px 0 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowX: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: theme.zIndex.drawer + 2, // Increased z-index to ensure it's above navbar
  },
}));

// Modern header with animation - Add padding for logo area
const ModernDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  minHeight: '64px',
  paddingTop: theme.spacing(2.5), // Added extra top padding for logo area
  justifyContent: 'space-between',
  background: theme.palette.mode === 'dark'
    ? 'rgba(30, 41, 59, 0.95)' // More opaque for better contrast
    : 'rgba(255, 255, 255, 0.95)', // More opaque for better contrast
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
  position: 'sticky',
  top: 0,
  zIndex: 10,
}));

const NavSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2, 1, 2),
}));

const NavLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1),
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  active: boolean;
  onClick?: () => void;
  badge?: number;
  disabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  path,
  active,
  onClick,
  badge,
  disabled = false,
}) => {
  const theme = useTheme();
  
  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        onClick={onClick}
        disabled={disabled}
        selected={active}
        sx={{
          borderRadius: 2,
          py: 1.25,
          px: 1.5,
          '&.Mui-selected': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.primary.main, 0.2)
              : alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary.main, 0.3)
                : alpha(theme.palette.primary.main, 0.15),
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '20%',
              bottom: '20%',
              width: 3,
              borderRadius: '0 2px 2px 0',
              backgroundColor: theme.palette.primary.main,
            }
          },
          '&.Mui-disabled': {
            opacity: 0.6,
          }
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: active ? 'primary.main' : 'text.secondary',
          }}
        >
          {badge ? (
            <Badge badgeContent={badge} color="error" sx={{ '& .MuiBadge-badge': { top: -2, right: -6 } }}>
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </ListItemIcon>
        <ListItemText 
          primary={title} 
          primaryTypographyProps={{ 
            fontSize: '0.9rem',
            fontWeight: active ? 600 : 500,
            color: active ? 'text.primary' : 'text.secondary',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

interface NavCollapseProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavCollapse: React.FC<NavCollapseProps> = ({
  icon,
  title,
  children,
  active = false,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(active);
  
  return (
    <>
      <ListItem disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            borderRadius: 2,
            py: 1.25,
            px: 1.5,
            backgroundColor: open ? (
              theme.palette.mode === 'dark' 
                ? alpha(theme.palette.primary.main, 0.1)
                : alpha(theme.palette.primary.main, 0.05)
            ) : 'transparent',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: open ? 'primary.main' : 'text.secondary',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText 
            primary={title} 
            primaryTypographyProps={{ 
              fontSize: '0.9rem',
              fontWeight: open ? 600 : 500,
              color: open ? 'text.primary' : 'text.secondary',
            }}
          />
          {open ? 
            <ArrowUpIcon fontSize="small" sx={{ color: 'text.secondary' }} /> : 
            <ArrowDownIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          }
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2 }}>
          {children}
        </List>
      </Collapse>
    </>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant = 'permanent' }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const handleComingSoonHover = (title: string) => {
    // You can add a tooltip or snackbar here if needed
    console.log(`${title} - Coming Soon`);
  };
  
  // Define navigation items based on user role
  const isSuperAdmin = user?.role === 'superadmin';
  const basePath = isSuperAdmin ? '/admin' : '/dashboard';
  
  const mainNavItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: isSuperAdmin ? '/admin' : '/dashboard',
      exact: true,
      badge: undefined,
    },
    {
      title: 'Laporan',
      icon: <ReportIcon />,
      path: `${basePath}/reports`,
      badge: undefined,
    },
    {
      title: 'Warga',
      icon: <PeopleIcon />,
      path: `${basePath}/citizens`,
      badge: undefined,
    },
  ];

  // Only show admin management to superadmins
  const adminNavItems = isSuperAdmin ? [
    {
      title: 'Manajemen Admin',
      icon: <AdminIcon />,
      path: '/admin/manage-admins',
    },
    {
      title: 'Pengaturan',
      icon: <SettingsIcon />,
      path: '/admin/settings',
    },
  ] : [];

  return (
    <ModernDrawer
      variant={variant}
      open={open}
      onClose={onClose}
      anchor="left"
      sx={{
        display: { xs: variant === 'temporary' ? 'block' : 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
          [theme.breakpoints.down('md')]: {
            transform: variant === 'temporary' && open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
          },
        },
      }}
    >
      <ModernDrawerHeader>
        <Stack direction="column" spacing={0.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)',
                mr: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 24px rgba(59, 130, 246, 0.5)',
                },
              }}
            >
              <Image src="/logo.png" alt="PINTAR Logo" width={28} height={28} />
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                PINTAR
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.5px',
                }}
              >
                Admin Panel
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ pl: 0.5, pt: 0.5 }}>
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block',
                fontSize: '0.65rem',
                color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
              }}
            >
              Kota Surabaya
            </Typography>
          </Box>
        </Stack>
        
        {variant === 'temporary' && (
          <IconButton 
            onClick={onClose} 
            edge="end" 
            sx={{ 
              color: 'text.secondary',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
      </ModernDrawerHeader>

      <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Main Navigation */}
        <NavSection>
          <NavLabel>Utama</NavLabel>
          <List disablePadding>
            {mainNavItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                title={item.title}
                path={item.path}
                active={isActive(item.path, item.exact)}
                onClick={() => handleNavigation(item.path)}
                badge={item.badge}
              />
            ))}
          </List>
        </NavSection>

        {/* Coming Soon Items */}
        <NavSection>
          <NavLabel>Fitur Lainnya</NavLabel>
          <List disablePadding>
            <Tooltip title="Coming Soon" placement="right" arrow>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onMouseEnter={() => handleComingSoonHover('Statistik')}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 1.5,
                    opacity: 0.5,
                    cursor: 'not-allowed',
                    '&:hover': {
                      bgcolor: 'transparent',
                      opacity: 0.7,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: 'text.disabled',
                    }}
                  >
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Statistik" 
                    primaryTypographyProps={{ 
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'text.disabled',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>

            <Tooltip title="Coming Soon" placement="right" arrow>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onMouseEnter={() => handleComingSoonHover('Perangkat')}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 1.5,
                    opacity: 0.5,
                    cursor: 'not-allowed',
                    '&:hover': {
                      bgcolor: 'transparent',
                      opacity: 0.7,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: 'text.disabled',
                    }}
                  >
                    <DevicesIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Perangkat" 
                    primaryTypographyProps={{ 
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'text.disabled',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
        </NavSection>

        {/* Admin Navigation - Only for superadmin */}
        {isSuperAdmin && adminNavItems.length > 0 && (
          <NavSection>
            <NavLabel>Admin</NavLabel>
            <List disablePadding>
              {adminNavItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  title={item.title}
                  path={item.path}
                  active={isActive(item.path)}
                  onClick={() => handleNavigation(item.path)}
                />
              ))}
            </List>
          </NavSection>
        )}

        <Box sx={{ flexGrow: 1 }} />
        
        {/* User Profile Section */}
        <Box sx={{ p: 2 }}>
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(30, 41, 59, 0.8)' 
                : 'rgba(241, 245, 249, 0.8)',
              border: '1px solid',
              borderColor: theme.palette.divider,
              mb: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 38,
                height: 38,
              }}
            >
              <PersonIcon />
            </Avatar>
            <Box sx={{ ml: 1.5, overflow: 'hidden' }}>
              <Typography 
                variant="subtitle2" 
                sx={{
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.name || 'User'}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block',
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.role || 'Role'}
              </Typography>
            </Box>
            <Tooltip title="Logout">
              <IconButton 
                size="small"
                sx={{ ml: 'auto' }} 
                onClick={() => logout()}
              >
                <PersonIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </ModernDrawer>
  );
};

export default Sidebar;

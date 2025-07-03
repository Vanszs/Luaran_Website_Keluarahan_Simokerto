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
  Badge
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

// Styled components
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#f8fafc',
    backgroundImage: theme.palette.mode === 'dark' 
      ? 'linear-gradient(rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 1))' 
      : 'linear-gradient(rgba(248, 250, 252, 0.95), rgba(248, 250, 252, 1))',
    boxShadow: theme.palette.mode === 'dark'
      ? '1px 0 20px rgba(0, 0, 0, 0.3)'
      : '1px 0 20px rgba(0, 0, 0, 0.08)',
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: 'width 0.3s ease-in-out',
    overflowX: 'hidden',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  minHeight: 64,
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#f8fafc',
  backdropFilter: 'blur(8px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
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
  
  // Define navigation items based on user role
  const isSuperAdmin = user?.role === 'superadmin';
  const basePath = isSuperAdmin ? '/admin' : '/dashboard';
  
  const mainNavItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: isSuperAdmin ? '/admin' : '/dashboard',
      exact: true,
    },
    {
      title: 'Laporan',
      icon: <ReportIcon />,
      path: `${basePath}/reports`,
    },
    {
      title: 'Warga',
      icon: <PeopleIcon />,
      path: `${basePath}/citizens`,
    },
    {
      title: 'Sistem Alert',
      icon: <AlertIcon />,
      path: `${basePath}/alert-system`,
      badge: 3, // Example notification count
    },
  ];

  const analyticsNavItems = [
    {
      title: 'Statistik',
      icon: <AssessmentIcon />,
      path: `${basePath}/statistics`,
    },
    {
      title: 'Perangkat',
      icon: <DevicesIcon />,
      path: `${basePath}/devices`,
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

  const helpNavItems = [
    {
      title: 'Bantuan',
      icon: <HelpIcon />,
      path: `${basePath}/help`,
    },
    {
      title: 'Dukungan',
      icon: <SupportIcon />,
      path: `${basePath}/support`,
    },
  ];

  return (
    <StyledDrawer
      variant={variant}
      open={open}
      onClose={onClose}
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
              mr: 2,
            }}
          >
            <Image src="/logo.png" alt="PINTAR Logo" width={30} height={30} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            PINTAR
          </Typography>
        </Box>
        {variant === 'temporary' && (
          <IconButton onClick={onClose} edge="end" sx={{ color: 'text.secondary' }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </DrawerHeader>

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

        {/* Analytics Navigation */}
        <NavSection>
          <NavLabel>Analitik</NavLabel>
          <List disablePadding>
            {analyticsNavItems.map((item) => (
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

        {/* Help & Support */}
        <NavSection>
          <NavLabel>Bantuan</NavLabel>
          <List disablePadding>
            {helpNavItems.map((item) => (
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
    </StyledDrawer>
  );
};

export default Sidebar;

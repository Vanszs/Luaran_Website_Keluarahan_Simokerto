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
} from '@mui/material';
import { styled } from '@mui/material/styles';
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

// Constants
const drawerWidth = 280;

// Styled components
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0, // Remove all padding to connect seamlessly
  backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
  minHeight: '100vh',
  marginLeft: 0,
  transition: 'none',
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: 0, // Remove margin
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 0,
    },
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
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

  // Responsive drawer handling
  useEffect(() => {
    setDrawerOpen(!isSmallScreen);
  }, [isSmallScreen]);

  // Profile menu handling
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Notification menu handling
  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  // Logout handler
  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    if (!pathname) return null;

    const paths = pathname.split('/').filter(path => path);
    if (paths.length === 0) return null;

    let breadcrumbPath = '';
    
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link 
          component={NextLink} 
          href="/admin" 
          color="inherit" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Admin
        </Link>
        
        {paths.map((path, index) => {
          if (path === 'admin') return null;
          
          breadcrumbPath += `/${path}`;
          const isLast = index === paths.length - 1 || (index === paths.length - 2 && paths[paths.length - 1] === 'admin');
          
          // Convert path to display name
          const displayName = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
          
          return isLast ? (
            <Typography key={path} color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
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
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {displayName}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {title}
          </Typography>
          
          {/* Color Mode Toggle */}
          <ColorModeSelect sx={{ mr: 1 }} />
          
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              onClick={handleNotificationMenuOpen}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* Profile */}
          <Tooltip title="Account">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </StyledAppBar>

      {/* Sidebar */}
      <Sidebar 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        variant={isSmallScreen ? "temporary" : "permanent"} 
      />

      {/* Main Content */}
      <Main open={drawerOpen}>
        <DrawerHeader />
        <Box sx={{ px: 2, py: 1 }}>
          {generateBreadcrumbs()}
          {children}
        </Box>
      </Main>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 1.5,
            borderRadius: 2,
            minWidth: 200,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {user?.name || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {user?.role || 'Role'}
          </Typography>
        </Box>
        
        <Divider />
        
        <MenuItem onClick={() => {
          handleProfileMenuClose();
          router.push('/admin/profile');
        }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        
        <MenuItem onClick={() => {
          handleProfileMenuClose();
          router.push('/admin/settings');
        }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        id="notifications-menu"
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        onClick={handleNotificationMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 1.5,
            borderRadius: 2,
            width: 320,
            maxWidth: '100%',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
          <Typography variant="caption" sx={{ color: 'primary.main', cursor: 'pointer' }}>
            Mark all as read
          </Typography>
        </Box>
        
        <Divider />
        
        <MenuItem sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Avatar sx={{ bgcolor: 'error.light', width: 36, height: 36, mr: 2 }}>
              <NotificationsIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Laporan Baru Diterima
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Laporan dari warga di Jl. Melati No. 10
              </Typography>
              <Typography variant="caption" color="text.secondary">
                5 menit yang lalu
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        
        <Divider />
        
        <MenuItem sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Avatar sx={{ bgcolor: 'info.light', width: 36, height: 36, mr: 2 }}>
              <PersonIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Permintaan Admin Baru
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Admin baru memerlukan persetujuan
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 jam yang lalu
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        
        <Divider />
        
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="primary"
            sx={{ 
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => {
              handleNotificationMenuClose();
              router.push('/admin/notifications');
            }}
          >
            Lihat Semua Notifikasi
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default Layout;

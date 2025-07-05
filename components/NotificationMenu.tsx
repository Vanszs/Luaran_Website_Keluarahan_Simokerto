import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { keyframes, useTheme } from '@mui/material/styles'; // Import keyframes and useTheme

// Define pulse animation directly in the component
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

interface Notification {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Remove NotificationMenuProps interface as setUnreadCount is no longer a prop
export const NotificationMenu: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0); // Manage unreadCount internally
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme(); // Use theme for dynamic background colors

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications/latest');
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications);
          setUnreadCount(data.unreadCount);
        }
      } catch (error: any) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []); // No dependency on setUnreadCount as it's internal

  const handleNotificationClick = async (id: string) => {
    try {
      await fetch(`/api/notifications/mark-as-read?id=${id}`, { method: 'POST' });
      setNotifications(notifications.map(n => 
        n.id === id ? {...n, is_read: true} : n
      ));
      setUnreadCount(prevCount => prevCount - 1);
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        sx={{
          borderRadius: 2,
          transition: 'all 0.3s ease',
          backgroundColor: theme.palette.mode === 'dark'
            ? '#333333' // Solid dark background
            : '#f0f0f0', // Solid light background
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: theme.palette.mode === 'dark'
              ? '#555555' // Darker hover for dark mode
              : '#e0e0e0', // Darker hover for light mode
          },
          '&:active': {
            animation: `${pulse} 0.3s ease-in-out`,
          },
        }}
      >
        <Badge badgeContent={unreadCount} color="error"> {/* Use internal unreadCount */}
          <NotificationsIcon sx={{ color: '#FFD700' }} /> {/* Yellow color */}
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: 300, 
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
            maxHeight: 'calc(100vh - 100px)', 
            overflowY: 'auto',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'white' : 'black'} sx={{ fontStyle: 'italic' }}>
              Tidak ada notifikasi terbaru
            </Typography>
          </MenuItem>
        ) : (
          notifications.slice(0, 5).map(notification => (
            <MenuItem 
              key={notification.id} 
              onClick={() => handleNotificationClick(notification.id)}
              sx={{
                backgroundColor: notification.is_read ? 'inherit' : 'var(--unread-notification-bg)',
                '&:hover': {
                  backgroundColor: notification.is_read ? 'var(--hover-color)' : 'var(--unread-notification-bg-hover)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                whiteSpace: 'normal',
                py: 1.5,
                px: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: notification.is_read ? 'normal' : 'bold' }}>
                {notification.message}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(notification.created_at).toLocaleString()}
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  IconButton,
  Divider,
  Alert,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import Layout from '../../../components/layout/Layout';
import { useAuth } from '../../../contexts/AuthContext';

// Same modern styling as login
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModernCard = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  border: theme.palette.mode === 'dark' 
    ? '1px solid rgba(255, 255, 255, 0.1)' 
    : '1px solid rgba(0, 0, 0, 0.08)',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 16px rgba(0, 0, 0, 0.2)' 
    : '0 4px 16px rgba(0, 0, 0, 0.08)',
  animation: `${fadeInUp} 0.6s ease-out both`,
}));

export default function ProfilePage() {
  const theme = useTheme();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: 'admin@pintar.go.id',
    phone: '+62 812-3456-7890',
    department: 'Kelurahan Simokerto',
    position: user?.role === 'superadmin' ? 'Super Administrator' : 'Administrator',
  });

  const handleSave = () => {
    // Simulate save
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setProfileData({
      name: user?.name || '',
      username: user?.username || '',
      email: 'admin@pintar.go.id',
      phone: '+62 812-3456-7890',
      department: 'Kelurahan Simokerto',
      position: user?.role === 'superadmin' ? 'Super Administrator' : 'Administrator',
    });
  };

  return (
    <Layout title="Profile">
      <Box>
        <Typography 
          variant="h5" 
          fontWeight={700} 
          sx={{ 
            mb: 3,
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Profile Settings
        </Typography>

        {showSuccess && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              animation: `${fadeInUp} 0.6s ease-out both`,
            }}
          >
            Profile updated successfully!
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <ModernCard sx={{ p: 3, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    fontSize: '3rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: '50%',
                    transform: 'translateX(50%)',
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <PhotoCameraIcon />
                </IconButton>
              </Box>
              
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {profileData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {profileData.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profileData.department}
              </Typography>
            </ModernCard>
          </Grid>

          {/* Profile Form */}
          <Grid item xs={12} md={8}>
            <ModernCard sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Personal Information
                </Typography>
                {!isEditing ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    sx={{
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      variant="contained"
                      sx={{ borderRadius: 2 }}
                    >
                      Save
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Username"
                    fullWidth
                    value={profileData.username}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    fullWidth
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    fullWidth
                    value={profileData.department}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Position"
                    fullWidth
                    value={profileData.position}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Security Settings
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </ModernCard>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

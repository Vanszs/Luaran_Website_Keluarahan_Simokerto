'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppTheme from '../../shared-theme/AppTheme';
import AppNavbar from '../../components/AppNavbar';
import SideMenu from '../../components/SideMenu';
import DashboardHome from '../../components/DashboardHome';
import DocumentSelection from '../../components/DocumentSelection';
import DocumentForm from '../../components/DocumentForm';
import RiwayatPage from '../../components/RiwayatPage';

export default function Dashboard() {
  const [currentView, setCurrentView] = React.useState('dashboard');
  const [selectedDocument, setSelectedDocument] = React.useState('');

  const handleViewChange = (view: any) => {
    setCurrentView(view);
    if (view !== 'documents') {
      setSelectedDocument('');
    }
  };

  const handleDocumentSelect = (documentType: any) => {
    setSelectedDocument(documentType);
  };

  const renderContent = () => {
    if (currentView === 'dashboard') {
      return <DashboardHome onViewChange={handleViewChange} />;
    }
    
    if (currentView === 'documents') {
      if (selectedDocument) {
        return (
          <DocumentForm 
            selectedDocument={selectedDocument} 
            onBack={() => setSelectedDocument('')}
          />
        );
      }
      return <DocumentSelection onDocumentSelect={handleDocumentSelect} />;
    }

    if (currentView === 'riwayat') {
      return <RiwayatPage />;
    }
    
    if (currentView === 'settings') {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            Halaman Pengaturan dalam pengembangan
          </Typography>
        </Box>
      );
    }
    
    return null;
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <SideMenu 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <AppNavbar />
        
        {/* Main content - Fixed gap issue */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: 'background.default',
            ml: { xs: 0 },
            pt: { xs: '80px', md: '80px' }, // Consistent top padding
            px: { xs: 2, md: 3 }, // Responsive horizontal padding
            pb: 3,
            minHeight: '100vh',
          }}
        >
          <Box sx={{ maxWidth: '1400px', mx: 'auto', width: '100%' }}>
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}

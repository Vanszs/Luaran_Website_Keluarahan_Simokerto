import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { styled } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ 
  mode: 'light',
  toggleColorMode: () => {} 
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? 
    'rgba(255, 255, 255, 0.1)' : 
    'rgba(0, 0, 0, 0.06)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 
    'rgba(255, 255, 255, 0.08)' : 
    'rgba(0, 0, 0, 0.08)'}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 
      'rgba(255, 255, 255, 0.15)' : 
      'rgba(0, 0, 0, 0.1)',
    transform: 'scale(1.05)',
    boxShadow: theme.palette.mode === 'dark' ?
      '0 4px 12px rgba(255, 255, 255, 0.1)' :
      '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

export default function ColorModeSelect(props) {
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);
  
  if (!mode) {
    return null;
  }

  return (
    <Tooltip 
      title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      placement="bottom"
    >
      <StyledIconButton
        onClick={toggleColorMode}
        {...props}
      >
        {mode === 'light' ? (
          <DarkModeIcon sx={{ fontSize: 20 }} />
        ) : (
          <LightModeIcon sx={{ fontSize: 20 }} />
        )}
      </StyledIconButton>
    </Tooltip>
  );
}
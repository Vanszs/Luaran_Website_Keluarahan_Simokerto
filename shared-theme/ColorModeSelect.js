import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Create a context for color mode
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

export default function ColorModeSelect(props) {
  const { toggleColorMode, mode } = React.useContext(ColorModeContext);

  return (
    <Box sx={props.sx}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

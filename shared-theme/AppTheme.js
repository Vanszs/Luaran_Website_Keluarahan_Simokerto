import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ColorModeContext } from './ColorModeSelect';

import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents, defaultMode = 'light' } = props;
  const [mode, setMode] = React.useState(defaultMode);

  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
  }, []);

  const theme = React.useMemo(() => {
    if (disableCustomTheme) {
      return createTheme({ palette: { mode } });
    }

    return createTheme({
      palette: {
        mode,
        ...(mode === 'light' 
          ? {
              primary: {
                main: '#1976d2',
              },
              background: {
                default: '#f5f7fa',
                paper: '#fff',
              },
            }
          : {
              primary: {
                main: '#90caf9',
              },
              background: {
                default: '#0A1929',
                paper: '#121212',
              },
            }
        ),
      },
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [disableCustomTheme, themeComponents, mode]);

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
  defaultMode: PropTypes.oneOf(['light', 'dark']),
};

export default AppTheme;

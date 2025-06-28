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
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? createTheme({ palette: { mode } })
      : createTheme({
          palette: {
            mode,
            ...(mode === 'light'
              ? {
                  primary: {
                    main: '#1976d2',
                    light: '#42a5f5',
                    dark: '#1565c0',
                  },
                  background: {
                    default: '#f8fafc',
                    paper: '#ffffff',
                  },
                  text: {
                    primary: 'rgba(0, 0, 0, 0.87)',
                    secondary: 'rgba(0, 0, 0, 0.6)',
                  },
                }
              : {
                  primary: {
                    main: '#90caf9',
                    light: '#e3f2fd',
                    dark: '#1976d2',
                  },
                  background: {
                    default: '#0d1117',
                    paper: '#1e1e1e',
                  },
                  text: {
                    primary: 'rgba(255, 255, 255, 0.87)',
                    secondary: 'rgba(255, 255, 255, 0.6)',
                  },
                }),
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
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
  defaultMode: PropTypes.oneOf(['light', 'dark']),
};

export default AppTheme;
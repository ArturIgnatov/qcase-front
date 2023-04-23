import React from 'react';
import { ThemeProvider, Box } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import { MainRouter } from './navigation/MainRouter';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo/client';
import { useAppTheme } from './hooks/app-theme';
import { ColorModeContext } from './contexts/ColorModeContext';
import { SnackbarProvider } from 'notistack';

const sx: SxProps = {
  display: 'flex',
  height: '100vh',
  width: '100wh',
  bgcolor: 'background.default',
  color: 'text.primary',
};

export const App = () => {
  const [theme, context] = useAppTheme();

  return (
    <ApolloProvider client={apolloClient}>
      <ColorModeContext.Provider value={context}>
        <ThemeProvider {...{ theme }}>
          <SnackbarProvider maxSnack={3}>
            <Box {...{ sx }}>
              <MainRouter />
            </Box>
          </SnackbarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ApolloProvider>
  );
};

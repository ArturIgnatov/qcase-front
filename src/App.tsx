import { createContext } from 'react';
import { ThemeProvider, Box } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import { MainRouter } from './navigation/MainRouter';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo/client';
import { useAppTheme } from './hooks/app-theme';
import { ColorModeContext } from './contexts/ColorModeContext';

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
          <Box {...{ sx }}>
            <MainRouter />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ApolloProvider>
  );
};

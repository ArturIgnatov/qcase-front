import { useMemo, useState, createContext } from 'react';
import { createTheme, PaletteMode, ThemeProvider, Box } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import { MainRouter } from './navigation/MainRouter';

const sx: SxProps = {
  display: 'flex',
  height: '100vh',
  width: '100wh',
  bgcolor: 'background.default',
  color: 'text.primary',
};

const ColorModeContext = createContext({} as { toggleColorMode: () => void });

export const App = () => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#e91e63',
          },
          secondary: {
            main: '#2962ff',
          },
        },
        spacing: 4,
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider {...{ theme }}>
        <Box {...{ sx }}>
          <MainRouter />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

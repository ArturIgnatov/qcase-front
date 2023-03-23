import { createTheme, PaletteMode, Theme } from '@mui/material';
import { useMemo, useState } from 'react';

export const useAppTheme = (): [Theme, { toggleColorMode: () => void }] => {
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
            main: '#e91e63', //'#f4511e'
          },
          secondary: {
            main: '#e91e63',
          },
        },
        spacing: 4,
      }),
    [mode],
  );

  return [theme, colorMode];
};

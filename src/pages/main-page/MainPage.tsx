import { useCallback, useState } from 'react';
import { styles } from './styles';
import { Box, useTheme, CssBaseline, BoxProps, styled } from '@mui/material';
import { MainPageDrawer } from './drower/MainPageDrawer';
import { MainAppBar } from './app-bar/MainAppBar';
import { Route, Routes, Outlet } from 'react-router-dom';
import { CasesPage } from '../cases-page/CasesPage';
import { RunnerPage } from '../runner-page/RunnerPage';
import { TestsPage } from '../tests-page/TestsPage';

export const MainPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = useCallback(() => {
    setIsOpened(prevState => !prevState);
  }, []);

  return (
    <Box sx={styles.container}>
      <CssBaseline />
      <MainAppBar {...{ isOpened, handleDrawerOpen }} mode={theme.palette.mode} />
      <MainPageDrawer {...{ isOpened, handleDrawerOpen }} direction={theme.direction} />
      <MainContent>
        <Routes>
          <Route path="/cases/:organizationId" element={<CasesPage />} />
          <Route path="/runner/:organizationId" element={<RunnerPage />} />
          <Route path="/tests/:organizationId" element={<TestsPage />} />
        </Routes>
      </MainContent>
      <Outlet />
    </Box>
  );
};

const MainContent = styled(Box)<BoxProps>(({ theme }) => ({
  marginTop: 64,
  width: '100%',
}));

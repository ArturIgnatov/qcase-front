import { useCallback, useState } from 'react';
import { styles } from './styles';
import { Box, useTheme, CssBaseline, BoxProps, styled } from '@mui/material';
import { MainPageDrawer } from './drower/MainPageDrawer';
import { MainAppBar } from './app-bar/MainAppBar';
import { Route, Routes, Outlet } from 'react-router-dom';
import { TemplatesPage } from '../templates-page/TemplatesPage';
import { RunnerPage } from '../runner-page/RunnerPage';
import { TestsPage } from '../tests-page/TestsPage';
import { JobPlaceholder } from '../../components/job-placeholder/JobPlaceholder';

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
          <Route
            path="/"
            element={
              <Box sx={styles.main}>
                <JobPlaceholder title="Main is work progress" />
              </Box>
            }
          />
          <Route path="/templates/:organizationId" element={<TemplatesPage />} />
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
  flex: 1,
}));

import { FC, memo } from 'react';
import {
  AppBar as MuiAppBar,
  AppBarProps,
  Box,
  IconButton,
  PaletteMode,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { DRAWER_WIDTH } from '../drower/MainPageDrawer';
import { Menu as MenuIcon } from '@mui/icons-material';
import { EndMenu } from './end-menu/EndMenu';
import { matchPath, useLocation } from 'react-router-dom';

interface IProps {
  isOpened: boolean;
  handleDrawerOpen: () => void;
  mode: PaletteMode;
}
const TITLES = {
  '/main/cases/:organizationId': 'Test',
  '/main/tests/:organizationId': 'Cases',
  '/main/runner/:organizationId': 'Runner',
};

export const getPageTitleFromUrl = (pathname: string) => {
  const currentPageTitle = Object.keys(TITLES).find(key => {
    return !!matchPath(pathname, key);
  });

  return currentPageTitle ? TITLES[currentPageTitle as keyof typeof TITLES] : 'HOME';
};

export const MainAppBar: FC<IProps> = memo(({ isOpened, handleDrawerOpen, mode }) => {
  const location = useLocation();
  const page = matchPath(location.pathname, 'main/cases/:organizationId');

  console.log('--------LOC', location);
  console.log('--------page', page);
  return (
    <AppBar position="fixed" color="primary" open={isOpened}>
      <Toolbar sx={{ ml: 3, mr: 5 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(isOpened && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Main
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <EndMenu {...{ mode }} />
      </Toolbar>
    </AppBar>
  );
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps & { open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: DRAWER_WIDTH,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

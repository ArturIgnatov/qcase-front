import { FC, memo } from 'react';
import {
  CSSObject,
  Direction,
  Drawer as MuiDrawer,
  IconButton,
  styled,
  Theme,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { AppMenu } from '../menu/AppMenu';

export const DRAWER_WIDTH = 300;

interface IProps {
  isOpened: boolean;
  handleDrawerOpen: () => void;
  direction: Direction;
}

export const MainPageDrawer: FC<IProps> = memo(({ isOpened, handleDrawerOpen, direction }) => {
  return (
    <Drawer variant="permanent" open={isOpened}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerOpen}>
          {direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <AppMenu {...{ isOpened }} />
    </Drawer>
  );
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(14)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

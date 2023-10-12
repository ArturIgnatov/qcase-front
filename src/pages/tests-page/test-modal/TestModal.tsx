import { FC, forwardRef, ReactElement, Ref, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { useQuery } from '@apollo/client';
import { GLOBAL_TEST_CASES } from '../../../apollo/queries';
import {
  GlobalTestCasesQuery,
  GlobalTestCasesQueryVariables,
} from '../../../apollo/queries-generated-types';

interface IProps {
  title: string;
  testId: string;
  organizationId: string;
  isVisible: boolean;
  closeModal: () => void;
}
const drawerWidth = 600;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

export const TestModal: FC<IProps> = ({ isVisible, closeModal, title, testId, organizationId }) => {
  const { data } = useQuery<GlobalTestCasesQuery, GlobalTestCasesQueryVariables>(
    GLOBAL_TEST_CASES,
    {
      variables: {
        filters: {
          testId,
        },
      },
    },
  );
  const [selectedCase, setSelectedCase] = useState(null);
  const isOpen = !Boolean(selectedCase);

  return (
    <Dialog
      hideBackdrop
      fullScreen
      open={isVisible}
      onClose={closeModal}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'fixed', pl: 4, pr: 4 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeModal} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 4, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Button autoFocus size="small" variant="contained" onClick={() => ''}>
            Take to work
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Main sx={{ bgcolor: 'background.default' }} open={isOpen}>
          <Toolbar />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
            zIndex: 0,
          }}
          variant="persistent"
          anchor="right"
          open={isOpen}
        >
          <Toolbar />
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </Dialog>
  );
};

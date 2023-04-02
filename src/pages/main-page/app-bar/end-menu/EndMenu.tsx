import { FC, memo, MouseEvent, useCallback, useContext, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  PaletteMode,
  styled,
  Tooltip,
} from '@mui/material';
import { AccountCircle, DarkMode, LightMode, Logout, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../../../contexts/ColorModeContext';
import { AuthService } from '../../../../services/auth.service';
import { useQuery } from '@apollo/client';
import { GET_GLOBAL_USER } from '../../../../apollo/queries';
import { GlobalUserQuery } from '../../../../apollo/queries-generated-types';

interface IProps {
  mode: PaletteMode;
}

export const EndMenu: FC<IProps> = memo(({ mode }) => {
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { toggleColorMode } = useContext(ColorModeContext);
  const { data } = useQuery<GlobalUserQuery>(GET_GLOBAL_USER, {
    variables: { id: AuthService.getUserId() },
  });
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = data?.user;

  const openMenu = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const logOut = useCallback(() => {
    closeMenu();
    AuthService.signOut();
    navigate('/auth', { replace: true });
  }, [closeMenu, navigate]);

  const toggleConfirmOpened = useCallback(() => {
    closeMenu();
    setConfirmOpened(prevState => !prevState);
  }, [closeMenu]);

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <IconButton size="large" aria-label="show 17 new notifications" onClick={toggleColorMode}>
        {mode === 'dark' ? <LightMode /> : <DarkMode />}
      </IconButton>
      <Tooltip title="Account settings">
        <IconButton
          onClick={openMenu}
          size="large"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <StyledAvatar>{user?.fname[0] ?? ''}</StyledAvatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        TransitionComponent={Fade}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2.5,
          },
        }}
      >
        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={toggleConfirmOpened}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Dialog
        open={confirmOpened}
        onClose={toggleConfirmOpened}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleConfirmOpened}>Cancel</Button>
          <Button onClick={logOut} autoFocus>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 26,
  height: 26,
  fontSize: 15,
  background:
    theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
}));

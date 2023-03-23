import { FC, Fragment, memo, useCallback, useState } from 'react';
import { MenuItem } from '../menu-item/MenuItem';
import { BugReport, FormatListBulleted, PlayArrow, Settings } from '@mui/icons-material';
import { Avatar, Collapse, colors, IconButton, List, Paper, styled } from '@mui/material';
import { styles } from '../styles';
import { useNavigate } from 'react-router-dom';
import { OrganizationModal } from '../../../../components/organization-modal/OrganizationModal';

interface IProps {
  id: string;
  name: string;
  description: string;
  isOpened: boolean;
  selectedRoute?: string;
}

export const OrganizationMenu: FC<IProps> = memo(
  ({ id, isOpened, selectedRoute, name, description }) => {
    const [openSettings, setOpenSettings] = useState(false);
    const [open, setOpen] = useState(!!selectedRoute);
    const navigate = useNavigate();

    const toggleOpenSettings = useCallback(() => {
      setOpenSettings(prevState => !prevState);
    }, []);

    const toggleOpen = useCallback(() => {
      setOpen(prevState => !prevState);
    }, []);

    const navigateToCases = useCallback(() => {
      navigate(`cases/${id}`);
    }, [id, navigate]);

    const navigateToRunner = useCallback(() => {
      navigate(`runner/${id}`);
    }, [id, navigate]);

    const navigateToTests = useCallback(() => {
      navigate(`tests/${id}`);
    }, [id, navigate]);

    return (
      <Fragment>
        <MenuItem
          text={name}
          divider={!open && !isOpened}
          onClick={toggleOpen}
          secondaryAction={
            <IconButton onClick={toggleOpenSettings}>
              <Settings fontSize="small" />
            </IconButton>
          }
        >
          <StyledAvatar>{name[0]}</StyledAvatar>
        </MenuItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: isOpened ? 4 : 0, ...styles.submenu }}>
            <MenuItem
              text="Runner"
              selected={selectedRoute === 'Runner'}
              onClick={navigateToRunner}
            >
              <PlayArrow />
            </MenuItem>
            <MenuItem text="Tests" selected={selectedRoute === 'Tests'} onClick={navigateToTests}>
              <BugReport />
            </MenuItem>
            <MenuItem
              text="Cases"
              selected={selectedRoute === 'Cases'}
              divider={!isOpened}
              onClick={navigateToCases}
            >
              <FormatListBulleted />
            </MenuItem>
          </List>
        </Collapse>
        <OrganizationModal
          isVisible={openSettings}
          closeModal={toggleOpenSettings}
          organizationInfo={{ id, description, name }}
        />
      </Fragment>
    );
  },
);

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 25,
  height: 25,
  fontSize: 15,
  background: theme.palette.secondary.main,
}));

import { FC, memo, useCallback, useState } from 'react';
import { Collapse, List } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { styles } from './styles';
import { MenuItem } from './menu-item/MenuItem';
import { OrganizationMenu } from './organization-menu/OrganizationMenu';
import { useQuery } from '@apollo/client';
import { GET_GLOBAL_ORGANIZATIONS } from '../../../apollo/queries';
import { AuthService } from '../../../services/auth.service';
import { CreateOrganization } from './create-organization/CreateOrganization';
import { useLocation, matchRoutes } from 'react-router-dom';

interface IProps {
  isOpened: boolean;
}

const routes = [
  { path: 'main/cases/:id', name: 'Cases' },
  { path: 'main/tests/:id', name: 'Tests' },
  { path: 'main/runner/:id', name: 'Runner' },
];

export const AppMenu: FC<IProps> = memo(({ isOpened }) => {
  const [open, setOpen] = useState(true);
  const { data } = useQuery<{
    organizations: Array<{ id: string; name: string; description: string }>;
  }>(GET_GLOBAL_ORGANIZATIONS, { variables: { userId: AuthService.getUserId() } });
  const organizations = data?.organizations ?? [];
  const location = useLocation();
  const matchedRoutes = matchRoutes(routes, location);
  const toggleOpen = useCallback(() => {
    setOpen(prevState => !prevState);
  }, []);

  console.log('matchedRoutes', matchedRoutes);
  const route = matchedRoutes?.[0];
  const selectedRouteId = route?.params.id ?? '';
  const selectedRouteName = route?.route.name ?? '';

  return (
    <List sx={styles.container}>
      <CreateOrganization disabled={!organizations.length} collapseOrganization={toggleOpen} />
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding sx={{ pl: isOpened ? 4 : 0, ...styles.submenu }}>
          {organizations.map(el => (
            <OrganizationMenu
              key={el.id}
              selectedRoute={selectedRouteId === el.id ? selectedRouteName : undefined}
              {...el}
              {...{ isOpened }}
            />
          ))}
        </List>
      </Collapse>
      <MenuItem text="Settings" onClick={() => ''}>
        <Settings />
      </MenuItem>
    </List>
  );
});
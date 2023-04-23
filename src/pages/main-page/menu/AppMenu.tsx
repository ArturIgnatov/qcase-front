import { FC, memo, useCallback, useState } from 'react';
import { Collapse, List } from '@mui/material';
import { Settings, Home } from '@mui/icons-material';
import { styles } from './styles';
import { MenuItem } from './menu-item/MenuItem';
import { OrganizationMenu } from './organization-menu/OrganizationMenu';
import { useQuery } from '@apollo/client';
import { GET_GLOBAL_ORGANIZATIONS } from '../../../apollo/queries';
import { AuthService } from '../../../services/auth.service';
import { CreateOrganization } from './create-organization/CreateOrganization';
import { useLocation, matchRoutes, useNavigate } from 'react-router-dom';
import {
  GlobalOrganizationQuery,
  GlobalOrganizationQueryVariables,
} from '../../../apollo/queries-generated-types';

interface IProps {
  isOpened: boolean;
}

const routes = [
  { path: 'main/templates/:id', name: 'Templates' },
  { path: 'main/tests/:id', name: 'Tests' },
  { path: 'main/runner/:id', name: 'Runner' },
];

export const AppMenu: FC<IProps> = memo(({ isOpened }) => {
  const [open, setOpen] = useState(true);

  const { data } = useQuery<GlobalOrganizationQuery, GlobalOrganizationQueryVariables>(
    GET_GLOBAL_ORGANIZATIONS,
    {
      variables: { filters: { userId: AuthService.getUserId() } },
    },
  );

  const organizations = data?.organizations ?? [];
  const navigate = useNavigate();
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
      <MenuItem text="Main" divider onClick={() => navigate('/main')}>
        <Home />
      </MenuItem>
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

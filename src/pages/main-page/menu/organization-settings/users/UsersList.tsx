import { FC, memo } from 'react';
import { Collapse, List, ListSubheader } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { GlobalOrganizationUsersQuery } from '../../../../../apollo/queries-generated-types';
import { UserItem } from './UserItem';

interface IProps {
  users?: GlobalOrganizationUsersQuery['organizationUsers'];
}

export const UsersList: FC<IProps> = memo(({ users }) => {
  return (
    <List
      sx={{ flexGrow: 1 }}
      subheader={
        <ListSubheader
          sx={{ backgroundColor: 'transparent' }}
          component="div"
          id="users-list-subheader"
        >
          Users
        </ListSubheader>
      }
    >
      <TransitionGroup appear>
        {users?.map(el => (
          <Collapse key={el.user.id}>
            <UserItem {...el.user} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
});

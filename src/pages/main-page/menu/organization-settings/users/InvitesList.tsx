import { FC, memo } from 'react';
import { Collapse, List, ListSubheader } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { GlobalInvitesQuery } from '../../../../../apollo/queries-generated-types';
import { InviteItem } from './InviteItem';

interface IProps {
  invites?: GlobalInvitesQuery['userInvites'];
}

export const InvitesList: FC<IProps> = memo(({ invites }) => {
  return (
    <List
      sx={{ flexGrow: 1 }}
      subheader={
        <ListSubheader
          sx={{ backgroundColor: 'transparent' }}
          component="div"
          id="invite-list-subheader"
        >
          User invites
        </ListSubheader>
      }
    >
      <TransitionGroup appear>
        {invites?.map(el => (
          <Collapse key={el.id}>
            <InviteItem {...el} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
});

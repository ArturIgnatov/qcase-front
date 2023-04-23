import { FC, memo } from 'react';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { GlobalInvitesQuery } from '../../../../../apollo/queries-generated-types';
import moment from 'moment';

type IProps = GlobalInvitesQuery['userInvites'][number];

export const InviteItem: FC<IProps> = memo(({ email, createdAt }) => {
  console.log('createdAt', createdAt);
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" color="error" aria-label="settings" onClick={() => ''}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>{email[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={email}
        secondary={`Expires ${moment(createdAt).add(24, 'hours').fromNow()}`}
      />
    </ListItem>
  );
});

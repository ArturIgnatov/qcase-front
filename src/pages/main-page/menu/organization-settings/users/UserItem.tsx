import { FC, memo } from 'react';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { GlobalOrganizationUsersQuery } from '../../../../../apollo/queries-generated-types';

type IProps = GlobalOrganizationUsersQuery['organizationUsers'][number]['user'];

export const UserItem: FC<IProps> = memo(({ id, email, fname, lname }) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" color="error" aria-label="settings" onClick={() => ''}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton disableTouchRipple>
        <ListItemAvatar>
          <Avatar>{fname[0] + (lname[0] ?? '')}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={fname + ' ' + lname} secondary={email} />
      </ListItemButton>
    </ListItem>
  );
});

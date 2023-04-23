import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  TextField,
  Zoom,
} from '@mui/material';
import { styles } from './styles';
import { useMutation, useQuery } from '@apollo/client';
import { GLOBAL_ORGANIZATION_USERS, GLOBAL_USER_INVITES } from '../../../../../apollo/queries';
import {
  GlobalInvitesQuery,
  GlobalInvitesQueryVariables,
  GlobalOrganizationUsersQuery,
  GlobalOrganizationUsersQueryVariables,
} from '../../../../../apollo/queries-generated-types';
import { UsersList } from './UsersList';
import AddIcon from '@mui/icons-material/Add';
import { InvitesList } from './InvitesList';
import { CREATE_USER_INVITE } from '../../../../../apollo/mutations';
import {
  CreateUserInviteMutation,
  CreateUserInviteMutationVariables,
} from '../../../../../apollo/mutations-generated-types';
import { DialogHeader } from '../../../../../components/dialog-header/DialogHeader';
import { useModalVisible } from '../../../../../hooks/modal-visible';
import { useSnackbar } from 'notistack';
import { Send } from '@mui/icons-material';

interface IProps {
  id: string;
}

export const OrganizationUsers: FC<IProps> = memo(({ id }) => {
  const { isVisible, openModal, closeModal } = useModalVisible();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');

  const { data: users } = useQuery<
    GlobalOrganizationUsersQuery,
    GlobalOrganizationUsersQueryVariables
  >(GLOBAL_ORGANIZATION_USERS, {
    variables: {
      data: {
        organizationId: id,
      },
    },
  });

  const { data: invites } = useQuery<GlobalInvitesQuery, GlobalInvitesQueryVariables>(
    GLOBAL_USER_INVITES,
    {
      variables: {
        filters: {
          organizationId: id,
        },
      },
    },
  );

  const handleSetEmail = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  }, []);

  const [createUserInviteMutation, { loading }] = useMutation<
    CreateUserInviteMutation,
    CreateUserInviteMutationVariables
  >(CREATE_USER_INVITE, {
    variables: {
      data: {
        organizationId: id,
        email,
      },
    },
    update(cache, { data }) {
      const queryData = cache.readQuery<GlobalInvitesQuery, GlobalInvitesQueryVariables>({
        variables: { filters: { organizationId: id } },
        query: GLOBAL_USER_INVITES,
      });

      const prevInvites = queryData?.userInvites ?? [];
      cache.writeQuery<GlobalInvitesQuery, GlobalInvitesQueryVariables>({
        variables: { filters: { organizationId: id } },
        query: GLOBAL_USER_INVITES,
        data: {
          userInvites: data?.createUserInvite
            ? [...prevInvites, data.createUserInvite]
            : prevInvites,
        },
      });
    },
  });

  const createUserInvite = useCallback(() => {
    createUserInviteMutation()
      .then(() => {
        enqueueSnackbar('Invitation sent successfully', { variant: 'success' });
      })
      .catch(e => {
        enqueueSnackbar(e.message, {
          variant: 'error',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        });
      })
      .finally(() => {
        closeModal();
        setEmail('');
      });
  }, [closeModal, createUserInviteMutation, enqueueSnackbar]);

  return (
    <Box sx={styles.container}>
      <UsersList users={users?.organizationUsers} />
      {!!invites?.userInvites.length && <InvitesList invites={invites?.userInvites} />}
      <Zoom in>
        <Fab sx={styles.users__fab} color="primary" aria-label="add" onClick={openModal}>
          <AddIcon />
        </Fab>
      </Zoom>
      <Dialog fullWidth open={isVisible} onClose={closeModal} maxWidth="xs">
        <DialogHeader title="Invite user" {...{ closeModal }} />
        <DialogContent>
          <TextField
            value={email}
            margin="dense"
            id="email"
            sx={{ mb: 4, mt: 4 }}
            label="Email"
            type="email"
            required
            color="secondary"
            fullWidth
            aria-colcount={2}
            variant="outlined"
            onChange={handleSetEmail}
            helperText="An invitation will be sent to the specified email, which is valid for 24 hours"
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!email.trim().length || loading}
            onClick={createUserInvite}
            endIcon={loading ? <CircularProgress size={18} color="primary" /> : <Send />}
          >
            Send invite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

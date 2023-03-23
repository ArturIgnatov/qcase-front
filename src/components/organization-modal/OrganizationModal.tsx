import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Close, Remove } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { CREATE_ORGANIZATION, REMOVE_ORGANIZATION } from '../../apollo/mutations';
import { GET_GLOBAL_ORGANIZATIONS } from '../../apollo/queries';

interface IProps {
  isVisible: boolean;
  organizationInfo?: {
    id: string;
    name: string;
    description: string;
  };
  closeModal: () => void;
}

export const OrganizationModal: FC<IProps> = memo(({ isVisible, organizationInfo, closeModal }) => {
  const [createOrganizationMutation] = useMutation(CREATE_ORGANIZATION, {
    update: (cache, { data: { createOrganization } }) => {
      const queryData: { organizations: [] } | null = cache.readQuery({
        query: GET_GLOBAL_ORGANIZATIONS,
      });
      console.log('getOrganizations', queryData);

      cache.writeQuery({
        query: GET_GLOBAL_ORGANIZATIONS,
        data: { organizations: [...(queryData?.organizations ?? []), createOrganization] },
      });
    },
  });
  const [removeOrganizationMutation] = useMutation(REMOVE_ORGANIZATION);

  const [name, setName] = useState(organizationInfo?.name ?? '');
  const [description, setDescription] = useState(organizationInfo?.description ?? '');
  const maxName = 30;
  const maxDescription = 100;

  useEffect(() => {
    if (!isVisible) {
      setName('');
      setDescription('');
    }
  }, [isVisible]);

  const handleSetName = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.trim().length > maxName) {
      return;
    }

    setName(target.value);
  }, []);

  const handleSetDescription = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.trim().length > maxDescription) {
      return;
    }

    setDescription(target.value);
  }, []);

  const createOrganization = useCallback(async () => {
    await createOrganizationMutation({
      variables: { creationData: { name, description } },
    });
    closeModal();
  }, [closeModal, createOrganizationMutation, description, name]);

  const removeOrganization = useCallback(async () => {
    await removeOrganizationMutation({
      variables: { id: organizationInfo?.id ?? '' },
      update(cache) {
        cache.modify({
          fields: {
            organizations(ors, { readField }) {
              return (ors as { id: string }[]).filter(
                taskRef => organizationInfo?.id !== readField('id', taskRef),
              );
            },
          },
        });
      },
    });
  }, [organizationInfo, removeOrganizationMutation]);

  return (
    <Dialog open={isVisible} sx={{ padding: 20 }} onClose={closeModal} maxWidth="xs">
      <DialogTitle>
        {organizationInfo ? organizationInfo.name : 'Create organization'}
        {!!organizationInfo && (
          <IconButton color="error" aria-label="delete" onClick={removeOrganization}>
            <Remove />
          </IconButton>
        )}
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {!organizationInfo && (
          <DialogContentText>
            To create an organization, please fill in the name and description
          </DialogContentText>
        )}
        <TextField
          value={name}
          margin="dense"
          id="name"
          sx={{ mb: 2, mt: 10 }}
          label="Name"
          fullWidth
          required
          aria-colcount={2}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">{`${
                name.trim().length
              } / ${maxName}`}</InputAdornment>
            ),
          }}
          onChange={handleSetName}
        />
        <TextField
          value={description}
          margin="dense"
          id="name"
          label="Description"
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{`${
                description.trim().length
              } / ${maxDescription}`}</InputAdornment>
            ),
          }}
          onChange={handleSetDescription}
        />
      </DialogContent>
      <DialogActions sx={{ pl: 6, pr: 6, pb: 6 }}>
        <Button disabled={!name.trim().length} onClick={createOrganization}>
          {organizationInfo ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './styles';
import { useMutation } from '@apollo/client';
import { REMOVE_ORGANIZATION } from '../../../../../apollo/mutations';
import { GlobalOrganizationQuery } from '../../../../../apollo/queries-generated-types';
import {
  RemoveOrganizationMutation,
  RemoveOrganizationMutationVariables,
} from '../../../../../apollo/mutations-generated-types';
import { useNavigate } from 'react-router-dom';

interface IProps {
  id: string;
  name: string;
}

export const RemoveOrganization: FC<IProps> = memo(({ id, name: organizationName }) => {
  const [name, setName] = useState('');

  const [removeOrganizationMutation] = useMutation<
    RemoveOrganizationMutation,
    RemoveOrganizationMutationVariables
  >(REMOVE_ORGANIZATION, {
    variables: { id },
    update(cache) {
      cache.modify({
        fields: {
          organizations(organizations: GlobalOrganizationQuery['organizations'], { readField }) {
            return organizations.filter(organization => id !== readField('id', organization));
          },
        },
      });
    },
  });
  const navigate = useNavigate();

  const removeOrganization = useCallback(async () => {
    await removeOrganizationMutation();
    navigate('/main');
  }, [navigate, removeOrganizationMutation]);

  const isDisabled = organizationName !== name;

  const handleSetName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title} variant="subtitle1">
        If you delete an organization, you will lose all user project and case data. To remove an
        organization, enter its name below.
      </Typography>
      <TextField
        value={name}
        margin="dense"
        id="name"
        label="Organization name"
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        onChange={handleSetName}
      />
      <Button sx={styles.bottom} disabled={isDisabled} color="error" onClick={removeOrganization}>
        Remove organization
      </Button>
    </Box>
  );
});

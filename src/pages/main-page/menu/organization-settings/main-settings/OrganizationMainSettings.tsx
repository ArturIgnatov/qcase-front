import { ChangeEvent, FC, memo, useState } from 'react';
import { Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { UPDATE_ORGANIZATION } from '../../../../../apollo/mutations';
import {
  UpdateOrganizationMutation,
  UpdateOrganizationMutationVariables,
} from '../../../../../apollo/mutations-generated-types';
import { styles } from './styles';

interface IProps {
  id: string;
  name: string;
  description: string;
}

export const OrganizationMainSettings: FC<IProps> = memo(
  ({ id, name: organizationName, description: organizationDescription }) => {
    const [name, setName] = useState(organizationName);
    const [description, setDescription] = useState(organizationDescription);
    const [updateOrganizationMutation, { loading }] = useMutation<
      UpdateOrganizationMutation,
      UpdateOrganizationMutationVariables
    >(UPDATE_ORGANIZATION, {
      variables: { data: { id, name, description } },
    });

    const nameMax = 30;
    const descriptionMax = 100;

    const handleSetName = ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.value.trim().length > nameMax) {
        return;
      }

      setName(target.value);
    };

    const handleSetDescription = ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.value.trim().length > descriptionMax) {
        return;
      }

      setDescription(target.value);
    };

    const updateOrganization = () => {
      updateOrganizationMutation();
    };

    const isDisabled = organizationName === name && organizationDescription === description;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <TextField
          value={name}
          margin="dense"
          id="name"
          sx={{ mb: 4 }}
          label="Name"
          fullWidth
          required
          aria-colcount={2}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">{`${
                name.trim().length
              } / ${nameMax}`}</InputAdornment>
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
              } / ${descriptionMax}`}</InputAdornment>
            ),
          }}
          onChange={handleSetDescription}
        />
        <Box sx={styles.bottom}>
          <Button
            disabled={loading || isDisabled}
            variant="contained"
            size="small"
            onClick={updateOrganization}
            endIcon={loading && <CircularProgress size={16} />}
          >
            Update
          </Button>
        </Box>
      </Box>
    );
  },
);

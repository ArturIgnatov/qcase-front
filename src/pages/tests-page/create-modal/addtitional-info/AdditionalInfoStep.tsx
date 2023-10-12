import { FC, memo, useMemo } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  GlobalOrganizationUsersQuery,
  TemplatesSelectListQuery,
} from '../../../../apollo/queries-generated-types';

interface IProps {
  selectedTemplates: string[];
  responsibleId: string;
  executorId: string;
  users?: GlobalOrganizationUsersQuery['organizationUsers'];
  templates?: TemplatesSelectListQuery['templates'];
  handleChangeTemplates: (event: SelectChangeEvent<string[]>) => void;
  handleChangeResponsible: (event: SelectChangeEvent) => void;
  handleChangeExecutor: (event: SelectChangeEvent) => void;
}

export const AdditionalInfoStep: FC<IProps> = memo(
  ({
    executorId,
    responsibleId,
    selectedTemplates,
    templates,
    handleChangeTemplates,
    handleChangeResponsible,
    handleChangeExecutor,
    users,
  }) => {
    const templateNames = useMemo(
      () =>
        (templates ?? []).reduce<Record<string, string>>((acc, item) => {
          acc[item.id] = item.name;
          return acc;
        }, {}),
      [templates],
    );

    const userNames = useMemo(
      () =>
        (users ?? []).reduce<Record<string, NonNullable<typeof users>[number]>>((acc, item) => {
          acc[item.user.id] = item;
          return acc;
        }, {}),
      [users],
    );

    return (
      <Box sx={{ width: '50%' }}>
        <FormControl sx={{ mt: 4 }} fullWidth>
          <InputLabel id="responsible-label">Responsible</InputLabel>
          <Select
            labelId="responsible-label"
            id="responsible"
            value={responsibleId}
            label="Responsible"
            onChange={handleChangeResponsible}
            renderValue={selected => {
              const user = userNames[selected].user;
              return (
                <Chip
                  variant="outlined"
                  size="small"
                  avatar={<Avatar>{user.fname[0]}</Avatar>}
                  label={user.fname + ' ' + user.lname}
                />
              );
            }}
          >
            {users?.map(({ user }) => (
              <MenuItem key={user.id} value={user.id} dense>
                <ListItemAvatar>
                  <Avatar>{user.fname[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.fname} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 4 }} fullWidth>
          <InputLabel id="executor-label">Executor</InputLabel>
          <Select
            labelId="executor-label"
            id="executor"
            value={executorId}
            label="Executor"
            onChange={handleChangeExecutor}
            renderValue={selected => {
              const user = userNames[selected].user;
              return (
                <Chip
                  variant="outlined"
                  size="small"
                  avatar={<Avatar>{user.fname[0]}</Avatar>}
                  label={user.fname + ' ' + user.lname}
                />
              );
            }}
          >
            {users?.map(({ user }) => (
              <MenuItem key={user.id} value={user.id} dense>
                <ListItemAvatar>
                  <Avatar>{user.fname[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.fname} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 4 }} fullWidth>
          <InputLabel id="template-label">Templates</InputLabel>
          <Select
            labelId="template-label"
            id="template"
            value={selectedTemplates}
            label="Templates"
            multiple
            onChange={handleChangeTemplates}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {selected.map(value => (
                  <Chip variant="outlined" size="small" key={value} label={templateNames[value]} />
                ))}
              </Box>
            )}
          >
            {templates?.map(el => (
              <MenuItem key={el.id} value={el.id}>
                <Checkbox checked={selectedTemplates.indexOf(el.id) > -1} />
                <ListItemText primary={el.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select templates for select cases for next step</FormHelperText>
        </FormControl>
      </Box>
    );
  },
);

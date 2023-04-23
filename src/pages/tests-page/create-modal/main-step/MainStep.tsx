import { ChangeEvent, FC, memo, useCallback } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  TagsAutoComplete,
  TagsAutoCompleteProps,
} from '../../../../components/tags-autocomplete/TagsAutoComplete';
import { useQuery } from '@apollo/client';
import {
  GlobalProjectsQuery,
  GlobalProjectsQueryVariables,
  GlobalTagsQuery,
  GlobalTagsQueryVariables,
} from '../../../../apollo/queries-generated-types';
import { GET_GLOBAL_PROJECTORS, GLOBAL_TAGS } from '../../../../apollo/queries';

interface IProps {
  organizationId: string;
  title: string;
  description: string;
  selectedProject: string;
  selectedTags: TagsAutoCompleteProps['selected'];
  handleRemoveTag: (id: string) => void;
  handleAddTag: (newValue: TagsAutoCompleteProps['selected']) => void;
  setTitle: (text: string) => void;
  setDescription: (text: string) => void;
  handleChangeProject: (event: SelectChangeEvent) => void;
}

export const MainStep: FC<IProps> = memo(
  ({
    title,
    description,
    selectedProject,
    setDescription,
    setTitle,
    selectedTags,
    organizationId,
    handleAddTag,
    handleRemoveTag,
    handleChangeProject,
  }) => {
    const { data: tagsData } = useQuery<GlobalTagsQuery, GlobalTagsQueryVariables>(GLOBAL_TAGS, {
      variables: { filters: { organizationId } },
    });
    const { data: projectsData } = useQuery<GlobalProjectsQuery, GlobalProjectsQueryVariables>(
      GET_GLOBAL_PROJECTORS,
      {
        variables: { filters: { organizationId } },
      },
    );

    const naxName = 30;
    const maxDescription = 100;

    const handleSetName = useCallback(
      ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.value.trim().length > naxName) {
          return;
        }
        setTitle(target.value);
      },
      [setTitle],
    );

    const handleSetDescription = useCallback(
      ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.value.trim().length > naxName) {
          return;
        }
        setDescription(target.value);
      },
      [setDescription],
    );

    return (
      <Box sx={{ width: '50%' }}>
        <TextField
          value={title}
          id="name"
          sx={{ mb: 4, mt: 4 }}
          label="Name"
          fullWidth
          required
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">{`${
                title.trim().length
              } / ${naxName}`}</InputAdornment>
            ),
          }}
          onChange={handleSetName}
        />
        <TextField
          value={description}
          id="name"
          sx={{ mb: 6 }}
          label="Description"
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">{`${
                title.trim().length
              } / ${maxDescription}`}</InputAdornment>
            ),
          }}
          onChange={handleSetDescription}
        />
        <FormControl sx={{ mb: 4 }} fullWidth>
          <InputLabel id="project-label">Relation</InputLabel>
          <Select
            labelId="project-label"
            id="project"
            value={selectedProject}
            label="Relation"
            onChange={handleChangeProject}
          >
            {projectsData?.projects.map(el => (
              <MenuItem key={el.id} value={el.id}>
                {el.name}
              </MenuItem>
            ))}
            <MenuItem value="organization">Organization</MenuItem>
          </Select>
          <FormHelperText>You can link a template to a specific project</FormHelperText>
        </FormControl>
        <TagsAutoComplete
          tags={tagsData?.tags}
          selected={selectedTags}
          onSetTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
      </Box>
    );
  },
);

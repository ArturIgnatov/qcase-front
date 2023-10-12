import { FC, useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TEMPLATE } from '../../../apollo/mutations';
import {
  GlobalProjectsQuery,
  GlobalProjectsQueryVariables,
  GlobalTagsQuery,
  GlobalTagsQueryVariables,
  GlobalTemplatesQuery,
  GlobalTemplatesQueryVariables,
} from '../../../apollo/queries-generated-types';
import {
  CreateTemplateMutation,
  CreateTemplateMutationVariables,
} from '../../../apollo/mutations-generated-types';
import { CreateModal } from '../../../components/create-modal/CreateModal';
import { GET_GLOBAL_PROJECTORS, GET_GLOBAL_TEMPLATES, GLOBAL_TAGS } from '../../../apollo/queries';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  TagsAutoComplete,
  TagsAutoCompleteProps,
} from '../../../components/tags-autocomplete/TagsAutoComplete';

interface IProps {
  organizationId: string;
  isVisible: boolean;
  closeModal: () => void;
}

export const CreateTemplateModal: FC<IProps> = ({ isVisible, organizationId, closeModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('organization');
  const [selectedTags, setSelectedTags] = useState<TagsAutoCompleteProps['selected']>([]);

  const { data: tagsData } = useQuery<GlobalTagsQuery, GlobalTagsQueryVariables>(GLOBAL_TAGS, {
    variables: { filters: { organizationId } },
  });

  const { data: projectsData } = useQuery<GlobalProjectsQuery, GlobalProjectsQueryVariables>(
    GET_GLOBAL_PROJECTORS,
    {
      variables: { filters: { organizationId } },
    },
  );

  const [createTemplateMutation] = useMutation<
    CreateTemplateMutation,
    CreateTemplateMutationVariables
  >(CREATE_TEMPLATE, {
    update(cache, { data }) {
      const queryData = cache.readQuery<GlobalTemplatesQuery, GlobalTemplatesQueryVariables>({
        query: GET_GLOBAL_TEMPLATES,
        variables: { filters: { organizationId } },
      });

      if (data) {
        cache.writeQuery<GlobalTemplatesQuery, GlobalTemplatesQueryVariables>({
          query: GET_GLOBAL_TEMPLATES,
          variables: { filters: { organizationId } },
          data: { templates: [...(queryData?.templates ?? []), data.createTemplate] },
        });
      }
    },
  });

  const createTemplate = useCallback(async () => {
    const variables: CreateTemplateMutationVariables['creationData'] = {
      name,
      description,
      organizationId,
      tagIds: selectedTags.map(el => el.id),
    };

    if (selectedProject !== 'organization') {
      variables.projectId = selectedProject;
    }

    await createTemplateMutation({
      variables: {
        creationData: variables,
      },
    });
    closeModal();
  }, [
    closeModal,
    createTemplateMutation,
    description,
    name,
    organizationId,
    selectedProject,
    selectedTags,
  ]);

  const handleChangeProject = useCallback((event: SelectChangeEvent) => {
    setSelectedProject(event.target.value);
  }, []);

  const handleChangeTags = useCallback((newValue: TagsAutoCompleteProps['selected']) => {
    setSelectedTags(newValue);
  }, []);

  const handleRemoveTag = useCallback((id: string) => {
    setSelectedTags(prevState => prevState.filter(el => el.id !== id));
  }, []);

  return (
    <CreateModal
      title="Create template"
      description="To create an template, please fill in the name and description"
      nameValue={name}
      descriptionValue={description}
      setNameValue={setName}
      setDescriptionValue={setDescription}
      onCreate={createTemplate}
      {...{ isVisible, closeModal }}
    >
      <FormControl sx={{ mt: 5, mb: 5 }} fullWidth>
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
        onSetTag={handleChangeTags}
        onRemoveTag={handleRemoveTag}
      />
    </CreateModal>
  );
};

import { FC, memo, useCallback, useState } from 'react';
import { Box, Button, CircularProgress, Fab, Zoom } from '@mui/material';
import { styles } from './styles';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GLOBAL_PROJECTORS } from '../../../../../apollo/queries';
import {
  GlobalProjectsQuery,
  GlobalProjectsQueryVariables,
} from '../../../../../apollo/queries-generated-types';
import { EmptyPlaceholder } from '../../../../../components/empty-placeholder/EmptyPlaceholder';
import { CREATE_PROJECT } from '../../../../../apollo/mutations';
import {
  CreateProjectMutation,
  CreateProjectMutationVariables,
} from '../../../../../apollo/mutations-generated-types';
import { CreateModal } from '../../../../../components/create-modal/CreateModal';
import { useModalVisible } from '../../../../../hooks/modal-visible';
import { ProjectsList } from './ProjectsList';
import AddIcon from '@mui/icons-material/Add';

interface IProps {
  id: string;
}

export const OrganizationProjects: FC<IProps> = memo(({ id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { isVisible, closed, closeModal, openModal } = useModalVisible();
  const { data, loading: dataLoading } = useQuery<
    GlobalProjectsQuery,
    GlobalProjectsQueryVariables
  >(GET_GLOBAL_PROJECTORS, {
    variables: { filters: { organizationId: id } },
  });

  const [createProjectMutation, { loading }] = useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CREATE_PROJECT, {
    variables: { data: { organizationId: id, name, description } },
    update(cache, { data }) {
      const queryData = cache.readQuery<GlobalProjectsQuery, GlobalProjectsQueryVariables>({
        variables: { filters: { organizationId: id } },
        query: GET_GLOBAL_PROJECTORS,
      });

      const prevProjects = queryData?.projects ?? [];

      cache.writeQuery<GlobalProjectsQuery, GlobalProjectsQueryVariables>({
        variables: { filters: { organizationId: id } },
        query: GET_GLOBAL_PROJECTORS,
        data: {
          projects: data?.createProject ? [...prevProjects, data.createProject] : prevProjects,
        },
      });
    },
  });

  const createProject = useCallback(async () => {
    await createProjectMutation();
    setName('');
    setDescription('');
    closeModal();
  }, [closeModal, createProjectMutation]);

  return (
    <Box sx={styles.container}>
      {dataLoading ? (
        <Box sx={styles.center}>
          <CircularProgress />
        </Box>
      ) : data?.projects.length ? (
        <Box sx={styles.projects}>
          <ProjectsList projects={data.projects} />
          <Zoom in>
            <Fab sx={styles.projects__fab} color="primary" aria-label="add" onClick={openModal}>
              <AddIcon />
            </Fab>
          </Zoom>
        </Box>
      ) : (
        <Box sx={styles.center}>
          <EmptyPlaceholder
            title="Empty projects"
            description="You have not created any project yet, click the button below to edit it!"
          >
            <Button
              disabled={loading}
              variant="contained"
              size="small"
              onClick={openModal}
              endIcon={loading && <CircularProgress size={16} />}
            >
              Create project
            </Button>
          </EmptyPlaceholder>
        </Box>
      )}
      {!closed && (
        <CreateModal
          title="Create project"
          description="To create an project, please fill in the name and description"
          nameValue={name}
          descriptionValue={description}
          setNameValue={setName}
          setDescriptionValue={setDescription}
          onCreate={createProject}
          {...{ isVisible, closeModal }}
        />
      )}
    </Box>
  );
});

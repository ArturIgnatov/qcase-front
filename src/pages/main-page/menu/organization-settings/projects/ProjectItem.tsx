import { FC, memo, useCallback } from 'react';
import { GlobalProjectsQuery } from '../../../../../apollo/queries-generated-types';
import { IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT } from '../../../../../apollo/mutations';
import {
  RemoveProjectMutation,
  RemoveProjectMutationVariables,
} from '../../../../../apollo/mutations-generated-types';
import { useModalVisible } from '../../../../../hooks/modal-visible';
import { ConfirmModal } from '../../../../../components/confirm-modal/ConfirmModal';

type IProjectProps = GlobalProjectsQuery['projects'][number];

export const ProjectItem: FC<IProjectProps> = memo(({ id, name, description }) => {
  const [removeProjectMutation] = useMutation<
    RemoveProjectMutation,
    RemoveProjectMutationVariables
  >(REMOVE_PROJECT, {
    variables: { id },
    update(cache) {
      cache.modify({
        fields: {
          projects(projects: GlobalProjectsQuery['projects'], { readField }) {
            return projects.filter(project => id !== readField('id', project));
          },
        },
      });
    },
  });
  const { isVisible, closed, closeModal, openModal } = useModalVisible();

  const removeProject = useCallback(() => {
    removeProjectMutation();
  }, [removeProjectMutation]);

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" color="error" aria-label="settings" onClick={openModal}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton disableTouchRipple>
        <ListItemText primary={name} secondary={description} />
      </ListItemButton>
      {!closed && (
        <ConfirmModal
          title="Confirm remove project"
          description="Are you sure you want to delete the project? After deletion, all data will be lost. To delete, enter the project name in the field below"
          onRemove={removeProject}
          originValue={name}
          {...{ isVisible, closeModal }}
        />
      )}
    </ListItem>
  );
});

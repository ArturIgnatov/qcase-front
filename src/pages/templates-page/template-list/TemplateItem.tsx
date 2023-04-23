import { FC, memo, MouseEvent, useCallback, useState } from 'react';
import {
  Avatar,
  Chip,
  Divider,
  Fade,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import { GlobalTemplatesQuery } from '../../../apollo/queries-generated-types';
import { CalendarMonth, Settings, Link, Edit, Delete } from '@mui/icons-material';
import { TemplateModal } from '../template-modal/TemplateModal';
import { useModalVisible } from '../../../hooks/modal-visible';
import { useMutation } from '@apollo/client';
import { REMOVE_TEMPLATE } from '../../../apollo/mutations';
import {
  RemoveTemplateMutation,
  RemoveTemplateMutationVariables,
} from '../../../apollo/mutations-generated-types';
import { AppChip } from '../../../components/app-chip/AppChip';
import { ConfirmModal } from '../../../components/confirm-modal/ConfirmModal';

type IProps = GlobalTemplatesQuery['templates'][number];

export const TemplateItem: FC<IProps> = memo(
  ({ id, name, description, createdAt, organizationId, project, tags }) => {
    const { isVisible, closed, closeModal, openModal } = useModalVisible();
    const {
      isVisible: confirmVisible,
      closed: confirmClosed,
      closeModal: closeConfirmModal,
      openModal: openConfirmModal,
    } = useModalVisible();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [removeTemplateMutation] = useMutation<
      RemoveTemplateMutation,
      RemoveTemplateMutationVariables
    >(REMOVE_TEMPLATE, {
      variables: { id },
      update(cache) {
        cache.modify({
          fields: {
            templates(templates: GlobalTemplatesQuery['templates'] = [], { readField }) {
              console.warn('templates', templates);
              return templates.filter(el => id !== readField('id', el));
            },
          },
        });
      },
    });

    const openMenu = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    }, []);

    const closeMenu = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const removeTemplate = useCallback(() => {
      removeTemplateMutation();
      closeMenu();
    }, [closeMenu, removeTemplateMutation]);

    const handleConfirmModal = useCallback(() => {
      closeMenu();
      openConfirmModal();
    }, [closeMenu, openConfirmModal]);

    return (
      <ListItem
        dense
        sx={{ marginBottom: 2 }}
        disablePadding
        secondaryAction={
          <IconButton edge="end" aria-label="settings" onClick={openMenu}>
            <Settings />
          </IconButton>
        }
      >
        <ListItemButton disableTouchRipple onClick={openModal}>
          <ListItemAvatar>
            <Avatar>{name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={description || 'Without description...'} />
          <Stack direction="row" sx={{ mr: 4 }} spacing={4}>
            {tags.map(templateTag => (
              <AppChip
                key={templateTag.id}
                onClick={() => ''}
                size="small"
                label={templateTag.tag.title}
                color={templateTag.tag.color}
              />
            ))}
            <Divider orientation="vertical" flexItem />
            {!!project && (
              <Chip
                sx={{ p: 1 }}
                icon={<Link fontSize="small" />}
                onClick={e => e.stopPropagation()}
                color="primary"
                variant="outlined"
                size="small"
                label={project.name}
              />
            )}
            <Chip
              sx={{ p: 1 }}
              onClick={e => e.stopPropagation()}
              icon={<CalendarMonth fontSize="small" />}
              variant="outlined"
              color="info"
              size="small"
              label={new Date(createdAt).toLocaleDateString()}
            />
          </Stack>
        </ListItemButton>
        {!closed && (
          <TemplateModal
            title={name}
            templateId={id}
            {...{ isVisible, organizationId, closeModal }}
          />
        )}
        <Menu
          elevation={1}
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          TransitionComponent={Fade}
          onClose={closeMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 2.5,
              color: theme => theme.palette.text.secondary,
            },
          }}
        >
          <MenuItem onClick={closeMenu}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={handleConfirmModal} sx={{ color: theme => theme.palette.error.main }}>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            Remove
          </MenuItem>
        </Menu>
        {!confirmClosed && (
          <ConfirmModal
            isVisible={confirmVisible}
            title="Confirm remove template"
            description="Are you sure you want to delete the template? After deleting, all data for cases will be lost. To delete, enter the template name in the field below"
            originValue={name}
            closeModal={closeConfirmModal}
            onRemove={removeTemplate}
          />
        )}
      </ListItem>
    );
  },
);

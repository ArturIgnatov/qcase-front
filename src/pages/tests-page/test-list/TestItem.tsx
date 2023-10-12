import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { createRef, FC, Fragment, memo } from 'react';
import { GlobalTestsQuery } from '../../../apollo/queries-generated-types';
import { AppChip } from '../../../components/app-chip/AppChip';
import {
  Link,
  HourglassEmpty,
  Downloading,
  CheckCircleOutline,
  RunningWithErrors,
  Settings,
  Edit,
  Delete,
  ContentCopy,
} from '@mui/icons-material';
import { TestStatus } from '../../../apollo/app-schema';
import { AppMenu } from '../../../components/app-memu/AppMenu';
import { useModalVisible } from '../../../hooks/modal-visible';
import { TestModal } from '../test-modal/TestModal';

type IProps = GlobalTestsQuery['tests'][number];

const STATUS_ICONS = {
  [TestStatus.WAITING]: <HourglassEmpty />,
  [TestStatus.FAILED]: <RunningWithErrors />,
  [TestStatus.SUCCESS]: <CheckCircleOutline />,
  [TestStatus.IN_PROGRESS]: <Downloading />,
};

const STATUS_COLOR = {
  [TestStatus.WAITING]: 'info',
  [TestStatus.FAILED]: 'error',
  [TestStatus.SUCCESS]: 'success',
  [TestStatus.IN_PROGRESS]: 'warning',
} as const;

export const TestItem: FC<IProps> = memo(
  ({ name, id, responsible, status, executor, project, tags, description }) => {
    const { isVisible, closed, openModal, closeModal } = useModalVisible();
    const menuRef = createRef<AppMenu>();

    console.log('menuRef', menuRef);
    return (
      <ListItem
        sx={{ marginBottom: 2 }}
        dense
        disablePadding
        secondaryAction={
          <IconButton edge="end" aria-label="settings" onClick={e => menuRef.current?.openMenu(e)}>
            <Settings />
          </IconButton>
        }
      >
        <ListItemButton disableTouchRipple onClick={openModal}>
          <ListItemAvatar>
            <Avatar>{name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={description || 'Without description...'} />
          <Stack direction="row" alignItems="center" sx={{ mr: 4 }} spacing={4}>
            {tags.map(testTag => (
              <AppChip
                key={testTag.id}
                label={testTag.tag.title}
                color={testTag.tag.color}
                size="small"
                onClick={() => ''}
              />
            ))}
            {!!project && (
              <Fragment>
                <Divider orientation="vertical" flexItem />
                <Chip
                  icon={<Link fontSize="small" />}
                  onClick={e => e.stopPropagation()}
                  color="primary"
                  variant="outlined"
                  size="small"
                  label={project.name}
                />
              </Fragment>
            )}
            <Divider orientation="vertical" flexItem />
            <Chip
              size="small"
              label={status.toLowerCase()}
              color={STATUS_COLOR[status]}
              icon={STATUS_ICONS[status]}
            />
            {!!executor && (
              <Fragment>
                <Divider orientation="vertical" flexItem />
                <Stack direction="column" spacing={1} alignItems="center" minWidth={150}>
                  <Typography variant="subtitle2">Executor:</Typography>
                  <Chip
                    size="small"
                    label={executor.fname}
                    avatar={<Avatar>{executor.fname[0]}</Avatar>}
                  />
                </Stack>
              </Fragment>
            )}
            {!!responsible && (
              <Fragment>
                <Divider orientation="vertical" flexItem />
                <Stack direction="column" spacing={1} alignItems="center" minWidth={150}>
                  <Typography variant="subtitle2">Responsible:</Typography>
                  <Chip
                    size="small"
                    label={responsible.fname}
                    avatar={<Avatar>{responsible.fname[0]}</Avatar>}
                  />
                </Stack>
              </Fragment>
            )}
          </Stack>
        </ListItemButton>
        <AppMenu ref={menuRef} id="test-menu">
          <MenuItem onClick={() => menuRef.current?.closeMenu()}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={() => menuRef.current?.closeMenu()}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            Copy
          </MenuItem>
          <MenuItem
            onClick={() => menuRef.current?.closeMenu()}
            sx={{ color: theme => theme.palette.error.main }}
          >
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            Remove
          </MenuItem>
        </AppMenu>
        {!closed && (
          <TestModal {...{ isVisible, closeModal }} title={name} testId={id} organizationId="" />
        )}
      </ListItem>
    );
  },
);

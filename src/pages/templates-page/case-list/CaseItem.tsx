import { FC, Fragment, memo, PropsWithChildren, useCallback, useState } from 'react';
import {
  Avatar,
  Chip,
  colors,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { GlobalCasesQuery } from '../../../apollo/queries-generated-types';
import { Delete } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { REMOVE_CASE } from '../../../apollo/mutations';
import {
  RemoveCaseMutation,
  RemoveCaseMutationVariables,
} from '../../../apollo/mutations-generated-types';
import {
  Timeline,
  TimelineDot,
  TimelineContent,
  TimelineSeparator,
  TimelineItem,
  TimelineConnector,
} from '@mui/lab';
import { AppChip } from '../../../components/app-chip/AppChip';
import { useModalVisible } from '../../../hooks/modal-visible';
import { DialogHeader } from '../../../components/dialog-header/DialogHeader';

type IProps = GlobalCasesQuery['cases'][number];

export const CaseItem: FC<IProps> = memo(
  ({ id, name, description, precondition, expectedResult, tags, steps }) => {
    const { isVisible, closed, closeModal, openModal } = useModalVisible();
    const [showInfo, setShowInfo] = useState(false);

    const [removeCaseMutation] = useMutation<RemoveCaseMutation, RemoveCaseMutationVariables>(
      REMOVE_CASE,
      {
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              cases(cases: GlobalCasesQuery['cases'] = [], { readField }) {
                return cases.filter(el => id !== readField('id', el));
              },
            },
          });
        },
      },
    );

    const toggleOpenInfo = useCallback(() => {
      setShowInfo(prevState => !prevState);
    }, []);

    const removeCase = useCallback(() => {
      removeCaseMutation();
    }, [removeCaseMutation]);

    return (
      <Fragment>
        <ListItem
          sx={{ marginBottom: 2 }}
          disablePadding
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={removeCase}>
              <Delete />
            </IconButton>
          }
        >
          <ListItemButton disableTouchRipple onClick={openModal}>
            <ListItemAvatar>
              <Avatar>{name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
            <Stack direction="row" sx={{ mr: 4 }} spacing={4}>
              {tags.map(caseTag => (
                <AppChip
                  key={id}
                  label={caseTag.tag.title}
                  size="small"
                  color={caseTag.tag.title}
                />
              ))}
              <Divider orientation="vertical" flexItem />
              <Chip
                sx={{ p: 1 }}
                onClick={() => ''}
                variant="outlined"
                color="info"
                size="small"
                label="Status"
              />
            </Stack>
          </ListItemButton>
          <Dialog fullWidth open={isVisible}>
            <DialogHeader title={name} {...{ closeModal }} />
            <DialogContent dividers>
              <Timeline position="alternate">
                <CustomTimelineItem title="Description" color="primary">
                  {description}
                </CustomTimelineItem>
                <CustomTimelineItem title="Precondition" color="warning">
                  {precondition}
                </CustomTimelineItem>
                <CustomTimelineItem title="Steps:" color="info">
                  <Stepper orientation="vertical">
                    {steps.map(step => (
                      <Step active key={step.id}>
                        <StepLabel>{step.title}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </CustomTimelineItem>
                <CustomTimelineItem title="Expected result" color="success">
                  {expectedResult}
                </CustomTimelineItem>
              </Timeline>
            </DialogContent>
          </Dialog>
        </ListItem>
      </Fragment>
    );
  },
);

interface ICustomTimelineItemProps {
  title: string;
  color: 'primary' | 'error' | 'info' | 'success' | 'warning';
}

const CustomTimelineItem: FC<PropsWithChildren<ICustomTimelineItemProps>> = ({
  title,
  color,
  children,
}) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot {...{ color }} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="h6" component="span">
          {title}:
        </Typography>
        <Typography variant="subtitle2" color={colors.grey['500']}>
          {children}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

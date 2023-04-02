import { FC, Fragment, memo, useCallback, useState } from 'react';
import {
  Avatar,
  Chip,
  Collapse,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { GlobalCasesQuery } from '../../../apollo/queries-generated-types';
import { Link, Delete } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { REMOVE_CASE } from '../../../apollo/mutations';
import {
  RemoveCaseMutation,
  RemoveCaseMutationVariables,
} from '../../../apollo/mutations-generated-types';

type IProps = GlobalCasesQuery['cases'][number];

export const CaseItem: FC<IProps> = memo(({ id, name, description }) => {
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
        <ListItemButton disableTouchRipple onClick={toggleOpenInfo}>
          <ListItemAvatar>
            <Avatar>{name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} />
          <Stack
            direction="row"
            sx={{ mr: 4 }}
            spacing={4}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Chip
              sx={{ p: 1 }}
              icon={<Link fontSize="small" />}
              onClick={() => ''}
              color="primary"
              variant="outlined"
              size="small"
              label="Mobile"
            />
            <Chip
              sx={{ p: 1 }}
              onClick={() => ''}
              variant="outlined"
              color="info"
              size="small"
              label="Tag"
            />
          </Stack>
        </ListItemButton>
      </ListItem>
      <Collapse in={showInfo} timeout="auto" unmountOnExit>
        <Typography>{description}</Typography>
        <Typography>Step 1</Typography>
        <Typography>Step 2</Typography>
        <Typography>Step 3</Typography>
      </Collapse>
    </Fragment>
  );
});

import { ChangeEvent, FC, useCallback, useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { ColorPicker } from '../../../../../components/color-picker/ColorPicker';
import { useMutation } from '@apollo/client';
import { CREATE_TAG, UPDATE_TAG } from '../../../../../apollo/mutations';
import {
  CreateTagMutation,
  CreateTagMutationVariables,
  UpdateTagMutation,
  UpdateTagMutationVariables,
} from '../../../../../apollo/mutations-generated-types';
import {
  GlobalTagsQuery,
  GlobalTagsQueryVariables,
} from '../../../../../apollo/queries-generated-types';
import { GLOBAL_TAGS } from '../../../../../apollo/queries';
import { DialogHeader } from '../../../../../components/dialog-header/DialogHeader';

interface IProps {
  organizationId: string;
  tag?: GlobalTagsQuery['tags'][number];
  isVisible: boolean;
  closeModal: () => void;
}

export const TagModal: FC<IProps> = ({ isVisible, organizationId, tag, closeModal }) => {
  const [title, setTitle] = useState(tag?.title ?? '');
  const [color, setColor] = useState(tag?.color ?? '');
  const naxName = 15;

  const [createTagMutation] = useMutation<CreateTagMutation, CreateTagMutationVariables>(
    CREATE_TAG,
    {
      variables: { data: { title, color, organizationId } },
      update(cache, { data }) {
        const queryData = cache.readQuery<GlobalTagsQuery, GlobalTagsQueryVariables>({
          variables: { filters: { organizationId } },
          query: GLOBAL_TAGS,
        });
        const prevTags = queryData?.tags ?? [];

        cache.writeQuery<GlobalTagsQuery, GlobalTagsQueryVariables>({
          variables: { filters: { organizationId } },
          query: GLOBAL_TAGS,
          data: { tags: data?.createTag ? [...prevTags, data.createTag] : prevTags },
        });
      },
    },
  );
  const [updateTagMutation] = useMutation<UpdateTagMutation, UpdateTagMutationVariables>(
    UPDATE_TAG,
    {
      variables: { data: { id: tag?.id ?? '', color, title } },
    },
  );

  const handleSetName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.trim().length > naxName) {
      return;
    }

    setTitle(target.value);
  };

  const createTag = useCallback(async () => {
    await createTagMutation();
    closeModal();
  }, [closeModal, createTagMutation]);

  const updateTag = useCallback(async () => {
    await updateTagMutation();
    closeModal();
  }, [closeModal, updateTagMutation]);

  const reset = useCallback(() => {
    setColor('');
    setTitle('');
  }, []);

  const isDisabled = () => {
    const hasData = !title.trim().length || !color;
    return tag ? hasData || (tag.title === title && tag.color === color) : hasData;
  };

  return (
    <Dialog open={isVisible} maxWidth="xs" onClose={closeModal}>
      <DialogHeader title={tag ? 'Update tag' : 'Create tag'} {...{ closeModal }} />
      <DialogContent>
        <DialogContentText>
          {tag
            ? 'After updating the tag, the changes are applied wherever they are used.'
            : 'To create a tag, come up with a name and choose a color!'}
        </DialogContentText>
        <TextField
          value={title}
          margin="dense"
          id="name"
          sx={{ mb: 4, mt: 5 }}
          label="Name"
          fullWidth
          required
          autoFocus
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
        <Stack
          direction="column"
          alignItems="center"
          spacing={4}
          divider={<Divider flexItem orientation="horizontal" />}
        >
          <Chip sx={{ background: color }} label={title || 'Placeholder'} onDelete={reset} />
          <ColorPicker selected={color} usePaper={false} onChange={setColor} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={isDisabled()} onClick={tag ? updateTag : createTag}>
          {tag ? 'Update tag' : 'Create tag'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import { FC, Fragment, memo } from 'react';
import { GlobalTagsQuery } from '../../../../../apollo/queries-generated-types';
import { useMutation } from '@apollo/client';
import {
  RemoveTagMutation,
  RemoveTagMutationVariables,
} from '../../../../../apollo/mutations-generated-types';
import { REMOVE_TAG } from '../../../../../apollo/mutations';
import { TagModal } from './TagModal';
import { useModalVisible } from '../../../../../hooks/modal-visible';
import { AppChip } from '../../../../../components/app-chip/AppChip';

type IProps = GlobalTagsQuery['tags'][number];

export const TagItem: FC<IProps> = memo(tag => {
  const { id, title, color, organizationId } = tag;

  const [removeTagMutation] = useMutation<RemoveTagMutation, RemoveTagMutationVariables>(
    REMOVE_TAG,
    {
      variables: { id },
      update(cache) {
        cache.modify({
          fields: {
            tags(tags: GlobalTagsQuery['tags'], { readField }) {
              return tags.filter(el => id !== readField('id', el));
            },
          },
        });
      },
    },
  );

  const { isVisible, closed, openModal, closeModal } = useModalVisible();

  return (
    <Fragment>
      <AppChip
        label={title}
        onClick={openModal}
        onDelete={removeTagMutation}
        color={color}
        sx={{ mr: 2, mb: 2 }}
      />
      {!closed && <TagModal {...{ isVisible, closeModal, organizationId, tag }} />}
    </Fragment>
  );
});

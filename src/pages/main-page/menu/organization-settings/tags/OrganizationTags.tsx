import { FC, memo } from 'react';
import { Box, Button, CircularProgress, Fab, Zoom } from '@mui/material';
import { styles } from './styles';
import { useQuery } from '@apollo/client';
import { GLOBAL_TAGS } from '../../../../../apollo/queries';
import {
  GlobalTagsQuery,
  GlobalTagsQueryVariables,
} from '../../../../../apollo/queries-generated-types';
import { EmptyPlaceholder } from '../../../../../components/empty-placeholder/EmptyPlaceholder';
import { useModalVisible } from '../../../../../hooks/modal-visible';
import { TagModal } from './TagModal';
import { TagsList } from './TagsList';
import AddIcon from '@mui/icons-material/Add';

interface IProps {
  id: string;
}

export const OrganizationTags: FC<IProps> = memo(({ id }) => {
  const { data, loading } = useQuery<GlobalTagsQuery, GlobalTagsQueryVariables>(GLOBAL_TAGS, {
    variables: { filters: { organizationId: id } },
  });
  const { isVisible, closed, closeModal, openModal } = useModalVisible();

  return (
    <Box sx={styles.container}>
      {loading ? (
        <Box sx={styles.center}>
          <CircularProgress />
        </Box>
      ) : data?.tags.length ? (
        <Box sx={styles.tags}>
          <TagsList tags={data.tags} />
          <Zoom in>
            <Fab sx={styles.tags__fab} color="primary" aria-label="add" onClick={openModal}>
              <AddIcon />
            </Fab>
          </Zoom>
        </Box>
      ) : (
        <Box sx={styles.center}>
          <EmptyPlaceholder
            title="Empty tags"
            description="You have not created any tag yet, click the button below to edit it!"
          >
            <Button variant="contained" size="small" onClick={openModal}>
              Create tag
            </Button>
          </EmptyPlaceholder>
        </Box>
      )}
      {!closed && <TagModal organizationId={id} {...{ isVisible, closeModal }} />}
    </Box>
  );
});

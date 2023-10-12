import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styles } from './styles';
import { PageHeader } from '../../components/page-header/PageHeader';
import { useModalVisible } from '../../hooks/modal-visible';
import { CreateTestModal } from './create-modal/CreateTestModal';
import { useQuery } from '@apollo/client';
import { GLOBAL_TESTS } from '../../apollo/queries';
import { GlobalTestsQuery, GlobalTestsQueryVariables } from '../../apollo/queries-generated-types';
import { EmptyPlaceholder } from '../../components/empty-placeholder/EmptyPlaceholder';
import { TestList } from './test-list/TestList';

export const TestsPage = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const { isVisible, closed, closeModal, openModal } = useModalVisible();
  const { data, loading } = useQuery<GlobalTestsQuery, GlobalTestsQueryVariables>(GLOBAL_TESTS, {
    variables: { filters: { organizationId } },
    fetchPolicy: 'network-only',
  });

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <PageHeader buttonText="Create test" onClickButton={openModal} />
        {loading ? (
          <Box sx={styles.content__center}>
            <CircularProgress />
          </Box>
        ) : data?.tests.length ? (
          <TestList tests={data.tests} />
        ) : (
          <Box sx={styles.content__center}>
            <EmptyPlaceholder
              title="Test is empty"
              description={'To create a test, click on "CREATE TEST" button'}
            />
          </Box>
        )}
      </Box>
      {organizationId && !closed && (
        <CreateTestModal {...{ isVisible, closeModal, organizationId }} />
      )}
    </Box>
  );
};

import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styles } from './styles';
import { PageHeader } from '../../components/page-header/PageHeader';
import { useModalVisible } from '../../hooks/modal-visible';
import { CreateTestModal } from './create-modal/CreateTestModal';

export const TestsPage = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const { isVisible, closed, closeModal, openModal } = useModalVisible();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <PageHeader buttonText="Create test" onClickButton={openModal} />
      </Box>
      {organizationId && !closed && (
        <CreateTestModal {...{ isVisible, closeModal, organizationId }} />
      )}
    </Box>
  );
};

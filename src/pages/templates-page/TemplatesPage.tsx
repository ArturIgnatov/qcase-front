import { memo } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CreateTemplateModal } from './create-modal/CreateTemplateModal';
import { useQuery } from '@apollo/client';
import { GET_GLOBAL_TEMPLATES } from '../../apollo/queries';
import { styles } from './styles';
import { GlobalTemplatesQuery } from '../../apollo/queries-generated-types';
import { TemplateList } from './template-list/TemplateList';
import { useModalVisible } from '../../hooks/modal-visible';
import { PageHeader } from '../../components/page-header/PageHeader';

export const TemplatesPage = memo(() => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const { isVisible, closed, closeModal, openModal } = useModalVisible();
  const { data, loading } = useQuery<GlobalTemplatesQuery>(GET_GLOBAL_TEMPLATES, {
    variables: { filters: { organizationId } },
  });

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <PageHeader buttonText="Create template" onClickButton={openModal} />
        <TemplateList templates={data?.templates} {...{ loading }} />
      </Box>
      {!closed && (
        <CreateTemplateModal {...{ isVisible, closeModal }} organizationId={organizationId ?? ''} />
      )}
    </Box>
  );
});

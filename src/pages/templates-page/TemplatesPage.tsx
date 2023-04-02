import { memo } from 'react';
import { Box, Button, Divider, IconButton, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FilterList, Sort, Search } from '@mui/icons-material';
import { CreateTemplateModal } from './create-modal/CreateTemplateModal';
import { useQuery } from '@apollo/client';
import { GET_GLOBAL_TEMPLATES } from '../../apollo/queries';
import { styles } from './styles';
import { GlobalTemplatesQuery } from '../../apollo/queries-generated-types';
import { TemplateList } from './template-list/TemplateList';
import { useModalVisible } from '../../hooks/modal-visible';

export const TemplatesPage = memo(() => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const { isVisible, closed, closeModal, openModal } = useModalVisible();
  const { data, loading } = useQuery<GlobalTemplatesQuery>(GET_GLOBAL_TEMPLATES, {
    variables: { filters: { organizationId } },
  });

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.panel}>
          <Box sx={styles.panel__start}>
            <IconButton>
              <Sort />
            </IconButton>
            <TextField
              sx={styles.panel__search}
              placeholder="Search..."
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: <Search sx={styles.panel__searchIcon} />,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box>
            <IconButton sx={styles.panel__filterIcon}>
              <FilterList />
            </IconButton>
            <Button onClick={openModal} variant="contained">
              Create template
            </Button>
          </Box>
        </Box>
        <Divider />
        <TemplateList templates={data?.templates} {...{ loading }} />
      </Box>
      {!closed && (
        <CreateTemplateModal {...{ isVisible, closeModal }} organizationId={organizationId ?? ''} />
      )}
    </Box>
  );
});

import { FC, memo } from 'react';
import { Box } from '@mui/material';
import { JobPlaceholder } from '../../../../../components/job-placeholder/JobPlaceholder';
import { styles } from './styles';

interface IProps {
  id: string;
}

export const OrganizationUsers: FC<IProps> = memo(() => {
  return (
    <Box sx={styles.container}>
      <JobPlaceholder title="Users in work progress" />
    </Box>
  );
});

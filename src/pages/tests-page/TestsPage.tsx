import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const TestsPage = () => {
  const { organizationId } = useParams<{ organizationId: string }>();

  return (
    <Box>
      <Typography variant="h6">TestsPage: {organizationId}</Typography>
    </Box>
  );
};

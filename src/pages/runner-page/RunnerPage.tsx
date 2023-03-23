import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const RunnerPage = () => {
  const { organizationId } = useParams<{ organizationId: string }>();

  return (
    <Box>
      <Typography variant="h6">RunnerPage: {organizationId}</Typography>
    </Box>
  );
};

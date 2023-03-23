import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const CasesPage = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  return (
    <Box>
      <Typography variant="h6">CasesPage: {organizationId}</Typography>
    </Box>
  );
};

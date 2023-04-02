import { createStyles } from '../../utils/create-styles';
import { colors } from '@mui/material';

export const styles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: -15,
  },

  animation: {
    height: 200,
    border: 3,
  },

  title: {
    mt: -10,
    mb: 3,
  },

  description: {
    textAlign: 'center',
    color: colors.grey['500'],
    maxWidth: 400,
    mb: 3,
  },
});

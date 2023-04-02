import { createStyles } from '../../utils/create-styles';
import { colors } from '@mui/material';

export const styles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  animation: {
    height: 180,
    marginBottom: -20,
    marginTop: -30,
  },

  title: {
    mb: 1,
  },

  description: {
    textAlign: 'center',
    color: colors.grey['500'],
    maxWidth: 400,
    mb: 3,
  },
});

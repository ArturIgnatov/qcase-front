import { createStyles } from '../../../../../utils/create-styles';
import { colors } from '@mui/material';

export const styles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },

  title: {
    color: colors.grey['500'],
    mb: 3,
  },

  bottom: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
});

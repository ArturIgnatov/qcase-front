import { createStyles } from '../../../utils/create-styles';
import { colors } from '@mui/material';

export const styles = createStyles({
  container: {
    minWidth: 150,
  },

  submenu: {
    minWidth: 150,
    transition: 'linear 0.2s',
  },

  avatar: {
    width: 25,
    height: 25,
    bgcolor: colors.orange[900],
    fontSize: 15,
  },
});

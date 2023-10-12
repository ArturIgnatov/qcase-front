import { createStyles } from '../../../utils/create-styles';

export const styles = createStyles({
  dialog: {
    '& .MuiDialog-paper': { minHeight: 650 },
  },

  dialog__content: {
    display: 'flex',
    flexGrow: 1,
  },

  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  content__stepper: {
    minWidth: '50%',
  },

  back__button: {
    mr: 1,
  },
});

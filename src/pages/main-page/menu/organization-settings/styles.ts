import { createStyles } from '../../../../utils/create-styles';

export const styles = createStyles({
  container: {
    p: 10,
  },

  close: {
    position: 'absolute',
    right: 8,
    top: 13,
    color: theme => theme.palette.grey[500],
  },

  dialog: {
    display: 'flex',
    p: 0,
  },

  grow: {
    flexGrow: 1,
  },

  listIcon: {
    minWidth: 40,
  },

  content: {
    display: 'flex',
    width: '70%',
    p: 4,
    height: '100%',
  },
});

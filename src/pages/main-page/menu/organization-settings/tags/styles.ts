import { createStyles } from '../../../../../utils/create-styles';

export const styles = createStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
  },

  tags: {
    flexGrow: 1,
    overflowY: 'scroll',
    pb: 20,
  },

  tags__fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },

  center: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
});

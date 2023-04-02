import { createStyles } from '../../../../../utils/create-styles';

export const styles = createStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
  },

  projects: {
    flexGrow: 1,
    overflowY: 'scroll',
    m: -4,
    pb: 20,
  },

  projects__fab: {
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
});

import { createStyles } from '../../utils/create-styles';

export const styles = createStyles({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    p: 0,
    flexDirection: 'column',
  },

  wrapper: {
    p: 5,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  content: {
    display: 'flex',
    flex: 1,
  },

  content__center: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

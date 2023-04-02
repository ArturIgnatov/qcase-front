import { createStyles } from '../../utils/create-styles';

export const styles = createStyles({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    p: 0,
  },

  wrapper: {
    p: 5,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  panel: {
    mb: 4,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  panel__start: {
    display: 'flex',
    alignSelf: 'center',
    width: '50%',
    flexDirection: 'row',
  },

  panel__search: {
    marginLeft: 4,
    width: '30%',
  },

  panel__searchIcon: {
    marginRight: 4,
  },

  panel__filterIcon: {
    marginRight: 3,
  },
});

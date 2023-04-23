import { createStyles } from '../../utils/create-styles';

export const styles = createStyles({
  header: {
    mb: 4,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  header__start: {
    display: 'flex',
    alignSelf: 'center',
    width: '50%',
    flexDirection: 'row',
  },

  header__search: {
    marginLeft: 4,
    width: '30%',
  },

  header__searchIcon: {
    marginRight: 4,
  },

  header__filterIcon: {
    marginRight: 3,
  },
});

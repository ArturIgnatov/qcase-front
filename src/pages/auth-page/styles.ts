import { createStyles } from '../../utils/create-styles';
import { pink } from '@mui/material/colors';
import background from '../../assets/images/auth-bg.jpg';

export const styles = createStyles({
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: '426px',
    minHeight: '50%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 36,
    opacity: 0.7,
  },

  card__logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },

  card__logoAvatar: {
    bgcolor: pink[500],
  },
});

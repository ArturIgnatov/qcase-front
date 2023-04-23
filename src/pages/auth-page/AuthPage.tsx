import { Avatar, Box, Link, Paper, styled, Typography } from '@mui/material';
import { LockPerson } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { LoginForm } from './login/loginForm';
import { RegisterForm } from './register/RegisterForm';
import { styles } from './styles';
import { useSearchParams } from 'react-router-dom';

const Container = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  ...(styles.card as any),
  color: theme.palette.text.primary,
}));

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get('invite');

  const [isRegister, setIsRegister] = useState(!!inviteCode);

  const toggleRegister = useCallback(() => {
    setIsRegister(prevState => !prevState);
  }, []);

  return (
    <Box sx={styles.container}>
      <Container elevation={20}>
        <Box sx={styles.card__logo}>
          <Avatar sx={styles.card__logoAvatar}>
            <LockPerson />
          </Avatar>
          <Typography variant="h6" gutterBottom>
            {isRegister ? 'Sign Up' : 'Sign In'}
          </Typography>
        </Box>
        {isRegister ? <RegisterForm {...{ inviteCode }} /> : <LoginForm />}
        <Link component="button" color="secondary" underline="always" onClick={toggleRegister}>
          {isRegister ? 'Go back' : "Don't have an account? Sign Up"}
        </Link>
      </Container>
    </Box>
  );
};

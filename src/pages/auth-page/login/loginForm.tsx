import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Slide,
  Snackbar,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff, Login } from '@mui/icons-material';
import { ChangeEvent, useCallback, useState } from 'react';
import { styles } from './styles';
import { AuthService } from '../../../services/auth.service';
import { useLazyQuery } from '@apollo/client';
import { GET_GLOBAL_USER } from '../../../apollo/queries';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setPasswordVisible] = useState(false);
  const [getUser] = useLazyQuery(GET_GLOBAL_USER);
  const navigate = useNavigate();

  const togglePasswordVisible = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleEmailChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  }, []);

  const handlePasswordChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  }, []);

  const handleSnackClose = useCallback(() => {
    setError('');
  }, []);

  const signIn = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await AuthService.signIn({ email, password });
      const jwtUser = AuthService.decodeJWT(result.accessToken);
      const data = await getUser({ variables: { id: jwtUser.id } });

      if (data.error?.message) {
        setError('INTERNAL_SERVER_ERROR');
      } else {
        navigate('/main', { replace: true });
      }
    } catch (e: any) {
      console.log('COMPONENT ERROR', e);
      const message = e?.response?.data?.message;
      if (message) {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, getUser, navigate, password]);

  const isDisabled = !password.trim().length || !email.trim().length;

  return (
    <Box sx={styles.container}>
      <TextField
        value={email}
        label="Email"
        type="email"
        required
        color="secondary"
        sx={styles.input}
        variant="outlined"
        autoComplete="email"
        onChange={handleEmailChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={password}
        label="Password"
        required
        color="secondary"
        sx={styles.input}
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        variant="outlined"
        onChange={handlePasswordChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisible}
                onMouseDown={togglePasswordVisible}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={isLoading || isDisabled}
        startIcon={<Login />}
        sx={styles.button}
        variant="outlined"
        color="secondary"
        size="large"
        onClick={signIn}
        endIcon={isLoading && <CircularProgress size={18} color="primary" />}
      >
        Login
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!error}
        TransitionComponent={Slide}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

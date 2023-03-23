import { ChangeEvent, useCallback, useState } from 'react';
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
import { Visibility, VisibilityOff, HowToReg } from '@mui/icons-material';
import { styles } from './styles';
import { useLazyQuery } from '@apollo/client';
import { AuthService } from '../../../services/auth.service';
import { GET_GLOBAL_USER } from '../../../apollo/queries';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setPasswordVisible] = useState(false);
  const [getUser] = useLazyQuery(GET_GLOBAL_USER);
  const navigate = useNavigate();

  const togglePasswordVisible = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleFnameChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setFname(target.value);
  }, []);

  const handleEmailChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  }, []);

  const handlePasswordChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  }, []);

  const signUp = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await AuthService.signUp({ email, password, fname });
      const jwtUser = AuthService.decodeJWT(result.accessToken);
      const data = await getUser({ variables: { id: jwtUser.id } });

      if (data.error?.message) {
        setError('INTERNAL_SERVER_ERROR');
      } else {
        navigate('/main', { replace: true });
      }
    } catch (e: any) {
      const errors = e?.response?.data?.message as string | string[];

      if (errors) {
        if (Array.isArray(errors)) {
          setError(errors[0]);
        } else {
          setError(errors);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, fname, getUser, navigate, password]);

  const handleSnackClose = useCallback(() => {
    setError('');
  }, []);

  const isDisabled = !fname.trim().length || !email.trim().length || !password.trim().length;

  return (
    <Box sx={styles.container}>
      <TextField
        value={fname}
        label="Name"
        sx={styles.input}
        type="text"
        required
        color="secondary"
        variant="outlined"
        onChange={handleFnameChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={email}
        label="Email"
        sx={styles.input}
        type="email"
        required
        color="secondary"
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
        sx={styles.button}
        startIcon={<HowToReg />}
        disabled={isLoading || isDisabled}
        variant="outlined"
        size="large"
        color="secondary"
        onClick={signUp}
        endIcon={isLoading && <CircularProgress size={18} color="primary" />}
      >
        Register
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

import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff, Login } from '@mui/icons-material';
import { ChangeEvent, useCallback, useState } from 'react';
import { styles } from './styles';

export const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleEmailChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  }, []);

  const handlePasswordChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  }, []);

  return (
    <Box sx={styles.container}>
      <TextField
        value={email}
        label="Email"
        type="email"
        required
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
        disabled={!password.length || !email.length}
        startIcon={<Login />}
        sx={styles.button}
        variant="contained"
        onClick={() => ''}
      >
        Login
      </Button>
    </Box>
  );
};

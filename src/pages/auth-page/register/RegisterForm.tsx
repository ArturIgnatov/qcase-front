import { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff, HowToReg } from '@mui/icons-material';
import { styles } from './styles';

export const RegisterForm = () => {
  const [showPassword, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <Box sx={styles.container}>
      <TextField
        label="Login"
        sx={styles.input}
        type="text"
        required
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Email"
        sx={styles.input}
        type="email"
        required
        variant="outlined"
        autoComplete="email"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Password"
        required
        sx={styles.input}
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        variant="outlined"
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
        disabled
        variant="contained"
        onClick={() => ''}
      >
        Register
      </Button>
    </Box>
  );
};

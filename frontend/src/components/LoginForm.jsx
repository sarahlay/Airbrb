import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { StoreContext } from '../utils/store'
import { useNavigate } from 'react-router-dom';

import { HOST } from '../utils/host';

const LoginForm = () => {
  const context = React.useContext(StoreContext);
  const [email, setEmail] = context.email;
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login();
  };

  const login = () => {
    fetch(
      `${HOST}/user/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
      .then(r => r.json())
      .then(data => {
        if (data.error !== undefined) {
          setErrorMessage(data.error);
          setOpen(true);
          return;
        }
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('email', email);
        navigate('/');
      })
      .catch(e => console.log(e));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Welcome back!</h1>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email Address"
          autoComplete="email"
          required
          fullWidth
          margin="normal"
          autoFocus
        />
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          label="Password"
          autoComplete="current-password"
          required
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Log in
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <DialogContentText>{errorMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleClose} autoFocus>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default LoginForm;

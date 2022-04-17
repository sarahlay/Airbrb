import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { StoreContext } from '../utils/store'
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const context = React.useContext(StoreContext);
  const [email, setEmail] = context.email;
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((password1 !== password2) & (password2 !== '')) return;
    register();
  };

  const register = () => {
    fetch(
      'http://localhost:5005/user/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email: email,
          password: password1,
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
      <h1>
        Create an account
      </h1>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              label="First Name"
              autoComplete="given-name"
              required
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              label="Last Name"
              autoComplete="family-name"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              label="Email Address"
              autoComplete="email"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={password1}
              onChange={e => setPassword1(e.target.value)}
              type="password"
              label="Password"
              autoComplete="new-password"
              required
              fullWidth
              error={(password1.length < 8) & (password1 !== '')}
              helperText={(password1.length < 8) & (password1 !== '') ? 'Password must be at least 8 characters' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              type="password"
              label="Confirm Password"
              required
              fullWidth
              error={(password1 !== password2) & (password2 !== '')}
              helperText={(password1 !== password2) & (password2 !== '') ? 'Passwords do not match' : ''}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
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

export default SignupForm;

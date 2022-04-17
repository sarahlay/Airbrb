import React from 'react';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';

import Background from '../components/Background';
import LoginTabs from '../components/LoginTabs';
import Theme from '../components/Theme';

const LoginPage = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Background />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={false} sm={4} md={8}></Grid>
        <LoginTabs />
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;

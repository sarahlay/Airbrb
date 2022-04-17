import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import Logo from '../logo.svg';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const LoginTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  return (
    <Grid className="Paper" item xs={12} sm={8} md={4} square>
      <Box>
        <div className="Homepage-header" onClick={() => navigate('/')}><img src={Logo} width="80"/> airbrb</div>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth" textColor="secondary" indicatorColor="secondary">
            <Tab label="Log in" />
            <Tab label="Sign up" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignupForm />
        </TabPanel>
      </Box>
  </Grid>
  );
}

export default LoginTabs;

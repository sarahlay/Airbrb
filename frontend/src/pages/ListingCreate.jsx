import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import Background from '../components/Background';
import ListingForm from '../components/ListingForm';
import NavBar from '../components/NavBar';
import Theme from '../components/Theme';

const ListingCreate = () => {
  return <>
    <ThemeProvider theme={Theme}>
      <Background />
      <NavBar isHomepage={false}/>
      <ListingForm />
    </ThemeProvider>
  </>;
}

export default ListingCreate;

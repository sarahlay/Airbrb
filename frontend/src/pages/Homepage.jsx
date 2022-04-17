import React from 'react';
import Logo from '../logo.svg';
import { StoreContext } from '../utils/store';
import NavBar from '../components/NavBar';
import { HomeSearchBar } from '../components/SearchBar';
import Background from '../components/Background';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../components/Theme';

const Homepage = () => {
  const context = React.useContext(StoreContext);
  React.useEffect(() => {
    const setLocation = context.location[1];
    const setCheckin = context.checkin[1];
    const setCheckout = context.checkout[1];
    const setBeds = context.beds[1];
    const setMinPrice = context.minPrice[1];
    const setMaxPrice = context.maxPrice[1];
    const setListings = context.listings[1];
    setLocation('');
    setCheckin(null);
    setCheckout(null);
    setBeds(0);
    setMinPrice(0);
    setMaxPrice(100);
    setListings({});
  }, []);

  return <>
      <ThemeProvider theme={Theme}>
        <Background />
        <NavBar isHomepage={true}/>
        <div className="Homepage-header"><img src={Logo} width="80"/> airbrb</div>
        <HomeSearchBar />
      </ThemeProvider>
    </>
}

export default Homepage;

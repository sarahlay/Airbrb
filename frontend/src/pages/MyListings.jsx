import React from 'react';
import { StoreContext } from '../utils/store';
import ListingBox from '../components/ListingBox'
import NavBar from '../components/NavBar';
import Background from '../components/Background';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Theme from '../components/Theme';
import { ThemeProvider } from '@mui/material/styles';
import { HOST } from '../utils/host';
import { useNavigate } from 'react-router';
import { Alert } from '@mui/material';

const MyListings = () => {
  const context = React.useContext(StoreContext);
  const email = window.localStorage.getItem('email');
  const [hostListings, setHostListings] = context.hostListings;
  const listings = context.listings[0]

  React.useEffect(async () => {
    const promise = await fetch(`${HOST}/listings`);
    const data = await promise.json();
    let tempListings = data.listings;
    for (const l of data.listings) {
      if (email !== l.owner) {
        tempListings = tempListings.filter((item) => { return item !== l });
      }
    }
    setHostListings(tempListings);
  }, [listings]);

  const navigate = useNavigate();
  return <>
    <ThemeProvider theme={Theme}>
      <Background />
      <NavBar isHomepage={false}/>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Alert variant="outlined" severity="info" >Select on the listing thumbnail to view booking details.</Alert>
        <h1>My Listings</h1>
        <Grid container spacing={3}>
          {hostListings.length === undefined
            ? ''
            : hostListings.map((listing, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} >
                <ListingBox onClick={() => navigate(`/host/listings/${listing.id}`)} listing={listing} isListingList={false}/>
              </Grid>
            ))}
        </Grid>
      </Container>
    </ThemeProvider>
  </>
}

export default MyListings;

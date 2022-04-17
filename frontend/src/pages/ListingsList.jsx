import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../utils/store';
import ListingBox from '../components/ListingBox'
import NavBar from '../components/NavBar';
import { isValidDates } from '../utils/date';
import Background from '../components/Background';
import Theme from '../components/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { HOST } from '../utils/host';

const ListingsList = () => {
  const context = React.useContext(StoreContext);
  const location = context.location[0];
  const checkin = context.checkin[0];
  const checkout = context.checkout[0];
  const beds = context.beds[0];
  const minPrice = context.minPrice[0];
  const maxPrice = context.maxPrice[0];
  const [listings, setListings] = context.listings;

  React.useEffect(async () => {
    const promise = await fetch(`${HOST}/listings`);
    const data = await promise.json();
    let tempListings = data.listings;
    const string = location.toUpperCase();
    for (const l of data.listings) {
      if (location !== '' &&
        !l.title.toUpperCase().includes(string) &&
        !l.address.toUpperCase().includes(string)
      ) {
        tempListings = tempListings.filter((item) => { return item !== l });
      }

      const promise = await fetch(`${HOST}/listings/${l.id}`);
      const data = await promise.json();
      const listing = data.listing;

      // check dates
      if (checkin !== null && checkout !== null && listing.availability !== []) {
        for (const availability of listing.availability) {
          if (isValidDates(checkin, checkout, availability.start, availability.end)) {
            tempListings = tempListings.filter((item) => { return item !== l });
          }
        }
      }

      // check beds
      if ((beds !== 0 || beds === undefined) &&
        listing.metadata.capacity < beds
      ) {
        tempListings = tempListings.filter((item) => { return item !== l });
      }

      // check price
      if (((minPrice !== undefined && maxPrice !== undefined) ||
      (minPrice !== 0 && maxPrice !== 0)) &&
      (listing.price < minPrice ||
        listing.price > maxPrice)
      ) {
        tempListings = tempListings.filter((item) => { return item !== l });
      }

      // check published
      if (listing.published === false) {
        tempListings = tempListings.filter((item) => { return item !== l });
      }
    }
    // last minute bug with search :(
    setListings(tempListings);
  }, [location, checkin, checkout, beds, minPrice, maxPrice]);

  const navigate = useNavigate();
  return <>
    <ThemeProvider theme={Theme}>
      <Background />
      <NavBar isHomepage={false}/>
      <Container sx={{ py: 8 }} maxWidth="md">
        <h1>Search results...</h1>
        <Grid container spacing={3}>
          {listings.length === undefined
            ? ''
            : listings.map((listing, idx) => {
              return <Grid item key={idx} xs={12} sm={6} md={4} onClick={() => navigate(`/listings/${listing.id}`)}>
                  <ListingBox onClick={() => navigate(`/listings/${listing.id}`)} listing={listing} isListingList={true}/>
                </Grid>
            })}
        </Grid>
      </Container>
    </ThemeProvider>
  </>
}

export default ListingsList;

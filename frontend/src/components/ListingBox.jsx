import React from 'react';
import PropTypes from 'prop-types';

import { StoreContext } from '../utils/store';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import Grid from '@mui/material/Grid';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import PublishButton from './PublishButton';
import UnpublishButton from './UnpublishButton';
import { getDuration } from '../utils/date';
import { HOST } from '../utils/host';

import Theme from './Theme';
import { ThemeProvider } from '@mui/system';

const ListingBox = ({ listing, isListingList, onClick }) => {
  const context = React.useContext(StoreContext);
  const checkin = context.checkin[0];
  const checkout = context.checkout[0];
  const email = window.localStorage.getItem('email');

  const [metadata, setMetadata] = React.useState({});
  const [published, setPublished] = React.useState(false);

  React.useEffect(async () => {
    const promise = await fetch(`${HOST}/listings/${listing.id}`);
    const data = await promise.json();
    setMetadata(data.listing.metadata);
    setPublished(data.listing.published);
  }, []);

  return (
  <ThemeProvider theme={Theme}>
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
      className="Listing-box"
    >
      <CardMedia
        component="img"
        image={listing.thumbnail}
        alt="listing thumbnail"
        height="150"
        onClick={onClick}
        />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography component="div" variant="h5">
          {listing.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {listing.address}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {listing.reviews.length + ' reviews'}
        </Typography>
          {metadata !== {}
            ? <div>
            <div>
              <ListItemIcon>
                <HotelOutlinedIcon />
              </ListItemIcon>
              <span>{metadata.capacity} beds</span>
            </div>
            <div>
              <ListItemIcon>
                <BedroomParentOutlinedIcon />
              </ListItemIcon>
              <span>{metadata.bedrooms} bedrooms</span></div>
            <div>
              <ListItemIcon>
                <ShowerOutlinedIcon />
              </ListItemIcon>
              <span>{metadata.bathrooms} bathrooms</span>
            </div>
            </div>
            : ''
          }
        <Typography className="Listing-price" component="div" variant="h5">
          {checkin === null || checkout === null
            ? '$ ' + listing.price
            : '$ ' + (getDuration(checkin, checkout) * listing.price)
          }
        </Typography>
        {email === listing.owner && !isListingList
          ? <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}><EditButton id={listing.id} /></Grid>
              <Grid item xs={12} sm={4}>
                {!published
                  ? <PublishButton id={listing.id} />
                  : <UnpublishButton id={listing.id} />}
              </Grid>
              <Grid item xs={12} sm={4}><DeleteButton id={listing.id} /></Grid>
            </Grid>
          : ''
        }
      </CardContent>
    </Card>
  </ThemeProvider>
  );
}

ListingBox.propTypes = {
  listing: PropTypes.object,
  isListingList: PropTypes.bool,
  onClick: PropTypes.func
}

export default ListingBox;

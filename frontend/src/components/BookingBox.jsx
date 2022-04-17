import React from 'react';
import Logo from '../logo.svg';
import { StoreContext } from '../utils/store'
import { getDate, getDuration } from '../utils/date';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider } from '@mui/material';

import BookingConfirmation from './BookingConfirmation';
import { DatePicker } from './DatePicker'

const BookingBox = () => {
  const context = React.useContext(StoreContext);
  const [checkin, setCheckin] = context.checkin;
  const [checkout, setCheckout] = context.checkout;
  const [listing, setListing] = context.listing;
  console.log(checkin, setCheckin, checkout, setCheckout, setListing);
  const duration = getDuration(checkin, checkout);
  console.log(checkin, checkout);
  return <>
    {checkin === '' || checkout === ''
      ? ''
      : <Box sx={{ minWidth: 275 }} id="Booking-confirmation-container">
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <img id="Booking-confirmation-logo" src={Logo}></img>
              <h3>Your Stay</h3>
              <Divider />
              <p id="Booking-confirmation-text">Staying at {listing.title} for {duration} night{duration > 1 ? 's' : ''} between {getDate(checkin)} and {getDate(checkout)}.
              </p>
            </CardContent>
            <BookingConfirmation />
          </React.Fragment>
        </Card>
      </Box>
    }
  </>
}

const BookingContainer = () => {
  const context = React.useContext(StoreContext);
  const checkin = context.checkin[0];
  const checkout = context.checkout[0];
  return <>
    <div className="Booking-date-pickers">
      <DatePicker />
    </div>
    {checkin === null || checkout === null
      ? ''
      : <BookingBox />
    }
  </>
}

export {
  BookingBox,
  BookingContainer
};

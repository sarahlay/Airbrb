import * as React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { styled, ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import { StoreContext } from '../utils/store'
import { getDate, getDuration, isValidDates } from '../utils/date';
import { fetchHelper } from '../utils/fetchHelper';

import { HOST } from '../utils/host';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose
        ? <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function BookingConfirmation () {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  const context = React.useContext(StoreContext);
  const setBookings = context.bookings[1];
  const checkin = context.checkin[0];
  const checkout = context.checkout[0];
  const listing = context.listing[0];
  const token = window.localStorage.getItem('token');

  const { id } = useParams();
  const handleClickOpen = async () => {
    setOpen(true);
    for (const date of listing.availability) {
      if (!isValidDates(checkin, checkout, date.start, date.end)) {
        setSuccess(false);
      }
    }
    if (success) {
      var data = await fetchHelper('POST', `${HOST}/bookings/new/${id}`, token, {
        dateRange: {
          in: checkin,
          out: checkout,
        },
        totalPrice: (listing.price * getDuration(checkin, checkout)),
      });
      data = await fetchHelper('GET', `${HOST}/bookings`, token);
      if (data.bookings !== undefined) setBookings(data.bookings);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Button variant="contained" id="Check-availability-button" onClick={handleClickOpen} color={'primary'} size="large">BOOK</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {success
            ? 'Booking Confirmed'
            : 'Sorry!'
          }
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <p>
            {success
              ? `You are staying at ${listing.title} for ${getDuration(checkin, checkout)} night${getDuration(checkin, checkout) > 1 ? 's' : ''} between ${getDate(checkin)} and ${getDate(checkout)}. Get packing!`
              : 'Unfortunately your dates are unavailable. Please try another date range.'
            }
          </p>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" size="small" autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider>
  );
}

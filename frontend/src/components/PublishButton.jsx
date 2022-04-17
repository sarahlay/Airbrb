import React from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormDatePicker } from './DatePicker';
import { StoreContext } from '../utils/store';
import { HOST } from '../utils/host';

const PublishButton = ({ id }) => {
  const context = React.useContext(StoreContext);
  const setListings = context.listings[1];

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [date1, setDate1] = React.useState('');
  const [date2, setDate2] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    console.log('posting...');
    event.preventDefault();
    publishListing();
    location.reload();
  };

  const publishListing = async () => {
    const token = window.localStorage.getItem('token');
    await fetch(`${HOST}/listings/publish/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        availability: [{
          start: date1,
          end: date2
        }],
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.error !== undefined) {
          setErrorMessage(data.error);
          return;
        }
        handleClose();
      })
      .catch(e => console.log(e));

    const promise = await fetch(`${HOST}/listings`);
    const data = await promise.json();
    setListings(data.listings);
  };

  return (
    <Box component="form">
      <Button onClick={handleClickOpen} variant="contained" size="small" id={id}>Post</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Post listing?</DialogTitle>
        <DialogContent dividers>
          <span className="Alert" value={errorMessage}></span>
          <DialogContentText sx={{ pb: 1 }}>
            When will this place be available?
          </DialogContentText>
          <FormDatePicker
            startText="Availability start"
            endText="Availability end"
            date1={date1}
            date2={date2}
            setDate1={setDate1}
            setDate2={setDate2}
            className="Listing-form-datepicker"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ px: 2 }} onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{ px: 2 }} onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

PublishButton.propTypes = {
  id: PropTypes.number,
}

export default PublishButton;

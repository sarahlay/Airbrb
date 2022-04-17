import React from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { StoreContext } from '../utils/store';
import { HOST } from '../utils/host';
import { DialogContentText } from '@mui/material';

const UnpublishButton = ({ id }) => {
  const context = React.useContext(StoreContext);
  const setListings = context.listings[1];

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    console.log('hiding...');
    event.preventDefault();
    unpublishListing();
    setOpen(false);
    location.reload();
  };

  const unpublishListing = async () => {
    const token = window.localStorage.getItem('token');
    await fetch(`${HOST}/listings/unpublish/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(r => r.json())
      .then(data => {
        if (data.error !== undefined) {
          setErrorMessage(data.error);
          return;
        }
        handleClose();
        console.log('hidden!');
      })
      .catch(e => console.log(e));

    const promise = await fetch(`${HOST}/listings`);
    const data = await promise.json();
    setListings(data.listings);
  };

  return (
    <Box component="form">
      <Button onClick={handleClickOpen} variant="outlined" size="small" id={id}>Hide</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Hide listing?</DialogTitle>
        <DialogContent dividers>
          <span className="Alert" value={errorMessage}></span>
          <DialogContentText>
            This will remove this listing from searches.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ px: 2 }} onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{ px: 2 }} onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

UnpublishButton.propTypes = {
  id: PropTypes.number,
}

export default UnpublishButton;

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
import { fetchHelper } from '../utils/fetchHelper';

const DeleteButton = ({ id }) => {
  const context = React.useContext(StoreContext);
  const setListings = context.listings[1];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    console.log('deleting...');
    event.preventDefault();
    deleteListing();
    setOpen(false);
  };

  const deleteListing = async () => {
    const token = window.localStorage.getItem('token');
    await fetchHelper('DELETE', `${HOST}/listings/${id}`, token);
    const promise = await fetch(`${HOST}/listings`);
    const data = await promise.json();
    setListings(data.listings);
  };

  return (
    <Box component="form">
      <Button onClick={handleClickOpen} variant="contained" color="warning" size="small" id={id}>Delete</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Delete listing?</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            This action cannot be undone.
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

DeleteButton.propTypes = {
  id: PropTypes.number,
}

export default DeleteButton;

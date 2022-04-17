import React from 'react';
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { StoreContext } from '../utils/store';
import { HOST } from '../utils/host';

const EditButton = ({ id }) => {
  const context = React.useContext(StoreContext);
  const setListings = context.listings[1];

  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [image, setImage] = React.useState('');
  const [imageList, setImageList] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');
  const [capacity, setCapacity] = React.useState(1);
  const [bedrooms, setBedrooms] = React.useState(1);
  const [bathrooms, setBathrooms] = React.useState(0);
  const [pool, setPool] = React.useState(false);
  const [gym, setGym] = React.useState(false);
  const [wifi, setWifi] = React.useState(false);
  const [tv, setTV] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const addImage = () => {
    if (image === '') return;
    setImageList(imageList === '' ? `${image}` : `${imageList}\n${image}`);
    setImage('');
  }

  const setVariables = async () => {
    const promise = await fetch(`${HOST}/listings/${id}`);
    const data = await promise.json();

    setTitle(data.listing.title);
    setAddress(data.listing.address);
    setPrice(data.listing.price);
    setThumbnail(data.listing.thumbnail);
    setPropertyType(data.listing.metadata.propertyType);
    setCapacity(data.listing.metadata.capacity);
    setBedrooms(data.listing.metadata.bedrooms);
    setBathrooms(data.listing.metadata.bathrooms);
    setImageList(data.listing.metadata.images.join('\n'));
    if (data.listing.metadata.amenities !== undefined) {
      setPool(data.listing.metadata.amenities.pool);
      setGym(data.listing.metadata.amenities.gym);
      setWifi(data.listing.metadata.amenities.wifi);
      setTV(data.listing.metadata.amenities.tv);
    }
  }

  const clearVariables = () => {
    setAddress('');
    setPropertyType('');
    setCapacity(1);
    setBedrooms(1);
    setBathrooms(0);
    setTitle('');
    setPrice(0);
    setThumbnail('');
    setImage('');
    setImageList('');
    setPool(false);
    setGym(false);
    setWifi(false);
    setTV(false);
  }

  const handleClickOpen = () => {
    setVariables();
    setVariables();
    setOpen(true);
  };

  const handleClose = () => {
    clearVariables();
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateListing();
  };

  const updateListing = async () => {
    const token = window.localStorage.getItem('token');
    let images = [];
    if (imageList !== undefined) {
      images = imageList.split('\n');
    }
    await fetch(`${HOST}/listings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        address,
        price,
        thumbnail,
        metadata: {
          propertyType,
          capacity,
          bedrooms,
          bathrooms,
          amenities: {
            pool,
            gym,
            wifi,
            tv,
          },
          images,
        },
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
    setListings(data.listings)
  };

  return (
    <Box component="form">
      <Button onClick={(e) => handleClickOpen()} variant="outlined" size="small" id={id}>Edit</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Edit Listing</DialogTitle>
        <DialogContent dividers>
          <span className="Alert" value={errorMessage}></span>
          <h3>Details</h3>
          <Grid container spacing={3} sx={{ pb: 2 }}>
            <Grid item xs={12}><TextField value={title} onChange={e => setTitle(e.target.value)} label="Title" required fullWidth /></Grid>
            <Grid item xs={12}><TextField value={address} onChange={e => setAddress(e.target.value)} label="Address" required fullWidth /></Grid>
            <Grid item xs={12}>
              <TextField
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  label="Price per night"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputProps: { min: 0, max: 100 }, startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  required
                  fullWidth
                />
            </Grid>
            <Grid item xs={12}><TextField value={thumbnail} onChange={e => setThumbnail(e.target.value)} label="Thumbnail" required fullWidth /></Grid>
            <Grid item xs={12} sm={8}><TextField value={image} onChange={e => setImage(e.target.value)} label="Add another image..." fullWidth /></Grid>
            <Grid item xs={12} sm={4}><Button onClick={addImage} fullWidth>Add image</Button></Grid>
            <Grid item xs={12}>
              <TextField
                value={imageList}
                onChange={e => setImageList(e.target.value)}
                label="Other images"
                shrink={imageList !== ''}
                fullWidth
                multiline
                maxRows={4}
              />
            </Grid>
          </Grid>
          <h3>Features</h3>
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id="property-type-label">Type of place</InputLabel>
                <Select
                  value={propertyType}
                  onChange={e => setPropertyType(e.target.value)}
                  label="Type of Place *"
                  labelId="property-type-label"
                >
                  <MenuItem value={'apartment'}>Apartment</MenuItem>
                  <MenuItem value={'house'}>House</MenuItem>
                  <MenuItem value={'unit'}>Self-contained unit</MenuItem>
                  <MenuItem value={'hotel'}>Boutique hotel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                label="Guest capacity"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: 1 } }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                value={bedrooms}
                onChange={e => setBedrooms(e.target.value)}
                label="Number of bedrooms"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: 1 } }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                value={bathrooms}
                onChange={e => setBathrooms(e.target.value)}
                label="Number of bathrooms"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: 0 } }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel checked={pool} onChange={e => setPool(e.target.checked)} control={<Checkbox />} label="Pool" />
                <FormControlLabel checked={gym} onChange={e => setGym(e.target.checked)} control={<Checkbox />} label="Gym" />
                <FormControlLabel checked={wifi} onChange={e => setWifi(e.target.checked)} control={<Checkbox />} label="Wi-Fi" />
                <FormControlLabel checked={tv} onChange={e => setTV(e.target.checked)} control={<Checkbox />} label="TV" />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button sx={{ px: 2 }} onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{ px: 2 }} onClick={handleSubmit}>Update Details</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

EditButton.propTypes = {
  id: PropTypes.number,
}

export default EditButton;

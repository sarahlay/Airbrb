import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import { HOST } from '../utils/host';

const ListingForm = () => {
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');
  const [capacity, setCapacity] = React.useState(1);
  const [bedrooms, setBedrooms] = React.useState(1);
  const [bathrooms, setBathrooms] = React.useState(0);
  const [pool, setPool] = React.useState(false);
  const [gym, setGym] = React.useState(false);
  const [wifi, setWifi] = React.useState(false);
  const [tv, setTV] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [image, setImage] = React.useState('');
  const [imageList, setImageList] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  const addImage = () => {
    if (image === '') return;
    setImageList(imageList === '' ? `${image}` : `${imageList}\n${image}`);
    setImage('');
  }

  const handleClose = () => {
    setOpen(false);
  };

  const currentdate = new Date().toLocaleString();

  const createListing = () => {
    const token = window.localStorage.getItem('token');
    const images = imageList.split('\n');
    const body = {
      title,
      address: address1 + ', ' + (address2 !== '' ? address2 + ', ' : '') + city + ' ' + state + ' ' + postcode + ' ' + country,
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
      reviews: [],
      availability: [],
      published: false,
      postedOn: currentdate,
    }
    fetch(`${HOST}/listings/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(data => {
        if (data.error !== undefined) {
          setErrorMessage(data.error);
          setOpen(true);
          return;
        }
        navigate('/host/listings');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createListing();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Grid container spacing={3} sx={{ pr: 3 }}>
        <Grid item xs={12} sm={9}>
          <h1>List a property</h1>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Create listing
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1, p: 3 }}>
        <Grid className="Paper" item sm={12} md={4} sx={{ p: 3 }}>
          <h2>Where is it?</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField value={address1} onChange={e => setAddress1(e.target.value)} label="Address line 1" required fullWidth /></Grid>
            <Grid item xs={12}><TextField value={address2} onChange={e => setAddress2(e.target.value)} label="Address line 2" fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField value={city} onChange={e => setCity(e.target.value)} label="City" required fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField value={state} onChange={e => setState(e.target.value)} label="State/Province/Region" required fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField value={postcode} onChange={e => setPostcode(e.target.value)} label="Zip / Postal code" required fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField value={country} onChange={e => setCountry(e.target.value)} label="Country" required fullWidth /></Grid>
          </Grid>
        </Grid>
        <Grid className="Paper" item sm={12} md={4} sx={{ p: 3 }}>
          <h2>Tell us a bit about it...</h2>
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
        </Grid>
        <Grid className="Paper" item sm={12} md={4} sx={{ p: 3 }}>
          <h2>Customise your listing!</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField value={title} onChange={e => setTitle(e.target.value)} label="Title" required fullWidth /></Grid>
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
            <Grid item xs={12}><TextField value={thumbnail} onChange={e => setThumbnail(e.target.value)} label="Thumbnail" required fullWidth helperText="Insert an image address" /></Grid>
            <Grid item xs={12} sm={8}><TextField value={image} onChange={e => setImage(e.target.value) } helperText="Insert an image address" label="Add another image..." fullWidth /></Grid>
            <Grid item xs={12} sm={4}><Button onClick={addImage} fullWidth>Add image</Button></Grid>
            <Grid item xs={12}>
              <TextField
                value={imageList}
                onChange={e => setImageList(e.target.value)}
                label="Other images"
                disabled
                fullWidth
                multiline
                maxRows={4}
              />
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <DialogContentText>{errorMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleClose} autoFocus>Close</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
}

export default ListingForm;

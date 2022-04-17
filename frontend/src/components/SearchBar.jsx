import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { FormDatePicker } from './DatePicker';
import { StoreContext } from '../utils/store';
import { useNavigate } from 'react-router-dom';

const SearchArea = ({ id, type, searchField, f }) => {
  return <>
    <form className="Search-form">
      <TextField color="secondary" variant="standard" onChange={(e) => f(e.target.value)} id={id} label={searchField} type={type}/>
    </form>
  </>
}

function valuetext (value) {
  return `$${value}`;
}

const minDistance = 10;

const PriceSlider = () => {
  const context = React.useContext(StoreContext);
  const [minPrice, setMinPrice] = context.minPrice;
  const [maxPrice, setMaxPrice] = context.maxPrice;
  const [value, setValue] = React.useState([minPrice, maxPrice]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }

    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  return (
    <Box className="Price-slider" sx={{ width: 400 }}>
      <Typography className="Price-slider-caption" variant={'caption'}>
        Price range
      </Typography>
      <Slider
        color="secondary"
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        step={5}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={100}
      />
    </Box>
  );
}

const HomeSearchBar = () => {
  const context = React.useContext(StoreContext);
  const setLocation = context.location[1];
  const setBeds = context.beds[1];
  const [checkin, setCheckin] = context.checkin;
  const [checkout, setCheckout] = context.checkout;

  const navigate = useNavigate();
  return <>
    <form className="Search-container">
      <SearchArea id="Search-location" type="text" searchField="Location" f={setLocation}/>
      <FormDatePicker startText="Check in" endText="Check out" date1={checkin} date2={checkout} setDate1={setCheckin} setDate2={setCheckout}/>
      <SearchArea id="Search-bedrooms" type="number" searchField="Beds" f={setBeds}/>
      <PriceSlider />
      <SearchIcon id="Search-button" onClick={() => navigate('/listings')} />
    </form>
  </>
}

const NavSearchBar = () => {
  const context = React.useContext(StoreContext);
  const setLocation = context.location[1];
  const setBeds = context.beds[1];
  const setMinPrice = context.minPrice[1];
  const setMaxPrice = context.maxPrice[1];
  const [checkin, setCheckin] = context.checkin;
  const [checkout, setCheckout] = context.checkout;

  const navigate = useNavigate();
  return <>
    <form className="Nav-search-container">
      <SearchArea id="Search-location" type="text" searchField="Location" f={setLocation}/>
      <FormDatePicker startText="Check in" endText="Check out" date1={checkin} date2={checkout} setDate1={setCheckin} setDate2={setCheckout}/>
      <SearchArea id="Search-bedrooms" type="number" searchField="Beds" f={setBeds}/>
      <PriceSlider setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
      <SearchIcon id="Search-button" onClick={() => navigate('/listings')} />
    </form>
  </>
}

const MobileSearch = () => {
  const [open, setOpen] = React.useState(false);
  const context = React.useContext(StoreContext);
  const setLocation = context.location[1];
  const setBeds = context.beds[1];
  const setMinPrice = context.minPrice[1];
  const setMaxPrice = context.maxPrice[1];
  const [checkin, setCheckin] = context.checkin;
  const [checkout, setCheckout] = context.checkout;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div>
      <div onClick={handleClickOpen} className="Mobile-search-button">
        <p className="Mobile-search-text">Search new listings</p>
        <SearchIcon fontSize="small" id="Search-button" />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> <h2>Search for your next stay</h2> </DialogTitle>
        <DialogContent className="Mobile-search-container">
          <SearchArea id="Search-location" type="text" searchField="Location" f={setLocation}/>
          <FormDatePicker startText="Check in" endText="Check out" date1={checkin} date2={checkout} setDate1={setCheckin} setDate2={setCheckout}/>
          <SearchArea id="Search-bedrooms" type="number" searchField="Beds" f={setBeds}/>
          <PriceSlider setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
        </DialogContent>
        <DialogActions>
          <SearchIcon
            id="Search-button"
            onClick={() => {
              navigate('/listings');
              handleClose();
            }}
            />
        </DialogActions>
      </Dialog>
    </div>
  );
}

SearchArea.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  searchField: PropTypes.string,
  f: PropTypes.func,
}

export { HomeSearchBar, NavSearchBar, MobileSearch };

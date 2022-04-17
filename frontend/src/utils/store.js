/*eslint-disable */
import React from 'react'

export const StoreContext = React.createContext(null);

const initListing = {
  "title": "",
  "owner": "",
  "address": {},
  "price": null,
  "thumbnail": "",
  "metadata": {
    "Images": [],
		"Bedrooms": 0,
		"Beds": 0,
		"Bathrooms": 0,
		"Type": '=',
		"Amenities": [''],
		"Description": '',
  },
  "reviews": [],
  "availability": [
    {},
  ],
  "published": false,
  "postedOn": ""
}

export default ({ children }) => {
  const [location, setLocation] = React.useState('');
  const [checkin, setCheckin] = React.useState(null);
  const [checkout, setCheckout] = React.useState(null);
  const [beds, setBeds] = React.useState(0);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(100);
  const [listings, setListings] = React.useState({});
  const [listing, setListing] = React.useState(initListing);

  // Must be logged in for following variables
  const [hostListings, setHostListings] = React.useState({});
  const [token, setToken] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [bookings, setBookings] = React.useState({});

  const store = {
    location: [location, setLocation],
    checkin: [checkin, setCheckin],
    checkout: [checkout, setCheckout],
    beds: [beds, setBeds],
    minPrice: [minPrice, setMinPrice],
    maxPrice: [maxPrice, setMaxPrice],
    listings: [listings, setListings],
    listing: [listing, setListing],
    hostListings: [hostListings, setHostListings],
    token: [token, setToken],
    email: [email, setEmail],
    bookings: [bookings, setBookings],
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
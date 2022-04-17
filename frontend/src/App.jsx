import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import StoreProvider from './utils/store';

import ListingsList from './pages/ListingsList';
import ListingDetails from './pages/ListingDetails';
import ListingCreate from './pages/ListingCreate';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import MyListings from './pages/MyListings';
import HostListingDetails from './pages/HostListingDetails';

function App () {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/listings" element={<ListingsList />}/>
          <Route path="/listing/create" element={<ListingCreate />}/>
          <Route path="/listings/:id" element={<ListingDetails />}/>
          <Route path="/host/listings" element={<MyListings />}/>
          <Route path="/host/listings/:id" element={<HostListingDetails />}/>
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;

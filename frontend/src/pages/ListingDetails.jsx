import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../utils/store';

import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WifiIcon from '@mui/icons-material/Wifi';
import TvIcon from '@mui/icons-material/Tv';
import Button from '@mui/material/Button';

import { BookingContainer } from '../components/BookingBox';
import { ReviewCard, LeaveReview } from '../components/Review';
import ImageCarousel from '../components/ImageCarousel';

import { ThemeProvider } from '@mui/material/styles';
import Theme from '../components/Theme';

import { HOST } from '../utils/host';
import Background from '../components/Background';

const ListingDetails = () => {
  const context = React.useContext(StoreContext);
  const { id } = useParams();
  const [listing, setListing] = context.listing;
  const email = window.localStorage.getItem('email');

  React.useEffect(async () => {
    const promise = await fetch(`${HOST}/listings/${id}`);
    const data = await promise.json();
    setListing(data.listing);
  }, []);

  const amenities = listing.metadata.amenities;
  const navigate = useNavigate();
  return <>
  <ThemeProvider theme={Theme}>
    <NavBar />
    <Background />
    <Container sx={{ py: 8 }} maxWidth="md" className="Paper">
      <Button size="small" color="warning" onClick={() => navigate('/listings')}>back</Button>
      {(listing.title === '')
        ? ''
        : <div className="Listing-container">
            <div className="Listing-header">
              <div className="Listing-headline">
                <h1 className="Listing-title">{listing.title}</h1>
                <div>
                  <p className="Tiny-text">{listing.address}</p>
                  <p className="Tiny-text">
                    <StarRoundedIcon fontSize="small" />
                    {listing.reviews.length} reviews
                  </p>
                </div>
              </div>
              <div className="Listing-price">
                <h1><AttachMoneyIcon fontSize="medium" />{listing.price}</h1>
              </div>
            </div>
            <ImageCarousel listing={listing} />
            <div className="Host-details">
              <h3>Hosted by {listing.owner.split('@')[0]}</h3>
            </div>
            <div className="Listing-details">
              <Divider />
              <div>
                <ListItemIcon>
                  <HotelOutlinedIcon />
                </ListItemIcon>
                <span>{listing.metadata.capacity} beds</span>
              </div>
              <div>
                <ListItemIcon>
                  <BedroomParentOutlinedIcon />
                </ListItemIcon>
                <span>{listing.metadata.bedrooms} bedrooms</span></div>
              <div>
                <ListItemIcon>
                  <ShowerOutlinedIcon />
                </ListItemIcon>
                <span>{listing.metadata.bathrooms} bathrooms</span>
              </div>
              { (amenities.pool || amenities.gym || amenities.wifi || amenities.tv)
                ? <div>
                  <Divider />
                  <h3>Amenities this place offers</h3>
                  </div>
                : ''
              }
              { amenities.pool
                ? <div>
                    <ListItemIcon>
                      <PoolIcon />
                    </ListItemIcon>
                    <span>Swimming pool</span>
                  </div>
                : ''
              }
              { amenities.gym
                ? <div>
                    <ListItemIcon>
                      <FitnessCenterIcon />
                    </ListItemIcon>
                    <span>Gym</span>
                  </div>
                : ''
              }
              { amenities.wifi
                ? <div>
                    <ListItemIcon>
                      <WifiIcon />
                    </ListItemIcon>
                    <span>Wi-fi</span>
                  </div>
                : ''
              }
              { amenities.tv
                ? <div>
                    <ListItemIcon>
                      <TvIcon />
                    </ListItemIcon>
                    <span>Television</span>
                  </div>
                : ''
              }
              <Divider />
              {listing.owner === email
                ? ''
                : <>
                  <h3>Make a booking</h3>
                  <BookingContainer />
                  <Divider />
                  </>
              }
              {listing.reviews.length !== 0
                ? <h3>Reviews</h3>
                : ''
              }
              <LeaveReview />
              {listing.reviews.length !== 0
                ? listing.reviews.map((review, idx) => {
                    return <ReviewCard key={idx} review={review}/>
                  })
                : ''
              }
            </div>
          </div>
        }
      </Container>
    </ThemeProvider>
  </>
}

export default ListingDetails;

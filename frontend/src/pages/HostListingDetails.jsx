import React from 'react';
// import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../utils/store';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ImageCarousel from '../components/ImageCarousel';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import Background from '../components/Background';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../components/Theme';
import { HOST } from '../utils/host';
import { fetchHelper } from '../utils/fetchHelper';
import { Card, CardContent, CardActions, Button } from '@mui/material';
const HostListingDetails = () => {
  const context = React.useContext(StoreContext);
  const token = window.localStorage.getItem('token');
  const { id } = useParams();
  const [listing, setListing] = context.listing;
  const [bookings, setBookings] = React.useState([]);
  const [requests, setRequests] = React.useState();
  const [accepted, setAccepted] = React.useState();
  const [rejected, setRejected] = React.useState();
  const [profit, setProfit] = React.useState(0);
  console.log(bookings);
  React.useEffect(async () => {
    setRequests();
    setAccepted();
    setRejected();
    setProfit(0);
    const promise = await fetch(`${HOST}/listings/${id}`);
    let data = await promise.json();
    setListing(data.listing);

    data = await fetchHelper('GET', `${HOST}/bookings`, token);
    setBookings(data.bookings);
    let tempRequests = data.bookings;
    const tempAccepted = [];
    const tempRejected = [];
    for (const b of data.bookings) {
      if (b.listingId !== id) {
        tempRequests = tempRequests.filter((item) => { return item !== b });
      }
      if (b.status === 'declined') {
        tempRequests = tempRequests.filter((item) => { return item !== b });
        tempRejected.push(b);
      }
      if (b.status === 'accepted') {
        tempRequests = tempRequests.filter((item) => { return item !== b });
        tempAccepted.push(b);
      }
    }
    setRequests(tempRequests);
    setAccepted(tempAccepted);
    setRejected(tempRejected);
    if (accepted !== undefined) {
      for (const b of accepted) {
        setProfit(profit + b.totalPrice);
      }
    }
  }, []);

  const acceptBooking = async (id) => {
    const data = await fetchHelper('PUT', `${HOST}/bookings/accept/${id}`, token);
    setBookings(data.bookings);
  }

  const declineBooking = async (id) => {
    let data = await fetchHelper('PUT', `${HOST}/bookings/decline/${id}`, token);
    data = await fetchHelper('GET', `${HOST}/bookings`, token);
    setBookings(data.bookings);
  }

  const navigate = useNavigate();
  return <>
  <ThemeProvider theme={Theme}>
    <Background/>
    <NavBar />
    <Container sx={{ py: 8 }} maxWidth="md" className="Paper">
      <Button size="small" color="warning" onClick={() => navigate('/host/listings')}>back</Button>
      {(listing.title === '')
        ? console.log('Error in Listing Details')
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
              <h3>Listing details</h3>
                {listing.postedOn === null
                  ? ''
                  : <div>
                    <ListItemIcon>
                      <CalendarTodayOutlinedIcon />
                    </ListItemIcon>
                    <span>Listing published on {listing.postedOn.split('T')[0]}</span>
                      <br/>
                    </div>
                }
              <div>
                <ListItemIcon>
                  <LocalAtmOutlinedIcon />
                </ListItemIcon>
                <span>This listing has made a profit of ${profit} for all historical and confirmed bookings</span>
                <br/>
              </div>
              <Divider />
              <h3>Booking requests</h3>
              {requests !== undefined
                ? requests.map((request, idx) => {
                    return <>
                    <Card key={idx} sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <h4>Request by: {request.owner}</h4>
                        <h3>$ {request.totalPrice}</h3>
                        <p>{request.owner.split('@')[0]} would like to book {listing.title} between {request.dateRange.in.split('T')[0]} and {request.dateRange.out.split('T')[0]}</p>
                      </CardContent>
                      <CardActions>
                        <Button id={request.id} size="small" variant="contained" color="primary" onClick={(e) => { acceptBooking(e.target.id) }}>Accept</Button>
                        <Button id={request.id} size="small" variant="contained" color="warning" onClick={(e) => { declineBooking(e.target.id) }}>Decline</Button>
                      </CardActions>
                    </Card>
                    <br/>
                  </>
                  })
                : <p>You do not have any bookings requests</p>
              }
              <Divider />
              <h3>Confirmed bookings</h3>
              {accepted !== undefined
                ? accepted.map((request, idx) => {
                    return <>
                    <Card key={idx} sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <h4>{request.owner}</h4>
                        <h3>$ {request.totalPrice}</h3>
                        <p>{request.owner.split('@')[0]} confirmed to stay at {listing.title} between {request.dateRange.in.split('T')[0]} and {request.dateRange.out.split('T')[0]}</p>
                      </CardContent>
                    </Card>
                    <br/>
                  </>
                  })
                : <p>You do not have any confirmed bookings</p>
              }
              <Divider />
              <h3>Rejected bookings</h3>
              {rejected !== undefined
                ? rejected.map((request, idx) => {
                    return <>
                    <Card key={idx} sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <h4>{request.owner}</h4>
                        <h3>$ {request.totalPrice}</h3>
                        <p>{request.owner.split('@')[0]} rejected to stay at {listing.title} between {request.dateRange.in.split('T')[0]} and {request.dateRange.out.split('T')[0]}</p>
                      </CardContent>
                    </Card>
                    <br/>
                  </>
                  })
                : <p>You do not have any confirmed bookings</p>
              }

            </div>
          </div>
      }
    </Container>
    </ThemeProvider>
  </>
}

export default HostListingDetails;

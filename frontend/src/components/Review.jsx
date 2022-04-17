import * as React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Divider } from '@mui/material';
import { StoreContext } from '../utils/store';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import RateReviewIcon from '@mui/icons-material/RateReview';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

import Theme from './Theme';
import { fetchHelper } from '../utils/fetchHelper';
import { ThemeProvider } from '@mui/material/styles';

import { HOST } from '../utils/host';

const ReviewCard = ({ review }) => {
  return (
    <Box className="Review-card" sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <Box className="Review-header">
            <h5>{review.user}</h5>
            <Rating className="Review-rating" name="read-only" value={review.rating} readOnly />
          </Box>
          <Divider />
          <p className="Review-content">{review.comment}</p>
        </React.Fragment>
      </Card>
    </Box>
  );
}

const LeaveReview = () => {
  const { id } = useParams();
  const [reviewComment, setReviewComment] = React.useState('');
  const [reviewPermission, setReviewPermission] = React.useState(false);
  const [rating, setRating] = React.useState(4);
  const [bookingId, setBookingId] = React.useState('');
  const context = React.useContext(StoreContext);
  const [bookings, setBookings] = context.bookings;
  const token = window.localStorage.getItem('token');
  const email = window.localStorage.getItem('email');

  React.useState(async () => {
    const data = await fetchHelper('GET', `${HOST}/bookings`, token);
    if (data.bookings.length !== undefined) {
      setBookings(data.bookings);
      if (bookings.length !== undefined) {
        for (const b of bookings) {
          if (b.listingId === id && b.owner === email) {
            setReviewPermission(true);
            setBookingId(b.id);
          }
        }
      }
    }
  }, [bookings]);

  const postComment = async () => {
    await fetchHelper('POST', `${HOST}/listings/${id}/review/${bookingId}`, token, {
      review: {
        user: window.localStorage.getItem('email'),
        rating: rating,
        comment: reviewComment,
      },
    });
  }

  return <>
  {reviewPermission
    ? <ThemeProvider theme={Theme}>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <div className="Review-form-header">
              <RateReviewIcon />
              <h4>Leave a review</h4>
            </div>
              <Divider />
            <Stack spacing={1}>
              <Rating
                className="Review-submit-rating"
                name="size-large"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="medium" />
            </Stack>
            <Box className="Review-inputbox" sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle fontSize="large" sx={{ color: 'action.active', mr: 2, my: 0 }} />
              <TextField
                multiline
                id="Review-textfield"
                label="Leave a review"
                variant="standard"
                value={reviewComment}
                onChange={(event) => setReviewComment(event.target.value)}
              />
              <Button id="Review-post-button" size="small" variant="contained" onClick={postComment}>Post</Button>
            </Box>
          </Card>
        </Box>
      </ThemeProvider>
    : ''
  }
  </>
}

ReviewCard.propTypes = {
  review: PropTypes.object,
}

export {
  ReviewCard,
  LeaveReview,
}

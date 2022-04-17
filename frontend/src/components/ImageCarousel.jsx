import React from 'react';
import PropTypes from 'prop-types';

import { Carousel } from '3d-react-carousal';

const ImageCarousel = ({ listing }) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const temp = [];
    if (listing.thumbnail !== undefined && listing.thumbnail !== '') {
      temp.push(<img src={listing.thumbnail} />);
    }
    if (listing.metadata.images !== undefined && listing.metadata.images.length !== 0) {
      for (const image of listing.metadata.images) {
        temp.push(<img src={image} />)
      }
    }
    setData(temp);
  }, [])

  return (
    <div className="App">
      <Carousel slides={data} autoplay={false}/>
    </div>
  );
}

ImageCarousel.propTypes = {
  listing: PropTypes.object,
}

export default ImageCarousel;

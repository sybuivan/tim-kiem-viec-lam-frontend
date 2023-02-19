import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';

import Banner from 'src/assets/images/banner.png';
import Banne2 from 'src/assets/images/banner2.png';

const SliderService = () => {
  return (
    <Box>
      <input></input>
    </Box>
  );
};

const SliderHome = () => {
  const settings = {
    dots: true,
    infinite: true,
    //  autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <div
          style={{
            borderRadius: '10px',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '25rem',
            backgroundImage: `url(${Banner})`,
          }}
        ></div>
      </div>
      <div>
        <div
          style={{
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '25rem',
            backgroundImage: `url(${Banne2})`,
          }}
        ></div>
      </div>
    </Slider>
  );
};

export default SliderHome;

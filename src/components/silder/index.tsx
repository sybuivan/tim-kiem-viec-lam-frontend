import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Slider from 'react-slick';

import Banner from 'src/assets/images/banner.png';
import Banne2 from 'src/assets/images/banner2.png';
import { FormInput, FormSelect } from '../hook_form';
import { useForm } from 'react-hook-form';
import theme from 'src/theme';

const SliderService = () => {
  const { control } = useForm({
    defaultValues: {
      searchKeyword: '',
    },
  });
  return (
    <Box
      sx={{
        width: '500px',
        backgroundColor: 'transparent',
        borderRadius: 1,
        padding: 2,
        border: '1px solid #c1c1c1',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '30px',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        height="40px"
        width="100%"
        gap={1}
      >
        <FormInput
          control={control}
          name="searchKeyword"
          placeholder="Tìm kiếm cơ hội việc làm"
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '4px',
            width: '70%',
          }}
        />
        <Box height="37px" flex={1}>
          <Button
            variant="contained"
            sx={{
              padding: '8px',
              width: '100%',
            }}
          >
            Tìm kiếm
          </Button>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <FormSelect
          control={control}
          name="name"
          placeholder="Tất cả nghề nghiệp"
          options={[]}
          keyOption="id"
          labelOption="name"
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '4px',
          }}
        />
        <FormSelect
          control={control}
          name="name"
          placeholder="Tất cả tỉnh thành"
          options={[]}
          keyOption="id"
          labelOption="name"
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '4px',
            color: theme.palette.common.white,
          }}
        />
      </Box>

      <Box
        display="flex"
        gap={2}
        sx={{
          '& p': {
            color: theme.palette.common.white,
            cursor: 'pointer',
            py: 1,
          },
        }}
      >
        <Typography>Ke toan</Typography>
        <Typography>Marketing</Typography>
        <Typography>IT</Typography>
        <Typography>Thuc tap sinh</Typography>
      </Box>
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
    <div>
      <Slider {...settings}>
        <div>
          <div
            style={{
              borderRadius: '10px',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              position: 'relative',

              height: '20rem',
              backgroundImage: `url(${Banner})`,
            }}
          >
            <SliderService />
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              height: '20rem',
              position: 'relative',

              backgroundImage: `url(${Banne2})`,
            }}
          >
            <SliderService />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SliderHome;

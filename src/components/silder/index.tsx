import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Slider from 'react-slick';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import Banner from 'src/assets/images/banner.png';
import { changeHomeFilter } from 'src/redux_store/job/job_slices';
import Banne2 from 'src/assets/images/banner2.png';
import theme from 'src/theme';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { IHomeFilter } from 'src/types/common';
import { FormInput, FormSelect } from '../hook_form';

const SliderService = () => {
  const dispatch = useAppDispatch();
  const {
    fieldList: { companyfield, cityfield },
  } = useAppSelector((state) => state.commonSlice);
  const { jobFilters } = useAppSelector((state) => state.jobSlice);
  const navigate = useNavigate();
  const { control } = useForm<IHomeFilter>({
    defaultValues: {
      city: '',
      companyfield: '',
      keyword: '',
    },
  });
  const handleOnChange = (name: string, value: string) => {
    const newValue = {
      ...jobFilters,
      [name]: value,
    };
    dispatch(changeHomeFilter(newValue));
  };

  const handeOnSearch = () => {
    const stringifiedParams = queryString.stringify(jobFilters);
    navigate(`/co-hoi-viec-lam?${stringifiedParams}`);
  };
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
          handleChange={handleOnChange}
        />
        <Box height="37px" flex={1}>
          <Button
            onClick={handeOnSearch}
            variant="contained"
            sx={{
              padding: '8px',
              width: '100%',
              backgroundColor: '#2c95ff',
            }}
          >
            Tìm kiếm
          </Button>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <FormSelect
          control={control}
          name="companyfield"
          placeholder="Tất cả nghề nghiệp"
          options={companyfield}
          keyOption="id_companyField"
          labelOption="name_field"
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '4px',
          }}
          handleChange={handleOnChange}
        />
        <FormSelect
          control={control}
          name="city"
          placeholder="Tất cả tỉnh thành"
          options={cityfield}
          keyOption="id_city"
          labelOption="name_city"
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '4px',
            color: theme.palette.common.white,
          }}
          handleChange={handleOnChange}
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

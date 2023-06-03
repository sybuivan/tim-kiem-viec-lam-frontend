import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import JobItem from 'src/components/job_item';
import JobsSlider from 'src/components/jobs_slider';
import SkeletonJob from 'src/components/skeleton/job';
import { useGetStatus } from 'src/hooks';
import { IJob } from 'src/types/job';
import { useJobSlice } from 'src/hooks/use_job_slice';

const LIMIT = 15;

const JobList = ({
  jobList,
  icon,
  title,
}: {
  jobList: IJob[];
  icon?: any;
  title?: string;
}) => {
  const results = useJobSlice(jobList, LIMIT);

  const [isLoading] = useGetStatus('job', 'getJobList');
  const settings = {
    dots: true,
    infinite: true,
    centerPadding: '60px',
    speed: 500,
    nextArrow: <AiOutlineArrowRight />,
    prevArrow: <AiOutlineArrowLeft />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (isLoading)
    return (
      <>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {Array.from(Array(20).keys()).map((item) => (
            <SkeletonJob type="home" />
          ))}
        </Grid>
      </>
    );
  return (
    <Box
      mb={5}
      sx={{
        '& .slick-track, & .slick-slide': {
          width: '100%!important',
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={1} my={4}>
        {icon}
        <Typography fontSize="30px" fontWeight="800">
          {title}
        </Typography>
      </Box>
      <Slider {...settings}>
        {results.map((item, index) => (
          <JobsSlider jobList={item} key={index} />
        ))}
      </Slider>
    </Box>
  );
};

export default JobList;

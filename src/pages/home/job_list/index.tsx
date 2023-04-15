import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import JobItem from 'src/components/job_item';
import SkeletonJob from 'src/components/skeleton/job';
import { useGetStatus } from 'src/hooks';
import { IJob } from 'src/types/job';

const JobList = ({
  jobList,
  icon,
  title,
}: {
  jobList: IJob[];
  icon?: any;
  title?: string;
}) => {
  const [isLoading] = useGetStatus('job', 'getJobList');
  const settings = {
    dots: true,
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    nextArrow: <AiOutlineArrowRight />,
    prevArrow: <AiOutlineArrowLeft />,
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
    <Box mb={5}>
      <Box display="flex" alignItems="center" gap={1} my={4}>
        {icon}
        <Typography fontSize="30px" fontWeight="800">
          {title}
        </Typography>
      </Box>
      {/* <Grid container rowSpacing={2} columnSpacing={2}>
        <Slider {...settings}>
          {jobList.map((item, index) => (
            <JobItem jobItem={item} key={item.id_job} />
          ))}
        </Slider>
      </Grid> */}
      <Slider {...settings}>
        {jobList.map((item, index) => (
          <JobItem jobItem={item} key={item.id_job} />
        ))}
      </Slider>
    </Box>
  );
};

export default JobList;

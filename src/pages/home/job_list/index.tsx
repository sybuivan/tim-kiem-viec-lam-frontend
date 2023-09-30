import { Box, Grid } from '@mui/material';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Slider from 'react-slick';
import HeadTitle from 'src/components/head_title';
import EmptyData from 'src/components/empty_data';
import JobsSlider from 'src/components/jobs_slider';
import SkeletonJob from 'src/components/skeleton/job';
import { useGetStatus } from 'src/hooks';
import { useJobSlice } from 'src/hooks/use_job_slice';
import { IJob } from 'src/types/job';

const LIMIT = 15;

const JobList = ({
  jobList,
  icon,
  title,
}: {
  jobList: IJob[];
  icon: any;
  title: string;
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

  if (jobList.length < 0)
    return <EmptyData title="Không có tin tuyển dụng nào" />;

  return (
    <Box
      mb={5}
      sx={{
        '& .slick-track, & .slick-slide': {
          // width: '100%!important',
        },
      }}
    >
      <HeadTitle title={title} icon={icon} />
      <Slider {...settings}>
        {results.map((item, index) => (
          <JobsSlider jobList={item} key={index} />
        ))}
      </Slider>
    </Box>
  );
};

export default JobList;

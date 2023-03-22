import { Typography } from '@mui/material';
import React from 'react';
import imptyImage from 'src/assets/images/empty_image.jpg';

const EmptyData = ({ title }: { title: string }) => {
  return (
    <>
      <Typography fontSize="22px" py={3} textAlign="center" color="#000">
        {title}
      </Typography>
      <img
        height="200px"
        width="400px"
        alt=""
        src={imptyImage}
        style={{
          margin: 'auto',
          display: 'flex',
        }}
      />
    </>
  );
};

export default EmptyData;

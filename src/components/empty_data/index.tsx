import { Typography, Box } from '@mui/material';
import React from 'react';
import imptyImage from 'src/assets/images/empty_image.jpg';

const EmptyData = ({ title }: { title: string }) => {
  return (
    <Box width="100%">
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
    </Box>
  );
};

export default EmptyData;

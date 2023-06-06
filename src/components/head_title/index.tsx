import React from 'react';
import { Box, Typography } from '@mui/material';
const HeadTitle = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1} my={4}>
      {icon}
      <Typography fontSize="30px" fontWeight="800">
        {title}
      </Typography>
    </Box>
  );
};

export default HeadTitle;

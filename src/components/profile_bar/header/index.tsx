import { Box, Typography } from '@mui/material';
import React from 'react';
import theme from 'src/theme';
import { useAppSelector } from 'src/hooks';

const ProfileHeader = ({
  fullName,
  title = 'Xin chào.',
}: {
  fullName: string;
  title?: string;
}) => {
  return (
    <Box
      bgcolor={theme.palette.common.white}
      p={2}
      display="flex"
      gap={1}
      mb={2}
    >
      <Typography
        fontSize="18px"
        fontWeight="600"
        color={theme.palette.grey[600]}
      >
        {title}
      </Typography>
      <Typography fontSize="18px" fontWeight="600">
        {fullName}
      </Typography>
    </Box>
  );
};

export default ProfileHeader;

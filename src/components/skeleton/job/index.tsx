import React from 'react';
import { Skeleton, Box, Grid } from '@mui/material';

const SkeletonJob = ({
  type,
  xs = 4,
}: {
  type: 'home' | 'list';
  xs?: number;
}) => {
  return (
    <Grid item xs={xs}>
      <Box
        sx={{
          border: '1px solid #c1c1c1',
          borderRadius: '4px',
          padding: 1,
        }}
      >
        {type === 'home' && (
          <Box
            display="flex"
            justifyContent="space-between"
            mb={1}
            alignItems="center"
          >
            <Skeleton variant="rectangular" width="90%" height="20px" />
            <Skeleton variant="circular" width="30px" height="30px" />
          </Box>
        )}
        <Box display="flex" gap={1} alignItems="center">
          <Box>
            <Skeleton variant="rounded" width="88px" height="88px" />
          </Box>
          <Box display="flex" flexDirection="column" width="100%" gap={1}>
            {type === 'list' && (
              <Box
                display="flex"
                justifyContent="space-between"
                mb={1}
                alignItems="center"
              >
                <Skeleton variant="rectangular" width="90%" height="20px" />
                <Skeleton variant="circular" width="30px" height="30px" />
              </Box>
            )}
            <Skeleton variant="rectangular" width="80%" height="20px" />
            <Skeleton variant="rectangular" width="80%" height="20px" />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default SkeletonJob;

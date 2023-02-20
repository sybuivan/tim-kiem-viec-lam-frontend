import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PostItem from 'src/components/post_item';

const PostList = () => {
  return (
    <Box>
      <Typography
        style={{
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: '800',
          padding: '10px 0 40px 0 ',
        }}
      >
        Cẩm nang nghề nghiệp
      </Typography>
      <Grid container columnSpacing={6}>
        <PostItem />
        <PostItem />
        <PostItem />
      </Grid>
    </Box>
  );
};

export default PostList;

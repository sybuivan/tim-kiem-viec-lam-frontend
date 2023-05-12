import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PostItem from 'src/components/post_item';
import { useAppSelector } from 'src/hooks';

const PostList = () => {
  const {
    postList: { post_list },
  } = useAppSelector((state) => state.postSlice);
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
        {post_list.map((post) => (
          <PostItem key={post.id_post} post={post} />
        ))}
      </Grid>
    </Box>
  );
};

export default PostList;

import React, { useState, useEffect } from 'react';
import { Box, Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import HTMLString from 'react-html-string';
import { getAllPosts } from 'src/redux_store/post/post_actions';
import PostList from 'src/pages/home/post_list';
import { useIsRequestPending, useAppDispatch, useAppSelector } from 'src/hooks';
import { getPostDetail } from 'src/redux_store/post/post_actions';
import LoadingLinear from 'src/components/loading/loading_linear';
import { formatDate } from 'src/utils/function';
import { baseURL } from 'src/config';

const NewList = () => {
  const dispatch = useAppDispatch();
  const {
    postList: { post_list },
  } = useAppSelector((state) => state.postSlice);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <Container sx={{ maxWidth: '1500px!important', my: 3 }}>
      <Grid
        container
        sx={{
          maxWidth: '1364px!important',
          margin: 'auto',
        }}
        columnSpacing={1}
      >
        <PostList />
      </Grid>
    </Container>
  );
};

export default NewList;

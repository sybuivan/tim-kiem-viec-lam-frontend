import React, { useState, useEffect } from 'react';
import { Box, Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import HTMLString from 'react-html-string';
import { useIsRequestPending, useAppDispatch, useAppSelector } from 'src/hooks';
import { getPostDetail } from 'src/redux_store/post/post_actions';
import LoadingLinear from 'src/components/loading/loading_linear';
import { formatDate } from 'src/utils/function';
import { baseURL } from 'src/config';

const NewsDetails = () => {
  const { id_post } = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useIsRequestPending('post', 'getPostDetail');
  const {
    postDetail: { content, description, title, image, publishedAt },
  } = useAppSelector((state) => state.postSlice);

  useEffect(() => {
    if (id_post) dispatch(getPostDetail(id_post));
  }, []);

  if (isLoading) return <LoadingLinear />;
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
        <Grid item xs={12}>
          <div>
            <img src={`${baseURL}/${image}`} alt={title} />
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{title}</h3>
            <p>
              <i>Ngày đăng:{publishedAt && formatDate(publishedAt)} </i>
            </p>
            <div
              style={{
                padding: '1rem',
                border: '1px solid #bfe0ff',
                borderLeft: '6px solid #1da1f2',
                backgroundColor: '#e8f4ff',
                margin: '1rem 0',
              }}
            >
              <p>{description}</p>
            </div>
            <div>
              <HTMLString html={content} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsDetails;

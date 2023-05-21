import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { IPost } from 'src/types/post';
import { useNavigate } from 'react-router';

const PostItem = ({ post }: { post: IPost }) => {
  const { image, title, description, id_post } = post;
  const navigate = useNavigate();
  return (
    <Grid item xs={12} lg={4} md={6} sm={6}>
      <Box
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate(`/bai-dang-chi-tiet/${id_post}`)}
      >
        <img src={image} alt={title} width="100%" />

        <Typography
          variant="h5"
          py={1}
          title={title}
          sx={{
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
        <Typography
          title={description}
          sx={{
            display: '-webkit-box',
            '-webkit-line-clamp': '5',
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PostItem;

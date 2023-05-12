import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';
import LoadingLinear from 'src/components/loading/loading_linear';
import { useAppDispatch, useIsRequestPending, useAppSelector } from 'src/hooks';
import { getAllPosts } from 'src/redux_store/post/post_actions';
import { resetData } from 'src/redux_store/post/post_slice';
import CardPost from './post-card';
import { useStyles } from './styles';

const ManagementPostList = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    postList: { post_list, total },
  } = useAppSelector((state) => state.postSlice);

  const isLoadingGetData = useIsRequestPending('post', 'getAllPosts');

  const moveToAddNewPost = () => {
    navigate('/admin/add-post');
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, []);

  return (
    <Box>
      <Box>
        <Box mb={2}>
          <Button
            variant="outlined"
            startIcon={<AddOutlined />}
            sx={{ height: '37px', marginTop: '3px' }}
            onClick={moveToAddNewPost}
          >
            Thêm bài viết
          </Button>
        </Box>

        {isLoadingGetData ? (
          <Box className={classes.boxPostsManageMent}>
            <LoadingLinear />
          </Box>
        ) : post_list.length === 0 ? (
          <Typography
            sx={{ textAlign: 'center', fontSize: '15px', marginTop: '10px' }}
          >
            Không có dữ liệu
          </Typography>
        ) : (
          <Box className={classes.boxPostsManageMent}>
            {post_list.map((postItem) => {
              return <CardPost postItem={postItem} key={postItem.id_post} />;
            })}
          </Box>
        )}
      </Box>

      <Box className={classes.boxPagination}>
        <Typography> Tổng số: {total} </Typography>
      </Box>
    </Box>
  );
};

export default ManagementPostList;

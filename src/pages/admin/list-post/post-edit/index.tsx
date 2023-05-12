import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { FormInput, FormTextarea } from 'src/components/hook_form';
import LoadingLinear from 'src/components/loading/loading_linear';
import SunEditorComponent from 'src/components/suneditor';
import { useAppDispatch, useAppSelector, useIsRequestPending } from 'src/hooks';
import { getPostDetail, updatePost } from 'src/redux_store/post/post_actions';
import { IPost } from 'src/types/post';
import { messageRequired } from 'src/utils/common';
import { toastMessage } from 'src/utils/toast';
import { postSchema } from '../post-add';

const PostEdit = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id_post } = useParams();
  const { me } = useAppSelector((state) => state.userSlice);

  const [privewImage, setPrivewImage] = useState(
    'https://fucoidannano.com/img/no_img.png'
  );
  const [dataImage, setDataImage] = useState();
  const [content, setContent] = useState<string>();
  const isLoading = useIsRequestPending('post', 'getPostDetail');
  const isLoadingUpdate = useIsRequestPending('post', 'updatePost');

  const { control, handleSubmit, reset } = useForm<IPost>({
    resolver: yupResolver(postSchema),
  });

  const handleOnSubmit = async (data: IPost) => {
    const { title, description } = data;
    console.log({ content });
    if (!content) {
      return toastMessage.error(messageRequired('Nội dung'));
    }

    if (!dataImage && privewImage === 'https://fucoidannano.com/img/no_img.png')
      return toastMessage.error(messageRequired('Ảnh'));

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('id_user', me.id_user);

    if (dataImage) formData.append('image', dataImage);
    dispatch(updatePost({ formData, id_post }))
      .unwrap()
      .then(() => {
        toastMessage.success('Chỉnh sửa bài viết thành công');
        navigate('/admin/list-post');
      });
  };

  const handleOnChangeContent = (content: string) => {
    setContent(content);
  };

  const handleOnChange = (e: any) => {
    setDataImage(e.target.files[0]);
    setPrivewImage(URL.createObjectURL(e.target.files[0]));
  };

  const moveBackPostManagement = () => {
    navigate('/admin/list-post');
  };

  useEffect(() => {
    if (id_post)
      dispatch(getPostDetail(id_post))
        .unwrap()
        .then((data) => {
          setContent(data.content);
          if (data.image) setPrivewImage(data.image);
          reset(data);
        });
  }, [id_post]);

  if (isLoading || !content) return <h1>Loading...</h1>;

  return (
    <Box px={2}>
      <Box
        sx={{
          width: '100%',
          height: '45px',
          display: 'flex',
          backgroundColor: '#ffffff',
          borderRadius: '1px',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <IconButton>
          <ArrowBackOutlinedIcon onClick={moveBackPostManagement} />
        </IconButton>
        <Typography>Chỉnh sửa bài viết</Typography>
      </Box>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container columnSpacing={1}>
          <Grid item xs={8}>
            <SunEditorComponent
              content={content}
              onChange={handleOnChangeContent}
              height="50vh"
            />
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                '& .css-zevgu-MuiFormControl-root': {
                  mt: 0,
                },
              }}
            >
              <Box className="">
                <FormInput
                  name="title"
                  control={control}
                  placeholder="Nhập tiêu đề"
                />
              </Box>
              <Box my={2}>
                <FormTextarea
                  name="description"
                  minRows={5}
                  control={control}
                  placeholder="Nhập mô tả"
                />
              </Box>
              <Box>
                <Box my={2}>
                  <input
                    type="file"
                    style={{ fontSize: '14px' }}
                    className="btn btn-success"
                    onChange={handleOnChange}
                  />
                </Box>

                <Box>
                  <img
                    src={privewImage}
                    alt=""
                    width="100%"
                    style={{ borderRadius: '10px', maxHeight: '200px' }}
                  />
                </Box>
              </Box>

              <Box my={2}>
                <LoadingButton
                  loading={isLoadingUpdate}
                  variant="contained"
                  onClick={handleSubmit(handleOnSubmit)}
                >
                  Chỉnh sửa bài đăng
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PostEdit;

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Box, Typography, IconButton } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormInput, FormTextarea } from 'src/components/hook_form';
import SunEditorComponent from 'src/components/suneditor';
import * as yup from 'yup';
import { IPost } from 'src/types/post';
import { toastMessage } from 'src/utils/toast';
import { messageRequired } from 'src/utils/common';
import { createPost } from 'src/redux_store/post/post_actions';
import { useAppDispatch, useIsRequestPending, useAppSelector } from 'src/hooks';
import { LoadingButton } from '@mui/lab';

export const postSchema = yup.object().shape({
  title: yup.string().required('Tiêu đề không được bỏ trống.'),
  description: yup.string().required('Mô tả không được bỏ trống'),
  editor: yup.string(),
});

const PostAdd = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.authSlice);

  const [privewImage, setPrivewImage] = useState(
    'https://fucoidannano.com/img/no_img.png'
  );
  const [dataImage, setDataImage] = useState();
  const [content, setContent] = useState<string>();
  const isLoading = useIsRequestPending('post', 'createPost');

  const { control, handleSubmit } = useForm<IPost>({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(postSchema),
  });

  const handleOnSubmit = async (data: IPost) => {
    const { title, description } = data;
    if (!content) {
      return toastMessage.error(messageRequired('Nội dung'));
    }

    if (!dataImage) return toastMessage.error(messageRequired('Ảnh'));

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('id_user', me.id_user);
    formData.append('image', dataImage);
    dispatch(createPost(formData))
      .unwrap()
      .then(() => {
        toastMessage.success('Thêm bài viết thành công');
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
        <Typography fontWeight="600">Thêm mới bài viết</Typography>
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
                  loading={isLoading}
                  variant="contained"
                  onClick={handleSubmit(handleOnSubmit)}
                >
                  Đăng bài
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PostAdd;

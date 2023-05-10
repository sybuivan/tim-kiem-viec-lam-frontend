import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Box, Button, IconButton } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormInput, FormTextarea } from 'src/components/hook_form';
import SunEditorComponent from 'src/components/suneditor';
import * as yup from 'yup';

const AddPost = () => {
  const navigate = useNavigate();

  const [privewImage, setPrivewImage] = useState(
    'https://fucoidannano.com/img/no_img.png'
  );
  const [dataImage, setDataImage] = useState();
  const [content, setContent] = useState<string>();

  const schema = yup.object().shape({
    tieude: yup.string().required('Tiêu đề không được bỏ trống.'),
    mota: yup.string().required('Mô tả không được bỏ trống'),
    editor: yup.string(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mota: '',
      tieude: '',
      editor: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async () => {};
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
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          borderRadius: '1px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <IconButton>
          <ArrowBackOutlinedIcon onClick={moveBackPostManagement} />
        </IconButton>
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
                <FormTextarea
                  name="title"
                  minRows={5}
                  control={control}
                  placeholder="Nhập tiêu đề"
                />
              </Box>
              <Box my={2}>
                <FormInput
                  name="description"
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
                <Button variant="contained">Đăng bài</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddPost;

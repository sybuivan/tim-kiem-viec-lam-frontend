import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import {
  AccountCircleOutlined,
  FileUploadOutlined,
  DeleteOutlineOutlined,
  SaveOutlined,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import theme from 'src/theme';
import {
  FormDatePicker,
  FormInput,
  FormSelect,
} from 'src/components/hook_form';
import ProfileHeader from '../../../components/profile_bar/header';
import { useAppSelector, useAppDispatch, useGetStatus } from 'src/hooks';
import { messageRequired } from 'src/utils/common';
import { IPayloadProfile } from 'src/types/profile';
import { LoadingButton } from '@mui/lab';
import { updateProfile } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';
import { CGenderOption, phoneRegExp } from 'src/constants/common';
import moment from 'moment';
import { baseURL } from 'src/config';

const schema = yup.object().shape({
  fullName: yup.string().required(messageRequired('Họ và tên')),
  birthDay: yup.string().required(messageRequired('Ngày sinh')),
  city: yup.string().required(messageRequired('Tỉnh thành')),
  address: yup.string().required(messageRequired('Địa chỉ')),
  phone: yup
    .string()
    .required(messageRequired('Số điện thoại'))
    .matches(phoneRegExp, 'Không đúng định dạng số điện thoại')
    .min(9, 'Không đúng định dạng số điện thoại')
    .max(10, 'Không đúng định dạng số điện thoại'),
  gender: yup.string().required(messageRequired('Giới tính')),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required(messageRequired('Giới tính')),
});

const ProfileUser = () => {
  const dispatch = useAppDispatch();
  const [isLoading] = useGetStatus('user', 'updateProfile');
  const { me } = useAppSelector((state) => state.authSlice);
  const { cityfield } = useAppSelector((state) => state.commonSlice.fieldList);

  const [privewImage, setPrivewImage] = useState<string>(
    `${baseURL}/${me.avatar}` || ''
  );

  console.log({ privewImage, baseURL });

  const [file, setFile] = useState<any>();

  const { control, handleSubmit } = useForm<IPayloadProfile>({
    defaultValues: me,
    resolver: yupResolver(schema),
  });

  const handleOnChangeFile = (e: any) => {
    setFile(e.target.files[0]);
    setPrivewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOnSubmit = (data: IPayloadProfile) => {
    const { address, birthDay, city, fullName, gender, phone, email } = data;
    const formData = new FormData();

    formData.append('address', address);
    formData.append('birthDay', moment(birthDay).format('YYYY-MM-DD'));
    formData.append('city', city);
    formData.append('fullName', fullName);
    formData.append('gender', gender);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('id_user', me.id_user);
    if (file) {
      formData.append('avatar', file, file.name);
      dispatch(updateProfile(formData))
        .unwrap()
        .then(() => {
          toastMessage.success('Chỉnh sửa thông tin tài khoản thành công');
        });
    } else {
      if (me.avatar) {
        dispatch(updateProfile(formData))
          .unwrap()
          .then(() => {
            toastMessage.success('Chỉnh sửa thông tin tài khoản thành công');
          });
      } else {
        toastMessage.error('Ảnh không được bỏ trống');
      }
    }
  };
  return (
    <Box>
      <ProfileHeader fullName={me.fullName} />
      <Paper>
        <Box
          p={2}
          sx={{
            borderBottom: '1px solid #adbebf',
          }}
        >
          <Typography fontSize="18px" fontWeight="600">
            Thông tin cá nhân
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2,
          }}
        >
          <Box py={2} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <Typography fontWeight="600" pb={2}>
              Ảnh đại diện
            </Typography>

            <Box display="flex" gap={2} alignItems="center">
              <Box
                width="100px"
                height="100px"
                sx={{
                  borderRadius: '50%',
                  backgroundColor: theme.palette.grey[100],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {privewImage ? (
                  <img
                    src={privewImage}
                    alt=""
                    width="100px"
                    height="100px"
                    style={{
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <AccountCircleOutlined
                    sx={{
                      color: theme.palette.grey[300],
                      fontSize: '40px',
                    }}
                  />
                )}
              </Box>
              <Button
                variant="contained"
                startIcon={<FileUploadOutlined />}
                component="label"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Tải ảnh lên
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleOnChangeFile}
                />
              </Button>
            </Box>
          </Box>

          <Box>
            <Grid container columnSpacing={3} rowSpacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormInput
                  control={control}
                  label="Họ và tên"
                  name="fullName"
                  placeholder="Nhập họ và tên"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormDatePicker
                  control={control}
                  label="Ngày sinh"
                  name="birthDay"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormSelect
                  control={control}
                  name="city"
                  label="Tỉnh / Thành phố "
                  placeholder="Chọn tỉnh thành phô"
                  options={cityfield}
                  keyOption="id_city"
                  labelOption="name_city"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormInput
                  control={control}
                  label="Nhập địa chỉ"
                  name="address"
                  placeholder="Ví dụ: Số nhà 98A, phố Ngụy Như Kon Tum, phường ..."
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormInput
                  control={control}
                  label="Số điện thoại"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormSelect
                  control={control}
                  name="gender"
                  label="Giới tính"
                  placeholder="Giới tính"
                  options={CGenderOption}
                  keyOption="value"
                  labelOption="label"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormInput
                  control={control}
                  label="Email"
                  name="email"
                  placeholder="Nhập địa chỉ email"
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" py={2}>
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteOutlineOutlined />}
                >
                  Hủy
                </Button>
                <LoadingButton
                  loading={isLoading}
                  startIcon={<SaveOutlined />}
                  variant="contained"
                  onClick={handleSubmit(handleOnSubmit)}
                >
                  Lưu thông tin
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileUser;

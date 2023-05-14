import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/components/hook_form';
import theme from 'src/theme';
import { IPayloadLogin } from 'src/types/auth';
import { useAppDispatch, useIsRequestPending } from 'src/hooks';
import { loginAdmin } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';
import { useNavigate } from 'react-router';
import { setLoginInfo } from 'src/redux_store/auth/authSlice';

const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống.'),
  password: yup.string().required('Xin vui lòng nhập lại mật khẩu.').min(8),
});

const AuthLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useIsRequestPending('user', 'loginAdmin');
  const initLoginForm: IPayloadLogin = {
    email: '',
    password: '',
  };

  const { control, handleSubmit } = useForm({
    defaultValues: initLoginForm,
    resolver: yupResolver(schemaLogin),
  });
  const handleOnSubmit = (data: IPayloadLogin) => {
    dispatch(loginAdmin(data))
      .unwrap()
      .then((data) => {
        const { accessToken, users } = data;
        dispatch(setLoginInfo({ users, accessToken }));
        toastMessage.success('Đăng nhập tài khoản thành công');
        navigate('/admin/dashboard');
      });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'url(https://png.pngtree.com/background/20210710/original/pngtree-recruitment-background-banner-picture-image_1037995.jpg)',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        component="form"
        width="50%"
        borderRadius="10px"
        bgcolor={theme.palette.common.white}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Box flex="1" p={2}>
          <Box py={1}>
            <Typography fontSize="18px" textAlign="center" fontWeight="600">
              Chào mừng bạn đến trang đăng nhập của quản trị viên
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={1.5} mb={2}>
            <FormInput control={control} name="email" label="Địa chỉ email" />

            <FormInput
              control={control}
              type="password"
              name="password"
              label="Nhập mật khẩu"
            />
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={{
              width: '100%',
              py: 1.5,
              fontSize: '16px',
            }}
          >
            Đăng nhập
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLogin;

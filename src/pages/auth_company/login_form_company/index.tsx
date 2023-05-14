import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormInput } from 'src/components/hook_form';
import { useForm } from 'react-hook-form';
import theme from 'src/theme';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useGetStatus } from 'src/hooks';
import { LoadingButton } from '@mui/lab';
import { loginCompany } from 'src/redux_store/company/company_action';
import { toastMessage } from 'src/utils/toast';
import { useNavigate } from 'react-router-dom';
import { IPayloadLogin } from 'src/types/auth';
import { setLoginInfo } from 'src/redux_store/auth/authSlice';
const schemaRegister = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống.'),
  password: yup.string().required('Xin vui lòng nhập lại mật khẩu.').min(6),
});

const LoginFormCompany = () => {
  const [isLoading] = useGetStatus('company', 'loginCompany');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<IPayloadLogin>({
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: yupResolver(schemaRegister),
  });

  const handleOnSubmit = (data: IPayloadLogin) => {
    dispatch(loginCompany(data))
      .unwrap()
      .then((data) => {
        const { users, accessToken } = data;
        dispatch(setLoginInfo({ users, accessToken }));

        toastMessage.success('Đăng nhập tài khoản thành công');
        navigate('/company/home/ho-so-cong-ty');
      });
  };
  return (
    <Box
      sx={{
        height: 'calc(100vh - 70px)',
      }}
    >
      <Box
        sx={{
          width: '35rem',
          borderRadius: 2,
          padding: 3,
          bgcolor: theme.palette.common.white,
          margin: '0 auto',
          mt: '1rem',
          '& .MuiFormLabel-asterisk': {
            color: theme.palette.error.main,
          },
        }}
      >
        <Box>
          <Typography fontWeight="600" fontSize="18px" textAlign="center">
            Nhà tuyển dụng đăng nhập{' '}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={1.5}
          mb={2}
          component="form"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <FormInput
            control={control}
            name="email"
            label="Địa chỉ email"
            placeholder="Nhập địa chỉ email"
            required
          />

          <FormInput
            control={control}
            type="password"
            name="password"
            placeholder="Mật khẩu ít nhất 8 ký tự"
            label="Nhập mật khẩu"
            required
          />

          <LoadingButton
            variant="contained"
            loading={isLoading}
            type="submit"
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
      <Box
        sx={{
          width: '35rem',
          borderRadius: 2,
          padding: 2,
          bgcolor: theme.palette.common.white,
          margin: '0 auto',
          mt: '1rem',
          '& .MuiFormLabel-asterisk': {
            color: theme.palette.error.main,
          },
        }}
      >
        <Typography textAlign="center" fontWeight="600">
          Bạn là nhà tuyển dụng mới?,
          <Link
            to="/company"
            style={{
              color: theme.palette.primary.main,
              paddingLeft: '5px',
              fontWeight: 600,
            }}
          >
            Đăng ký tài khoản
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginFormCompany;
